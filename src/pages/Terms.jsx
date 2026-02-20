import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/common/SEO';

const Terms = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <SEO title={t('legal.terms_title')} description={t('legal.terms_content.intro')} />
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{t('legal.terms_title')}</h1>

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
        </div>
    );
};

export default Terms;
