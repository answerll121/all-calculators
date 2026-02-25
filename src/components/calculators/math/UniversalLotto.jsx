import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { RefreshCw } from 'lucide-react';

const UniversalLotto = ({
    title,
    id,
    maxNum,
    pickCount,
    hasBonus = false,
    bonusMax = 0,
    bonusPickCount = 1, // New prop for number of bonus balls
    bonusTitle = '',
    themeColor = 'amber',
    icon
}) => {
    const { t } = useTranslation();
    const [numbers, setNumbers] = useState([]);
    const [bonuses, setBonuses] = useState([]); // Changed to array

    const generate = () => {
        // Main numbers
        const nums = new Set();
        while (nums.size < pickCount) {
            nums.add(Math.floor(Math.random() * maxNum) + 1);
        }
        const arr = [...nums].sort((a, b) => a - b);
        setNumbers(arr);

        // Bonus numbers
        if (hasBonus) {
            const bonusNums = new Set();
            while (bonusNums.size < bonusPickCount) {
                bonusNums.add(Math.floor(Math.random() * bonusMax) + 1);
            }
            const bonusArr = [...bonusNums].sort((a, b) => a - b);
            setBonuses(bonusArr);
        }
    };

    const getBallColor = (num) => {
        // Powerball (Red Theme)
        if (themeColor === 'red') return 'bg-white text-gray-900 border-2 border-red-500';
        // Mega Millions (Blue Theme)
        if (themeColor === 'blue') return 'bg-white text-gray-900 border-2 border-blue-600';
        // Euro (Indigo Theme)
        if (themeColor === 'indigo') return 'bg-white text-gray-900 border-2 border-indigo-600';

        // Standard Colorful Balls (Korea/General/Brazil/Italy/China/Japan)
        // 1-10: Yellow, 11-20: Blue, 21-30: Red, 31-40: Gray/Black, 41-50: Green
        // Extending for high numbers (51+): Cycle or specific
        if (num <= 10) return 'bg-yellow-400 text-gray-900';
        if (num <= 20) return 'bg-blue-500 text-white';
        if (num <= 30) return 'bg-red-500 text-white';
        if (num <= 40) return 'bg-gray-800 text-white';
        if (num <= 50) return 'bg-green-500 text-white';
        // 51-60 (Mega Sena max 60)
        if (num <= 60) return 'bg-purple-500 text-white';
        // 61-70
        if (num <= 70) return 'bg-orange-500 text-white';
        // 71-80
        if (num <= 80) return 'bg-teal-500 text-white';
        // 81-90 (SuperEnalotto max 90)
        return 'bg-pink-500 text-white';
    };

    const getBonusColor = () => {
        if (themeColor === 'red') return 'bg-red-600 text-white'; // Powerball red
        if (themeColor === 'blue') return 'bg-yellow-400 text-gray-900'; // Mega Ball gold/yellow
        if (themeColor === 'indigo') return 'bg-yellow-400 text-gray-900'; // Euro Stars
        if (themeColor === 'green') return 'bg-green-600 text-white'; // Mega-Sena
        if (maxNum <= 45) return 'bg-transparent border-2 border-gray-300 text-gray-500'; // Korean bonus
        return 'bg-purple-500 text-white';
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[28px] shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <CalculatorTitle title={title} id={id} icon={icon} />
            </div>

            <div className="flex flex-col gap-6">
                {/* Numbers Display */}
                <div className="min-h-[80px] flex items-center justify-center">
                    {numbers.length > 0 ? (
                        <div className="flex flex-wrap gap-2 justify-center items-center">
                            {numbers.map(n => (
                                <span key={n} className={`w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-sm text-lg ${getBallColor(n)} ${themeColor !== 'red' && themeColor !== 'blue' && themeColor !== 'indigo' ? 'text-white' : ''}`}>
                                    {n}
                                </span>
                            ))}
                            {hasBonus && (
                                <>
                                    <span className="text-gray-300 dark:text-gray-600 font-light text-2xl mx-1">+</span>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {bonuses.map((b, idx) => (
                                            <span key={idx} className={`w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-sm text-lg animate-bounce ${getBonusColor()}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="text-gray-300 dark:text-gray-600 text-sm font-medium italic">
                            {t('msg_click_generate')}
                        </div>
                    )}
                </div>

                <button
                    onClick={generate}
                    className={`w-full py-3.5 flex items-center justify-center gap-2 text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-lg
                        ${themeColor === 'amber' ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-500/25' : ''}
                        ${themeColor === 'red' ? 'bg-gradient-to-r from-red-600 to-rose-600 shadow-red-500/25' : ''}
                        ${themeColor === 'blue' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/25' : ''}
                        ${themeColor === 'indigo' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-500/25' : ''}
                        ${themeColor === 'green' ? 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-green-500/25' : ''}
                        ${themeColor === 'pink' ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-pink-500/25' : ''}
                    `}
                >
                    <RefreshCw size={20} className={numbers.length === 0 ? "" : "animate-[spin_0.5s_ease-in-out]"} />
                    {t('label_generate')}
                </button>
            </div>
            <CalculatorInfo calculatorId="universalLotto" />
        </div>
    );
};

export default UniversalLotto;
