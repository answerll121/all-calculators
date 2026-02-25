import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { useCurrency } from '../../../context/CurrencyContext';
import { DollarSign, Percent, TrendingUp, Clock } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Retirement401kCalculator = () => {
    const { t } = useTranslation();
    const { formatAmount, currency } = useCurrency();

    const [currentAge, setCurrentAge] = useState(30);
    const [retireAge, setRetireAge] = useState(65);
    const [currentSalary, setCurrentSalary] = useState(50000);
    const [contributionPercent, setContributionPercent] = useState(10);
    const [employerMatch, setEmployerMatch] = useState(3);
    const [annualReturn, setAnnualReturn] = useState(7);
    const [currentBalance, setCurrentBalance] = useState(0);

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);

    const calculate401k = () => {
        let balance = parseFloat(currentBalance);
        let salary = parseFloat(currentSalary);
        const years = parseInt(retireAge) - parseInt(currentAge);
        const r = parseFloat(annualReturn) / 100;

        let totalPrincipal = parseFloat(currentBalance);
        let totalEmployer = 0;

        const yearlyData = [];
        const labels = [];

        for (let i = 0; i <= years; i++) {
            labels.push(parseInt(currentAge) + i);
            yearlyData.push(balance);

            if (i < years) {
                const userContrib = salary * (parseFloat(contributionPercent) / 100);
                const employerContrib = salary * (parseFloat(employerMatch) / 100);

                const growth = balance * r;

                balance = balance + userContrib + employerContrib + growth;
                totalPrincipal += userContrib;
                totalEmployer += employerContrib;

                // Optional: Salary increase could be added here
            }
        }

        setResult({
            totalBalance: balance,
            totalPrincipal,
            totalEmployer,
            totalInterest: balance - totalPrincipal - totalEmployer,
            years
        });

        generateChart(labels, yearlyData);
    };

    const generateChart = (labels, data) => {
        setChartData({
            labels,
            datasets: [
                {
                    fill: true,
                    label: t('label_balance'),
                    uId: 'balance-graph',
                    data: data,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                },
            ],
        });
    };

    useEffect(() => {
        calculate401k();
    }, [currentAge, retireAge, currentSalary, contributionPercent, employerMatch, annualReturn, currentBalance, currency]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return formatAmount(context.parsed.y);
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return formatAmount(value, true); // Compact format
                    }
                }
            }
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_401k')} id="401k" icon={<TrendingUp className="text-blue-500" />} />

            <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_current_age')}</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={currentAge}
                                    onChange={(e) => setCurrentAge(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_retirement_age')}</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={retireAge}
                                    onChange={(e) => setRetireAge(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_current_salary')}</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={currentSalary}
                                    onChange={(e) => setCurrentSalary(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_current_balance')}</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={currentBalance}
                                    onChange={(e) => setCurrentBalance(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_contribution_percent')}</label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={contributionPercent}
                                    onChange={(e) => setContributionPercent(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_employer_match')}</label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={employerMatch}
                                    onChange={(e) => setEmployerMatch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_annual_return')}</label>
                            <div className="relative">
                                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={annualReturn}
                                    onChange={(e) => setAnnualReturn(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
                        {result && (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('label_total_balance')}</p>
                                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatAmount(result.totalBalance)}</p>
                                </div>
                                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('label_total_principal')}</p>
                                        </div>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">{formatAmount(result.totalPrincipal)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('label_total_employer')}</p>
                                        </div>
                                        <p className="text-base font-semibold text-purple-600 dark:text-purple-400">{formatAmount(result.totalEmployer)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('label_interest')}</p>
                                        </div>
                                        <p className="text-base font-semibold text-green-600 dark:text-green-400">{formatAmount(result.totalInterest)}</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('label_years_to_grow')}</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">{result.years} {t('time_years')}</p>
                                    </div>
                                </div>
                                <div className="h-64 mt-4">
                                    {chartData && <Line options={chartOptions} data={chartData} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    {t('msg_financial_disclaimer')}
                </p>
            </div>
            <CalculatorInfo calculatorId="401k" />
        </div>
    );
};

export default Retirement401kCalculator;
