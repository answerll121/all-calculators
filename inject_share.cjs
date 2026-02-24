const fs = require('fs');

const pathI18n = 'src/i18n.js';
let contentI18n = fs.readFileSync(pathI18n, 'utf8');

contentI18n = contentI18n.replace(
    /"action_close": "Close Calculator",/g,
    `"action_close": "Close Calculator",\n    "action_share": "Share",\n    "action_copy_link": "Copy Link",`
);

contentI18n = contentI18n.replace(
    /"action_close": "닫기",\s*"general_calculator"/g,
    `"action_close": "닫기",\n            "action_share": "공유하기",\n            "action_copy_link": "링크 복사",\n            "general_calculator"`
);

contentI18n = contentI18n.replace(
    /"action_close": "閉じる",\s*"general_calculator"/g,
    `"action_close": "閉じる",\n            "action_share": "共有",\n            "action_copy_link": "リンクをコピー",\n            "general_calculator"`
);

contentI18n = contentI18n.replace(
    /"action_close": "关闭",\s*"general_calculator"/g,
    `"action_close": "关闭",\n            "action_share": "分享",\n            "action_copy_link": "复制链接",\n            "general_calculator"`
);

fs.writeFileSync(pathI18n, contentI18n);

const locales = {
    'es': { close: '"action_close": "Cerrar"', share: 'Compartir', copy: 'Copiar enlace' },
    'de': { close: '"action_close": "Schließen"', share: 'Teilen', copy: 'Link kopieren' },
    'pt': { close: '"action_close": "Fechar"', share: 'Compartilhar', copy: 'Copiar link' },
    'ar': { close: '"action_close": "إغلاق"', share: 'مشاركة', copy: 'نسخ الرابط' },
    'hi': { close: '"action_close": "बंद करें"', share: 'साझा करें', copy: 'लिंक कॉपी करें' }
};

for (const [lang, vars] of Object.entries(locales)) {
    const p = `src/locales/${lang}.js`;
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf8');
        c = c.replace(
            new RegExp(vars.close + ',', 'g'),
            `${vars.close},\n    "action_share": "${vars.share}",\n    "action_copy_link": "${vars.copy}",`
        );
        fs.writeFileSync(p, c);
    }
}
console.log('Done injecting translations.');
