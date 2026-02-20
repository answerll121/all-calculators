import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const WHRCalculator = () => {
    const { t } = useTranslation();
    const [waist, setWaist] = useState(80);
    const [hip, setHip] = useState(90);
    const [gender, setGender] = useState('male');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const whr = waist / hip;
        let risk = 'Low';

        if (gender === 'male') {
            if (whr >= 0.90) risk = 'Moderate';
            if (whr >= 0.96) risk = 'High';
        } else {
            if (whr >= 0.80) risk = 'Moderate';
            if (whr >= 0.86) risk = 'High';
        }

        setResult({ ratio: whr.toFixed(2), risk });
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_whr')} id="whr" />
            <div className="space-y-4">
                <div className="flex gap-4">
                    <label className="flex items-center"><input type="radio" name="whr_gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="mr-2" /> {t('gender_male')}</label>
                    <label className="flex items-center"><input type="radio" name="whr_gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="mr-2" /> {t('gender_female')}</label>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_waist')}</label>
                        <input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_hip')}</label>
                        <input type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold rounded-[24px] shadow-lg shadow-violet-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="font-bold text-xl text-blue-600 dark:text-blue-400">Ratio: {result.ratio}</p>
                        <p className={`text-sm font-semibold ${result.risk === 'High' ? 'text-red-500' : 'text-green-500'}`}>Risk: {result.risk}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default WHRCalculator;
