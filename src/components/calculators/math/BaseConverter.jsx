import React, { useState } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';

const BaseConverter = () => {
    const { t } = useTranslation();
    const [input, setInput] = useState('10');
    const [fromBase, setFromBase] = useState(10);
    const [toBase, setToBase] = useState(2);
    const [result, setResult] = useState(null);

    const calculate = () => {
        try {
            const decimal = parseInt(input, fromBase);
            if (isNaN(decimal)) {
                setResult(t('msg_invalid_input'));
                return;
            }
            const converted = decimal.toString(toBase).toUpperCase();
            setResult(converted);
        } catch (e) {
            setResult(t('msg_error'));
        }
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_base')} id="base" />
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t('label_number')}</label>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_from_base')}</label>
                        <select value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                            <option value="2">{t('base_binary')}</option>
                            <option value="8">{t('base_octal')}</option>
                            <option value="10">{t('base_decimal')}</option>
                            <option value="16">{t('base_hex')}</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_to_base')}</label>
                        <select value={toBase} onChange={(e) => setToBase(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                            <option value="2">{t('base_binary')}</option>
                            <option value="8">{t('base_octal')}</option>
                            <option value="10">{t('base_decimal')}</option>
                            <option value="16">{t('base_hex')}</option>
                        </select>
                    </div>
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-slate-500 to-zinc-600 hover:from-slate-600 hover:to-zinc-700 text-white font-bold rounded-[24px] shadow-lg shadow-slate-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="font-bold text-xl text-blue-600 dark:text-blue-400 break-all">{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default BaseConverter;
