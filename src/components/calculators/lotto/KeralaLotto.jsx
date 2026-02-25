import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';

const KeralaLotto = ({ title, id, icon }) => {
    const { t } = useTranslation();
    const [resultLetters, setResultLetters] = useState(['A', 'A']);
    const [resultNumbers, setResultNumbers] = useState(['0', '0', '0', '0', '0', '0']);
    const [isGenerated, setIsGenerated] = useState(false);

    const generate = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const l1 = letters.charAt(Math.floor(Math.random() * 26));
        const l2 = letters.charAt(Math.floor(Math.random() * 26));

        const nums = [];
        for (let i = 0; i < 6; i++) {
            nums.push(Math.floor(Math.random() * 10).toString());
        }

        setResultLetters([l1, l2]);
        setResultNumbers(nums);
        setIsGenerated(true);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[28px] shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <CalculatorTitle title={title} id={id} icon={icon} />
            </div>

            <div className="flex flex-col gap-6">
                <div className="min-h-[80px] flex items-center justify-center">
                    {isGenerated ? (
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            <div className="flex gap-1">
                                {resultLetters.map((l, idx) => (
                                    <span key={`l-${idx}`} className="w-10 h-10 flex items-center justify-center rounded-lg font-bold shadow-sm text-lg bg-pink-600 text-white">
                                        {l}
                                    </span>
                                ))}
                            </div>
                            <span className="text-gray-300 dark:text-gray-600 font-light text-2xl">-</span>
                            <div className="flex gap-1">
                                {resultNumbers.map((n, idx) => (
                                    <span key={`n-${idx}`} className="w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-sm text-lg bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                                        {n}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-300 dark:text-gray-600 text-sm font-medium italic">
                            {t('msg_click_generate')}
                        </div>
                    )}
                </div>

                <button
                    onClick={generate}
                    className="w-full py-3.5 flex items-center justify-center gap-2 text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-lg bg-gradient-to-r from-pink-500 to-rose-500 shadow-pink-500/25"
                >
                    <RefreshCw size={20} className={!isGenerated ? "" : "animate-[spin_0.5s_ease-in-out]"} />
                    {t('label_generate')}
                </button>
            </div>
        </div>
    );
};

export default KeralaLotto;
