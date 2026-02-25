import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity } from 'lucide-react';
import useScrollToHash from '../hooks/useScrollToHash';
import SEO from '../components/common/SEO';
import OhmsLawCalculator from '../components/calculators/electrical/OhmsLawCalculator';
import VoltageDropCalculator from '../components/calculators/electrical/VoltageDropCalculator';
import ErrorBoundary from '../components/common/ErrorBoundary';

const ElectricalCalculator = () => {
    const { t } = useTranslation();
    useScrollToHash();

    return (
        <div className="space-y-8">
            <SEO
                title={t('category_electrical', 'Electrical')}
                description="Electrical engineering calculators for professionals."
                keywords="electrical calculator, ohms law calculator, voltage drop calculator, wire size calculator, electrical engineering tools"
            />
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <Activity className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('category_electrical', 'Electrical')}</h1>
            </div>

            <div className="masonry-grid">
                <div id="ohms_law" className="break-inside-avoid mb-6">
                    <ErrorBoundary><OhmsLawCalculator /></ErrorBoundary>
                </div>
                <div id="voltage_drop" className="break-inside-avoid mb-6">
                    <ErrorBoundary><VoltageDropCalculator /></ErrorBoundary>
                </div>
            </div>
        </div>
    );
};

export default ElectricalCalculator;
