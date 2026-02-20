const fs = require('fs');

const localeFiles = ['es.js', 'de.js', 'pt.js', 'ar.js', 'hi.js'].map(f => `c:/Users/hanong/site builder/src/locales/${f}`);
const translates = {
    'es.js': 'Lotería',
    'de.js': 'Lotterie',
    'pt.js': 'Loteria',
    'ar.js': 'يانصيب',
    'hi.js': 'लॉटरी'
};

for (const file of localeFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const filename = file.split('/').pop();
    const searchStr = `"app_title": `;
    const replaceStr = `"category_lotto_main": "${translates[filename]}",\n    "app_title": `;
    content = content.replace(searchStr, replaceStr);
    fs.writeFileSync(file, content);
}

// i18n
let i18nPath = 'c:/Users/hanong/site builder/src/i18n.js';
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

// en
i18nContent = i18nContent.replace(
    /"category_unit": "Unit Converter",/,
    '"category_unit": "Unit Converter",\n    "category_lotto_main": "Lottery",'
);

// ja has 宝くじ
const jaMatch = i18nContent.match(/"category_unit": "単位変換",/);
if (jaMatch) {
    i18nContent = i18nContent.replace(
        /"category_unit": "単位変換",/,
        '"category_unit": "単位変換",\n            "category_lotto_main": "宝くじ",'
    );
}

// zh has 彩票
const zhMatch = i18nContent.match(/"category_unit": "单位换算",/);
if (zhMatch) {
    i18nContent = i18nContent.replace(
        /"category_unit": "单位换算",/,
        '"category_unit": "单位换算",\n            "category_lotto_main": "彩票",'
    );
}

fs.writeFileSync(i18nPath, i18nContent);
console.log('Lotto translation added');
