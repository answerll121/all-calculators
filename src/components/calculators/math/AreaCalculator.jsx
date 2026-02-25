import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

import CalculatorInfo from '../../CalculatorInfo';

const AreaCalculator = () => {
    const { t } = useTranslation();
    const [shape, setShape] = useState('rectangle');
    const [v1, setV1] = useState(10);
    const [v2, setV2] = useState(5);
    const [result, setResult] = useState(null);

    const calculate = () => {
        let area = 0;
        if (shape === 'rectangle') area = v1 * v2;
        if (shape === 'triangle') area = 0.5 * v1 * v2; // base * height
        if (shape === 'circle') area = Math.PI * v1 * v1; // radius

        setResult(area.toFixed(2));
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_area')} id="area" />
            <div className="space-y-4">
                <select value={shape} onChange={(e) => setShape(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                    <option value="rectangle">{t('shape_rectangle')}</option>
                    <option value="triangle">{t('shape_triangle')}</option>
                    <option value="circle">{t('shape_circle')}</option>
                </select>
                <div>
                    <label className="block text-sm font-medium mb-1">{shape === 'circle' ? t('dim_radius') : t('dim_width')}</label>
                    <input type="number" value={v1} onChange={(e) => setV1(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                {shape !== 'circle' && (
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('dim_height')}</label>
                        <input type="number" value={v2} onChange={(e) => setV2(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                )}
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-[24px] shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{result}</p>
                    </div>
                )}
            </div>
            <CalculatorInfo calculatorId="area" />
        </div>
    );
};
export default AreaCalculator;
