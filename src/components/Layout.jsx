import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import InstallPWA from './common/InstallPWA';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Languages, ChevronDown, ArrowUp } from 'lucide-react';

import { useCurrency } from '../context/CurrencyContext';

import LegalModal from './common/LegalModal';
import CookieConsent from './common/CookieConsent';
import ShareMenu from './common/ShareMenu';

const Layout = () => {
    const { t, i18n } = useTranslation();
    const { currency, setCurrency, currencies } = useCurrency();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
    const [legalModalOpen, setLegalModalOpen] = useState(false);
    const [legalModalType, setLegalModalType] = useState('privacy');
    const [showScrollTop, setShowScrollTop] = useState(false);

    const getSEOContent = (lang) => {
        const defaultSEO = {
            title: "초간편 로또 번호 생성기 & 대출 이자 계산기 | 모든 계산기",
            description: "복잡한 설정 없이 바로 쓰는 로또 조합기, 정확한 대출 이자 계산, 건강 상태 BMI 측정을 한 번에 해결하세요. 100% 무료."
        };

        const seoData = {
            ko: defaultSEO,
            en: {
                title: "Free Lotto Number Generator & Loan Interest Calculator",
                description: "The easiest way to generate lucky lotto numbers and calculate loan payments. 100% free web tool, no login required."
            },
            ja: {
                title: "無料ロト番号生成器 & かんたんローン利息計算機",
                description: "幸運のロト番号を今すぐ生成！複雑なローンの利息計算やBMI健康管理もこれ一つで解決できます。"
            },
            zh: {
                title: "免费彩票号码生成器 & 贷款利息计算器",
                description: "轻松生成彩票号码和计算贷款利息。无需登录，100%免费的在线计算工具。"
            },
            de: {
                title: "Kostenloser Lotto-Zahlen-Generator & Kreditrechner",
                description: "Die einfachste Möglichkeit, Lottozahlen zu generieren und Kreditzinsen zu berechnen. 100% kostenlos."
            },
            es: {
                title: "Generador de Lotería y Calculadora de Préstamos",
                description: "Genera números de lotería y calcula los intereses de tu préstamo fácilmente. Herramienta 100% gratuita."
            },
            pt: {
                title: "Gerador de Loteria e Calculadora de Empréstimos Grátis",
                description: "Gere números da sorte e calcule os juros do seu empréstimo. Sem necessidade de login, 100% gratuito."
            },
            ar: {
                title: "مولد أرقام اليانصيب المجاني وحاسبة قروض",
                description: "أسهل طريقة لتوليد أرقام اليانصيب وحساب مدفوعات القروض. أداة ويب مجانية 100٪."
            },
            hi: {
                title: "मुफ़्त लॉटरी नंबर जेनरेटर और लोन कैलकुलेटर",
                description: "भाग्यशाली लॉटरी नंबर जेनरेट करने और लोन भुगतान की गणना करने का सबसे आसान तरीका। 100% मुफ़्त."
            }
        };

        return seoData[lang] || defaultSEO;
    };
    const currentSEO = getSEOContent(i18n.language);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsLangMenuOpen(false);
    };

    const openLegalModal = (type) => {
        setLegalModalType(type);
        setLegalModalOpen(true);
    };

    const closeLegalModal = () => {
        setLegalModalOpen(false);
    };

    const languages = [
        { code: 'ko', name: 'Korean (한국어)' },
        { code: 'en', name: 'English (English)' },
        { code: 'ja', name: 'Japanese (日本語)' },
        { code: 'zh', name: 'Chinese (中文)' },
        { code: 'es', name: 'Spanish (Español)' },
        { code: 'de', name: 'German (Deutsch)' },
        { code: 'pt', name: 'Portuguese (Português)' },
        { code: 'ar', name: 'Arabic (العربية)' },
        { code: 'hi', name: 'Hindi (हिन्दी)' },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200 font-sans">
            <Helmet>
                <html lang={i18n.language} />
                <title>{currentSEO.title}</title>
                <meta name="description" content={currentSEO.description} />
                <meta property="og:title" content={currentSEO.title} />
                <meta property="og:description" content={currentSEO.description} />
                <meta name="twitter:title" content={currentSEO.title} />
                <meta name="twitter:description" content={currentSEO.description} />
            </Helmet>
            <header className="relative z-40 bg-white dark:bg-gray-900 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 whitespace-nowrap shrink-0">
                            {t('app_title')}
                        </Link>

                        <div className="flex items-center space-x-1 sm:space-x-3">
                            <InstallPWA />
                            <ShareMenu />
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label={t('action_toggle_theme')}
                            >
                                <div className="relative w-5 h-5">
                                    <Moon className="absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <Sun className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                </div>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                                    className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span className="font-bold text-gray-700 dark:text-gray-200">{currency}</span>
                                    <ChevronDown size={16} className="text-gray-500" />
                                </button>

                                {isCurrencyMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto z-50">
                                        {Object.entries(currencies).map(([code, { label }]) => (
                                            <button
                                                key={code}
                                                onClick={() => {
                                                    setCurrency(code);
                                                    setIsCurrencyMenuOpen(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm ${currency === code ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>



                            <div className="relative">
                                <button
                                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                    className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Languages size={20} />
                                    <span className="text-sm font-medium hidden sm:inline">{i18n.language.toUpperCase()}</span>
                                    <ChevronDown size={16} />
                                </button>

                                {isLangMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto z-50">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === lang.code ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex justify-center space-x-6 mb-4">
                        <button
                            onClick={() => openLegalModal('terms')}
                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {t('legal.terms_title')}
                        </button>
                        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 self-center"></div>
                        <button
                            onClick={() => openLegalModal('privacy')}
                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {t('legal.privacy_title')}
                        </button>
                    </div>
                    <div className="text-sm text-gray-400 dark:text-gray-500">
                        © {new Date().getFullYear()} {t('app_title')}. {t('msg_all_rights_reserved')}
                    </div>
                </div>
            </footer>

            <LegalModal
                isOpen={legalModalOpen}
                onClose={closeLegalModal}
                type={legalModalType}
            />
            <CookieConsent />

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
                    }`}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </button>
        </div>
    );
};

export default Layout;
