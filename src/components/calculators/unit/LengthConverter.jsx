import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { ArrowLeftRight } from 'lucide-react';

const LengthConverter = () => {
    const { t } = useTranslation();
    const [val, setVal] = useState('');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');
    const [result, setResult] = useState('');

    const units = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.34
    };

    useEffect(() => {
        if (val === '') {
            setResult('');
            return;
        }
        const num = parseFloat(val);
        if (isNaN(num)) return;

        const inMeters = num * units[fromUnit];
        const outVal = inMeters / units[toUnit];

        // Format nicely
        setResult(outVal.toPrecision(6).replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1'));
    }, [val, fromUnit, toUnit]);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_length_conv')} id="length_conv" icon="ruler" />
            <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 items-center">
                    <div className="flex flex-col gap-1">
                        <input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full p-2 bg-transparent text-sm font-medium text-gray-600 dark:text-gray-300 border-none focus:ring-0 cursor-pointer"
                        >
                            {Object.keys(units).map(u => <option key={u} value={u}>{t(`units.${u}`)}</option>)}
                        </select>
                    </div>

                    <ArrowLeftRight size={20} className="text-gray-400" />

                    <div className="flex flex-col gap-1">
                        <div className="w-full p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center h-[48px] overflow-hidden">
                            <span className="font-bold text-blue-600 dark:text-blue-400 truncate">{result}</span>
                        </div>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full p-2 bg-transparent text-sm font-medium text-gray-600 dark:text-gray-300 border-none focus:ring-0 cursor-pointer"
                        >
                            {Object.keys(units).map(u => <option key={u} value={u}>{t(`units.${u}`)}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <CalculatorInfo calculatorId="lengthConverter" />
        </div>
    );
};

export default LengthConverter;
