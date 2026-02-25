import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

import CalculatorInfo from '../../CalculatorInfo';

const CaffeineCalculator = () => {
    const { t } = useTranslation();
    const [coffee, setCoffee] = useState(1);
    const [tea, setTea] = useState(0);
    const [energyDrink, setEnergyDrink] = useState(0);
    const [result, setResult] = useState(null);

    const calculate = () => {
        // Avg Caffeine content
        // Coffee: 95mg, Tea: 26mg, Energy Drink: 80mg
        const total = (coffee * 95) + (tea * 26) + (energyDrink * 80);
        const limit = 400; // FDA recommended limit for adults

        let status = 'Safe';
        if (total > limit) status = 'Excessive';
        else if (total > limit * 0.8) status = 'Caution';

        setResult({ total, status });
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_caffeine')} id="caffeine" />
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_coffee')}</label>
                    <input type="number" value={coffee} onChange={(e) => setCoffee(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_tea')}</label>
                    <input type="number" value={tea} onChange={(e) => setTea(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_energy_drink')}</label>
                    <input type="number" value={energyDrink} onChange={(e) => setEnergyDrink(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-bold rounded-[24px] shadow-lg shadow-amber-600/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className={`font-bold text-2xl ${result.total > 400 ? 'text-red-500' : 'text-green-500'}`}>{result.total} mg</p>
                        <p className="text-sm font-semibold">{result.status} (Limit: 400mg)</p>
                    </div>
                )}
            </div>
            <CalculatorInfo calculatorId="caffeine" />
        </div>
    );
};
export default CaffeineCalculator;
