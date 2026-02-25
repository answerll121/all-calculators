import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, HelpCircle, BookOpen, Lightbulb } from 'lucide-react';

const CalculatorInfo = ({ calculatorId }) => {
    const { t, i18n } = useTranslation();

    const infoKey = `info.${calculatorId}`;
    const description = t(`${infoKey}.description`, { defaultValue: '' });

    // Check if translation exists
    if (!description && i18n.exists(`${infoKey}.description`) === false) {
        return null;
    }

    const howToRaw = t(`${infoKey}.howTo`, { returnObjects: true, defaultValue: [] });
    const howTo = Array.isArray(howToRaw) ? howToRaw : [];

    const formulaRaw = t(`${infoKey}.formula`, { defaultValue: '' });

    const faqRaw = t(`${infoKey}.faq`, { returnObjects: true, defaultValue: [] });
    const faq = Array.isArray(faqRaw) ? faqRaw : [];

    return (
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
            {/* Description */}
            {description && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-blue-400 mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-500" />
                        {t('label_about_calc')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm lg:text-base whitespace-pre-line">
                        {description}
                    </p>
                </div>
            )}

            {/* How to use */}
            {howTo.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-green-400 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-green-500" />
                        {t('label_how_to_use')}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                        {howTo.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Formula / Logic */}
            {formulaRaw && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-purple-400 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-purple-500" />
                        {t('label_formula_logic')}
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        {formulaRaw.split('\n').map((line, i) => (
                            <p key={i} className="text-gray-600 dark:text-gray-400 text-sm lg:text-base mb-1 last:mb-0 whitespace-pre-wrap">
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {/* FAQ */}
            {faq.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-amber-400 mb-4 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-amber-500" />
                        {t('label_faq')}
                    </h3>
                    <div className="space-y-4">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                                <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">{item.q}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base whitespace-pre-line">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalculatorInfo;
