import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';
import NumberInput from '../../common/NumberInput';

const SeveranceCalculator = () => {
    const { t } = useTranslation();
    const { symbol, currency } = useCurrency();
    const [country, setCountry] = useState('KR');
    const [avgSalary, setAvgSalary] = useState(3000000); // 3-month average
    const [years, setYears] = useState(1);
    const [weeksPerYear, setWeeksPerYear] = useState(2); // US/Other

    const [result, setResult] = useState(null);

    useEffect(() => {
        if (currency === 'KRW') setCountry('KR');
        else if (currency === 'USD') setCountry('US');
        else setCountry('Other');
    }, [currency]);

    const calculate = () => {
        let severance = 0;
        if (country === 'KR') {
            // Statutory: Avg Monthly * Service Years
            // Actually it's Avg Daily Wage * 30 * Years approx, which is Avg Monthly * Years
            severance = avgSalary * years;
        } else {
            // US/Other: Weeks of pay per year * years
            // AvgSalary is Monthly. Weekly = Monthly * 12 / 52
            const weeklyWage = (avgSalary * 12) / 52;
            severance = weeklyWage * weeksPerYear * years;
        }
        setResult(Math.round(severance));
    };



    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_severance')} id="severance" />

            <div className="flex gap-2 mb-4 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                {['KR', 'US', 'Other'].map(c => (
                    <button
                        key={c}
                        onClick={() => setCountry(c)}
                        className={`flex-1 py-1 rounded-lg font-bold text-sm transition-all ${country === c ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        {c === 'KR' ? t('country_kr', { defaultValue: 'Korea' }).split(' ')[0] : c === 'US' ? t('country_us', { defaultValue: 'USA' }).split(' ')[0] : t('rel_other', { defaultValue: 'General' }).split(' ')[0]}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <NumberInput
                    label={t('label_avg_salary')}
                    value={avgSalary}
                    onChange={setAvgSalary}
                    unit={symbol}
                />
                <NumberInput
                    label={t('label_service_years')}
                    value={years}
                    onChange={setYears}
                    unit={t('units.yr')}
                />

                {country !== 'KR' && (
                    <NumberInput
                        label={t('label_weeks_per_year')}
                        value={weeksPerYear}
                        onChange={setWeeksPerYear}
                        unit="Weeks"
                    />
                )}

                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-[24px] shadow-lg shadow-violet-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                        <p className="font-semibold text-lg text-blue-600 dark:text-blue-400">{t('label_estimated_pay')}: {symbol}{result.toLocaleString()}</p>
                    </div>
                )}
            </div>
            <CalculatorInfo calculatorId="severance" />
        </div>
    );
};
export default SeveranceCalculator;
