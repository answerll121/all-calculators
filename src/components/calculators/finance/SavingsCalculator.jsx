import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';

const SavingsCalculator = () => {
    const { t } = useTranslation();
    const { symbol } = useCurrency();
    const [monthlyAmount, setMonthlyAmount] = useState(100000);
    const [rate, setRate] = useState(3.0);
    const [months, setMonths] = useState(12);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [monthlyAmount, rate, months]);

    const calculate = (addToHistory) => {
        const principal = monthlyAmount * months;
        const interest = monthlyAmount * (months * (months + 1) / 2) * (rate / 100 / 12);
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
                summary: `${t('calc_savings')}: ${symbol}${new Intl.NumberFormat().format(monthlyAmount)}/mo`,
                result: `${symbol}${formattedResult}`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setMonthlyAmount(100000);
        setRate(3.0);
        setMonths(12);
        setResult(null);
    };



    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_savings')} id="savings" />
            <div className="space-y-4">
                <NumberInput
                    label={t('label_monthly_deposit')}
                    value={monthlyAmount}
                    onChange={setMonthlyAmount}
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

                <button onClick={() => calculate(true)} className="w-full py-5 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-[24px] shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <ResultCard
                        title={t('label_after_tax')}
                        value={result.total}
                        unit={symbol}
                        subText={`${t('label_interest')}: ${result.interest} ${symbol} - ${t('label_tax')}: ${result.tax} ${symbol}`}
                        onReset={handleReset}
                        relatedLinks={[{ label: t('calc_deposit'), url: '/finance' }]}
                    />
                )}
                <HistoryPanel history={history} />
            </div>
        </div>
    );
};
export default SavingsCalculator;
