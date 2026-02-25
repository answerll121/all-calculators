import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import HistoryPanel from '../../common/HistoryPanel';
import CalculatorTitle from '../../common/CalculatorTitle';
import CalculatorInfo from '../../common/CalculatorInfo';

const OhmsLawCalculator = () => {
    const { t } = useTranslation();
    const [voltage, setVoltage] = useState('');
    const [current, setCurrent] = useState('');
    const [resistance, setResistance] = useState('');
    const [power, setPower] = useState('');
    const [history, setHistory] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');


    const calculate = () => {
        let v = parseFloat(voltage);
        let i = parseFloat(current);
        let r = parseFloat(resistance);
        let p = parseFloat(power);

        let count = 0;
        if (!isNaN(v)) count++;
        if (!isNaN(i)) count++;
        if (!isNaN(r)) count++;
        if (!isNaN(p)) count++;

        if (count < 2) {
            setErrorMsg(t('msg_enter_two_values', '최소 2개의 값을 입력하세요.'));
            return;
        }
        if (count > 2) {
            setErrorMsg(t('msg_enter_only_two', '오직 2개의 값만 입력하세요. 나머지 두 개를 비워두세요.'));
            return;
        }

        setErrorMsg('');

        // Ohm's Law formulas
        if (!isNaN(v) && !isNaN(i)) {
            r = v / i;
            p = v * i;
        } else if (!isNaN(v) && !isNaN(r)) {
            i = v / r;
            p = (v * v) / r;
        } else if (!isNaN(v) && !isNaN(p)) {
            i = p / v;
            r = (v * v) / p;
        } else if (!isNaN(i) && !isNaN(r)) {
            v = i * r;
            p = i * i * r;
        } else if (!isNaN(i) && !isNaN(p)) {
            v = p / i;
            r = p / (i * i);
        } else if (!isNaN(r) && !isNaN(p)) {
            v = Math.sqrt(p * r);
            i = Math.sqrt(p / r);
        }

        setVoltage(v.toFixed(2));
        setCurrent(i.toFixed(2));
        setResistance(r.toFixed(2));
        setPower(p.toFixed(2));

        setHistory(prev => [{
            summary: `V=${v.toFixed(1)}V, I=${i.toFixed(1)}A, R=${r.toFixed(1)}Ω, P=${p.toFixed(1)}W`,
            result: t('label_calculated', 'Calculated')
        }, ...prev].slice(0, 5));
    };

    const handleReset = () => {
        setVoltage('');
        setCurrent('');
        setResistance('');
        setPower('');
        setErrorMsg('');
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_ohms_law', "Ohm's Law")} id="ohms_law" />

            {errorMsg && (
                <div className="p-3 mb-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium">
                    {errorMsg}
                </div>
            )}

            <div className="space-y-4">
                <NumberInput
                    label={t('label_voltage', 'Voltage (V)')}
                    value={voltage}
                    onChange={setVoltage}
                    unit="V"
                />
                <NumberInput
                    label={t('label_current', 'Current (I)')}
                    value={current}
                    onChange={setCurrent}
                    unit="A"
                />
                <NumberInput
                    label={t('label_resistance', 'Resistance (R)')}
                    value={resistance}
                    onChange={setResistance}
                    unit="Ω"
                />
                <NumberInput
                    label={t('label_power', 'Power (P)')}
                    value={power}
                    onChange={setPower}
                    unit="W"
                />

                <div className="flex gap-4">
                    <button
                        onClick={handleReset}
                        className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-[24px] transition-all"
                    >
                        {t('reset', 'Reset')}
                    </button>
                    <button
                        onClick={calculate}
                        className="flex-[2] py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold rounded-[24px] shadow-lg shadow-yellow-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                        {t('label_calculate', 'Calculate')}
                    </button>
                </div>

                <HistoryPanel history={history} />
            </div>
            <CalculatorInfo id="ohms_law" title={t('calc_ohms_law')} />
        </div>
    );
};

export default OhmsLawCalculator;
