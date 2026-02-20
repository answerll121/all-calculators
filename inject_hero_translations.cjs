const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'src', 'locales');
const localeFiles = ['en.js', 'ko.js', 'es.js', 'ja.js', 'zh.js', 'de.js', 'pt.js', 'ar.js', 'hi.js'].map(f => path.join(localesPath, f));

const translates = {
    'en.js': 'Smart calculations for your daily life.',
    'ko.js': '일상생활을 위한 스마트한 계산기',
    'es.js': 'Cálculos inteligentes para tu vida diaria.',
    'ja.js': '日常生活のためのスマートな計算。',
    'zh.js': '适合您日常生活的智能计算。',
    'de.js': 'Smarte Berechnungen für Ihren Alltag.',
    'pt.js': 'Cálculos inteligentes para o seu dia a dia.',
    'ar.js': 'حسابات ذكية لحياتك اليومية.',
    'hi.js': 'आपके दैनिक जीवन के लिए स्मार्ट गणनाएँ।'
};

const installTranslates = {
    'en.js': 'Install App',
    'ko.js': '앱 설치하기',
    'es.js': 'Instalar aplicación',
    'ja.js': 'アプリをインストール',
    'zh.js': '安装应用',
    'de.js': 'App installieren',
    'pt.js': 'Instalar aplicativo',
    'ar.js': 'تثبيت التطبيق',
    'hi.js': 'ऐप इंस्टॉल करें'
};

for (const file of localeFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        const filename = path.basename(file);
        const searchStr = `"app_title": `;

        // Ensure we don't duplicate
        if (!content.includes('"hero_subtitle"')) {
            const replaceStr = `"action_install_app": "${installTranslates[filename]}",\n    "hero_subtitle": "${translates[filename]}",\n    "app_title": `;
            content = content.replace(searchStr, replaceStr);
            fs.writeFileSync(file, content);
        }
    }
}

// i18n
const i18nPath = path.join(__dirname, 'src', 'i18n.js');
if (fs.existsSync(i18nPath)) {
    let i18nContent = fs.readFileSync(i18nPath, 'utf8');

    // en
    if (!i18nContent.includes('"hero_subtitle"')) {
        i18nContent = i18nContent.replace(
            /"category_lotto_main": "Lottery",/,
            '"category_lotto_main": "Lottery",\n            "action_install_app": "Install App",\n            "hero_subtitle": "Smart calculations for your daily life.",'
        );
        // ja
        i18nContent = i18nContent.replace(
            /"category_lotto_main": "宝くじ",/,
            '"category_lotto_main": "宝くじ",\n            "action_install_app": "アプリをインストール",\n            "hero_subtitle": "日常生活のためのスマートな計算。",'
        );
        // zh
        i18nContent = i18nContent.replace(
            /"category_lotto_main": "彩票",/,
            '"category_lotto_main": "彩票",\n            "action_install_app": "安装应用",\n            "hero_subtitle": "适合您日常生活的智能计算。",'
        );
        fs.writeFileSync(i18nPath, i18nContent);
    }
}

console.log('Hero and Install translations injected');
