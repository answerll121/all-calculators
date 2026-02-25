import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

import CalculatorInfo from '../../CalculatorInfo';

const CycleCalculator = () => {
    const { t } = useTranslation();
    const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
    const [cycleLength, setCycleLength] = useState(28);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const last = new Date(lastPeriod);
        const next = new Date(last);
        next.setDate(last.getDate() + cycleLength);

        const ovulation = new Date(next);
        ovulation.setDate(next.getDate() - 14);

        const fertileStart = new Date(ovulation);
        fertileStart.setDate(ovulation.getDate() - 5);

        const fertileEnd = new Date(ovulation);
        fertileEnd.setDate(ovulation.getDate() + 1);

        setResult({
            nextPeriod: next.toLocaleDateString(),
            ovulation: ovulation.toLocaleDateString(),
            fertileWindow: `${fertileStart.toLocaleDateString()} - ${fertileEnd.toLocaleDateString()}`
        });
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_cycle')} id="cycle" />
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_last_period')}</label>
                    <input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_cycle_length')}</label>
                    <input type="number" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-[24px] shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm space-y-2">
                        <p className="flex justify-between"><span>{t('label_next_period')}:</span> <span className="font-bold">{result.nextPeriod}</span></p>
                        <p className="flex justify-between"><span>{t('label_ovulation')}:</span> <span className="font-bold text-purple-500">{result.ovulation}</span></p>
                        <p className="flex justify-between"><span>{t('label_fertile')}:</span> <span className="font-bold text-pink-500">{result.fertileWindow}</span></p>
                    </div>
                )}
            </div>
            <CalculatorInfo calculatorId="menstrualCycle" />
        </div>
    );
};
export default CycleCalculator;
