import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';
import NumberInput from '../../common/NumberInput';

const GiftTaxCalculator = () => {
    const { t } = useTranslation();
    const { symbol, currency } = useCurrency();
    const [country, setCountry] = useState('KR');
    const [amount, setAmount] = useState(100000000);
    const [relationship, setRelationship] = useState('adult_child');
    // US specific
    const [lifetimeUsed, setLifetimeUsed] = useState(0);

    const [result, setResult] = useState(null);

    useEffect(() => {
        if (currency === 'KRW') setCountry('KR');
        else if (currency === 'USD') setCountry('US');
        else setCountry('Other');
    }, [currency]);

    const calculate = () => {
        let tax = 0;
        let deduction = 0;
        let message = "";

        if (country === 'KR') {
            if (relationship === 'spouse') deduction = 600000000;
            else if (relationship === 'adult_child') deduction = 50000000;
            else if (relationship === 'minor_child') deduction = 20000000;
            else if (relationship === 'other') deduction = 10000000;

            const taxable = Math.max(0, amount - deduction);
            let rawTax = 0;

            if (taxable <= 100000000) rawTax = taxable * 0.1;
            else if (taxable <= 500000000) rawTax = taxable * 0.2 - 10000000;
            else if (taxable <= 1000000000) rawTax = taxable * 0.3 - 60000000;
            else if (taxable <= 3000000000) rawTax = taxable * 0.4 - 160000000;
            else rawTax = taxable * 0.5 - 460000000;

            tax = rawTax * 0.97; // 3% credit
        } else if (country === 'US') {
            // 2024 Annual Exclusion $18,000
            const annualExclusion = 18000;
            const taxableYear = Math.max(0, amount - annualExclusion);
            deduction = annualExclusion;

            if (taxableYear > 0) {
                // Check Lifetime Exemption (approx $13.61M)
                const lifetimeLimit = 13610000;
                const remainingExemption = Math.max(0, lifetimeLimit - lifetimeUsed);

                if (taxableYear <= remainingExemption) {
                    tax = 0;
                    message = t('msg_us_gift_note') + ` ($${remainingExemption.toLocaleString()} ${t('label_remaining_lifetime', { defaultValue: 'remaining lifetime' })})`;
                } else {
                    const taxableExcess = taxableYear - remainingExemption;
                    // Simplified max rate 40% for excess
                    tax = taxableExcess * 0.40;
                    message = t('msg_lifetime_exceeded', { defaultValue: 'Lifetime exemption exceeded.' });
                }
            } else {
                message = t('msg_within_exclusion', { defaultValue: 'Within annual exclusion.' });
            }
        } else {
            // Generic 20%
            tax = amount * 0.20;
        }

        setResult({
            tax: Math.round(tax),
            deduction: deduction,
            message
        });
    };



    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_gift')} id="gift" />

            <div className="flex gap-2 mb-4 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                {['KR', 'US', 'Other'].map(c => (
                    <button
                        key={c}
                        onClick={() => setCountry(c)}
                        className={`flex-1 py-1 rounded-lg font-bold text-sm transition-all ${country === c ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        {c === 'KR' ? t('country_kr', { defaultValue: 'Korea' }).split(' ')[0] : c === 'US' ? t('country_us', { defaultValue: 'USA' }).split(' ')[0] : t('rel_other', { defaultValue: 'General' }).split(' ')[0]}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <NumberInput
                    label={t('label_gift_amount')}
                    value={amount}
                    onChange={setAmount}
                    unit={symbol}
                />

                {country === 'KR' && (
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('label_relationship')}</label>
                        <select value={relationship} onChange={(e) => setRelationship(e.target.value)} className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="spouse">{t('rel_spouse')}</option>
                            <option value="adult_child">{t('rel_adult_child')}</option>
                            <option value="minor_child">{t('rel_minor_child')}</option>
                            <option value="other">{t('rel_other')}</option>
                        </select>
                    </div>
                )}

                {country === 'US' && (
                    <NumberInput
                        label={t('label_lifetime_used')}
                        value={lifetimeUsed}
                        onChange={setLifetimeUsed}
                        unit={symbol}
                    />
                )}

                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-[24px] shadow-lg shadow-pink-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-center">
                        <p className="text-sm text-gray-500 font-medium">{t('label_estimated_tax')}</p>
                        <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{symbol}{result.tax.toLocaleString()}</p>
                        {country === 'KR' && <p className="text-xs text-gray-400 mt-1">{t('label_deduction_applied')}: {symbol}{result.deduction.toLocaleString()}</p>}
                        {result.message && <p className="text-xs text-orange-500 mt-1">{result.message}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};
export default GiftTaxCalculator;
