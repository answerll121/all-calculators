import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

import CalculatorInfo from '../../CalculatorInfo';

const DateCalculator = () => {
    const { t } = useTranslation();
    const [baseDate, setBaseDate] = useState(new Date().toISOString().split('T')[0]);

    const calculateDDay = (target) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const targetDate = new Date(target);
        targetDate.setHours(0, 0, 0, 0);

        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    };

    const calculateAnniversary = (days) => {
        const date = new Date(baseDate);
        date.setDate(date.getDate() + (days - 1)); // -1 because base date is Day 1
        return date.toISOString().split('T')[0];
    };

    const dDay = calculateDDay(baseDate);
    const dDayString = dDay === 0 ? 'D-Day' : dDay > 0 ? `D-${dDay}` : `D+${Math.abs(dDay)}`;

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_date')} id="date" />

            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_base_date')}
                    </label>
                    <input
                        type="date"
                        value={baseDate}
                        onChange={(e) => setBaseDate(e.target.value)}
                        className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
                    />
                </div>

                {/* D-Day Result */}
                <div className="flex gap-4">
                    <div className="flex-1 p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[24px] text-white shadow-lg text-center">
                        <p className="text-sm opacity-80 mb-1">{t('label_d_day')}</p>
                        <p className="text-4xl font-bold">{dDayString}</p>
                    </div>
                </div>

                {/* Anniversary List */}
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                        {t('label_anniversary_list')}
                    </h4>
                    <div className="space-y-3">
                        {[100, 200, 300, 365, 1000].map((days) => {
                            const date = calculateAnniversary(days);
                            const label = days === 365 ? t('label_1year') : `${days}${t('label_days')}`;
                            return (
                                <div key={days} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-[20px]">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">{label}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{date}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <CalculatorInfo calculatorId="date" />
        </div>
    );
};

export default DateCalculator;
