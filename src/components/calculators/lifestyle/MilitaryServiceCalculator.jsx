import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';

const MilitaryServiceCalculator = () => {
    const { t } = useTranslation();
    const [joinDate, setJoinDate] = useState(new Date().toISOString().split('T')[0]);
    const [branch, setBranch] = useState('army');
    const [result, setResult] = useState(null);

    const calculate = () => {
        if (!joinDate) return;

        const start = new Date(joinDate);
        let months = 18;

        switch (branch) {
            case 'army': months = 18; break;
            case 'navy': months = 20; break;
            case 'air': months = 21; break;
            case 'social': months = 21; break;
            default: months = 18;
        }

        const end = new Date(start);
        end.setMonth(start.getMonth() + months);
        // Reduce 1 day because discharge is the day AFTER completing service? 
        // Usually discharge date is the date you leave. Let's keep it simple: Start + months.

        const today = new Date();
        const totalDuration = end - start;
        const elapsed = today - start;

        let percent = (elapsed / totalDuration) * 100;
        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;

        const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

        setResult({
            dischargeDate: end.toISOString().split('T')[0],
            percent: percent.toFixed(1),
            daysLeft: daysLeft > 0 ? daysLeft : 0
        });
    };

    useEffect(() => {
        calculate();
    }, [joinDate, branch]);

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_military')} id="military" />

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_join_date')}
                    </label>
                    <input
                        type="date"
                        value={joinDate}
                        onChange={(e) => setJoinDate(e.target.value)}
                        className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_branch')}
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                        {['army', 'navy', 'air', 'social'].map((b) => (
                            <button
                                key={b}
                                onClick={() => setBranch(b)}
                                className={`py-3 px-4 rounded-[16px] text-sm font-medium transition-all duration-200 border ${branch === b
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                                    }`}
                            >
                                {t(`branch_${b}`)}
                            </button>
                        ))}
                    </div>
                </div>

                {result && (
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-[24px]">
                                <p className="text-sm text-green-600 dark:text-green-400 mb-1">{t('label_discharge_date')}</p>
                                <p className="text-lg font-bold text-green-700 dark:text-green-300">{result.dischargeDate}</p>
                            </div>
                            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-[24px]">
                                <p className="text-sm text-orange-600 dark:text-orange-400 mb-1">{t('label_days_left')}</p>
                                <p className="text-lg font-bold text-orange-700 dark:text-orange-300">{result.daysLeft} {t('label_days')}</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-500">{t('label_service_rate')}</span>
                                <span className="font-bold text-blue-600">{result.percent}%</span>
                            </div>
                            <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                                    style={{ width: `${result.percent}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MilitaryServiceCalculator;
