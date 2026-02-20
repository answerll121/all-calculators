import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';

const StockCalculator = () => {
    const { t } = useTranslation();
    const { symbol } = useCurrency();
    const [buyPrice, setBuyPrice] = useState(10000);
    const [quantity, setQuantity] = useState(100);
    const [sellPrice, setSellPrice] = useState(11000);
    const [feePercent, setFeePercent] = useState(0.015);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const totalBuy = buyPrice * quantity;
        const totalSell = sellPrice * quantity;
        const fees = (totalBuy + totalSell) * (feePercent / 100);
        const profit = totalSell - totalBuy - fees;
        const yieldPercent = (profit / totalBuy) * 100;

        setResult({
            profit: Math.round(profit),
            yield: yieldPercent.toFixed(2),
            fees: Math.round(fees)
        });
    };



    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_stock')} id="stock" />
            <div className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_buy_price')}</label>
                        <div className="relative">
                            <input type="number" value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))} className="w-full p-2 pr-8 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            <span className="absolute right-2 top-2 text-gray-500 text-sm">{symbol}</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_quantity')}</label>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_sell_price')}</label>
                        <div className="relative">
                            <input type="number" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} className="w-full p-2 pr-8 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            <span className="absolute right-2 top-2 text-gray-500 text-sm">{symbol}</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">{t('label_fee_percent')}</label>
                        <div className="relative">
                            <input type="number" step="0.001" value={feePercent} onChange={(e) => setFeePercent(Number(e.target.value))} className="w-full p-2 pr-8 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            <span className="absolute right-2 top-2 text-gray-500 text-sm">%</span>
                        </div>
                    </div>
                </div>
                <button onClick={calculate} className="w-full py-5 md:py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-[24px] shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm space-y-1">
                        <p className={`font-bold text-lg ${result.profit >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                            {result.profit > 0 ? '+' : ''}{symbol}{result.profit.toLocaleString()} ({result.yield}%)
                        </p>
                        <p className="text-gray-400 text-xs">{t('label_fees')}: {symbol}{result.fees.toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default StockCalculator;
