import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { useCurrency } from '../../../context/CurrencyContext';
import { Coffee, Users, DollarSign, Percent } from 'lucide-react';

const TipCalculator = () => {
    const { t } = useTranslation();
    const { formatAmount } = useCurrency();

    const [billAmount, setBillAmount] = useState(50);
    const [tipPercent, setTipPercent] = useState(18);
    const [splitCount, setSplitCount] = useState(1);

    const [result, setResult] = useState(null);

    const calculateTip = () => {
        const bill = parseFloat(billAmount);
        const tip = bill * (parseFloat(tipPercent) / 100);
        const total = bill + tip;
        const perPerson = total / parseInt(splitCount);

        setResult({
            tip,
            total,
            perPerson
        });
    };

    useEffect(() => {
        calculateTip();
    }, [billAmount, tipPercent, splitCount]);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_tip')} id="tip" icon={<Coffee className="text-indigo-500" />} />

            <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_bill_amount')}</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={billAmount}
                                    onChange={(e) => setBillAmount(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('label_tip_percent')}</label>
                            <div className="grid grid-cols-4 gap-2 mb-2">
                                {[15, 18, 20, 25].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setTipPercent(p)}
                                        className={`py-2 rounded-lg text-sm font-bold transition-all ${tipPercent === p ? 'bg-indigo-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                    >
                                        {p}%
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={tipPercent}
                                    onChange={(e) => setTipPercent(e.target.value)}
                                    placeholder="Custom %"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('label_split_count')}</label>
                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{splitCount} {t('label_people')}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >-</button>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={splitCount}
                                    onChange={(e) => setSplitCount(e.target.value)}
                                    className="flex-1 accent-indigo-500"
                                />
                                <button
                                    onClick={() => setSplitCount(parseInt(splitCount) + 1)}
                                    className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                                >+</button>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl flex flex-col justify-center">
                        {result && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <p className="text-sm text-indigo-600 dark:text-indigo-300 mb-1 font-medium">{t('label_per_person')}</p>
                                    <p className="text-5xl font-bold text-indigo-900 dark:text-indigo-100">
                                        {formatAmount(result.perPerson)}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-indigo-200 dark:border-indigo-800">
                                    <div>
                                        <p className="text-xs text-indigo-500 dark:text-indigo-400">{t('label_tip_amount')}</p>
                                        <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{formatAmount(result.tip)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-indigo-500 dark:text-indigo-400">{t('label_total_bill')}</p>
                                        <p className="text-lg font-bold text-indigo-900 dark:text-white">{formatAmount(result.total)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <CalculatorInfo calculatorId="tip" />
        </div>
    );
};

export default TipCalculator;
