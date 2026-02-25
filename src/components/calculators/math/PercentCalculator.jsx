import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';

const PercentCalculator = () => {
    const { t } = useTranslation();
    const [val1, setVal1] = useState(100);
    const [val2, setVal2] = useState(20);
    const [mode, setMode] = useState('percent_of');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [val1, val2, mode]);

    const calculate = (addToHistory) => {
        if (val1 === '' || val2 === '') return;

        let res = 0;
        let summary = '';

        if (mode === 'percent_of') {
            res = val2 * (val1 / 100);
            summary = t('summary_percent_of', { val1, val2 });
        }
        if (mode === 'what_percent') {
            if (val2 === 0) return;
            res = (val1 / val2) * 100;
            summary = t('summary_what_percent', { val1, val2 });
        }
        if (mode === 'increase') {
            if (val1 === 0) return;
            res = ((val2 - val1) / val1) * 100;
            summary = t('summary_increase', { val1, val2 });
        }

        const formattedRes = res.toFixed(2);
        setResult(formattedRes);

        if (addToHistory) {
            setHistory(prev => [{
                summary,
                result: formattedRes
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setVal1(100);
        setVal2(20);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_percent')} id="percent" />
            <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        <option value="percent_of">{t('mode_percent_of')}</option>
                        <option value="what_percent">{t('mode_what_percent')}</option>
                        <option value="increase">{t('mode_increase')}</option>
                    </select>
                </div>

                <div className="flex gap-4">
                    <NumberInput label="X" value={val1} onChange={setVal1} />
                    <NumberInput label="Y" value={val2} onChange={setVal2} />
                </div>

                <button onClick={() => calculate(true)} className="w-full py-5 md:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-[24px] shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <ResultCard
                        title={t('label_result')}
                        value={result}
                        unit={mode !== 'percent_of' ? '%' : ''}
                        onReset={handleReset}
                    />
                )}
                <HistoryPanel history={history} />
            </div>
            <CalculatorInfo calculatorId="percent" />
        </div>
    );
};
export default PercentCalculator;
