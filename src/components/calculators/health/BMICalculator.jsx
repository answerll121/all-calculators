import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';

const BMICalculator = () => {
    const { t } = useTranslation();
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(65);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [height, weight]);

    const calculate = (addToHistory) => {
        if (!height || !weight) return;

        const hM = height / 100;
        const bmi = weight / (hM * hM);

        let statusKey = '';
        if (bmi < 18.5) statusKey = 'status_underweight';
        else if (bmi < 23) statusKey = 'status_normal';
        else if (bmi < 25) statusKey = 'status_overweight';
        else statusKey = 'status_obese';

        const status = t(statusKey);
        const formattedBMI = bmi.toFixed(1);

        setResult({
            bmi: formattedBMI,
            status: status
        });

        if (addToHistory) {
            setHistory(prev => [{
                summary: `BMI: ${height}cm / ${weight}kg`,
                result: `${formattedBMI} (${status})`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setHeight(170);
        setWeight(65);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_bmi')} id="bmi" />
            <div className="space-y-4">
                <NumberInput
                    label="Height"
                    value={height}
                    onChange={setHeight}
                    unit={t('units.cm')}
                />
                <NumberInput
                    label="Weight"
                    value={weight}
                    onChange={setWeight}
                    unit={t('units.kg')}
                />

                <button onClick={() => calculate(true)} className="w-full py-5 md:py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-[24px] shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <ResultCard
                        title={t('title_bmi_result')}
                        value={result.bmi}
                        unit=""
                        subText={t('subtext_bmi', { status: result.status })}
                        onReset={handleReset}
                        relatedLinks={[
                            { label: t('calc_ideal_weight'), url: '/health' },
                            { label: t('calc_bmr'), url: '/health' }
                        ]}
                    />
                )}
                <HistoryPanel history={history} />
            </div>
        </div>
    );
};
export default BMICalculator;
