import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const SmokingCalculator = () => {
    const { t } = useTranslation();
    const [packsPerDay, setPacksPerDay] = useState(1);
    const [pricePerPack, setPricePerPack] = useState(4500);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const dailyCost = packsPerDay * pricePerPack;
        const totalCost = dailyCost * 365 * years;
        // Simplified life lost: 11 mins per cigarette. 20 cigs/pack.
        const cigs = packsPerDay * 20 * 365 * years;
        const minutesLost = cigs * 11;
        const daysLost = Math.round(minutesLost / 60 / 24);

        setResult({ cost: totalCost, daysLost });
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_smoking')} id="smoking" />
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_packs_day')}</label>
                    <input type="number" step="0.5" value={packsPerDay} onChange={(e) => setPacksPerDay(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_price_pack')}</label>
                    <input type="number" value={pricePerPack} onChange={(e) => setPricePerPack(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_years_smoked')}</label>
                    <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 text-white font-bold rounded-[24px] shadow-lg shadow-gray-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm space-y-2">
                        <p className="flex justify-between"><span>{t('label_money_saved')}:</span> <span className="font-bold text-green-600">{result.cost.toLocaleString()}</span></p>
                        <p className="flex justify-between"><span>{t('label_life_regained')}:</span> <span className="font-bold text-blue-600">{result.daysLost} {t('units.count')}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SmokingCalculator;
