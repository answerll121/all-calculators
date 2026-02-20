import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';

const FinancialChart = React.lazy(() => import('../../common/FinancialChart'));

const CompoundInterestCalculator = () => {
    const { t } = useTranslation();
    const { symbol, formatAmount } = useCurrency();
    const [mode, setMode] = useState('lump'); // 'lump' or 'accum'
    const [principal, setPrincipal] = useState(10000000);
    const [monthlyDeposit, setMonthlyDeposit] = useState(100000);
    const [rate, setRate] = useState(5);
    const [period, setPeriod] = useState(12);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        calculate(false);
    }, [mode, principal, monthlyDeposit, rate, period]);

    const calculate = (addToHistory) => {
        const r = rate / 100 / 12; // Monthly rate
        const n = parseFloat(period) || 0; // Total months
        const p = parseFloat(principal) || 0;
        const pmt = parseFloat(monthlyDeposit) || 0;

        let finalAmount = 0;
        let totalPrincipal = 0;
        const labels = [];
        const dataTotal = [];
        const dataPrincipal = [];

        // Generate data points (e.g., every year or every month depending on length)
        const step = n > 24 ? 12 : 1; // Plot yearly if > 2 years, else monthly

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
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: t('label_total_balance'),
                    data: dataTotal,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: t('label_principal'),
                    data: dataPrincipal,
                    borderColor: 'rgb(156, 163, 175)',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ]
        });


        if (addToHistory && resAmount > 0) {
            setHistory(prev => [{
                summary: `${t('calc_compound')} (${mode === 'lump' ? t('mode_lump') : t('mode_accum')})`,
                result: `${symbol}${new Intl.NumberFormat().format(resAmount)}`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setPrincipal(10000000);
        setMonthlyDeposit(100000);
        setRate(5);
        setPeriod(12);
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ' + formatAmount(context.parsed.y, true);
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return formatAmount(value, true);
                    }
                }
            }
        }
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
                                label={t('label_monthly_deposit')}
                                value={monthlyDeposit}
                                onChange={setMonthlyDeposit}
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
                                label={t('label_period')}
                                value={period}
                                onChange={setPeriod}
                                unit={t('units.mo')}
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
                            <div className="h-64 bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4">
                                <React.Suspense fallback={<div className="h-full flex items-center justify-center text-gray-400">Loading Chart...</div>}>
                                    <FinancialChart options={chartOptions} data={chartData} />
                                </React.Suspense>
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
