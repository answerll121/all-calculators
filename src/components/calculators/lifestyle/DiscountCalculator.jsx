import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import CalculatorTitle from '../../common/CalculatorTitle';

const DiscountCalculator = () => {
    const { t } = useTranslation();
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountRate, setDiscountRate] = useState('');
    const [finalPrice, setFinalPrice] = useState(0);
    const [savedAmount, setSavedAmount] = useState(0);

    useEffect(() => {
        const price = parseFloat(originalPrice) || 0;
        const rate = parseFloat(discountRate) || 0;

        const saved = price * (rate / 100);
        const final = price - saved;

        setFinalPrice(final);
        setSavedAmount(saved);
    }, [originalPrice, discountRate]);

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_discount')} id="discount" />

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_original_price')}
                    </label>
                    <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="0"
                        className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_discount_rate')}
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={discountRate}
                            onChange={(e) => setDiscountRate(e.target.value)}
                            placeholder="0"
                            className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
                        />
                        <div className="flex gap-1">
                            {[10, 20, 30].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setDiscountRate(r)}
                                    className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    {r}%
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                    <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-[24px]">
                        <p className="text-sm text-red-600 dark:text-red-400 mb-1">{t('label_final_price')}</p>
                        <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                            {new Intl.NumberFormat('ko-KR').format(finalPrice)}
                        </p>
                    </div>
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-[24px]">
                        <p className="text-sm text-green-600 dark:text-green-400 mb-1">{t('label_saved_amount')}</p>
                        <p className="text-xl font-bold text-green-700 dark:text-green-300">
                            -{new Intl.NumberFormat('ko-KR').format(savedAmount)}
                        </p>
                    </div>
                </div>
            </div>
            <CalculatorInfo calculatorId="discount" />
        </div>
    );
};

export default DiscountCalculator;
