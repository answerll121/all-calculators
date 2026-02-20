import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const UnitPriceCalculator = () => {
    const { t } = useTranslation();
    const [p1, setP1] = useState(1000);
    const [q1, setQ1] = useState(100);
    const [p2, setP2] = useState(2500);
    const [q2, setQ2] = useState(300);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const u1 = p1 / q1;
        const u2 = p2 / q2;

        let winner = null;
        if (u1 < u2) winner = 1;
        else if (u2 < u1) winner = 2;

        setResult({
            u1: u1.toFixed(2),
            u2: u2.toFixed(2),
            winner
        });
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_unit_price')} id="unit_price" />
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-2 rounded border ${result?.winner === 1 ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'dark:border-gray-600'}`}>
                        <p className="text-xs font-bold mb-2">{t('label_item_a')}</p>
                        <input type="number" value={p1} onChange={(e) => setP1(Number(e.target.value))} className="w-full p-1 border rounded mb-2 text-sm dark:bg-gray-700 dark:border-gray-600" placeholder={t('label_price')} />
                        <input type="number" value={q1} onChange={(e) => setQ1(Number(e.target.value))} className="w-full p-1 border rounded text-sm dark:bg-gray-700 dark:border-gray-600" placeholder={t('label_qty')} />
                    </div>
                    <div className={`p-2 rounded border ${result?.winner === 2 ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'dark:border-gray-600'}`}>
                        <p className="text-xs font-bold mb-2">{t('label_item_b')}</p>
                        <input type="number" value={p2} onChange={(e) => setP2(Number(e.target.value))} className="w-full p-1 border rounded mb-2 text-sm dark:bg-gray-700 dark:border-gray-600" placeholder={t('label_price')} />
                        <input type="number" value={q2} onChange={(e) => setQ2(Number(e.target.value))} className="w-full p-1 border rounded text-sm dark:bg-gray-700 dark:border-gray-600" placeholder={t('label_qty')} />
                    </div>
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-[24px] shadow-lg shadow-pink-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="font-bold text-lg text-green-600">
                            {result.winner ? `${result.winner === 1 ? t('label_item_a') : t('label_item_b')} ${t('msg_cheaper')}` : t('msg_same_price')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">A: {result.u1} {t('unit_per_unit')} vs B: {result.u2} {t('unit_per_unit')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default UnitPriceCalculator;
