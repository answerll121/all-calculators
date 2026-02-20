const fs = require('fs');

const localeFiles = ['es.js', 'de.js', 'pt.js', 'ar.js', 'hi.js'].map(f => `c:/Users/hanong/site builder/src/locales/${f}`);
const localesData = {
    'es.js': { open: 'Abrir Calculadora', close: 'Cerrar' },
    'de.js': { open: 'Taschenrechner Öffnen', close: 'Schließen' },
    'pt.js': { open: 'Abrir Calculadora', close: 'Fechar' },
    'ar.js': { open: 'فتح الحاسبة', close: 'إغلاق' },
    'hi.js': { open: 'कैलकुलेटर खोलें', close: 'बंद करें' }
};

for (const file of localeFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const filename = file.split('/').pop();
    const t = localesData[filename];
    const replaceStr = `"general_calculator": `;
    const replacement = `"action_open_calc": "${t.open}",\n    "action_close": "${t.close}",\n    "general_calculator": `;
    content = content.replace(replaceStr, replacement);
    fs.writeFileSync(file, content);
}

// i18n.js multi-replacements
let i18nPath = 'c:/Users/hanong/site builder/src/i18n.js';
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

// English
i18nContent = i18nContent.replace(
    /"general_calculator": "General Calculator",/,
    '"action_open_calc": "Open Calculator",\n    "action_close": "Close Calculator",\n    "general_calculator": "General Calculator",'
);

// Korean
i18nContent = i18nContent.replace(
    /"general_calculator": "일반 계산기",/,
    '"action_open_calc": "메인 계산기 열기",\n            "action_close": "닫기",\n            "general_calculator": "일반 계산기",'
);

// Japanese (find exact general_calculator translation first)
// Let's guess the string or just replace it by finding the matches
const jaMatch = i18nContent.match(/"general_calculator": "(.*?)",/g);
if (jaMatch && jaMatch.length >= 3) {
    // ja is likely index 2 (en=0, ko=1, ja=2, zh=3)
    i18nContent = i18nContent.replace(
        jaMatch[2],
        `"action_open_calc": "メイン電卓を開く",\n            "action_close": "閉じる",\n            ${jaMatch[2]}`
    );
    // zh is likely index 3
    if (jaMatch.length >= 4) {
        i18nContent = i18nContent.replace(
            jaMatch[3],
            `"action_open_calc": "打开计算器",\n            "action_close": "关闭",\n            ${jaMatch[3]}`
        );
    }
}

fs.writeFileSync(i18nPath, i18nContent);
console.log('Translations inserted successfully.');
