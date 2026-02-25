import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { Activity, Apple, Scale, Ruler } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MacroCalculator = () => {
    const { t } = useTranslation();

    // State
    const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' or 'imperial'
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(30);
    const [height, setHeight] = useState(175); // cm
    const [weight, setWeight] = useState(70); // kg
    const [activityLevel, setActivityLevel] = useState(1.375);
    const [goal, setGoal] = useState('maintain'); // lose, maintain, gain

    // Imperial Inputs
    const [heightFt, setHeightFt] = useState(5);
    const [heightIn, setHeightIn] = useState(9);
    const [weightLb, setWeightLb] = useState(154);

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);

    // Sync units
    useEffect(() => {
        if (unitSystem === 'metric') {
            // Convert Imp -> Met
            setHeight(Math.round((heightFt * 30.48) + (heightIn * 2.54)));
            setWeight(Math.round(weightLb * 0.453592));
        } else {
            // Convert Met -> Imp
            const totalInches = height / 2.54;
            setHeightFt(Math.floor(totalInches / 12));
            setHeightIn(Math.round(totalInches % 12));
            setWeightLb(Math.round(weight * 2.20462));
        }
    }, [unitSystem]);

    const calculateMacros = () => {
        // Mifflin-St Jeor Equation
        // Men: 10W + 6.25H - 5A + 5
        // Women: 10W + 6.25H - 5A - 161

        // Ensure metric values for formula
        let w = weight;
        let h = height;
        if (unitSystem === 'imperial') {
            w = weightLb * 0.453592;
            h = (heightFt * 12 + heightIn) * 2.54;
        }

        let bmr = (10 * w) + (6.25 * h) - (5 * age);
        if (gender === 'male') bmr += 5;
        else bmr -= 161;

        let tdee = bmr * parseFloat(activityLevel);

        // Adjust for Goal
        let targetCalories = tdee;
        if (goal === 'lose') targetCalories -= 500;
        else if (goal === 'gain') targetCalories += 500;

        // Macro Split (Standard Balanced: 50% Carb, 20% Pro, 30% Fat for now, or adjustable?)
        // Let's use standard ratios:
        // Carb: 45-65% (Use 50%)
        // Protein: 10-35% (Use 25%)
        // Fat: 20-35% (Use 25%)

        // Better for "Diet":
        // Lose: High Protein? let's stick to balanced 40/30/30 or 50/25/25

        let ratio = { c: 0.5, p: 0.25, f: 0.25 };
        if (goal === 'lose') ratio = { c: 0.4, p: 0.35, f: 0.25 }; // Higher protein for cutting
        if (goal === 'gain') ratio = { c: 0.55, p: 0.25, f: 0.20 }; // Higher carb for bulking

        const carbs = Math.round((targetCalories * ratio.c) / 4);
        const protein = Math.round((targetCalories * ratio.p) / 4);
        const fat = Math.round((targetCalories * ratio.f) / 9);

        setResult({
            calories: Math.round(targetCalories),
            carbs,
            protein,
            fat,
            bmr: Math.round(bmr),
            tdee: Math.round(tdee)
        });

        setChartData({
            labels: [t('label_carbs'), t('label_protein'), t('label_fat')],
            datasets: [
                {
                    data: [carbs * 4, protein * 4, fat * 9], // In Calories for chart representation
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                    ],
                    borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(245, 158, 11, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        });
    };

    useEffect(() => {
        calculateMacros();
    }, [gender, age, height, weight, heightFt, heightIn, weightLb, activityLevel, goal, unitSystem]);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_macro')} id="macro" icon={<Apple className="text-green-500" />} />

            <div className="space-y-6 mt-6">
                {/* Unit Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                    <button onClick={() => setUnitSystem('metric')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${unitSystem === 'metric' ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}>Metric (kg/cm)</button>
                    <button onClick={() => setUnitSystem('imperial')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${unitSystem === 'imperial' ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}>Imperial (lb/ft)</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                            <button onClick={() => setGender('male')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${gender === 'male' ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}>{t('gender_men')}</button>
                            <button onClick={() => setGender('female')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${gender === 'female' ? 'bg-white dark:bg-gray-600 shadow text-pink-600' : 'text-gray-500'}`}>{t('gender_women')}</button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_age')}</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {unitSystem === 'metric' ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_height')} (cm)</label>
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_weight')} (kg)</label>
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_height')} (ft)</label>
                                        <input
                                            type="number"
                                            value={heightFt}
                                            onChange={(e) => setHeightFt(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">(in)</label>
                                        <input
                                            type="number"
                                            value={heightIn}
                                            onChange={(e) => setHeightIn(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_weight')} (lb)</label>
                                    <input
                                        type="number"
                                        value={weightLb}
                                        onChange={(e) => setWeightLb(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_activity')}</label>
                            <select
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="1.2">{t('activity_sedentary')}</option>
                                <option value="1.375">{t('activity_light')}</option>
                                <option value="1.55">{t('activity_moderate')}</option>
                                <option value="1.725">{t('activity_active')}</option>
                                <option value="1.9">{t('activity_very_active')}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_goal')}</label>
                            <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="lose">{t('goal_lose')}</option>
                                <option value="maintain">{t('goal_maintain')}</option>
                                <option value="gain">{t('goal_gain')}</option>
                            </select>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl flex flex-col items-center justify-center">
                        {result && (
                            <div className="text-center w-full">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('label_daily_calories')}</p>
                                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                    {result.calories.toLocaleString()} kcal
                                </p>

                                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-6">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <p className="font-bold text-blue-600">{t('label_carbs')}</p>
                                        <p>{result.carbs}g</p>
                                    </div>
                                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <p className="font-bold text-green-600">{t('label_protein')}</p>
                                        <p>{result.protein}g</p>
                                    </div>
                                    <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                        <p className="font-bold text-yellow-600">{t('label_fat')}</p>
                                        <p>{result.fat}g</p>
                                    </div>
                                </div>

                                <div className="h-40 w-full flex justify-center">
                                    {chartData && <Pie data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    {t('msg_health_disclaimer')}
                </p>
            </div>
            <CalculatorInfo calculatorId="macro" />
        </div>
    );
};

export default MacroCalculator;
