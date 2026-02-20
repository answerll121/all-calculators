import React from 'react';
import { useTranslation } from 'react-i18next';
import { Ticket } from 'lucide-react';
import useScrollToHash from '../hooks/useScrollToHash';
import SEO from '../components/common/SEO';
import UniversalLotto from '../components/calculators/math/UniversalLotto';
import LottoTaxCalculator from '../components/calculators/lotto/LottoTaxCalculator';

const LottoPage = () => {
    const { t } = useTranslation();

    useScrollToHash();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": t('calc_lotto_kr'),
                "acceptedAnswer": { "@type": "Answer", "text": "Generate lucky numbers for Korean Lotto 6/45." }
            },
            {
                "@type": "Question",
                "name": t('calc_powerball'),
                "acceptedAnswer": { "@type": "Answer", "text": "Generate lucky numbers for US Powerball." }
            }
        ]
    };

    return (
        <div className="space-y-12">
            <SEO
                title={t('category_lotto_main')}
                description="Global Lottery Number Generators for Lotto 6/45, Powerball, Mega Millions, and more."
                keywords="lotto generator, powerball numbers, mega millions generator, lucky numbers"
                schema={jsonLd}
            />
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    <Ticket className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('category_lotto_main')}</h1>
            </div>

            <div className="space-y-6">
                {/* Tax Calculator - Top Feature */}
                <div id="lotto_tax" className="break-inside-avoid mb-6"><LottoTaxCalculator /></div>

                {/* Korean Lotto 6/45 */}
                <div id="lotto_kr" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_kr"
                        title={t('calc_lotto_kr')}
                        maxNum={45}
                        pickCount={6}
                        hasBonus={true}
                        bonusMax={45}
                        themeColor="amber"
                    />
                </div>

                {/* US Powerball */}
                <div id="lotto_powerball" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_powerball"
                        title={t('calc_powerball')}
                        maxNum={69}
                        pickCount={5}
                        hasBonus={true}
                        bonusMax={26}
                        themeColor="red"
                    />
                </div>

                {/* US Mega Millions */}
                <div id="lotto_mega" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_mega"
                        title={t('calc_mega_millions')}
                        maxNum={70}
                        pickCount={5}
                        hasBonus={true}
                        bonusMax={25}
                        themeColor="blue"
                    />
                </div>

                {/* Japan Lotto 7 */}
                <div id="lotto_jp" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_jp"
                        title={t('calc_lotto_jp')}
                        maxNum={37}
                        pickCount={7}
                        hasBonus={false} // Bonus is drawn but user picks 7
                        themeColor="amber"
                    />
                </div>

                {/* China Shuangseqiu */}
                <div id="lotto_zh" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_zh"
                        title={t('calc_lotto_zh')}
                        maxNum={33}
                        pickCount={6}
                        hasBonus={true}
                        bonusMax={16}
                        themeColor="red"
                    />
                </div>

                {/* EuroMillions */}
                <div id="lotto_eu_millions" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_eu_millions"
                        title={t('calc_euro_millions')}
                        maxNum={50}
                        pickCount={5}
                        hasBonus={true}
                        bonusMax={12}
                        bonusPickCount={2}
                        themeColor="indigo"
                    />
                </div>

                {/* EuroJackpot */}
                <div id="lotto_euro_jackpot" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_euro_jackpot"
                        title={t('calc_euro_jackpot')}
                        maxNum={50}
                        pickCount={5}
                        hasBonus={true}
                        bonusMax={12}
                        bonusPickCount={2}
                        themeColor="indigo"
                    />
                </div>

                {/* SuperEnalotto (Italy) */}
                <div id="lotto_superenalotto" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_superenalotto"
                        title={t('calc_superenalotto')}
                        maxNum={90}
                        pickCount={6}
                        hasBonus={false} // Jolly/SuperStar are separate mechanics
                        themeColor="green"
                    />
                </div>

                {/* Mega-Sena (Brazil) */}
                <div id="lotto_megasena" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_megasena"
                        title={t('calc_megasena')}
                        maxNum={60}
                        pickCount={6}
                        hasBonus={false}
                        themeColor="green"
                    />
                </div>

                {/* Kerala Lottery (India) - Generic 6 Digits */}
                <div id="lotto_kerala" className="break-inside-avoid mb-6">
                    <UniversalLotto
                        id="lotto_title_kerala"
                        title={t('calc_kerala')}
                        maxNum={9}
                        pickCount={6}
                        hasBonus={false}
                        themeColor="pink"
                    />
                </div>
            </div>

            {/* Disclaimer Footer */}
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-center">
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                    {t('msg_lotto_disclaimer')}
                </p>
            </div>
        </div>
    );
};

export default LottoPage;
