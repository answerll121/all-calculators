const fs = require('fs');

const baseData = require('./base_info_en.json');
// also get seoLocales if we want, but let's just translate everything for simplicity! It's less code and more robust.
// We will just throttle the translate function.

async function translateText(text, targetLang) {
    if (!text || targetLang === 'en') return text;
    // We can translate arrays by joining them with a special delimiter
    let isArray = false;
    let textToTranslate = text;
    if (Array.isArray(text)) {
        isArray = true;
        textToTranslate = text.join(' ||| ');
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(textToTranslate)}`;

    // retry logic
    for (let i = 0; i < 3; i++) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const translated = data[0].map(item => item[0]).join('');

            if (isArray) {
                return translated.split(' ||| ').map(s => s.trim());
            }
            return translated;
        } catch (e) {
            console.error(`Error translating to ${targetLang}, attempt ${i + 1}`);
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    return text; // fallback to English
}

const langs = ['en', 'ko', 'ja', 'zh', 'es', 'de', 'pt', 'ar', 'hi'];

// Common Keys to translate:
const commonKeys = {
    about: "About this Calculator",
    howTo: "How to Use",
    formula: "Formula / Logic",
    faq: "FAQ"
};

async function run() {
    console.log("Starting translation...");
    const fullData = {};

    for (const lang of langs) {
        fullData[lang] = { _common: {} };
        console.log(`Translating common keys for ${lang}`);
        fullData[lang]._common.about = await translateText(commonKeys.about, lang);
        fullData[lang]._common.howTo = await translateText(commonKeys.howTo, lang);
        fullData[lang]._common.formula = await translateText(commonKeys.formula, lang);
        fullData[lang]._common.faq = await translateText(commonKeys.faq, lang);
    }

    // Since many calculators share the exact same HowTo, Formula, and FAQ array/strings in EN,
    // we can memoize the translations!
    const translationCache = {};

    async function getCachedTranslation(text, lang) {
        if (lang === 'en') return text;
        const cacheKey = typeof text === 'string' ? text : JSON.stringify(text);
        if (!translationCache[lang]) translationCache[lang] = {};
        if (translationCache[lang][cacheKey]) {
            return translationCache[lang][cacheKey];
        }
        const result = await translateText(text, lang);
        translationCache[lang][cacheKey] = result;
        await new Promise(r => setTimeout(r, 100)); // slight delay to avoid rate limit
        return result;
    }

    const calcKeys = Object.keys(baseData);
    for (let i = 0; i < calcKeys.length; i++) {
        const id = calcKeys[i];
        console.log(`Translating ${id} (${i + 1}/${calcKeys.length})...`);
        const enData = baseData[id];

        for (const lang of langs) {
            if (!fullData[lang][id]) fullData[lang][id] = {};

            const trDesc = await getCachedTranslation(enData.description, lang);
            const trHowTo = await getCachedTranslation(enData.howTo, lang);
            const trFormula = await getCachedTranslation(enData.formula, lang);
            // faq is array of objects
            const trFaq = [];
            for (const qObj of enData.faq) {
                const trQ = await getCachedTranslation(qObj.q, lang);
                const trA = await getCachedTranslation(qObj.a, lang);
                trFaq.push({ q: trQ, a: trA });
            }

            fullData[lang][id] = {
                description: trDesc,
                howTo: trHowTo,
                formula: trFormula,
                faq: trFaq
            };
        }
    }

    console.log("Finished all translations! Writing to full_translations.json");
    fs.writeFileSync('full_translations.json', JSON.stringify(fullData, null, 2));
    console.log("Done.");
}

run();
