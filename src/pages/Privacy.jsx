import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/common/SEO';

const Privacy = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <SEO title={t('legal.privacy_title')} description={t('legal.privacy_content.intro')} />
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{t('legal.privacy_title')}</h1>

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
        </div>
    );
};

export default Privacy;
