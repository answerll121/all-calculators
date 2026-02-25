const fs = require('fs');

const data = require('./full_translations.json');

['es', 'de', 'pt', 'ar', 'hi'].forEach(lang => {
    let file = `src/locales/${lang}.js`;
    let content = fs.readFileSync(file, 'utf8');

    // Inject common keys
    const commonKeys = `"label_about_calc": ${JSON.stringify(data[lang]._common.about || "About")},\n    "label_how_to_use": ${JSON.stringify(data[lang]._common.howTo || "How to Use")},\n    "label_formula_logic": ${JSON.stringify(data[lang]._common.formula || "Formula/Logic")},\n    "label_faq": ${JSON.stringify(data[lang]._common.faq || "FAQ")},`;

    if (!content.includes('label_about_calc')) {
        content = content.replace(/"category_finance"/, commonKeys + '\n    "category_finance"');
    }

    const infoObj = Object.assign({}, data[lang]);
    delete infoObj._common;
    const infoStr = `"info": ` + JSON.stringify(infoObj, null, 4) + `,`;

    const replaceExistingInfo = (text) => {
        let idx = text.indexOf(`"info": {`);
        if (idx === -1) idx = text.indexOf(`info: {`);
        if (idx !== -1) {
            let braceCount = 0;
            let start = text.indexOf('{', idx);
            let end = -1;
            for (let i = start; i < text.length; i++) {
                if (text[i] === '{') braceCount++;
                else if (text[i] === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        end = i;
                        break;
                    }
                }
            }
            if (end !== -1) {
                // If there's a comma after, it's fine. infoStr has a comma.
                return text.substring(0, idx) + infoStr + '\n' + text.substring(end + 1).replace(/^\s*,\s*/, '');
            }
        }
        return null;
    };

    let replaced = replaceExistingInfo(content);
    if (replaced) {
        content = replaced;
    } else {
        const legalRegex = /"legal"\s*:\s*\{/;
        if (content.match(legalRegex)) {
            content = content.replace(legalRegex, infoStr + '\n    "legal": {');
        } else {
            const lastBrace = content.lastIndexOf('}');
            content = content.substring(0, lastBrace) + ',\n' + infoStr + '\n' + content.substring(lastBrace);
        }
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});

let i18nContent = fs.readFileSync('src/i18n.js', 'utf8');

function updateI18nBlock(content, lang, searchStartStr) {
    const commonKeys = `"label_about_calc": ${JSON.stringify(data[lang]._common.about || "About")},\n    "label_how_to_use": ${JSON.stringify(data[lang]._common.howTo || "How to Use")},\n    "label_formula_logic": ${JSON.stringify(data[lang]._common.formula || "Formula/Logic")},\n    "label_faq": ${JSON.stringify(data[lang]._common.faq || "FAQ")},`;

    let blockStart = content.indexOf(searchStartStr);
    if (blockStart === -1) return content;

    let catStart = content.indexOf('"category_finance"', blockStart);
    if (catStart !== -1 && !content.substring(blockStart, catStart).includes('label_about_calc')) {
        content = content.substring(0, catStart) + commonKeys + '\n    ' + content.substring(catStart);
    }

    blockStart = content.indexOf(searchStartStr);

    const infoObj = Object.assign({}, data[lang]);
    delete infoObj._common;
    const infoStr = `"info": ` + JSON.stringify(infoObj, null, 4) + `,`;

    let legalIdx = content.indexOf('"legal": {', blockStart);
    let legalIdx2 = content.indexOf('legal: {', blockStart);
    let actualLegalIdx = -1;
    if (legalIdx !== -1 && legalIdx2 !== -1) actualLegalIdx = Math.min(legalIdx, legalIdx2);
    else actualLegalIdx = Math.max(legalIdx, legalIdx2);

    if (actualLegalIdx !== -1) {
        let slice = content.substring(blockStart, actualLegalIdx);
        let idx = slice.indexOf(`"info": {`);
        if (idx === -1) idx = slice.indexOf(`info: {`);

        if (idx !== -1) {
            let braceCount = 0;
            let start = slice.indexOf('{', idx);
            let end = -1;
            for (let i = start; i < slice.length; i++) {
                if (slice[i] === '{') braceCount++;
                else if (slice[i] === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        end = i;
                        break;
                    }
                }
            }
            if (end !== -1) {
                slice = slice.substring(0, idx) + infoStr.replace(/,$/, '') + slice.substring(end + 1);
                content = content.substring(0, blockStart) + slice + content.substring(actualLegalIdx);
            }
        } else {
            content = content.substring(0, actualLegalIdx) + infoStr + '\n    ' + content.substring(actualLegalIdx);
        }
    }
    return content;
}

i18nContent = updateI18nBlock(i18nContent, 'en', 'const enTranslation = {');
i18nContent = updateI18nBlock(i18nContent, 'ko', 'ko: {');
i18nContent = updateI18nBlock(i18nContent, 'ja', 'ja: {');
i18nContent = updateI18nBlock(i18nContent, 'zh', 'zh: {');

fs.writeFileSync('src/i18n.js', i18nContent, 'utf8');
console.log("Updated i18n.js");
