import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRightLeft } from 'lucide-react';
import useScrollToHash from '../hooks/useScrollToHash';
import SEO from '../components/common/SEO';
import LengthConverter from '../components/calculators/unit/LengthConverter';
import WeightConverter from '../components/calculators/unit/WeightConverter';
import VolumeConverter from '../components/calculators/unit/VolumeConverter';
import AreaConverter from '../components/calculators/unit/AreaConverter';

const UnitConverter = () => {
    const { t } = useTranslation();
    useScrollToHash();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Unit Converter",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <div className="space-y-8">
            <SEO
                title={t('category_unit')}
                description="Fast and accurate unit converters for length, weight, volume, and area."
                keywords="unit converter, length conversion, weight conversion, volume converter, area converter, metric imperial, kg to lbs, miles to km"
                schema={jsonLd}
            />
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                    <ArrowRightLeft className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('category_unit')}</h1>
            </div>

            <div className="space-y-6">
                <div id="length_conv"><LengthConverter /></div>
                <div id="weight_conv"><WeightConverter /></div>
                <div id="volume_conv"><VolumeConverter /></div>
                <div id="area_conv"><AreaConverter /></div>
            </div>
        </div>
    );
};

export default UnitConverter;
