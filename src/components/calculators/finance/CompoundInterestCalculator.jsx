import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';

import AssetChart from '../../common/AssetChart'; const CompoundInterestCalculator = () => {
    const { t } = useTranslation();
    const { symbol, formatAmount } = useCurrency();
    const [mode, setMode] = useState('lump'); // 'lump' or 'accum'
    const [periodType, setPeriodType] = useState('monthly'); // 'monthly' or 'yearly'
    const [principal, setPrincipal] = useState(10000000);
    const [depositAmount, setDepositAmount] = useState(100000);
    const [rate, setRate] = useState(5);
    const [period, setPeriod] = useState(12);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        calculate(false);
    }, [mode, periodType, principal, depositAmount, rate, period]);

    const calculate = (addToHistory) => {
        const isMonthly = periodType === 'monthly';
        const r = isMonthly ? (rate / 100 / 12) : (rate / 100);
        const n = parseFloat(period) || 0; // Total periods
        const p = parseFloat(principal) || 0;
        const pmt = parseFloat(depositAmount) || 0;

        let finalAmount = 0;
        let totalPrincipal = 0;
        const labels = [];
        const dataTotal = [];
        const dataPrincipal = [];

        // Generate data points (e.g., every year or every month depending on length)
        const step = isMonthly ? (n > 24 ? 12 : 1) : 1;

        for (let i = 0; i <= n; i += step) {
            let fv = 0;
            let tp = 0;

            if (mode === 'lump') {
                fv = p * Math.pow(1 + r, i);
                tp = p;
            } else {
                const fvPrincipal = p * Math.pow(1 + r, i);
                const fvSeries = pmt * ((Math.pow(1 + r, i) - 1) / r);
                fv = fvPrincipal + (r === 0 ? pmt * i : fvSeries); // Handle 0 interest case
                tp = p + (pmt * i);
            }

            labels.push(i);
            dataTotal.push(fv);
            dataPrincipal.push(tp);

            // Capture final exact value on last loop
            if (i + step > n && i !== n) {
                // Logic simplified: loop covers most.
            }
        }

        // Final Calculation Exact
        if (mode === 'lump') {
            finalAmount = p * Math.pow(1 + r, n);
            totalPrincipal = p;
        } else {
            const fvPrincipal = p * Math.pow(1 + r, n);
            const fvSeries = pmt * ((Math.pow(1 + r, n) - 1) / r);
            finalAmount = fvPrincipal + (r === 0 ? pmt * n : fvSeries);
            totalPrincipal = p + (pmt * n);
        }

        const totalInterest = finalAmount - totalPrincipal;

        const resAmount = Math.round(finalAmount);
        const resInterest = Math.round(totalInterest);
        const resPrincipal = Math.round(totalPrincipal);

        setResult({
            amount: formatAmount(resAmount),
            interest: formatAmount(resInterest),
            principal: formatAmount(resPrincipal)
        });

        // Chart Data
        setChartData(labels.map((lbl, idx) => ({
            name: isMonthly ? (n > 24 ? `${lbl}M` : `${lbl}M`) : `${lbl}Y`,
            total: dataTotal[idx],
            interest: dataTotal[idx] - dataPrincipal[idx],
            principal: dataPrincipal[idx]
        })));


        if (addToHistory && resAmount > 0) {
            setHistory(prev => [{
                summary: `${t('calc_compound')} (${mode === 'lump' ? t('mode_lump') : t('mode_accum')})`,
                result: `${symbol}${new Intl.NumberFormat().format(resAmount)}`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setPrincipal(10000000);
        setDepositAmount(100000);
        setRate(5);
        setPeriod(12);
    };


    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_compound')} id="compound" />

            <div className="flex p-1 mb-8 bg-gray-100 dark:bg-gray-900/50 rounded-[20px] relative">
                <button
                    onClick={() => setMode('lump')}
                    className={`flex-1 py-3 rounded-[16px] text-sm font-semibold transition-all duration-300 ${mode === 'lump' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    {t('mode_lump')}
                </button>
                <button
                    onClick={() => setMode('accum')}
                    className={`flex-1 py-3 rounded-[16px] text-sm font-semibold transition-all duration-300 ${mode === 'accum' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    {t('mode_accum')}
                </button>
            </div>

            <div className="flex p-1 mb-8 bg-gray-100 dark:bg-gray-900/50 rounded-[20px] relative">
                <button
                    onClick={() => setPeriodType('monthly')}
                    className={`flex-1 py-3 rounded-[16px] text-sm font-semibold transition-all duration-300 ${periodType === 'monthly' ? 'bg-white dark:bg-gray-700 shadow-sm text-teal-600 dark:text-teal-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    {t('freq_monthly', '월 단위 (Monthly)')}
                </button>
                <button
                    onClick={() => setPeriodType('yearly')}
                    className={`flex-1 py-3 rounded-[16px] text-sm font-semibold transition-all duration-300 ${periodType === 'yearly' ? 'bg-white dark:bg-gray-700 shadow-sm text-teal-600 dark:text-teal-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    {t('freq_yearly', '년 단위 (Yearly)')}
                </button>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <NumberInput
                            label={t('label_principal')}
                            value={principal}
                            onChange={setPrincipal}
                            unit={symbol}
                        />

                        {mode === 'accum' && (
                            <NumberInput
                                label={periodType === 'monthly' ? t('label_monthly_deposit', 'Monthly Deposit') : t('label_yearly_deposit', 'Yearly Deposit')}
                                value={depositAmount}
                                onChange={setDepositAmount}
                                unit={symbol}
                            />
                        )}

                        <div className="flex gap-4">
                            <NumberInput
                                label={t('label_rate')}
                                value={rate}
                                onChange={setRate}
                                step={0.1}
                                max={100}
                                unit="%"
                            />
                            <NumberInput
                                label={periodType === 'monthly' ? t('label_period_months', '기간 (개월)') : t('label_period_years', '기간 (년)')}
                                value={period}
                                onChange={setPeriod}
                                unit={periodType === 'monthly' ? t('units.mo') : t('units.yr')}
                            />
                        </div>

                        <button
                            onClick={() => calculate(true)}
                            className="w-full py-5 md:py-4 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-bold rounded-[24px] shadow-lg shadow-lime-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                            {t('label_calculate')}
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {result && (
                            <ResultCard
                                title={t('label_final_amount')}
                                value={result.amount}
                                unit=""
                                subText={`${t('label_principal')}: ${result.principal} + ${t('label_interest')}: ${result.interest}`}
                                onReset={handleReset}
                            />
                        )}
                        {chartData && (
                            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4">
                                <AssetChart
                                    data={chartData}
                                    type="stacked-bar"
                                    dataKeys={[
                                        { key: 'principal', name: t('label_principal'), color: '#3b82f6' },
                                        { key: 'interest', name: t('label_interest'), color: '#10b981' }
                                    ]}
                                    valueFormatter={(val, isAxis) => formatAmount(val, isAxis)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <HistoryPanel history={history} />
            </div>
        </div>
    );
};
export default CompoundInterestCalculator;
