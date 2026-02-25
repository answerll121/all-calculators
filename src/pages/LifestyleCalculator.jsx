import React from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee } from 'lucide-react';
import useScrollToHash from '../hooks/useScrollToHash';
import SEO from '../components/common/SEO';
import MilitaryServiceCalculator from '../components/calculators/lifestyle/MilitaryServiceCalculator';
import DateCalculator from '../components/calculators/lifestyle/DateCalculator';
import AgeCalculator from '../components/calculators/lifestyle/AgeCalculator';
import DutchPayCalculator from '../components/calculators/lifestyle/DutchPayCalculator';
import DiscountCalculator from '../components/calculators/lifestyle/DiscountCalculator';
import CookingConverter from '../components/calculators/lifestyle/CookingConverter';
import GlobalSizeConverter from '../components/calculators/lifestyle/GlobalSizeConverter';
import TipCalculator from '../components/calculators/lifestyle/TipCalculator';
import GasCostCalculator from '../components/calculators/lifestyle/GasCostCalculator';
import PetAgeCalculator from '../components/calculators/lifestyle/PetAgeCalculator';

const LifestyleCalculator = () => {
    const { t } = useTranslation();
    useScrollToHash();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": t('calc_date'),
                "acceptedAnswer": { "@type": "Answer", "text": "Calculate days between dates, D-Day, and anniversaries." }
            },
            {
                "@type": "Question",
                "name": t('calc_dutch'),
                "acceptedAnswer": { "@type": "Answer", "text": "Split bills easily among friends with Dutch Pay calculator." }
            }
        ]
    };

    return (
        <div className="space-y-8">
            <SEO
                title={t('category_lifestyle')}
                description={t('seo_desc_category_lifestyle')}
                keywords="lifestyle calculator, tip calculator, discount calculator, split bill, dutch pay, age calculator, d-day, pet age, ring size, clothing size"
                schema={jsonLd}
            />
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="p-3 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-full" style={{ backgroundColor: '#FADADD' }}>
                    <Coffee className="w-8 h-8 text-rose-800 dark:text-rose-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('category_lifestyle')}</h1>
            </div>

            <div className="masonry-grid">
                <div id="military" className="break-inside-avoid mb-6"><MilitaryServiceCalculator /></div>
                <div id="date" className="break-inside-avoid mb-6"><DateCalculator /></div>
                <div id="age" className="break-inside-avoid mb-6"><AgeCalculator /></div>
                <div id="pet_age" className="break-inside-avoid mb-6"><PetAgeCalculator /></div>
                <div id="dutch" className="break-inside-avoid mb-6"><DutchPayCalculator /></div>
                <div id="discount" className="break-inside-avoid mb-6"><DiscountCalculator /></div>
                <div id="cooking" className="break-inside-avoid mb-6"><CookingConverter /></div>
                <div id="size" className="break-inside-avoid mb-6"><GlobalSizeConverter /></div>
                <div id="tip" className="break-inside-avoid mb-6"><TipCalculator /></div>
                <div id="gas" className="break-inside-avoid mb-6"><GasCostCalculator /></div>
            </div>
        </div>
    );
};

export default LifestyleCalculator;
