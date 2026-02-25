import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity } from 'lucide-react';
import useScrollToHash from '../hooks/useScrollToHash';
import SEO from '../components/common/SEO';
import FertilizerCalculator from '../components/calculators/smartfarm/FertilizerCalculator';
import VPDCalculator from '../components/calculators/smartfarm/VPDCalculator';
import ErrorBoundary from '../components/common/ErrorBoundary';

const SmartFarmCalculator = () => {
    const { t } = useTranslation();
    useScrollToHash();

    return (
        <div className="space-y-8">
            <SEO
                title={t('category_smartfarm', 'Smart Farm')}
                description="Agriculture and hydroponics calculators for modern farming."
                keywords="smart farm calculator, hydroponics calculator, fertilizer dilution, VPD calculator, vapor pressure deficit, agriculture tools"
            />
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="p-3 bg-lime-100 dark:bg-lime-900/30 rounded-full">
                    <Activity className="w-8 h-8 text-lime-600 dark:text-lime-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('category_smartfarm', 'Smart Farm')}</h1>
            </div>

            <div className="masonry-grid">
                <div id="fertilizer" className="break-inside-avoid mb-6">
                    <ErrorBoundary><FertilizerCalculator /></ErrorBoundary>
                </div>
                <div id="vpd" className="break-inside-avoid mb-6">
                    <ErrorBoundary><VPDCalculator /></ErrorBoundary>
                </div>
            </div>
        </div>
    );
};

export default SmartFarmCalculator;
