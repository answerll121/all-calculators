import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, Scale, Ruler } from 'lucide-react';
import CalculatorTitle from '../../common/CalculatorTitle';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';

const TdeeCalculator = () => {
    const { t } = useTranslation();
    const [unit, setUnit] = useState('metric'); // metric, imperial
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(30);
    const [height, setHeight] = useState(175);
    const [weight, setWeight] = useState(70);
    const [activity, setActivity] = useState(1.2);

    // Imperial inputs
    const [feet, setFeet] = useState(5);
    const [inches, setInches] = useState(9);
    const [weightLb, setWeightLb] = useState(154);

    const [tdee, setTdee] = useState(0);
    const [bmr, setBmr] = useState(0);

    useEffect(() => {
        calculate();
    }, [unit, gender, age, height, weight, activity, feet, inches, weightLb]);

    const calculate = () => {
        let h = parseFloat(height);
        let w = parseFloat(weight);
        const a = parseFloat(age);

        if (unit === 'imperial') {
            h = (parseFloat(feet) * 30.48) + (parseFloat(inches) * 2.54);
            w = parseFloat(weightLb) * 0.453592;
        }

        if (h > 0 && w > 0 && a > 0) {
            // Mifflin-St Jeor Equation
            let bmrCalc = (10 * w) + (6.25 * h) - (5 * a);
            bmrCalc += (gender === 'male' ? 5 : -161);

            setBmr(Math.round(bmrCalc));
            setTdee(Math.round(bmrCalc * activity));
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_tdee')} id="tdee" icon={<Activity className="text-rose-500" />} />

            <div className="flex justify-center mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => setUnit('metric')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${unit === 'metric' ? 'bg-white dark:bg-gray-600 shadow text-rose-600 dark:text-rose-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                    >
                        Metric (cm/kg)
                    </button>
                    <button
                        onClick={() => setUnit('imperial')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${unit === 'imperial' ? 'bg-white dark:bg-gray-600 shadow text-rose-600 dark:text-rose-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                    >
                        Imperial (ft/lb)
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={gender === 'male'} onChange={() => setGender('male')} className="w-5 h-5 text-rose-500 max-h-0" />
                                <div className={`px-4 py-2 rounded-xl border ${gender === 'male' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 'border-gray-200 dark:border-gray-600'}`}>
                                    {t('gender_men')}
                                </div>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={gender === 'female'} onChange={() => setGender('female')} className="w-5 h-5 text-rose-500 max-h-0" />
                                <div className={`px-4 py-2 rounded-xl border ${gender === 'female' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 'border-gray-200 dark:border-gray-600'}`}>
                                    {t('gender_women')}
                                </div>
                            </label>
                        </div>

                        <NumberInput
                            label={t('label_age')}
                            value={age}
                            onChange={setAge}
                            unit={t('unit_years')}
                        />

                        {unit === 'metric' ? (
                            <>
                                <NumberInput label={t('label_height')} value={height} onChange={setHeight} unit="cm" icon={<Ruler size={18} />} />
                                <NumberInput label={t('label_weight')} value={weight} onChange={setWeight} unit="kg" icon={<Scale size={18} />} />
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_height')}</label>
                                    <div className="flex gap-2">
                                        <NumberInput value={feet} onChange={setFeet} unit="ft" />
                                        <NumberInput value={inches} onChange={setInches} unit="in" />
                                    </div>
                                </div>
                                <NumberInput label={t('label_weight')} value={weightLb} onChange={setWeightLb} unit="lb" icon={<Scale size={18} />} />
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_activity')}</label>
                            <select
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none"
                            >
                                <option value="1.2">{t('activity_sedentary')}</option>
                                <option value="1.375">{t('activity_light')}</option>
                                <option value="1.55">{t('activity_moderate')}</option>
                                <option value="1.725">{t('activity_active')}</option>
                                <option value="1.9">{t('activity_very_active')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <ResultCard
                            title={t('label_tdee_result')}
                            value={tdee}
                            unit="kcal"
                            subText={t('msg_tdee_desc')}
                            color="text-rose-600 dark:text-rose-400"
                        />
                        <ResultCard
                            title="BMR"
                            value={bmr}
                            unit="kcal"
                            subText={t('msg_bmr_desc')}
                            color="text-gray-600 dark:text-gray-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TdeeCalculator;
