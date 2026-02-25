import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

import CalculatorInfo from '../../CalculatorInfo';

const ChildObesityCalculator = () => {
    const { t } = useTranslation();
    const [age, setAge] = useState(10);
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState(140);
    const [weight, setWeight] = useState(35);
    const [result, setResult] = useState(null);

    const calculate = () => {
        // Simplified Logic: Calculate BMI, then compare to simplified age/gender thresholds
        const hM = height / 100;
        const bmi = weight / (hM * hM);

        // Mock percentiles for demo
        let percentile = 50;
        if (bmi > 18) percentile = 85;
        if (bmi > 21) percentile = 95;
        if (bmi < 15) percentile = 10;

        let status = 'Normal';
        if (percentile >= 95) status = 'Obese';
        else if (percentile >= 85) status = 'Overweight';
        else if (percentile < 5) status = 'Underweight';

        setResult({ bmi: bmi.toFixed(1), percentile, status });
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_child_obesity')} id="child_obesity" />
            <div className="space-y-4">
                <div className="flex gap-4">
                    <label className="flex items-center"><input type="radio" name="co_gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="mr-2" /> {t('gender_male')}</label>
                    <label className="flex items-center"><input type="radio" name="co_gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="mr-2" /> {t('gender_female')}</label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_age_years')} (2-18)</label>
                    <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_height_cm')}</label>
                        <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_weight_kg')}</label>
                        <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-[24px] shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="font-bold text-xl text-blue-600 dark:text-blue-400">BMI: {result.bmi}</p>
                        <p className="text-sm">{t('label_percentile')}: {result.percentile}th</p>
                        <p className={`font-bold ${result.status === 'Obese' ? 'text-red-500' : 'text-green-500'}`}>{result.status}</p>
                    </div>
                )}
            </div>
            <CalculatorInfo calculatorId="childObesity" />
        </div>
    );
};
export default ChildObesityCalculator;
