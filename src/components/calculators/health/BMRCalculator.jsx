import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';

const BMRCalculator = () => {
    const { t } = useTranslation();
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState(30);
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [gender, age, height, weight]);

    const calculate = (addToHistory) => {
        if (!age || !height || !weight) return;

        // Mifflin-St Jeor Equation
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        if (gender === 'male') bmr += 5;
        else bmr -= 161;

        const formattedBMR = new Intl.NumberFormat().format(Math.round(bmr));

        setResult(formattedBMR);

        if (addToHistory) {
            setHistory(prev => [{
                summary: `BMR: ${gender}, ${age}yo, ${weight}kg`,
                result: `${formattedBMR} kcal`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setAge(30);
        setHeight(170);
        setWeight(70);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_bmr')} id="bmr" />
            <div className="space-y-4">
                <div className="flex gap-4 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <button
                        onClick={() => setGender('male')}
                        className={`flex-1 py-2 rounded-md font-medium transition-all ${gender === 'male' ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        Male
                    </button>
                    <button
                        onClick={() => setGender('female')}
                        className={`flex-1 py-2 rounded-md font-medium transition-all ${gender === 'female' ? 'bg-white dark:bg-gray-600 shadow text-pink-600' : 'text-gray-500'}`}
                    >
                        Female
                    </button>
                </div>

                <NumberInput label="Age" value={age} onChange={setAge} />
                <div className="flex gap-4">
                    <NumberInput label="Height" value={height} onChange={setHeight} unit={t('units.cm')} />
                    <NumberInput label="Weight" value={weight} onChange={setWeight} unit={t('units.kg')} />
                </div>

                <button onClick={() => calculate(true)} className="w-full py-5 md:py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-[24px] shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <ResultCard
                        title={t('title_bmr_result')}
                        value={result}
                        unit="kcal"
                        subText={t('subtext_bmr')}
                        onReset={handleReset}
                        relatedLinks={[{ label: t('calc_calories'), url: '/health' }]}
                    />
                )}
                <HistoryPanel history={history} />
            </div>
        </div>
    );
};
export default BMRCalculator;
