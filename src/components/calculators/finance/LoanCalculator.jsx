import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';
import CalculatorInfo from '../../common/CalculatorInfo';

const LoanCalculator = () => {
    const { t } = useTranslation();
    const { symbol } = useCurrency();
    const [amount, setAmount] = useState(10000000);
    const [rate, setRate] = useState(5.0);
    const [months, setMonths] = useState(12);
    const [repaymentMethod, setRepaymentMethod] = useState('equal_principal_interest');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [amount, rate, months, repaymentMethod]);

    const calculate = (addToHistory) => {
        if (!amount || !rate || !months) return;

        const r = rate / 100 / 12;
        let monthlyPayment = 0;
        let totalPayment = 0;
        let totalInterest = 0;
        let firstMonthPayment = 0;

        if (repaymentMethod === 'equal_principal_interest') {
            monthlyPayment = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
            totalPayment = monthlyPayment * months;
            totalInterest = totalPayment - amount;
            firstMonthPayment = monthlyPayment;
        } else {
            // Equal Principal
            const monthlyPrincipal = amount / months;
            // Total Interest = P * r * (n+1) / 2
            totalInterest = amount * r * (months + 1) / 2;
            totalPayment = amount + totalInterest;
            // First month payment = Principal + Interest on full amount
            firstMonthPayment = monthlyPrincipal + (amount * r);
        }

        const formattedMonthly = new Intl.NumberFormat().format(Math.round(firstMonthPayment));

        setResult({
            monthly: formattedMonthly,
            total: new Intl.NumberFormat().format(Math.round(totalPayment)),
            interest: new Intl.NumberFormat().format(Math.round(totalInterest)),
            isVariable: repaymentMethod === 'equal_principal'
        });

        if (addToHistory) {
            setHistory(prev => [{
                summary: `${t('calc_loan')} (${t(`method_${repaymentMethod}`)})`,
                result: `${symbol}${formattedMonthly} / mo`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setAmount(10000000);
        setRate(5.0);
        setMonths(12);
        setRepaymentMethod('equal_principal_interest');
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_loan')} id="loan" />
            <div className="space-y-4">
                {/* Repayment Method Selector */}
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                    <button
                        onClick={() => setRepaymentMethod('equal_principal_interest')}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${repaymentMethod === 'equal_principal_interest'
                            ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                    >
                        {t('method_equal_principal_interest')}
                    </button>
                    <button
                        onClick={() => setRepaymentMethod('equal_principal')}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${repaymentMethod === 'equal_principal'
                            ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                    >
                        {t('method_equal_principal')}
                    </button>
                </div>

                <NumberInput
                    label={t('label_principal')}
                    value={amount}
                    onChange={setAmount}
                    unit={symbol}
                />
                <div className="flex gap-4">
                    <NumberInput
                        label={t('label_rate')}
                        value={rate}
                        onChange={setRate}
                        unit="%"
                        step={0.1}
                        max={100}
                    />
                    <NumberInput
                        label={t('label_period')}
                        value={months}
                        onChange={setMonths}
                        unit={t('units.mo')}
                    />
                </div>

                <button
                    onClick={() => calculate(true)}
                    className="w-full py-5 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-[24px] shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    {t('label_calculate')}
                </button>

                {result && (
                    <ResultCard
                        title={result.isVariable ? t('label_first_month_payment') : t('label_monthly_payment')}
                        value={result.monthly}
                        unit={symbol}
                        subText={`${t('label_total_interest')}: ${result.interest} ${symbol}`}
                        onReset={handleReset}
                        relatedLinks={[{ label: t('calc_salary'), url: '/finance' }]}
                    />
                )}

                <HistoryPanel history={history} />
            </div>

            <CalculatorInfo id="loan" title={t('calc_loan')} />
        </div>
    );
};
export default LoanCalculator;
