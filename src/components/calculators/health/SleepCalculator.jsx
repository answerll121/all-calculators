import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Moon } from 'lucide-react';
import CalculatorTitle from '../../common/CalculatorTitle';

const SleepCalculator = () => {
    const { t } = useTranslation();
    const [wakeTime, setWakeTime] = useState('07:00');
    const [bedTimes, setBedTimes] = useState([]);

    useEffect(() => {
        calculateBedtime();
    }, [wakeTime]);

    const calculateBedtime = () => {
        if (!wakeTime) return;

        const [hours, minutes] = wakeTime.split(':').map(Number);
        const wakeDate = new Date();
        wakeDate.setHours(hours, minutes, 0);

        // Calculate backwards 90 min cycles (allow 15 min to fall asleep)
        const cycles = [6, 5, 4, 3]; // 9h, 7.5h, 6h, 4.5h
        const calculatedTimes = cycles.map(cycleCount => {
            const sleepTime = new Date(wakeDate.getTime());
            sleepTime.setMinutes(sleepTime.getMinutes() - (cycleCount * 90) - 15);
            return {
                time: sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                cycles: cycleCount,
                hours: (cycleCount * 1.5).toFixed(1)
            };
        });

        setBedTimes(calculatedTimes);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_sleep')} id="sleep" icon={<Moon className="text-indigo-500" />} />

            <div className="space-y-6 mt-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">{t('label_i_want_to_wake_at')}</label>
                    <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                        <input
                            type="time"
                            value={wakeTime}
                            onChange={(e) => setWakeTime(e.target.value)}
                            className="text-2xl pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900 focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {bedTimes.map((item, index) => (
                        <div key={index} className={`p-4 rounded-xl text-center border-2 ${index <= 1 ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-100 dark:bg-gray-700 dark:border-gray-600'}`}>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.time}</p>
                            <p className={`text-sm font-medium ${index <= 1 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                {item.cycles} {t('label_cycles')} ({item.hours}h)
                            </p>
                            {index === 0 && <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wide">{t('label_best')}</div>}
                        </div>
                    ))}
                </div>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    {t('msg_sleep_note')}
                </p>
            </div>
        </div>
    );
};

export default SleepCalculator;
