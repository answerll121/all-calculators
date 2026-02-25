import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { Coffee, Dog, Cat } from 'lucide-react'; // Assuming Dog/Cat icons available or use generic
import CalculatorTitle from '../../common/CalculatorTitle';
import NumberInput from '../../common/NumberInput';

const PetAgeCalculator = () => {
    const { t } = useTranslation();
    const [petType, setPetType] = useState('dog');
    const [years, setYears] = useState(3);
    const [humanAge, setHumanAge] = useState(0);

    useEffect(() => {
        calculate();
    }, [petType, years]);

    const calculate = () => {
        const y = parseFloat(years) || 0;
        let age = 0;

        if (petType === 'dog') {
            if (y <= 1) age = y * 15;
            else if (y <= 2) age = 15 + (y - 1) * 9;
            else age = 24 + (y - 2) * 5;
        } else {
            if (y <= 1) age = y * 15;
            else if (y <= 2) age = 15 + (y - 1) * 9;
            else age = 24 + (y - 2) * 4;
        }
        setHumanAge(Math.round(age));
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_pet_age')} id="pet_age" icon={petType === 'dog' ? <Dog className="text-indigo-500" /> : <Cat className="text-indigo-500" />} />

            <div className="space-y-8 mt-6">
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setPetType('dog')}
                        className={`flex flex-col items-center gap-2 px-8 py-4 rounded-2xl border-2 transition-all ${petType === 'dog' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}
                    >
                        <Dog size={32} />
                        <span className="font-bold">{t('label_dog')}</span>
                    </button>
                    <button
                        onClick={() => setPetType('cat')}
                        className={`flex flex-col items-center gap-2 px-8 py-4 rounded-2xl border-2 transition-all ${petType === 'cat' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}
                    >
                        <Cat size={32} />
                        <span className="font-bold">{t('label_cat')}</span>
                    </button>
                </div>

                <div className="max-w-xs mx-auto">
                    <NumberInput
                        label={t('label_pet_age_years')}
                        value={years}
                        onChange={setYears}
                        unit={t('unit_years')}
                    />
                </div>

                <div className="text-center p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('label_human_age_equiv')}</p>
                    <p className="text-6xl font-black text-indigo-600 dark:text-indigo-400 leading-none">
                        {humanAge}
                        <span className="text-2xl ml-2 font-medium text-indigo-400">{t('unit_years')}</span>
                    </p>
                </div>
            </div>
            <CalculatorInfo calculatorId="petAge" />
        </div>
    );
};

export default PetAgeCalculator;
