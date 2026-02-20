import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

const CookieConsent = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Delay showing slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
            <div className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 md:flex items-center justify-between gap-6">
                <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t('cookie_title', { defaultValue: 'We use cookies' })}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {t('cookie_desc', { defaultValue: 'We use cookies to improve your experience and analyze traffic. By continuing, you agree to our use of cookies.' })}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/30"
                    >
                        {t('cookie_accept', { defaultValue: 'Accept' })}
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
