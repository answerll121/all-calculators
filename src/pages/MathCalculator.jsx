import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sigma } from 'lucide-react';
import useScrollToHash from '../hooks/useScrollToHash';
import SEO from '../components/common/SEO';
import PercentCalculator from '../components/calculators/math/PercentCalculator';
import VATCalculator from '../components/calculators/math/VATCalculator';
import AreaCalculator from '../components/calculators/math/AreaCalculator';
import VolumeCalculator from '../components/calculators/math/VolumeCalculator';
import GPACalculator from '../components/calculators/math/GPACalculator';
import UnitPriceCalculator from '../components/calculators/math/UnitPriceCalculator';
import TimeCalculator from '../components/calculators/math/TimeCalculator';

import BaseConverter from '../components/calculators/math/BaseConverter';

const MathCalculator = () => {
    const { t } = useTranslation();
    useScrollToHash();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": t('calc_percent'),
                "acceptedAnswer": { "@type": "Answer", "text": "Calculate percentage changes, discounts, and parts of a whole." }
            }
        ]
    };

    return (
        <div className="space-y-8">
            <SEO
                title={t('category_math')}
                description="Easy-to-use math calculators for percentages, VAT, GPA, time difference, geometry, and base conversion."
                keywords="math calculator, percentage calculator, vat calculator, tax calculator, gpa calculator, geometry calculator, area volume, base converter, time calculator"
                schema={jsonLd}
            />
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Sigma className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('category_math')}</h1>
            </div>

            <div className="space-y-6">
                <div id="percent" className="break-inside-avoid mb-6"><PercentCalculator /></div>
                <div id="vat" className="break-inside-avoid mb-6"><VATCalculator /></div>
                <div id="area" className="break-inside-avoid mb-6"><AreaCalculator /></div>
                <div id="volume" className="break-inside-avoid mb-6"><VolumeCalculator /></div>
                <div id="gpa" className="break-inside-avoid mb-6"><GPACalculator /></div>
                <div id="unit_price" className="break-inside-avoid mb-6"><UnitPriceCalculator /></div>
                <div id="time" className="break-inside-avoid mb-6"><TimeCalculator /></div>

                <div id="base" className="break-inside-avoid mb-6"><BaseConverter /></div>
            </div>
        </div>
    );
};

export default MathCalculator;
