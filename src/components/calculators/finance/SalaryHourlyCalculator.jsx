import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { DollarSign, Clock } from 'lucide-react';
import CalculatorTitle from '../../common/CalculatorTitle';
import NumberInput from '../../common/NumberInput';
import { useCurrency } from '../../../context/CurrencyContext';

const SalaryHourlyCalculator = () => {
    const { t } = useTranslation();
    const { symbol, formatAmount } = useCurrency();

    const [amount, setAmount] = useState(50000);
    const [period, setPeriod] = useState('year'); // year, month, week, day, hour
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [weeksPerYear, setWeeksPerYear] = useState(52);

    const [results, setResults] = useState(null);

    useEffect(() => {
        calculate();
    }, [amount, period, hoursPerWeek, weeksPerYear]);

    const calculate = () => {
        let annual = 0;
        const val = parseFloat(amount) || 0;
        const hpw = parseFloat(hoursPerWeek) || 40;
        const wpy = parseFloat(weeksPerYear) || 52;

        // Convert input to annual
        switch (period) {
            case 'year': annual = val; break;
            case 'month': annual = val * 12; break;
            case 'week': annual = val * wpy; break;
            case 'day': annual = val * 5 * wpy; break;
            case 'hour': annual = val * hpw * wpy; break;
            default: annual = 0;
        }

        const hourly = annual / (hpw * wpy);

        setResults({
            annual: annual,
            monthly: annual / 12,
            weekly: annual / wpy,
            daily: annual / wpy / 5, // Assuming 5 days
            hourly: hourly
        });
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_salary_hourly')} id="salary_hourly" icon={<DollarSign className="text-green-500" />} />

            <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_amount')}</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none"
                                >
                                    <option value="year">{t('unit_year')}</option>
                                    <option value="month">{t('unit_month')}</option>
                                    <option value="week">{t('unit_week')}</option>
                                    <option value="day">{t('unit_day')}</option>
                                    <option value="hour">{t('unit_hour')}</option>
                                </select>
                            </div>
                        </div>

                        <NumberInput
                            label={t('label_hours_per_week')}
                            value={hoursPerWeek}
                            onChange={setHoursPerWeek}
                            unit={t('unit_hours')}
                            icon={<Clock size={18} />}
                        />
                    </div>

                    {results && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl space-y-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('label_equivalent_earnings')}</h3>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                <span className="text-gray-500 dark:text-gray-400">{t('label_hourly')}</span>
                                <span className="font-bold text-xl text-blue-600 dark:text-blue-400">{formatAmount(results.hourly)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{t('label_daily')}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatAmount(results.daily)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{t('label_weekly')}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatAmount(results.weekly)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{t('label_monthly')}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatAmount(results.monthly)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-t border-gray-200 dark:border-gray-600 pt-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{t('label_annual')}</span>
                                <span className="font-bold text-gray-900 dark:text-white">{formatAmount(results.annual)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <CalculatorInfo calculatorId="salaryHourly" />
        </div>
    );
};

export default SalaryHourlyCalculator;
