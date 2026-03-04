import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, RotateCcw, Calendar, History, Trash2, Clock } from 'lucide-react';
import CalculatorInfo from '../../CalculatorInfo';

const TimeDifferenceCalculator = () => {
    const { t } = useTranslation();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    // Load history from LocalStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('timeDiffHistory');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Failed to parse history', e);
            }
        }

        // Initialize default dates (today and tomorrow)
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Format to YYYY-MM-DDTHH:mm:ss for input[type="datetime-local"]
        const formatDateTime = (date) => {
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 19);
            return localISOTime;
        };

        if (!startDate) setStartDate(formatDateTime(now));
        if (!endDate) setEndDate(formatDateTime(tomorrow));
    }, []);

    // Save history to LocalStorage
    useEffect(() => {
        localStorage.setItem('timeDiffHistory', JSON.stringify(history));
    }, [history]);

    const calculateDifference = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Allow negative differences or swap? User didn't specify, standard to allow negative or swap.
        // Let's do absolute difference but keep sign if end < start.
        // Actually it's more precise to calculate year, month, day, hour, min forward.
        let isNegative = false;
        let d1 = start;
        let d2 = end;

        if (d2 < d1) {
            isNegative = true;
            d1 = end;
            d2 = start;
        }

        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();
        let hours = d2.getHours() - d1.getHours();
        let minutes = d2.getMinutes() - d1.getMinutes();
        let seconds = d2.getSeconds() - d1.getSeconds();

        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            // Get days in previous month
            let tempDate = new Date(d2.getFullYear(), d2.getMonth(), 0);
            days += tempDate.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        const newResult = {
            years, months, days, hours, minutes, seconds, isNegative,
            startStr: start.toLocaleString(),
            endStr: end.toLocaleString()
        };

        setResult(newResult);

        // Add to history
        setHistory(prev => {
            const updated = [newResult, ...prev].slice(0, 10);
            return updated;
        });
    };

    const reset = () => {
        const now = new Date();
        const formatDateTime = (date) => {
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 19);
            return localISOTime;
        };
        setStartDate(formatDateTime(now));
        setEndDate(formatDateTime(new Date(now.getTime() + 86400000)));
        setResult(null);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 sm:p-8 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
                    <Clock size={40} className="mx-auto mb-4 opacity-90" />
                    <h2 className="text-3xl font-bold mb-2">{t('calc_time_diff', 'Time Difference Calculator')}</h2>
                    <p className="text-indigo-100">{t('desc_time_diff', 'Calculate exact difference between two dates and times')}</p>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {t('label_start_datetime', 'Start Date & Time')}
                            </label>
                            <input
                                type="datetime-local"
                                step="1"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white transition-all text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {t('label_end_datetime', 'End Date & Time')}
                            </label>
                            <input
                                type="datetime-local"
                                step="1"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white transition-all text-lg"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={calculateDifference}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/30 text-lg w-full"
                        >
                            <Calculator size={24} />
                            {t('label_calc_diff', 'Calculate Difference')}
                        </button>
                        <button
                            onClick={reset}
                            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
                        >
                            <RotateCcw size={24} />
                            {t('reset', 'Reset')}
                        </button>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="animate-fade-in space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                {t('result', 'Result')}
                                {result.isNegative && " (Past)"}
                            </h3>
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                                {[
                                    { label: t('label_diff_years', 'Years'), value: result.years, color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20' },
                                    { label: t('label_diff_months', 'Months'), value: result.months, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
                                    { label: t('label_diff_days', 'Days'), value: result.days, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
                                    { label: t('label_diff_hours', 'Hours'), value: result.hours, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
                                    { label: t('label_diff_minutes', 'Minutes'), value: result.minutes, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' },
                                    { label: t('label_diff_seconds', 'Seconds'), value: result.seconds, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
                                ].map((item, index) => (
                                    <div key={index} className={`flex flex-col items-center justify-center p-4 rounded-2xl ${item.color}`}>
                                        <span className="text-3xl font-black">{item.value}</span>
                                        <span className="text-sm font-semibold opacity-80 mt-1">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* History */}
            {history.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 overflow-hidden animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-white">
                            <History size={20} className="text-indigo-500" />
                            {t('label_calc_history', 'Calculation History')}
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg"
                        >
                            <Trash2 size={16} />
                            {t('label_clear_history', 'Clear History')}
                        </button>
                    </div>
                    <div className="space-y-3">
                        {history.map((h, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl gap-2 text-sm border-l-4 border-indigo-400">
                                <span className="text-gray-600 dark:text-gray-300 font-medium">
                                    {h.startStr} <span className="mx-2 text-gray-400">→</span> {h.endStr}
                                </span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                    {h.years > 0 && `${h.years}${t('label_diff_years', 'Y')} `}
                                    {h.months > 0 && `${h.months}${t('label_diff_months', 'M')} `}
                                    {h.days > 0 && `${h.days}${t('label_diff_days', 'D')} `}
                                    {h.hours > 0 && `${h.hours}${t('label_diff_hours', 'h')} `}
                                    {h.minutes > 0 && `${h.minutes}${t('label_diff_minutes', 'm')} `}
                                    {h.seconds > 0 && `${h.seconds}${t('label_diff_seconds', 's')}`}
                                    {h.years === 0 && h.months === 0 && h.days === 0 && h.hours === 0 && h.minutes === 0 && h.seconds === 0 && "0"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <CalculatorInfo calculatorId="timeDiff" />
        </div>
    );
};

export default TimeDifferenceCalculator;
