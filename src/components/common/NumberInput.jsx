import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, AlertCircle } from 'lucide-react';

const NumberInput = ({ label, value, onChange, min = 0, max, step = 1, placeholder, unit, error }) => {
    const { t } = useTranslation();
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        if (value === '' || value === null || isNaN(value)) {
            setDisplayValue('');
        } else {
            setDisplayValue(new Intl.NumberFormat('en-US').format(value));
        }
    }, [value]);

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        if (rawValue === '' || rawValue === '-') {
            setDisplayValue(e.target.value);
            onChange('');
            return;
        }

        const numValue = parseFloat(rawValue);
        if (!isNaN(numValue)) {
            onChange(numValue);
        }
    };

    const adjustValue = (amount) => {
        const current = parseFloat(value) || 0;
        const newValue = current + amount;
        if (min !== undefined && newValue < min) return;
        if (max !== undefined && newValue > max) return;
        onChange(newValue);
    };

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{label}</label>}
            <div className="relative flex items-center">
                <button
                    onClick={() => adjustValue(-step)}
                    className="absolute left-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 z-10"
                    tabIndex="-1"
                >
                    <Minus size={16} />
                </button>

                <input
                    type="text"
                    inputMode="numeric"
                    value={displayValue}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const form = e.target.closest('form');
                            if (form) form.requestSubmit();
                            else {
                                // Fallback: try to find a calculate button in the same container
                                const btn = e.target.closest('div.p-4')?.querySelector('button');
                                if (btn) btn.click();
                            }
                        }
                    }}
                    className={`block w-full pl-8 pr-20 py-5 md:py-4 bg-gray-50 dark:bg-gray-900/50 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'} rounded-[20px] text-xl font-medium outline-none transition-all dark:text-white text-right shadow-sm`}
                    placeholder={placeholder || '0'}
                />

                <button
                    onClick={() => adjustValue(step)}
                    className="absolute right-8 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 z-10"
                    tabIndex="-1"
                >
                    <Plus size={16} />
                </button>

                {unit && (
                    <span className="absolute right-3 text-gray-400 text-sm pointer-events-none">
                        {unit}
                    </span>
                )}
            </div>
            {error && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-pulse">
                    <AlertCircle size={12} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default NumberInput;
