import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const VolumeCalculator = () => {
    const { t } = useTranslation();
    const [shape, setShape] = useState('cube');
    const [v1, setV1] = useState(10);
    const [v2, setV2] = useState(10);
    const [v3, setV3] = useState(10);
    const [result, setResult] = useState(null);

    const calculate = () => {
        let vol = 0;
        if (shape === 'cube') vol = v1 * v2 * v3;
        if (shape === 'cylinder') vol = Math.PI * v1 * v1 * v2; // r^2 * h
        if (shape === 'sphere') vol = (4 / 3) * Math.PI * Math.pow(v1, 3); // 4/3 pi r^3

        setResult(vol.toFixed(2));
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_volume')} id="volume" />
            <div className="space-y-4">
                <select value={shape} onChange={(e) => setShape(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                    <option value="cube">{t('shape_cube')}</option>
                    <option value="cylinder">{t('shape_cylinder')}</option>
                    <option value="sphere">{t('shape_sphere')}</option>
                </select>
                <div>
                    <label className="block text-sm font-medium mb-1">{shape === 'cube' ? t('dim_length') : t('dim_radius')}</label>
                    <input type="number" value={v1} onChange={(e) => setV1(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                {shape !== 'sphere' && (
                    <div>
                        <label className="block text-sm font-medium mb-1">{shape === 'cube' ? t('dim_width') : t('dim_height')}</label>
                        <input type="number" value={v2} onChange={(e) => setV2(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                )}
                {shape === 'cube' && (
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('dim_height')}</label>
                        <input type="number" value={v3} onChange={(e) => setV3(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                )}
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white font-bold rounded-[24px] shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default VolumeCalculator;
