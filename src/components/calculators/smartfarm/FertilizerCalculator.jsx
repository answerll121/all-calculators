import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import CalculatorTitle from '../../common/CalculatorTitle';
import CalculatorInfo from '../../common/CalculatorInfo';

const FertilizerCalculator = () => {
    const { t } = useTranslation();
    const [waterVolume, setWaterVolume] = useState(100);
    const [dilutionRatio, setDilutionRatio] = useState(500);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [waterVolume, dilutionRatio]);

    const calculate = (addToHistory) => {
        if (!waterVolume || !dilutionRatio || dilutionRatio <= 0) return;

        // Formula: Fertilizer (ml) = Water (L) * 1000 / Dilution Ratio
        const requiredAmount = (waterVolume * 1000) / dilutionRatio;

        const formattedResult = new Intl.NumberFormat().format(Math.round(requiredAmount * 10) / 10);

        setResult({
            amount: formattedResult
        });

        if (addToHistory) {
            setHistory(prev => [{
                summary: `${t('calc_fertilizer', 'Fertilizer Dilution')}: ${waterVolume}L / ${dilutionRatio}x`,
                result: `${formattedResult} ml`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setWaterVolume(100);
        setDilutionRatio(500);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_fertilizer', 'Fertilizer Dilution')} id="fertilizer" />
            <div className="space-y-4">
                <NumberInput
                    label={t('label_water_volume', 'Water Volume')}
                    value={waterVolume}
                    onChange={setWaterVolume}
                    unit="L"
                />
                <NumberInput
                    label={t('label_dilution_ratio', 'Target Dilution Ratio')}
                    value={dilutionRatio}
                    onChange={setDilutionRatio}
                    unit="X"
                />

                <button
                    onClick={() => calculate(true)}
                    className="w-full py-5 md:py-4 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-bold rounded-[24px] shadow-lg shadow-lime-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    {t('label_calculate', 'Calculate')}
                </button>

                {result && (
                    <ResultCard
                        title={t('label_fertilizer_amount', 'Required Fertilizer Amount')}
                        value={result.amount}
                        unit="ml"
                        onReset={handleReset}
                    />
                )}

                <HistoryPanel history={history} />
            </div>

            <CalculatorInfo id="fertilizer" title={t('calc_fertilizer')} />
        </div>
    );
};

export default FertilizerCalculator;
