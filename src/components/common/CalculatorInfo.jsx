import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Info } from 'lucide-react';
import SEO from './SEO';

const CalculatorInfo = ({ id, title }) => {
    const { t } = useTranslation();

    // Fetch data from i18n with SEO rich fallbacks
    const description = t(`info.${id}.description`, { defaultValue: '' });
    const fallbackDesc = description || t('fallback_desc', { title, defaultValue: `이 ${title}는 언제 어디서나 바로 사용할 수 있는 100% 무료 온라인 계산기입니다. 복잡한 계산을 쉽고 빠르게 처리하여 여러분의 시간을 절약해 줍니다.` });

    const rawHowTo = t(`info.${id}.howTo`, { returnObjects: true, defaultValue: [] });
    const howTo = (rawHowTo && rawHowTo.length > 0) ? rawHowTo : [
        t('fallback_howto_1', { defaultValue: "원하는 값을 양식에 맞게 정확히 설정하거나 입력해 주세요." }),
        t('fallback_howto_2', { defaultValue: "하단의 '계산하기' 버튼을 누르면 즉시 결과를 확인할 수 있습니다." }),
        t('fallback_howto_3', { defaultValue: "결과 화면에서 '공유하기' 기능을 통해 친구나 웹사이트로 쉽게 복사하고 전달하세요." })
    ];

    const formula = t(`info.${id}.formula`, { defaultValue: '' });

    const rawFaqs = t(`info.${id}.faq`, { returnObjects: true, defaultValue: [] });
    const faqs = (rawFaqs && rawFaqs.length > 0) ? rawFaqs : [
        {
            q: t('fallback_faq_1_q', { title, defaultValue: `이 ${title}는 무료로 사용할 수 있나요?` }),
            a: t('fallback_faq_1_a', { defaultValue: "네, 저희 사이트에서 제공하는 모든 기능은 회원가입이나 로그인 없이 100% 무료로 이용하실 수 있습니다." })
        },
        {
            q: t('fallback_faq_2_q', { defaultValue: "입력한 방문자 개인정보 및 계산 데이터는 안전한가요?" }),
            a: t('fallback_faq_2_a', { defaultValue: "사이트에 입력된 모든 데이터는 서버에 저장되지 않고 사용자 브라우저 내에서만 처리되므로 매우 안전합니다." })
        }
    ];

    // Accordion State
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": Array.isArray(faqs) ? faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        })) : []
    };

    return (
        <article className="mt-12 space-y-8 animate-fade-in">
            {/* Inject Schema Only */}
            {faqs.length > 0 && <SEO schema={faqSchema} schemaOnly={true} />}

            <div className="bg-white dark:bg-gray-800 rounded-[24px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Info className="text-blue-500" />
                    {t('label_about_calc', { title })}
                </h2>

                {/* Description */}
                <div className="mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {fallbackDesc}
                </div>

                {/* How to Use */}
                {howTo.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-green-500" />
                            {t('label_how_to_use')}
                        </h3>
                        <ul className="space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300 ml-2">
                            {howTo.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Formula */}
                {formula && (
                    <div className="mb-8 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-purple-500" />
                            {t('label_formula_logic')}
                        </h3>
                        <p className="font-mono text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                            {formula}
                        </p>
                    </div>
                )}

                {/* FAQ Accordion */}
                {faqs.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            {t('label_faq')}
                        </h3>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800 text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <span className="flex-1 pr-4">{faq.q}</span>
                                        {openIndex === index ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-gray-400" />}
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="p-5 pt-0 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};

export default CalculatorInfo;
