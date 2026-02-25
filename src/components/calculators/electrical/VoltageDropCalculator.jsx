import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import CalculatorTitle from '../../common/CalculatorTitle';
import CalculatorInfo from '../../common/CalculatorInfo';

const VoltageDropCalculator = () => {
    const { t } = useTranslation();
    const [voltage, setVoltage] = useState(220); // 220V standard single phase
    const [current, setCurrent] = useState(20); // 20A Load
    const [length, setLength] = useState(50); // 50m distance
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [voltage, current, length]);

    const calculate = (addToHistory) => {
        if (!voltage || !current || !length) return;

        // Formula for single-phase 2-wire copper: e = 35.6 * L * I / (1000 * A)
        // Assume acceptable max voltage drop is 3%
        const maxVoltageDrop = voltage * 0.03;

        // Allowed A (Cross-sectional Area SQ mm)
        const requiredArea = (35.6 * length * current) / (1000 * maxVoltageDrop);

        // Standard cable sizes (SQ mm)
        const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300];

        let recommendedSize = standardSizes.find(size => size >= requiredArea) || standardSizes[standardSizes.length - 1];

        // Actual Voltage Drop for the recommended size
        const actualDrop = (35.6 * length * current) / (1000 * recommendedSize);
        const actualDropPercent = (actualDrop / voltage) * 100;

        setResult({
            wireSize: `${recommendedSize} SQ`,
            voltageDrop: `${actualDrop.toFixed(2)} V (${actualDropPercent.toFixed(2)}%)`
        });

        if (addToHistory) {
            setHistory(prev => [{
                summary: `${voltage}V / ${current}A / ${length}m`,
                result: `${recommendedSize} SQ (${actualDropPercent.toFixed(1)}% Drop)`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setVoltage(220);
        setCurrent(20);
        setLength(50);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_voltage_drop', 'Voltage Drop & Wire Size')} id="voltage_drop" />
            <div className="space-y-4">
                <NumberInput
                    label={t('label_supply_voltage', 'Supply Voltage')}
                    value={voltage}
                    onChange={setVoltage}
                    unit="V"
                />
                <NumberInput
                    label={t('label_load_current', 'Load Current')}
                    value={current}
                    onChange={setCurrent}
                    unit="A"
                />
                <NumberInput
                    label={t('label_cable_length', 'Cable Length (1-way)')}
                    value={length}
                    onChange={setLength}
                    unit="m"
                />

                <button
                    onClick={() => calculate(true)}
                    className="w-full py-5 md:py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold rounded-[24px] shadow-lg shadow-yellow-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    {t('label_calculate', 'Calculate')}
                </button>

                {result && (
                    <div className="flex flex-col gap-4">
                        <ResultCard
                            title={t('label_minimum_wire_size', 'Minimum Wire Size')}
                            value={result.wireSize}
                            unit=""
                            subText={`${t('label_actual_voltage_drop', 'Actual Voltage Drop')}: ${result.voltageDrop}`}
                            onReset={handleReset}
                        />
                    </div>
                )}

                <HistoryPanel history={history} />
            </div>
            <CalculatorInfo id="voltage_drop" title={t('calc_voltage_drop')} />
        </div>
    );
};

export default VoltageDropCalculator;
