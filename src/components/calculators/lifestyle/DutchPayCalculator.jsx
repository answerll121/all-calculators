import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorTitle from '../../common/CalculatorTitle';

const DutchPayCalculator = () => {
    const { t } = useTranslation();
    const [price, setPrice] = useState('');
    const [delivery, setDelivery] = useState('');
    const [people, setPeople] = useState(2);
    const [result, setResult] = useState(0);

    useEffect(() => {
        const p = parseFloat(price) || 0;
        const d = parseFloat(delivery) || 0;
        const count = parseInt(people) || 1;

        if (count > 0) {
            setResult((p + d) / count);
        }
    }, [price, delivery, people]);

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_dutch')} id="dutch" />

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_total_price')}
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0"
                        className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_delivery_fee')}
                    </label>
                    <input
                        type="number"
                        value={delivery}
                        onChange={(e) => setDelivery(e.target.value)}
                        placeholder="0"
                        className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_people_count')}
                    </label>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setPeople(Math.max(1, people - 1))}
                            className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-xl font-bold transition-colors"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={people}
                            onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
                            className="flex-1 text-center py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg font-bold outline-none dark:text-white"
                        />
                        <button
                            onClick={() => setPeople(people + 1)}
                            className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-xl font-bold transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[28px] text-white shadow-lg text-center">
                        <p className="text-sm opacity-90 mb-1">{t('label_price_per_person')}</p>
                        <p className="text-3xl font-bold">
                            {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(result)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DutchPayCalculator;
