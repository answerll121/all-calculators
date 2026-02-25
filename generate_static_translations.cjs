const fs = require('fs');

const langs = ['en', 'ko', 'ja', 'zh', 'es', 'de', 'pt', 'ar', 'hi'];

// 1. Generic Keys
const common = {
    en: { about: "About this Calculator", howTo: "How to Use", formula: "Formula / Logic", faq: "FAQ" },
    ko: { about: "계산기 소개", howTo: "사용 방법", formula: "계산 원리 / 공식", faq: "자주 묻는 질문" },
    ja: { about: "電卓について", howTo: "使い方", formula: "計算原理・公式", faq: "よくある質問" },
    zh: { about: "计算器简介", howTo: "使用方法", formula: "计算原理/公式", faq: "常见问题解答" },
    es: { about: "Acerca de esta calculadora", howTo: "Cómo utilizar", formula: "Fórmula / Lógica", faq: "Preguntas frecuentes" },
    de: { about: "Über diesen Rechner", howTo: "Wie benutzt man", formula: "Formel / Logik", faq: "Häufig gestellte Fragen" },
    pt: { about: "Sobre esta calculadora", howTo: "Como usar", formula: "Fórmula / Lógica", faq: "Perguntas Frequentes" },
    ar: { about: "عن هذه الآلة الحاسبة", howTo: "كيفية الاستخدام", formula: "الصيغة / المنطق", faq: "أسئلة مكررة" },
    hi: { about: "इस कैलकुलेटर के बारे में", howTo: "कैसे उपयोग करें", formula: "सूत्र / तर्क", faq: "सामान्य प्रश्न" }
};

// 2. Generic Values
const generics = {
    en: {
        fallbackDesc: "This specialized calculator provides quick, accurate results tailored to your specific inputs. Whether managing daily tasks or planning ahead, our tool offers reliable data instantly.",
        howTo: ["Enter all required values in the input fields.", "Select any optional settings or preferred units.", "Click the Calculate button.", "Review your detailed results directly below."],
        formula: "The tool utilizes standard mathematical operations and verified logic to output accurate real-time results based entirely on user inputs.",
        faq: [
            { q: "Is the calculation accurate?", a: "Yes, we use precise formulas optimized for general use. However, consider all results as estimates for professional or legal purposes." },
            { q: "Is my data stored?", a: "No, all calculations happen locally in your browser to strictly ensure your privacy." }
        ]
    },
    ko: {
        fallbackDesc: "이 계산기는 입력값에 맞춰 빠르고 정확한 결과를 제공합니다. 일상적인 수치부터 전문적인 계획까지, 실시간으로 신뢰할 수 있는 데이터를 확인하세요.",
        howTo: ["입력칸에 필요한 값을 정확하게 입력하세요.", "단위 설정 등 필요한 옵션을 선택하세요.", "계산하기 버튼을 눌러주세요.", "아래 제공되는 상세한 결과값을 확인하세요."],
        formula: "입력된 값을 바탕으로 검증된 표준 수학적 알고리즘을 사용하여 실시간으로 결과를 산출합니다.",
        faq: [
            { q: "이 계산 결과는 정확한가요?", a: "네, 공인된 표준 공식을 적용하여 계산됩니다. 다만, 전문적인 목적(의학/세무/법률 등)의 경우 오직 참고용으로만 사용해 주세요." },
            { q: "입력한 기록이 저장되나요?", a: "아니요. 모든 계산은 브라우저 내에서 안전하게 처리되며, 개인정보와 수치 데이터는 절대 저장되지 않습니다." }
        ]
    },
    ja: {
        fallbackDesc: "この計算機は、入力に合わせて迅速かつ正確な結果を提供します。日常的な数値から専門的な計画まで、リアルタイムで信頼できるデータを確認できます。",
        howTo: ["入力欄に必要な値を正確に入力してください。", "単位設定など、必要なオプションを選択してください。", "「計算する」ボタンを押してください。", "下に表示される詳細な結果を確認してください。"],
        formula: "入力された値を基に検証済みの標準的な数学アルゴリズムを使用して、リアルタイムで結果を算出します。",
        faq: [
            { q: "この計算結果は正確ですか？", a: "はい、公認された標準公式を適用して計算されます。ただし、専門的な目的（医学/税務/法律など）の場合は、あくまで参考用としてご利用ください。" },
            { q: "入力したデータは保存されますか？", a: "いいえ。すべての計算はブラウザ内で安全に処理され、個人情報と数値データは一切保存されません。" }
        ]
    },
    zh: {
        fallbackDesc: "此计算器会根据您的输入快速提供准确的结果。无论是日常杂项还是专业规划，都能随时随地提供可靠数据。",
        howTo: ["在输入框中准确输入所需的值。", "选择任何可选设置（如首选单位）。", "点击“计算”按钮。", "在下方查看详细结果。"],
        formula: "基于输入的值，采用经过验证的标准数学算法进行实时运算。",
        faq: [
            { q: "这个计算结果准确吗？", a: "是的，我们使用标准公式进行计算。但如果是专业用途（医疗/税务/法律等），请仅作为参考。" },
            { q: "我输入的数据会被保存吗？", a: "不会。所有计算都在您的浏览器本地完成，绝对不会被记录或保存，以保障您的隐私。" }
        ]
    },
    es: {
        fallbackDesc: "Esta calculadora proporciona resultados rápidos y precisos. Una herramienta en línea gratuita para administrar los datos de manera eficaz sin registrarse.",
        howTo: ["Ingrese los valores requeridos en los campos de entrada.", "Ajuste la configuración opcional según corresponda.", "Haga clic en calcular y verifique los resultados a continuación."],
        formula: "La herramienta utiliza operaciones matemáticas estándar evaluadas en tiempo real.",
        faq: [
            { q: "¿Es exacto el resultado?", a: "Sí, todos los cálculos emplean algoritmos estándar. Considérelo una estimación precisa." },
            { q: "¿Mis datos están a salvo?", a: "Absolutamente, nada se guarda. Todo el cálculo es local." }
        ]
    },
    de: {
        fallbackDesc: "Dieser Rechner liefert schnelle und genaue Ergebnisse. Ein kostenloses Online-Tool zur effektiven Datenverwaltung ohne Anmeldung.",
        howTo: ["Geben Sie die erforderlichen Werte in die Eingabefelder ein.", "Passen Sie die optionalen Einstellungen an.", "Klicken Sie auf Berechnen und überprüfen Sie die Ergebnisse unten."],
        formula: "Das Tool verwendet mathematische Standardoperationen, die in Echtzeit ausgewertet werden.",
        faq: [
            { q: "Ist das Ergebnis genau?", a: "Ja, alle Berechnungen verwenden Standardalgorithmen. Betrachten Sie es als genaue Schätzung." },
            { q: "Sind meine Daten sicher?", a: "Absolut, es wird nichts gespeichert. Die gesamte Berechnung erfolgt lokal." }
        ]
    },
    pt: {
        fallbackDesc: "Esta calculadora online fornece resultados rápidos e precisos instantaneamente em seu navegador sem a necessidade de um registro.",
        howTo: ["Insira os valores estritamente necessários nos respectivos campos.", "Selecione as unidades aplicáveis.", "Pressione 'Calcular' e veja as respostas."],
        formula: "A ferramenta processa seus dados em tempo real utilizando fórmulas de uso público padrão.",
        faq: [
            { q: "Isso é exato?", a: "Sim, os resultados baseiam-se em cálculos e taxas amplamente aceitos e utilizados na indústria." },
            { q: "Minhas informações privadas são salvas?", a: "Não processamos backend neste serviço, seus dados nunca são registrados." }
        ]
    },
    ar: {
        fallbackDesc: "توفر هذه الآلة الحاسبة المخصصة نتائج سريعة ودقيقة مصممة خصيصًا لمدخلاتك، بدون الحاجة إلى تسجيل.",
        howTo: ["أدخل القيم المطلوبة في حقول الإدخال المخصصة.", "اضبط أي إعدادات اختيارية لمطابقة منطقتك.", "انقر فوق زر الحساب لمعالجة بياناتك.", "راجع التفاصيل والنتيجة النهائية المقدمة أدناه."],
        formula: "منطق قياسي وصيغ رياضية مصممة خصيصًا للحساب.",
        faq: [
            { q: "هل هذا الحساب دقيق تمامًا؟", a: "نعم، تستخدم أداتنا صيغًا قياسية ولكنها تبقى مجرد أرقام مقدرة للاستخدام العام." },
            { q: "هل يتم حفظ بياناتي؟", a: "لا، يتم إجراء جميع العمليات الحسابية محليًا في متصفحك للحفاظ على الخصوصية." }
        ]
    },
    hi: {
        fallbackDesc: "यह कैलकुलेटर एक विशेष उपकरण है जिसे आपको त्वरित परिणामों को सटीक रूप से निर्धारित करने में मदद करने के लिए डिज़ाइन किया गया है।",
        howTo: ["निर्दिष्ट इनपुट फ़ील्ड में आवश्यक मान दर्ज करें।", "अपनी सेटिंग समायोजित करें।", "गणना बटन पर क्लिक करें।", "नीचे दिए गए विस्तृत परिणाम की समीक्षा करें।"],
        formula: "विशेष रूप से गणना करने के लिए मानक तर्क और गणितीय सूत्र।",
        faq: [
            { q: "क्या यह गणना पूरी तरह से सटीक है?", a: "हां, हमारे उपकरण सटीक विवरण प्रदान करने के लिए मानक सूत्रों और वास्तविक समय के अद्यतनों का उपयोग करते हैं।" },
            { q: "क्या मेरा इनपुट किया गया डेटा सहेजा गया है?", a: "नहीं, सभी गणनाएं आपके ब्राउज़र में स्थानीय रूप से की जाती हैं। कोई भी व्यक्तिगत डेटा सहेजा नहीं जाता है।" }
        ]
    }
};

const specificIds = ['margin', 'loan', 'savings', 'deposit', 'salary', 'severance', 'estate', 'stock', 'exchange', 'inflation', 'giftTax', '401k', 'rothIra', 'creditCardPayoff', 'salaryHourly', 'dutchPay', 'tip', 'bmi', 'bmr', 'calories', 'whr', 'idealWeight', 'waterIntake', 'smokingCost', 'menstrualCycle', 'childGrowth', 'caffeine', 'childObesity', 'macro', 'bac', 'tdee', 'sleep', 'petAge', 'age', 'date', 'militaryService', 'percent', 'vat', 'area', 'volume', 'gpa', 'unitPrice', 'time', 'baseConverter', 'discount', 'cookingConverter', 'globalSizeConverter', 'gasCost', 'areaConverter', 'lengthConverter', 'volumeConverter', 'weightConverter', 'ohmsLaw', 'voltageDrop', 'fertilizer', 'vpd', 'kerala', 'lottoTax', 'lotto', 'universalLotto'];

async function build() {
    const seoModule = await import('./src/locales/seoLocales.js');
    const seoDescriptions = seoModule.seoTranslations;

    const fullData = {};

    langs.forEach(lang => {
        fullData[lang] = { _common: common[lang] || common.en };

        specificIds.forEach(id => {
            let desc = generics[lang]?.fallbackDesc || generics.en.fallbackDesc;
            let seoKey = `seo_desc_${id}`;
            if (seoDescriptions[lang] && seoDescriptions[lang][seoKey]) {
                desc = seoDescriptions[lang][seoKey];
            } else if (seoDescriptions['en'] && seoDescriptions['en'][seoKey]) {
                desc = seoDescriptions['en'][seoKey]; // fallback
            }

            fullData[lang][id] = {
                description: desc,
                howTo: generics[lang]?.howTo || generics.en.howTo,
                formula: generics[lang]?.formula || generics.en.formula,
                faq: generics[lang]?.faq || generics.en.faq
            };
        });
    });

    fs.writeFileSync('full_translations.json', JSON.stringify(fullData, null, 2));
    console.log('full_translations.json successfully built instantly.');
}

build();
