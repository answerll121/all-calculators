const fs = require('fs');
const baseData = require('./base_info_en.json');

async function translateText(text, targetLang) {
    if (!text || targetLang === 'en') return text;
    let isArray = false;
    let textToTranslate = text;
    if (Array.isArray(text)) {
        isArray = true;
        textToTranslate = text.join(' ||| ');
    }
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(textToTranslate)}`;
    for (let i = 0; i < 3; i++) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const translated = data[0].map(item => item[0]).join('');
            if (isArray) return translated.split(' ||| ').map(s => s.trim());
            return translated;
        } catch (e) {
            await new Promise(r => setTimeout(r, 500));
        }
    }
    return text;
}

const langs = ['en', 'ko', 'ja', 'zh', 'es', 'de', 'pt', 'ar', 'hi'];

const commonKeys = {
    about: "About this Calculator",
    howTo: "How to Use",
    formula: "Formula / Logic",
    faq: "FAQ"
};

async function run() {
    console.log("Starting FAST translation...");
    const fullData = {};
    for (const lang of langs) fullData[lang] = { _common: {} };

    await Promise.all(langs.map(async lang => {
        fullData[lang]._common.about = await translateText(commonKeys.about, lang);
        fullData[lang]._common.howTo = await translateText(commonKeys.howTo, lang);
        fullData[lang]._common.formula = await translateText(commonKeys.formula, lang);
        fullData[lang]._common.faq = await translateText(commonKeys.faq, lang);
    }));

    const translationCache = {};
    const fetchPromises = [];
    const maxConcurrency = 20;

    async function getCachedTranslation(text, lang) {
        if (lang === 'en') return text;
        const cacheKey = typeof text === 'string' ? text : JSON.stringify(text);
        if (!translationCache[lang]) translationCache[lang] = {};
        if (translationCache[lang][cacheKey]) return translationCache[lang][cacheKey];
        if (translationCache[lang][cacheKey] === 'pending') {
            // Wait until it's done
            while (translationCache[lang][cacheKey] === 'pending') {
                await new Promise(r => setTimeout(r, 50));
            }
            return translationCache[lang][cacheKey];
        }

        translationCache[lang][cacheKey] = 'pending';
        const result = await translateText(text, lang);
        translationCache[lang][cacheKey] = result;
        return result;
    }

    const calcKeys = Object.keys(baseData);
    console.log(`Queueing ${calcKeys.length} calculators...`);

    const q = [];
    for (const id of calcKeys) {
        const enData = baseData[id];
        for (const lang of langs) {
            q.push(async () => {
                if (!fullData[lang][id]) fullData[lang][id] = {};
                const trDesc = await getCachedTranslation(enData.description, lang);
                const trHowTo = await getCachedTranslation(enData.howTo, lang);
                const trFormula = await getCachedTranslation(enData.formula, lang);
                const trFaq = [];
                for (const qObj of enData.faq) {
                    const trQ = await getCachedTranslation(qObj.q, lang);
                    const trA = await getCachedTranslation(qObj.a, lang);
                    trFaq.push({ q: trQ, a: trA });
                }
                fullData[lang][id] = { description: trDesc, howTo: trHowTo, formula: trFormula, faq: trFaq };
            });
        }
    }

    // Execute with concurrency limit
    let activeCount = 0;
    while (q.length > 0 || activeCount > 0) {
        while (activeCount < maxConcurrency && q.length > 0) {
            const task = q.shift();
            activeCount++;
            task().finally(() => { activeCount--; });
        }
        await new Promise(r => setTimeout(r, 50));
    }

    fs.writeFileSync('full_translations.json', JSON.stringify(fullData, null, 2));
    console.log("Done! Wrote to full_translations.json");
}
run();
