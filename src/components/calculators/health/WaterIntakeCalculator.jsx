import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const WaterIntakeCalculator = () => {
    const { t } = useTranslation();
    const [weight, setWeight] = useState(65);
    const [result, setResult] = useState(null);

    const calculate = () => {
        // Simple guideline: 30-35ml per kg
        const intake = weight * 33; // avg
        const cups = Math.round(intake / 250); // 250ml cups
        setResult({ ml: intake, cups });
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_water')} id="water" />
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_weight_kg')}</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-[24px] shadow-lg shadow-cyan-400/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{result.ml} ml</p>
                        <p className="text-gray-500">approx. {result.cups} cups (250ml)</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default WaterIntakeCalculator;
