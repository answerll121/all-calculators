import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import { useCurrency } from '../../../context/CurrencyContext';

const VATCalculator = () => {
    const { t } = useTranslation();
    const { symbol } = useCurrency();
    const [amount, setAmount] = useState(10000);
    const [rate, setRate] = useState(10);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        calculate(false);
    }, [amount, rate]);

    const calculate = (addToHistory) => {
        if (!amount || !rate) return;

        const vat = amount * (rate / 100);
        const total = amount + vat;

        const formattedTotal = new Intl.NumberFormat().format(Math.round(total));
        const formattedVAT = new Intl.NumberFormat().format(Math.round(vat));

        setResult({
            vat: formattedVAT,
            total: formattedTotal
        });

        if (addToHistory) {
            setHistory(prev => [{
                summary: t('summary_vat_calc', { rate, amount: `${symbol}${new Intl.NumberFormat().format(amount)}` }),
                result: `${symbol}${formattedTotal}`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setAmount(10000);
        setRate(10);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_vat')} id="vat" />
            <div className="space-y-4">
                <NumberInput label={t('label_supply_price')} value={amount} onChange={setAmount} unit={symbol} />
                <NumberInput label={t('label_vat_rate')} value={rate} onChange={setRate} unit="%" />

                <button onClick={() => calculate(true)} className="w-full py-5 md:py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold rounded-[24px] shadow-lg shadow-violet-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <ResultCard
                        title={t('label_total_price')}
                        value={result.total}
                        unit={symbol}
                        subText={`${t('label_vat_amount')}: ${result.vat} ${symbol}`}
                        onReset={handleReset}
                        relatedLinks={[{ label: t('calc_unit_price'), url: '/math' }]}
                    />
                )}
                <HistoryPanel history={history} />
            </div>
            <CalculatorInfo calculatorId="vat" />
        </div>
    );
};
export default VATCalculator;
