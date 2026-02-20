import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const IdealWeightCalculator = () => {
    const { t } = useTranslation();
    const [height, setHeight] = useState(170);
    const [gender, setGender] = useState('male');
    const [result, setResult] = useState(null);

    const calculate = () => {
        // Broca's Index (Modified)
        // Male: (Height - 100) * 0.9
        // Female: (Height - 100) * 0.85
        let ideal = 0;
        if (gender === 'male') ideal = (height - 100) * 0.9;
        else ideal = (height - 100) * 0.85;

        setResult(ideal.toFixed(1));
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_ideal_weight')} id="ideal" />
            <div className="space-y-4">
                <div className="flex gap-4">
                    <label className="flex items-center"><input type="radio" name="iw_gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="mr-2" /> {t('gender_male')}</label>
                    <label className="flex items-center"><input type="radio" name="iw_gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="mr-2" /> {t('gender_female')}</label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_height_cm')}</label>
                    <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-[24px] shadow-lg shadow-pink-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{result} kg</p>
                        <p className="text-xs text-gray-500">Ideal Weight</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default IdealWeightCalculator;
