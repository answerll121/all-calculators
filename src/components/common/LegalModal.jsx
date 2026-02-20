import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

const LegalModal = ({ isOpen, onClose, type }) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const renderPrivacy = () => (
        <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-sm">{t('legal.privacy_content.intro')}</p>

            <section>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('legal.privacy_content.article1_title')}</h3>
                <p>{t('legal.privacy_content.article1_text')}</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                    {(t('legal.privacy_content.article1_list', { returnObjects: true }) || []).map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('legal.privacy_content.article2_title')}</h3>
                <p>{t('legal.privacy_content.article2_text')}</p>
            </section>

            <section>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('legal.privacy_content.article3_title')}</h3>
                {(t('legal.privacy_content.article3_text', { returnObjects: true }) || []).map((item, i) => (
                    <p key={i}>{item}</p>
                ))}
                <p>
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Google Ad Settings
                    </a>
                </p>
            </section>

            <section>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('legal.privacy_content.article4_title')}</h3>
                <p>{t('legal.privacy_content.article4_text')}</p>
            </section>
        </div>
    );

    const renderTerms = () => (
        <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-sm">{t('legal.terms_content.intro')}</p>

            <section>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('legal.terms_content.article1_title')}</h3>
                <p>{t('legal.terms_content.article1_text')}</p>
            </section>

            <section>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('legal.terms_content.article2_title')}</h3>
                {(t('legal.terms_content.article2_text', { returnObjects: true }) || []).map((item, i) => (
                    <p key={i}>{item}</p>
                ))}
            </section>

            <section className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">{t('legal.terms_content.article3_title')}</h3>
                <ul className="list-disc pl-5 space-y-2 text-red-700 dark:text-red-300">
                    {(t('legal.terms_content.article3_list', { returnObjects: true }) || []).map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('legal.terms_content.article4_title')}</h3>
                <p>{t('legal.terms_content.article4_text')}</p>
            </section>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {type === 'privacy' ? t('legal.privacy_title') : t('legal.terms_title')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {type === 'privacy' ? renderPrivacy() : renderTerms()}
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    >
                        {t('legal.close')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalModal;
