import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
    return useContext(CurrencyContext);
};

export const CurrencyProvider = ({ children }) => {
    // Default to USD if no saved preference
    const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem('site_builder_currency');
        return saved || 'USD';
    });

    const [rates, setRates] = useState({ USD: 1, KRW: 1350, EUR: 0.92, JPY: 150, CNY: 7.2, INR: 83, RUB: 92, CHF: 0.9 });
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await response.json();
                setRates(data.rates);
                setLastUpdated(data.date);
            } catch (error) {
                console.error('Failed to fetch rates:', error);
            }
        };
        fetchRates();
        // Refresh every hour
        const interval = setInterval(fetchRates, 3600000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem('site_builder_currency', currency);
    }, [currency]);

    const currencies = {
        USD: { symbol: '$', label: 'USD ($)', locale: 'en-US', rate: rates.USD || 1 },
        KRW: { symbol: '₩', label: 'KRW (₩)', locale: 'ko-KR', rate: rates.KRW || 1350 },
        EUR: { symbol: '€', label: 'EUR (€)', locale: 'de-DE', rate: rates.EUR || 0.92 },
        JPY: { symbol: '¥', label: 'JPY (¥)', locale: 'ja-JP', rate: rates.JPY || 150 },
        CNY: { symbol: '¥', label: 'CNY (元)', locale: 'zh-CN', rate: rates.CNY || 7.2 },
        INR: { symbol: '₹', label: 'INR (₹)', locale: 'en-IN', rate: rates.INR || 83 },
        RUB: { symbol: '₽', label: 'RUB (₽)', locale: 'ru-RU', rate: rates.RUB || 92 },
        CHF: { symbol: 'Fr', label: 'CHF (Fr)', locale: 'de-CH', rate: rates.CHF || 0.9 },
    };

    const formatAmount = (amount) => {
        if (amount === null || amount === undefined || isNaN(amount)) return '';
        const { locale } = currencies[currency];
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Helper to get just the symbol
    const symbol = currencies[currency].symbol;

    // Convert amount from base (USD assumed for rates) to selected currency
    const convert = (amount, fromCurrency, toCurrency) => {
        const fromRate = rates[fromCurrency] || 1;
        const toRate = rates[toCurrency] || 1;
        return (amount / fromRate) * toRate;
    };

    const value = {
        currency,
        setCurrency,
        currencies,
        formatAmount,
        symbol,
        convert,
        rates,
        lastUpdated
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
