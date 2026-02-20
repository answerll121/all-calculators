import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const CookingConverter = () => {
    const { t } = useTranslation();
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('tbsp');
    const [result, setResult] = useState('');

    const units = {
        tsp: 5,
        tbsp: 15,
        cup: 200, // Korean/Japanese/Metric Cup commonly 200ml
        oz: 29.5735
    };

    const convert = (val, u) => {
        if (!val) return '';
        const ml = parseFloat(val) * units[u];
        return ml.toFixed(1);
    };

    const handleChange = (val, u) => {
        setAmount(val);
        setUnit(u);
        setResult(convert(val, u));
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_cooking')} id="cooking" />
            <p className="text-sm text-gray-500 mb-6">{t('label_cooking_note')}</p>

            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('label_quantity')}
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => handleChange(e.target.value, unit)}
                            className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('category_unit')}
                        </label>
                        <select
                            value={unit}
                            onChange={(e) => handleChange(amount, e.target.value)}
                            className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white appearance-none cursor-pointer"
                        >
                            <option value="tsp">tsp (5ml)</option>
                            <option value="tbsp">tbsp (15ml)</option>
                            <option value="cup">Cup (200ml)</option>
                            <option value="oz">oz (30ml)</option>
                        </select>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-[24px] text-center">
                        <p className="text-sm text-amber-600 dark:text-amber-400 mb-1">{t('label_converted')}</p>
                        <p className="text-3xl font-bold text-amber-800 dark:text-amber-300">
                            {result} <span className="text-lg font-normal text-amber-600 dark:text-amber-400">ml</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookingConverter;
