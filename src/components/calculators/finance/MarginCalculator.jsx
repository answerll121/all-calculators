import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { Calculator } from 'lucide-react';
import CalculatorTitle from '../../common/CalculatorTitle';
import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import { useCurrency } from '../../../context/CurrencyContext';

const MarginCalculator = () => {
    const { t } = useTranslation();
    const { symbol, formatAmount } = useCurrency();

    const [cost, setCost] = useState('');
    const [revenue, setRevenue] = useState('');
    const [margin, setMargin] = useState('');
    const [markup, setMarkup] = useState('');
    const [profit, setProfit] = useState(0);

    // Calculate based on inputs
    const calculate = () => {
        const c = parseFloat(cost) || 0;
        const r = parseFloat(revenue) || 0;

        if (c > 0 && r > 0) {
            const p = r - c;
            const marg = (p / r) * 100;
            const mark = (p / c) * 100;

            setProfit(p);
            setMargin(marg.toFixed(2));
            setMarkup(mark.toFixed(2));
        } else {
            setProfit(0);
            setMargin('');
            setMarkup('');
        }
    };

    useEffect(() => {
        calculate();
    }, [cost, revenue]);

    const handleReset = () => {
        setCost('');
        setRevenue('');
        setMargin('');
        setMarkup('');
        setProfit(0);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_margin')} id="margin" icon={<Calculator className="text-blue-500" />} />

            <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NumberInput
                        label={t('label_cost')}
                        value={cost}
                        onChange={setCost}
                        unit={symbol}
                    />
                    <NumberInput
                        label={t('label_revenue')}
                        value={revenue}
                        onChange={setRevenue}
                        unit={symbol}
                    />
                </div>

                {profit !== 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ResultCard
                            title={t('label_margin')}
                            value={margin}
                            unit="%"
                            color="text-blue-600 dark:text-blue-400"
                        />
                        <ResultCard
                            title={t('label_markup')}
                            value={markup}
                            unit="%"
                            color="text-purple-600 dark:text-purple-400"
                        />
                        <ResultCard
                            title={t('label_profit')}
                            value={formatAmount(profit)}
                            unit=""
                            color="text-green-600 dark:text-green-400"
                        />
                    </div>
                )}

                <div className="flex justify-end">
                    <button onClick={handleReset} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline">
                        {t('reset')}
                    </button>
                </div>
            </div>
            <CalculatorInfo calculatorId="margin" />
        </div>
    );
};

export default MarginCalculator;
