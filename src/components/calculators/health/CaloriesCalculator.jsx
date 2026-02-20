import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';

const CaloriesCalculator = () => {
    const { t } = useTranslation();
    const [activity, setActivity] = useState('walking');
    const [weight, setWeight] = useState(70);
    const [minutes, setMinutes] = useState(30);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const mets = {
        walking: 3.5,
        running: 8.0,
        cycling: 6.0,
        swimming: 7.0,
        hiking: 6.0,
        yoga: 2.5
    };

    useEffect(() => {
        calculate(false);
    }, [activity, weight, minutes]);

    const calculate = (addToHistory) => {
        if (!weight || !minutes) return;

        // Calories = MET * Weight(kg) * Time(hours)
        const cal = mets[activity] * weight * (minutes / 60);
        const formattedCal = Math.round(cal);

        setResult(formattedCal);

        if (addToHistory) {
            setHistory(prev => [{
                summary: `${activity}, ${minutes}min`,
                result: `${formattedCal} kcal`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setWeight(70);
        setMinutes(30);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_calories')} id="calories" />
            <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t('category_health') === 'Health' ? 'Activity' : '?úÎèô'}</label>
                    {/* fallback label, ideally add 'label_activity' key */}
                    <select
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
                    >
                        {Object.keys(mets).map(k => (
                            <option key={k} value={k}>{t(`act_${k}`)}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4">
                    <NumberInput label="Weight" value={weight} onChange={setWeight} unit={t('units.kg')} />
                    <NumberInput label="Duration" value={minutes} onChange={setMinutes} unit="min" />
                </div>

                <button onClick={() => calculate(true)} className="w-full py-5 md:py-4 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold rounded-[24px] shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <ResultCard
                        title={t('title_calories_result')}
                        value={result}
                        unit="kcal"
                        subText={t('subtext_calories')}
                        onReset={handleReset}
                        relatedLinks={[{ label: t('calc_water'), url: '/health' }]}
                    />
                )}
                <HistoryPanel history={history} />
            </div>
        </div>
    );
};
export default CaloriesCalculator;
