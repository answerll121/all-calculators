import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

import CalculatorInfo from '../../CalculatorInfo';

const TimeCalculator = () => {
    const { t } = useTranslation();
    const [date1, setDate1] = useState(new Date().toISOString().split('T')[0]);
    const [date2, setDate2] = useState(new Date().toISOString().split('T')[0]);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setResult(diffDays);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_time')} id="time" />
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_date1')}</label>
                    <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_date2')}</label>
                    <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-[24px] shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result !== null && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{result} {t('label_days')}</p>
                        <p className="text-xs text-gray-500">{t('label_difference')}</p>
                    </div>
                )}
            </div>
            <CalculatorInfo calculatorId="time" />
        </div>
    );
};
export default TimeCalculator;
