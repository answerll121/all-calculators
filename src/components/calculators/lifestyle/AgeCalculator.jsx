import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

import CalculatorInfo from '../../CalculatorInfo';

const AgeCalculator = () => {
    const { t } = useTranslation();
    const [birthDate, setBirthDate] = useState('2000-01-01');
    const [refDate, setRefDate] = useState(new Date().toISOString().split('T')[0]);

    const calculateAge = () => {
        const birth = new Date(birthDate);
        const today = new Date(refDate);

        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        let hasPassedBirthday = false;
        if (m > 0 || (m === 0 && today.getDate() >= birth.getDate())) {
            hasPassedBirthday = true;
        } else {
            age--; // Not yet birthday
        }

        const koreanAge = today.getFullYear() - birth.getFullYear() + 1;

        return {
            manAge: age,
            koreanAge: koreanAge,
            hasPassed: hasPassedBirthday
        };
    };

    const result = calculateAge();

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_age')} id="age" />

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_birth_date')}
                    </label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('label_ref_date')}
                    </label>
                    <input
                        type="date"
                        value={refDate}
                        onChange={(e) => setRefDate(e.target.value)}
                        className="block w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-[20px] text-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
                    />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[28px] mb-4">
                        <span className="text-blue-900 dark:text-blue-100 font-medium">{t('label_man_age')}</span>
                        <div className="text-right">
                            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">{result.manAge}</span>
                            <span className="text-sm text-blue-500 dark:text-blue-300 ml-2">
                                {result.hasPassed ? t('msg_birth_passed') : t('msg_birth_upcoming')}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700/30 rounded-[24px]">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">{t('label_count_age')}</span>
                        <span className="text-2xl font-bold text-gray-800 dark:text-white">{result.koreanAge}</span>
                    </div>
                </div>
            </div>
            <CalculatorInfo calculatorId="age" />
        </div>
    );
};

export default AgeCalculator;
