import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';

const InstallPWA = () => {
    const { t } = useTranslation();
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };

    if (!supportsPWA) {
        return null; // Don't render anything if beforeinstallprompt is not supported or hasn't fired
    }

    return (
        <button
            onClick={onClick}
            className="group flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
            aria-label={t('action_install_app', { defaultValue: 'Install App' })}
        >
            <Download size={18} className="animate-bounce-subtle group-hover:animate-none" />
            <span className="text-xs md:text-sm font-bold whitespace-nowrap">
                {t('action_install_app', { defaultValue: 'Install App' })}
            </span>
        </button>
    );
};

export default InstallPWA;
