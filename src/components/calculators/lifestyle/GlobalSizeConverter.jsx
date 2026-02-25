import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

import CalculatorInfo from '../../CalculatorInfo';

const GlobalSizeConverter = () => {
    const { t } = useTranslation();
    const [category, setCategory] = useState('shoes');
    const [gender, setGender] = useState('men');
    const [selectedSize, setSelectedSize] = useState('');

    const shoeSizes = {
        men: [
            { us: 7, uk: 6, eu: 40, kr: 250 },
            { us: 7.5, uk: 6.5, eu: 40.5, kr: 255 },
            { us: 8, uk: 7, eu: 41, kr: 260 },
            { us: 8.5, uk: 7.5, eu: 42, kr: 265 },
            { us: 9, uk: 8, eu: 42.5, kr: 270 },
            { us: 9.5, uk: 8.5, eu: 43, kr: 275 },
            { us: 10, uk: 9, eu: 44, kr: 280 },
            { us: 10.5, uk: 9.5, eu: 44.5, kr: 285 },
            { us: 11, uk: 10, eu: 45, kr: 290 },
        ],
        women: [
            { us: 5, uk: 3, eu: 35.5, kr: 220 },
            { us: 5.5, uk: 3.5, eu: 36, kr: 225 },
            { us: 6, uk: 4, eu: 37, kr: 230 },
            { us: 6.5, uk: 4.5, eu: 37.5, kr: 235 },
            { us: 7, uk: 5, eu: 38, kr: 240 },
            { us: 7.5, uk: 5.5, eu: 38.5, kr: 245 },
            { us: 8, uk: 6, eu: 39, kr: 250 },
            { us: 8.5, uk: 6.5, eu: 40, kr: 255 },
        ]
    };

    const pantsSizes = {
        men: [
            { us: "28", uk: "28", eu: "44", kr: "71" },
            { us: "29", uk: "29", eu: "45", kr: "73" },
            { us: "30", uk: "30", eu: "46", kr: "76" },
            { us: "31", uk: "31", eu: "47", kr: "79" },
            { us: "32", uk: "32", eu: "48", kr: "81" },
            { us: "33", uk: "33", eu: "49", kr: "84" },
            { us: "34", uk: "34", eu: "50", kr: "86" },
            { us: "36", uk: "36", eu: "52", kr: "91" },
            { us: "38", uk: "38", eu: "54", kr: "96" },
            { us: "40", uk: "40", eu: "56", kr: "101" },
        ],
        women: [
            { us: "2 (XS)", uk: "6", eu: "32", kr: "24" },
            { us: "4 (S)", uk: "8", eu: "34", kr: "25" },
            { us: "6 (M)", uk: "10", eu: "36", kr: "26-27" },
            { us: "8 (L)", uk: "12", eu: "38", kr: "28-29" },
            { us: "10 (XL)", uk: "14", eu: "40", kr: "30-31" },
            { us: "12 (XXL)", uk: "16", eu: "42", kr: "32" },
        ]
    };

    const kidsShoeSizes = [
        { age: "0-6m", us: "1", eu: "16", kr: "90" },
        { age: "6-12m", us: "2", eu: "17", kr: "100" },
        { age: "12-18m", us: "3", eu: "18", kr: "110" },
        { age: "18-24m", us: "4", eu: "19", kr: "120" },
        { age: "2y", us: "5", eu: "20", kr: "130" },
        { age: "3y", us: "6", eu: "22", kr: "140" },
        { age: "4y", us: "7", eu: "23", kr: "150" },
        { age: "5y", us: "8", eu: "24", kr: "160" },
        { age: "6y", us: "9", eu: "25", kr: "170" },
        { age: "7y", us: "10", eu: "27", kr: "180" },
    ];

    const kidsClothingSizes = [
        { age: "0-3m", height: "~60cm", us: "0-3M", kr: "60" },
        { age: "3-6m", height: "~70cm", us: "3-6M", kr: "70" },
        { age: "6-12m", height: "~80cm", us: "6-12M", kr: "80" },
        { age: "12-18m", height: "~85cm", us: "12-18M", kr: "90" },
        { age: "2y", height: "~90cm", us: "2T", kr: "100" },
        { age: "3-4y", height: "~100cm", us: "3T/4T", kr: "110" },
        { age: "4-5y", height: "~110cm", us: "4T/5T", kr: "120" },
        { age: "6-7y", height: "~120cm", us: "6/7", kr: "130" },
        { age: "8-9y", height: "~130cm", us: "8/9", kr: "140" },
    ];

    const getCurrentData = () => {
        if (gender === 'kids') {
            return category === 'shoes' ? kidsShoeSizes : kidsClothingSizes;
        }
        return category === 'shoes' ? (shoeSizes[gender] || []) : (pantsSizes[gender] || []);
    };

    const currentData = getCurrentData();

    const handleGenderChange = (newGender) => {
        setGender(newGender);
        // Reset category if switching between adult/kids to ensure valid category
        if (newGender === 'kids' && category === 'pants') {
            setCategory('clothing');
        } else if (newGender !== 'kids' && category === 'clothing') {
            setCategory('pants');
        }
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={`${t('calc_size')} (${t(category === 'shoes' ? 'cat_shoes' : (category === 'pants' ? 'cat_pants' : 'cat_clothing'))})`} id="size" />

            <div className="space-y-6">
                {/* Category Tabs */}
                <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <button
                        onClick={() => setCategory('shoes')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${category === 'shoes' ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                        {t('cat_shoes')}
                    </button>
                    <button
                        onClick={() => setCategory(gender === 'kids' ? 'clothing' : 'pants')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${category === 'pants' || category === 'clothing' ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                        {t(gender === 'kids' ? 'cat_clothing' : 'cat_pants')}
                    </button>
                </div>

                {/* Gender Tabs */}
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-[16px]">
                    <button
                        onClick={() => handleGenderChange('men')}
                        className={`flex-1 py-2 rounded-[14px] text-sm font-medium transition-all ${gender === 'men' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        {t('gender_men')}
                    </button>
                    <button
                        onClick={() => handleGenderChange('women')}
                        className={`flex-1 py-2 rounded-[14px] text-sm font-medium transition-all ${gender === 'women' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        {t('gender_women')}
                    </button>
                    <button
                        onClick={() => handleGenderChange('kids')}
                        className={`flex-1 py-2 rounded-[14px] text-sm font-medium transition-all ${gender === 'kids' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        {t('gender_kids')}
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                {gender === 'kids' && category === 'clothing' ? (
                                    <>
                                        <th className="px-4 py-3 rounded-l-lg">{t('label_age')} / Size</th>
                                        <th className="px-4 py-3">{t('label_height')}</th>
                                        <th className="px-4 py-3">US</th>
                                        <th className="px-4 py-3 rounded-r-lg">KR ({t('label_size_ho')})</th>
                                    </>
                                ) : gender === 'kids' && category === 'shoes' ? (
                                    <>
                                        <th className="px-4 py-3 rounded-l-lg">{t('label_age')}</th>
                                        <th className="px-4 py-3">US</th>
                                        <th className="px-4 py-3">EU</th>
                                        <th className="px-4 py-3 rounded-r-lg">KR (mm)</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="px-4 py-3 rounded-l-lg">US</th>
                                        <th className="px-4 py-3">UK</th>
                                        <th className="px-4 py-3">EU</th>
                                        <th className="px-4 py-3 rounded-r-lg">KR ({category === 'shoes' ? 'mm' : 'cm/inch'})</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    {gender === 'kids' && category === 'clothing' ? (
                                        <>
                                            <td className="px-4 py-3 font-medium">{row.age}</td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.height}</td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.us}</td>
                                            <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">{row.kr}</td>
                                        </>
                                    ) : gender === 'kids' && category === 'shoes' ? (
                                        <>
                                            <td className="px-4 py-3 font-medium">{row.age}</td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.us}</td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.eu}</td>
                                            <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">{row.kr}</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-4 py-3 font-medium">{row.us}</td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.uk}</td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.eu}</td>
                                            <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">{row.kr}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CalculatorInfo calculatorId="globalSizeConverter" />
        </div>
    );
};

export default GlobalSizeConverter;
