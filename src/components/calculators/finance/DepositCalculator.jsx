import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';

const DepositCalculator = () => {
    const { t } = useTranslation();
    const { symbol } = useCurrency();
    const [principal, setPrincipal] = useState(10000000);
    const [rate, setRate] = useState(3.5);
    const [months, setMonths] = useState(12);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [principal, rate, months]);

    const calculate = (addToHistory) => {
        const interest = principal * (rate / 100) * (months / 12);
        const tax = interest * 0.154;
        const afterTax = principal + interest - tax;

        const formattedResult = new Intl.NumberFormat().format(Math.round(afterTax));

        setResult({
            total: formattedResult,
            interest: new Intl.NumberFormat().format(Math.round(interest)),
            tax: new Intl.NumberFormat().format(Math.round(tax))
        });

        if (addToHistory) {
            setHistory(prev => [{
                summary: `${t('calc_deposit')}: ${symbol}${new Intl.NumberFormat().format(principal)}`,
                result: `${symbol}${formattedResult}`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setPrincipal(10000000);
        setRate(3.5);
        setMonths(12);
    };



    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_deposit')} id="deposit" />
            <div className="space-y-4">
                <NumberInput
                    label={t('label_principal')}
                    value={principal}
                    onChange={setPrincipal}
                    unit={symbol}
                />
                <div className="flex gap-4">
                    <NumberInput
                        label={t('label_rate')}
                        value={rate}
                        onChange={setRate}
                        unit="%"
                        step={0.1}
                    />
                    <NumberInput
                        label={t('label_period')}
                        value={months}
                        onChange={setMonths}
                        unit={t('units.mo')}
                    />
                </div>

                <button onClick={() => calculate(true)} className="w-full py-5 md:py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold rounded-[24px] shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <ResultCard
                        title={t('label_after_tax')}
                        value={result.total}
                        unit={symbol}
                        subText={`${t('label_interest')}: ${result.interest} - ${t('label_tax')}: ${result.tax}`}
                        onReset={handleReset}
                        relatedLinks={[{ label: t('calc_savings'), url: '/finance' }]}
                    />
                )}
                <HistoryPanel history={history} />
            </div>
        </div>
    );
};
export default DepositCalculator;
