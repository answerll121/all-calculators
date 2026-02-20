import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';

const InflationCalculator = () => {
    const { t } = useTranslation();
    const { symbol } = useCurrency();
    const [amount, setAmount] = useState(1000000);
    const [years, setYears] = useState(10);
    const [inflationRate, setInflationRate] = useState(2.5); // Average approx
    const [result, setResult] = useState(null);

    const calculate = () => {
        // Future Value: PV * (1+r)^n
        const fv = amount * Math.pow(1 + inflationRate / 100, years);
        setResult(Math.round(fv));
    };



    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_inflation')} id="inflation" />
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_current_amount')}</label>
                    <div className="relative">
                        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-2 pr-12 border rounded dark:bg-gray-700 dark:border-gray-600" />
                        <span className="absolute right-3 top-2 text-gray-500">{symbol}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_years_later')}</label>
                        <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_inflation_rate')}</label>
                        <input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-[24px] shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>
                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="text-sm text-gray-500">{t('label_future_value')}</p>
                        <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{symbol}{result.toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default InflationCalculator;
