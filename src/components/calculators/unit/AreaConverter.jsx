import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { ArrowLeftRight } from 'lucide-react';

const AreaConverter = () => {
    const { t } = useTranslation();
    const [val, setVal] = useState('');
    const [fromUnit, setFromUnit] = useState('py');
    const [toUnit, setToUnit] = useState('m2');
    const [result, setResult] = useState('');

    const units = {
        m2: 1,
        ft2: 0.092903,
        py: 3.305785, // 1 pyung = 3.305785 m2
        acre: 4046.86,
        ha: 10000
    };

    useEffect(() => {
        if (val === '') {
            setResult('');
            return;
        }
        const num = parseFloat(val);
        if (isNaN(num)) return;

        const inM2 = num * units[fromUnit];
        const outVal = inM2 / units[toUnit];

        setResult(outVal.toPrecision(6).replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1'));
    }, [val, fromUnit, toUnit]);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_area_conv')} id="area_conv" icon="layout" />
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
            <CalculatorInfo calculatorId="areaConverter" />
        </div>
    );
};

export default AreaConverter;
