import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { useCurrency } from '../../../context/CurrencyContext';
import { DollarSign, Percent, TrendingUp, Clock, Scale } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RothIraCalculator = () => {
    const { t } = useTranslation();
    const { formatAmount } = useCurrency();

    const [contribution, setContribution] = useState(6500);
    const [currentTaxRate, setCurrentTaxRate] = useState(24);
    const [retireTaxRate, setRetireTaxRate] = useState(15);
    const [years, setYears] = useState(30);
    const [annualReturn, setAnnualReturn] = useState(7);

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);

    const calculateIra = () => {
        const principal = parseFloat(contribution);
        const r = parseFloat(annualReturn) / 100;
        const n = parseInt(years);

        // Roth: Taxed NOW, grows tax-free
        const rothEffectivePrincipal = principal * (1 - (parseFloat(currentTaxRate) / 100)); // Assuming contribution is gross and taxed before deposit?
        // Actually, usually you contribute post-tax money to Roth. 
        // If we compare "same gross income impact":
        // Traditional: Invest $X (Pre-tax) -> Grow -> Tax on withdrawal
        // Roth: Pay tax on $X -> Invest remaining -> Grow -> Tax free

        const grossAmount = principal / (1 - (parseFloat(currentTaxRate) / 100)); // If user inputs "Take home contribution", this logic gets complex.
        // Let's stick to: "Gross Amount Available to Invest" strategy for fair comparison?
        // Or "Contribution Amount" is the literal amount going into the account.
        // If I put $6500 into Roth, I needed ~$8500 gross.
        // If I put $6500 into Trad, I need $6500 gross (and have $2000 extra tax savings now).
        // Let's assume input is "Amount to Contribute" to the account.

        // Scenario A: Contribute $X to Traditional. Balance = X * (1+r)^t. After tax = Balance * (1 - futureTax).
        // Scenario B: Contribute $X to Roth. Balance = X * (1+r)^t. After tax = Balance.
        // BUT, Scenario B costs more today.

        // To make it simple and standard: Calculate Future Value of this Specific Amount.
        // Traditional After-Tax Value = FV * (1 - retireTax)
        // Roth After-Tax Value = FV * (1)  (Assuming this amount was already post-tax or we ignore the opportunity cost difference for this simple calc)
        // WAIT. If I have $6500 cash to invest vs $6500 pre-tax. They are different.

        // Better Logic for calculator: "Gross Income Allocation"
        // User inputs: "Gross amount to allocate".
        // Trad: Invests full amount.
        // Roth: Invests amount * (1 - currentTax).

        // Let's try that.
        // Input: "Annual Contribution (Pre-tax equivalent)"

        const grossContribution = parseFloat(contribution);

        // Traditional
        // Invests full gross (tax deferred)
        const tradPrincipal = grossContribution * n; // sum of contributions
        // Simple FV for annual contributions: PMT * (((1 + r)^n - 1) / r)
        const tradFV = grossContribution * (((Math.pow(1 + r, n)) - 1) / r); // Future Value (Pre-tax)
        const tradAfterTax = tradFV * (1 - (parseFloat(retireTaxRate) / 100));

        // Roth
        // Invests (Gross - CurrentTax)
        const rothContribution = grossContribution * (1 - (parseFloat(currentTaxRate) / 100));
        const rothFV = rothContribution * (((Math.pow(1 + r, n)) - 1) / r); // Future Value (Tax-Free)

        setResult({
            rothFinal: rothFV,
            tradFinal: tradAfterTax,
            difference: Math.abs(rothFV - tradAfterTax),
            winner: rothFV > tradAfterTax ? 'Roth IRA' : 'Traditional IRA'
        });

        setChartData({
            labels: [t('label_roth_ira'), t('label_trad_ira')],
            datasets: [
                {
                    label: t('label_after_tax_value'),
                    data: [rothFV, tradAfterTax],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)', // Blue for Roth
                        'rgba(16, 185, 129, 0.7)', // Green for Trad
                    ],
                    borderRadius: 8,
                },
            ],
        });
    };

    useEffect(() => {
        calculateIra();
    }, [contribution, currentTaxRate, retireTaxRate, years, annualReturn]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
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
                        return formatAmount(value, true);
                    }
                }
            }
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_roth_vs_trad')} id="roth" icon={<Scale className="text-purple-500" />} />

            <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_contribution_gross')}</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={contribution}
                                    onChange={(e) => setContribution(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{t('msg_contribution_note')}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_current_tax_rate')}</label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={currentTaxRate}
                                    onChange={(e) => setCurrentTaxRate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_retirement_tax_rate')}</label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={retireTaxRate}
                                    onChange={(e) => setRetireTaxRate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_years_to_grow')}</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
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
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('label_recommended_option')}</p>
                                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                        {result.winner}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {t('msg_tax_savings')}: {formatAmount(result.difference)}
                                    </p>
                                </div>
                                <div className="h-64 mt-4">
                                    {chartData && <Bar options={chartOptions} data={chartData} />}
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">Roth IRA</p>
                                        <p className="text-sm font-semibold dark:text-gray-200">{formatAmount(result.rothFinal)}</p>
                                    </div>
                                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <p className="text-xs text-green-600 dark:text-green-400 font-bold">Traditional IRA</p>
                                        <p className="text-sm font-semibold dark:text-gray-200">{formatAmount(result.tradFinal)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    {t('msg_financial_disclaimer')}
                </p>
            </div>
            <CalculatorInfo calculatorId="rothIra" />
        </div>
    );
};

export default RothIraCalculator;
