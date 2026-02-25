import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import CalculatorTitle from '../../common/CalculatorTitle';
import CalculatorInfo from '../../common/CalculatorInfo';

const VPDCalculator = () => {
    const { t } = useTranslation();
    const [temperature, setTemperature] = useState(25);
    const [humidity, setHumidity] = useState(60);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [temperature, humidity]);

    const calculate = (addToHistory) => {
        if (temperature === '' || humidity === '') return;

        // SVP (Saturation Vapor Pressure) in kPa
        const svp = 0.61078 * Math.exp((17.27 * temperature) / (temperature + 237.3));

        // AVP (Actual Vapor Pressure) in kPa
        const avp = svp * (humidity / 100);

        // VPD (Vapor Pressure Deficit)
        const vpd = svp - avp;

        let statusKey = 'status_vpd_optimal'; // 0.8 - 1.2 optimal for most plants
        if (vpd < 0.4) statusKey = 'status_vpd_danger_low';
        else if (vpd < 0.8) statusKey = 'status_vpd_low';
        else if (vpd <= 1.2) statusKey = 'status_vpd_optimal';
        else if (vpd <= 1.6) statusKey = 'status_vpd_high';
        else statusKey = 'status_vpd_danger_high';

        const formattedVpd = vpd.toFixed(2);

        setResult({
            vpd: formattedVpd,
            status: t(statusKey, statusKey.replace('status_vpd_', '').replace('_', ' ').toUpperCase())
        });

        if (addToHistory) {
            setHistory(prev => [{
                summary: `${temperature}°C / ${humidity}%`,
                result: `${formattedVpd} kPa`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setTemperature(25);
        setHumidity(60);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_vpd', 'VPD Calculator')} id="vpd" />
            <div className="space-y-4">
                <NumberInput
                    label={t('label_temperature', 'Temperature')}
                    value={temperature}
                    onChange={setTemperature}
                    unit="°C"
                />
                <NumberInput
                    label={t('label_humidity', 'Relative Humidity')}
                    value={humidity}
                    onChange={setHumidity}
                    unit="%"
                    max={100}
                />

                <button
                    onClick={() => calculate(true)}
                    className="w-full py-5 md:py-4 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-bold rounded-[24px] shadow-lg shadow-lime-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    {t('label_calculate', 'Calculate')}
                </button>

                {result && (
                    <ResultCard
                        title={t('label_vpd', 'Vapor Pressure Deficit')}
                        value={result.vpd}
                        unit="kPa"
                        subText={`${t('label_status', 'Status')}: ${result.status}`}
                        onReset={handleReset}
                    />
                )}

                <HistoryPanel history={history} />
            </div>

            <CalculatorInfo id="vpd" title={t('calc_vpd')} />
        </div>
    );
};

export default VPDCalculator;
