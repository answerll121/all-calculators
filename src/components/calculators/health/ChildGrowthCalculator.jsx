import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const ChildGrowthCalculator = () => {
    const { t } = useTranslation();
    const [age, setAge] = useState(5);
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState(110);
    const [weight, setWeight] = useState(18);
    const [result, setResult] = useState(null);

    const calculate = () => {
        // Very simplified WHO growth standards (Mock logic)
        // In reality, this needs a large JSON dataset
        const avgHeight = gender === 'male' ? age * 6 + 77 : age * 6 + 76;
        const avgWeight = gender === 'male' ? age * 2 + 8 : age * 2 + 8;

        const hPercent = (height / avgHeight) * 50;
        const wPercent = (weight / avgWeight) * 50;

        setResult({
            heightPercent: Math.min(99, Math.max(1, Math.round(hPercent))),
            weightPercent: Math.min(99, Math.max(1, Math.round(wPercent)))
        });
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_growth')} id="growth" />
            <div className="space-y-4">
                <div className="flex gap-4">
                    <label className="flex items-center"><input type="radio" name="cg_gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="mr-2" /> {t('gender_male')}</label>
                    <label className="flex items-center"><input type="radio" name="cg_gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="mr-2" /> {t('gender_female')}</label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_age_years')}</label>
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
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-bold rounded-[24px] shadow-lg shadow-lime-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm space-y-1">
                        <p>{t('msg_better_height', { percent: result.heightPercent })}</p>
                        <p>{t('msg_heavier_weight', { percent: result.weightPercent })}</p>
                        <p className="text-xs text-gray-400 mt-1">{t('msg_growth_note')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ChildGrowthCalculator;
