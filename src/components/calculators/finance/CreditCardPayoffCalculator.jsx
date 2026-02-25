import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { useCurrency } from '../../../context/CurrencyContext';
import { DollarSign, Percent, CreditCard, Calendar } from 'lucide-react';

const CreditCardPayoffCalculator = () => {
    const { t } = useTranslation();
    const { formatAmount } = useCurrency();

    const [balance, setBalance] = useState(5000);
    const [apr, setApr] = useState(18.9);
    const [monthlyPayment, setMonthlyPayment] = useState(200);
    const [result, setResult] = useState(null);

    const calculatePayoff = () => {
        const p = parseFloat(balance);
        const r = parseFloat(apr) / 100 / 12; // Monthly interest rate
        const pmt = parseFloat(monthlyPayment);

        if (p <= 0 || r < 0 || pmt <= 0) return;

        // Check if payment covers interest
        const minInterest = p * r;
        if (pmt <= minInterest) {
            setResult({ isInfinite: true, minPayment: minInterest });
            return;
        }

        // N = -ln(1 - (r * P) / A) / ln(1 + r)
        const n = -Math.log(1 - (r * p) / pmt) / Math.log(1 + r);
        const months = Math.ceil(n);
        const totalPaid = months * pmt; // Approximation, last payment is usually less
        const totalInterest = totalPaid - p;

        // Exact last payment calculation to be precise?
        // Let's stick to approximation for UI simplicity or refine if needed.
        // Actually, let's just use the N * Pmt as "Total Estimated".

        setResult({
            months,
            years: (months / 12).toFixed(1),
            totalPaid,
            totalInterest,
            isInfinite: false
        });
    };

    useEffect(() => {
        calculatePayoff();
    }, [balance, apr, monthlyPayment]);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_cc_payoff')} id="cc_payoff" icon={<CreditCard className="text-red-500" />} />

            <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_cc_balance')}</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_apr')}</label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={apr}
                                    onChange={(e) => setApr(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_monthly_payment')}</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={monthlyPayment}
                                    onChange={(e) => setMonthlyPayment(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl flex flex-col justify-center">
                        {result && (
                            result.isInfinite ? (
                                <div className="text-center text-red-500 font-bold">
                                    {t('msg_payment_too_low')} <br />
                                    Min Interest: {formatAmount(result.minPayment)}
                                </div>
                            ) : (
                                <div className="space-y-6 text-center">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('label_debt_free_in')}</p>
                                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                                            {result.months} {t('time_months')}
                                        </p>
                                        <p className="text-sm text-gray-400">({result.years} {t('time_years')})</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('label_total_interest')}</p>
                                            <p className="text-lg font-semibold text-red-500">{formatAmount(result.totalInterest)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('label_total_paid')}</p>
                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatAmount(result.totalPaid)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    {t('msg_financial_disclaimer')}
                </p>
            </div>
            <CalculatorInfo calculatorId="creditCardPayoff" />
        </div>
    );
};

export default CreditCardPayoffCalculator;
