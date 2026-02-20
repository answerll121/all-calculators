import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useFavorites } from '../../../context/FavoritesContext';
import { ArrowRightLeft, RefreshCw, Star } from 'lucide-react';

const ExchangeCalculator = () => {
    const { t } = useTranslation();
    const { rates, lastUpdated } = useCurrency();
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const [amount, setAmount] = useState(100);
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('KRW');
    const [result, setResult] = useState(null);

    // Sort currencies for better UX
    const availableCurrencies = Object.keys(rates).sort();

    const calculate = () => {
        if (!rates[from] || !rates[to]) return;
        const inUSD = amount / rates[from];
        const final = inUSD * rates[to];
        setResult(final);
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
                            <ArrowRightLeft size={24} />
                        </div>
                        {t('calc_exchange')}
                    </h3>
                    <button
                        onClick={() => toggleFavorite('exchange')}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <Star
                            size={20}
                            className={isFavorite('exchange') ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"}
                        />
                    </button>
                </div>
                {lastUpdated && (
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-400 flex items-center gap-1.5 font-medium" title="Last Updated">
                        <RefreshCw size={12} />
                        {lastUpdated}
                    </div>
                )}
            </div>

            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-600 dark:text-gray-300 ml-1">{t('label_quantity')}</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full p-5 bg-gray-50 dark:bg-gray-900 border-0 rounded-[20px] text-2xl font-bold focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-gray-800 transition-all dark:text-white shadow-inner"
                        placeholder="0"
                    />
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <select
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-0 rounded-[20px] font-semibold text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none text-center"
                    >
                        {availableCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <div className="text-gray-300 dark:text-gray-600">
                        <ArrowRightLeft size={24} />
                    </div>

                    <select
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-0 rounded-[20px] font-semibold text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none text-center"
                    >
                        {availableCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold py-5 rounded-[24px] transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                    {t('label_calculate')}
                </button>

                {result !== null && (
                    <div className="mt-8 p-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[32px] text-center text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>

                        <div className="relative z-10">
                            <div className="text-blue-100 mb-2 font-medium bg-white/10 inline-block px-4 py-1 rounded-full text-sm backdrop-blur-sm">
                                {amount} {from} =
                            </div>
                            <div className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight">
                                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                <span className="text-2xl ml-2 opacity-80 font-semibold">{to}</span>
                            </div>
                            <div className="text-sm text-blue-100 mt-4 opacity-75 font-medium">
                                1 {from} = {(rates[to] / rates[from]).toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ExchangeCalculator;
