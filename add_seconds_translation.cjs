const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const localesDir = path.join(srcDir, 'locales');
const i18nPath = path.join(srcDir, 'i18n.js');

const secTranslations = {
    en: "Seconds",
    ko: "초",
    ja: "秒",
    zh: "秒",
    fr: "Secondes",
    es: "Segundos",
    de: "Sekunden",
    pt: "Segundos",
    ar: "ثواني",
    hi: "सेकंड"
};

// 1. locales/*.js (export default { ... })
const localesFiles = ['es', 'de', 'pt', 'ar', 'hi'];
localesFiles.forEach(lang => {
    const filePath = path.join(localesDir, lang + '.js');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const searchPattern = /"label_diff_minutes":\s*"[^"]+",?/g;
        content = content.replace(searchPattern, (match) => {
            return `${match}\n    "label_diff_seconds": "${secTranslations[lang]}",`;
        });
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${lang}.js`);
    }
});

// 2. i18n.js embedded languages
if (fs.existsSync(i18nPath)) {
    let content = fs.readFileSync(i18nPath, 'utf8');
    const embeddedLangs = ['en', 'ko', 'ja', 'zh', 'fr'];

    // We need to replace after each `label_diff_minutes` but know which lang it is.
    // Fortunately, since they are sequential, we can just replace each occurrence with the next language's translation.
    let index = 0;
    const searchPattern = /"label_diff_minutes":\s*"[^"]+",?/g;

    content = content.replace(searchPattern, (match) => {
        if (index < embeddedLangs.length) {
            const lang = embeddedLangs[index];
            index++;
            return `${match}\n    "label_diff_seconds": "${secTranslations[lang]}",`;
        }
        return match;
    });

    fs.writeFileSync(i18nPath, content, 'utf8');
    console.log(`Updated i18n.js with ${index} language blocks for seconds.`);
}
