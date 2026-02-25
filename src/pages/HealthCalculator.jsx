import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import useScrollToHash from '../hooks/useScrollToHash';
import SEO from '../components/common/SEO';
import BMICalculator from '../components/calculators/health/BMICalculator';
import BMRCalculator from '../components/calculators/health/BMRCalculator';
import CaloriesCalculator from '../components/calculators/health/CaloriesCalculator';
import WHRCalculator from '../components/calculators/health/WHRCalculator';
import IdealWeightCalculator from '../components/calculators/health/IdealWeightCalculator';
import WaterIntakeCalculator from '../components/calculators/health/WaterIntakeCalculator';
import SmokingCalculator from '../components/calculators/health/SmokingCostCalculator';
import CycleCalculator from '../components/calculators/health/MenstrualCycleCalculator';
import ChildGrowthCalculator from '../components/calculators/health/ChildGrowthCalculator';
import CaffeineCalculator from '../components/calculators/health/CaffeineCalculator';
import ChildObesityCalculator from '../components/calculators/health/ChildObesityCalculator';
import MacroCalculator from '../components/calculators/health/MacroCalculator';
import BacCalculator from '../components/calculators/health/BacCalculator';
import TdeeCalculator from '../components/calculators/health/TdeeCalculator';
import SleepCalculator from '../components/calculators/health/SleepCalculator';

const HealthCalculator = () => {
    const { t } = useTranslation();
    useScrollToHash();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": t('calc_bmi'),
                "acceptedAnswer": { "@type": "Answer", "text": "Calculate Body Mass Index (BMI) and health status." }
            },
            {
                "@type": "Question",
                "name": t('calc_calories'),
                "acceptedAnswer": { "@type": "Answer", "text": "Estimate daily calorie burn based on activity." }
            }
        ]
    };

    return (
        <div className="space-y-8">
            <SEO
                title={t('category_health')}
                description={t('seo_desc_category_health')}
                keywords="health calculator, body mass index, bmi calculator, basal metabolic rate, bmr, total daily energy expenditure, tdee, macro calculator, calorie tracker, weight loss, ideal weight"
                schema={jsonLd}
            />
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('category_health')}</h1>
            </div>

            <div className="masonry-grid">
                <div id="bmi" className="break-inside-avoid mb-6"><BMICalculator /></div>
                <div id="bmr" className="break-inside-avoid mb-6"><BMRCalculator /></div>
                <div id="tdee" className="break-inside-avoid mb-6"><TdeeCalculator /></div>
                <div id="calories" className="break-inside-avoid mb-6"><CaloriesCalculator /></div>
                <div id="whr" className="break-inside-avoid mb-6"><WHRCalculator /></div>
                <div id="ideal" className="break-inside-avoid mb-6"><IdealWeightCalculator /></div>
                <div id="water" className="break-inside-avoid mb-6"><WaterIntakeCalculator /></div>
                <div id="smoking" className="break-inside-avoid mb-6"><SmokingCalculator /></div>
                <div id="cycle" className="break-inside-avoid mb-6"><CycleCalculator /></div>
                <div id="sleep" className="break-inside-avoid mb-6"><SleepCalculator /></div>
                <div id="growth" className="break-inside-avoid mb-6"><ChildGrowthCalculator /></div>
                <div id="caffeine" className="break-inside-avoid mb-6"><CaffeineCalculator /></div>
                <div id="child_obesity" className="break-inside-avoid mb-6"><ChildObesityCalculator /></div>
                <div id="macro" className="break-inside-avoid mb-6"><MacroCalculator /></div>
                <div id="bac" className="break-inside-avoid mb-6"><BacCalculator /></div>
            </div>
        </div>
    );
};

export default HealthCalculator;
