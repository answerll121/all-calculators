import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const LottoCalculator = () => {
    const { t } = useTranslation();
    const [numbers, setNumbers] = useState([]);
    const [bonus, setBonus] = useState(null);

    const generate = () => {
        const nums = new Set();
        while (nums.size < 7) {
            nums.add(Math.floor(Math.random() * 45) + 1);
        }
        const arr = [...nums];
        const main = arr.slice(0, 6).sort((a, b) => a - b);
        const bonusNum = arr[6];

        setNumbers(main);
        setBonus(bonusNum);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_lotto')} id="lotto" />
            <div className="space-y-6">
                <button
                    onClick={generate}
                    className="w-full py-5 md:py-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white font-bold rounded-[24px] shadow-lg shadow-amber-400/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    {t('label_calculate')}
                </button>

                {numbers.length > 0 && (
                    <div className="mt-4 flex flex-col items-center gap-4">
                        <div className="flex gap-2 justify-center flex-wrap">
                            {numbers.map(n => (
                                <span key={n} className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold shadow-sm text-lg">
                                    {n}
                                </span>
                            ))}
                            <span className="flex items-center text-gray-400 font-bold">+</span>
                            <div className="flex flex-col items-center">
                                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold shadow-sm text-lg animate-bounce">
                                    {bonus}
                                </span>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{t('label_bonus')}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default LottoCalculator;
