import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';
import NumberInput from '../../common/NumberInput';

const RealEstateCalculator = () => {
    const { t } = useTranslation();
    const { symbol, currency } = useCurrency();
    const [country, setCountry] = useState('KR');
    const [price, setPrice] = useState(500000000);
    const [isMultiHome, setIsMultiHome] = useState(false);
    const [closingCostRate, setClosingCostRate] = useState(2.0); // US/Other

    const [result, setResult] = useState(null);

    useEffect(() => {
        if (currency === 'KRW') setCountry('KR');
        else if (currency === 'USD') setCountry('US');
        else setCountry('Other');
    }, [currency]);

    const calculate = () => {
        let tax = 0;

        if (country === 'KR') {
            // KR Acquisition Tax
            let rate = 0.011; // Basic 1.1%
            if (price > 600000000 && price <= 900000000) rate = 0.022;
            if (price > 900000000) rate = 0.033;
            if (isMultiHome) rate = 0.084; // 2+ home penalty

            tax = price * rate;
        } else {
            // US/Other: Closing Costs (Transfer Tax + Fees)
            tax = price * (closingCostRate / 100);
        }

        setResult(Math.round(tax));
    };



    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_estate')} id="estate" />

            <div className="flex gap-2 mb-4 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                {['KR', 'US', 'Other'].map(c => (
                    <button
                        key={c}
                        onClick={() => setCountry(c)}
                        className={`flex-1 py-1 rounded-lg font-bold text-sm transition-all ${country === c ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        {c === 'KR' ? 'Korea' : c === 'US' ? 'USA' : 'General'}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <NumberInput
                    label={t('label_property_price')}
                    value={price}
                    onChange={setPrice}
                    unit={symbol}
                />

                {country === 'KR' && (
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={isMultiHome} onChange={(e) => setIsMultiHome(e.target.checked)} id="multi" className="w-4 h-4" />
                        <label htmlFor="multi" className="text-sm dark:text-gray-300">{t('label_multi_home')}</label>
                    </div>
                )}

                {country !== 'KR' && (
                    <NumberInput
                        label={t('label_closing_cost')}
                        value={closingCostRate}
                        onChange={setClosingCostRate}
                        unit="%"
                    />
                )}

                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-[24px] shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                        <p className="font-semibold text-lg text-blue-600 dark:text-blue-400">{t('label_total_tax')}: {symbol}{result.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-1">* {country === 'KR' ? t('msg_estate_note') : "Estimated Closing Costs"}</p>
                    </div>
                )}
            </div>
            <CalculatorInfo calculatorId="estate" />
        </div>
    );
};
export default RealEstateCalculator;
