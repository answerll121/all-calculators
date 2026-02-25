import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { Wine, AlertTriangle, Info } from 'lucide-react';

const BacCalculator = () => {
    const { t } = useTranslation();

    // State
    const [unitSystem, setUnitSystem] = useState('metric');
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState(70);
    const [weightLb, setWeightLb] = useState(154);
    const [hours, setHours] = useState(1);

    const [drinks, setDrinks] = useState([
        { type: 'beer', count: 0, vol: 355, abv: 5 },  // 12oz beer
        { type: 'wine', count: 0, vol: 150, abv: 12 }, // 5oz wine
        { type: 'shot', count: 0, vol: 45, abv: 40 },  // 1.5oz shot
    ]);

    const [result, setResult] = useState(null);

    // Sync units
    useEffect(() => {
        if (unitSystem === 'metric') {
            setWeight(Math.round(weightLb * 0.453592));
        } else {
            setWeightLb(Math.round(weight * 2.20462));
        }
    }, [unitSystem]);

    const handleDrinkChange = (index, delta) => {
        const newDrinks = [...drinks];
        newDrinks[index].count = Math.max(0, newDrinks[index].count + delta);
        setDrinks(newDrinks);
    };

    const calculateBac = () => {
        // Widmark Formula
        // BAC = [Alcohol consumed in grams / (Body weight in grams * r)] * 100
        // r = 0.68 for men, 0.55 for women
        // Metabolism: 0.015% per hour

        let wGrams = weight * 1000;
        if (unitSystem === 'imperial') {
            wGrams = weightLb * 453.592;
        }

        let alcoholGrams = 0;
        drinks.forEach(d => {
            // Vol (ml) * ABV * 0.789 (density of ethanol)
            // Note: Standard drink usually 14g pure alcohol in US
            alcoholGrams += (d.vol * d.count * (d.abv / 100) * 0.789);
        });

        const r = gender === 'male' ? 0.68 : 0.55;

        let bac = (alcoholGrams / (wGrams * r)) * 100;

        // Subtract metabolism
        bac = bac - (0.015 * hours);

        if (bac < 0) bac = 0;

        setResult(bac);
    };

    useEffect(() => {
        calculateBac();
    }, [gender, weight, weightLb, hours, drinks, unitSystem]);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_bac')} id="bac" icon={<Wine className="text-rose-500" />} />

            <div className="space-y-6 mt-6">
                {/* Unit Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                    <button onClick={() => setUnitSystem('metric')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${unitSystem === 'metric' ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}>Metric (kg)</button>
                    <button onClick={() => setUnitSystem('imperial')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${unitSystem === 'imperial' ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}>Imperial (lb)</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                            <button onClick={() => setGender('male')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${gender === 'male' ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}>{t('gender_men')}</button>
                            <button onClick={() => setGender('female')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${gender === 'female' ? 'bg-white dark:bg-gray-600 shadow text-pink-600' : 'text-gray-500'}`}>{t('gender_women')}</button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_weight')} ({unitSystem === 'metric' ? 'kg' : 'lb'})</label>
                            <input
                                type="number"
                                value={unitSystem === 'metric' ? weight : weightLb}
                                onChange={(e) => unitSystem === 'metric' ? setWeight(e.target.value) : setWeightLb(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_time_passed')} (Hours)</label>
                            <input
                                type="number"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="space-y-3 pt-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('label_drinks_consumed')}</p>
                            {drinks.map((d, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200 capitalize">{t(`drink_${d.type}`)}</p>
                                        <p className="text-xs text-gray-500">{d.vol}ml ({d.abv}%)</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => handleDrinkChange(idx, -1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500">-</button>
                                        <span className="w-6 text-center font-bold">{d.count}</span>
                                        <button onClick={() => handleDrinkChange(idx, 1)} className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center font-bold text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl flex flex-col items-center justify-center">
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('label_estimated_bac')}</p>
                            <p className={`text-5xl font-bold mb-4 ${result > 0.08 ? 'text-red-500' : result > 0.03 ? 'text-yellow-500' : 'text-green-500'}`}>
                                {result !== null ? result.toFixed(3) : '0.000'}%
                            </p>

                            {result > 0.08 && (
                                <div className="flex items-center gap-2 text-red-600 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg text-sm font-bold justify-center">
                                    <AlertTriangle size={18} />
                                    <span>{t('msg_legal_limit_warning')}</span>
                                </div>
                            )}

                            <div className="mt-6 text-left text-xs text-gray-400 space-y-1">
                                <p>??0.00-0.03%: {t('status_normal')}</p>
                                <p>??0.04-0.07%: {t('status_impaired')}</p>
                                <p>??0.08%+: {t('status_legally_intoxicated')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 items-start bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                    <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                        {t('msg_bac_disclaimer')}
                    </p>
                </div>
            </div>
            <CalculatorInfo calculatorId="bac" />
        </div>
    );
};

export default BacCalculator;
