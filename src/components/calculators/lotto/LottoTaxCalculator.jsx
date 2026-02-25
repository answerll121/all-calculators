import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import { useCurrency } from '../../../context/CurrencyContext';
import { Calculator, Globe, DollarSign, Wallet } from 'lucide-react';

const LottoTaxCalculator = () => {
    const { t } = useTranslation();
    const { formatAmount, symbol } = useCurrency();

    const [country, setCountry] = useState('KR');
    const [amount, setAmount] = useState(1000000000); // Default 1 Billion for KR context
    const [result, setResult] = useState(null);

    const countries = [
        { code: 'KR', name: t('country_kr'), currency: '₩' },
        { code: 'US', name: t('country_us'), currency: '$' },
        { code: 'JP', name: t('country_jp'), currency: '¥' },
        { code: 'CN', name: t('country_cn'), currency: '¥' },
        { code: 'EU_FREE', name: t('country_eu_free'), currency: '€' }, // UK, France, Germany (Lotto)
        { code: 'EU_TAX', name: t('country_eu_tax'), currency: '€' }, // Spain, Italy, etc.
    ];

    const calculateTax = () => {
        const gross = parseFloat(amount);
        if (isNaN(gross) || gross < 0) return;

        let tax = 0;
        let taxRateDisplay = '';
        let warning = '';

        switch (country) {
            case 'KR':
                // <= 2M: 0%
                // > 2M ~ 300M: 22%
                // > 300M: 33%
                if (gross <= 2000000) {
                    tax = 0;
                    taxRateDisplay = t('tax_free');
                } else if (gross <= 300000000) {
                    tax = (gross - 2000000) * 0.22;
                    taxRateDisplay = t('tax_over_limit', { rate: '22', limit: '2M' });
                } else {
                    // First 2M is free
                    // Next 298M (300M - 2M) is 22%
                    // Excess over 300M is 33%
                    const taxTier1 = (300000000 - 2000000) * 0.22;
                    const taxTier2 = (gross - 300000000) * 0.33;
                    tax = taxTier1 + taxTier2;
                    taxRateDisplay = t('tax_tiered_kr');
                }
                break;

            case 'US':
                // Federal 37% + State Estimate 5% = 42%
                // Simplified for high winnings
                tax = gross * 0.42;
                taxRateDisplay = t('tax_us_est');
                warning = t('msg_us_tax_warning');
                break;

            case 'JP':
                tax = 0;
                taxRateDisplay = t('tax_free');
                break;

            case 'CN':
                // 20% on > 10,000 RMB
                if (gross > 10000) {
                    tax = gross * 0.20;
                    taxRateDisplay = t('tax_rate_simple', { rate: '20' });
                } else {
                    tax = 0;
                    taxRateDisplay = t('tax_less_than_limit', { limit: '10k' });
                }
                break;

            case 'EU_FREE':
                tax = 0;
                taxRateDisplay = t('tax_free');
                break;

            case 'EU_TAX':
                // Spain: 20% on > ??0,000
                const exempt = 40000;
                if (gross > exempt) {
                    tax = (gross - exempt) * 0.20;
                    taxRateDisplay = t('tax_over_limit', { rate: '20', limit: '??0k' });
                } else {
                    tax = 0;
                    taxRateDisplay = t('tax_less_than_limit', { limit: '??0k' });
                }
                break;

            default:
                tax = 0;
        }

        const net = gross - tax;

        setResult({
            gross,
            tax,
            net,
            taxRateDisplay,
            warning
        });
    };

    useEffect(() => {
        calculateTax();
    }, [amount, country]);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_lotto_tax')} id="lotto_tax" icon={<Calculator className="text-amber-500" />} />

            <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_country')}</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                                >
                                    {countries.map(c => (
                                        <option key={c.code} value={c.code}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('label_winning_amount')}</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{t('msg_enter_raw_amount')}</p>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl">
                        {result && (
                            <div className="space-y-4">
                                <div className="text-center pb-4 border-b border-amber-200 dark:border-amber-800">
                                    <p className="text-sm text-amber-600 dark:text-amber-400 mb-1 font-medium">{t('label_net_amount')}</p>
                                    <p className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100 break-words">
                                        {result.gross > 1000000000000 ? 'Too Large' : formatAmount(result.net)}
                                        {/* Fallback formatting if currency context is mixed, but simple component logic preferred */}
                                    </p>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">{t('label_gross_amount')}</span>
                                        <span className="font-semibold text-gray-900 dark:text-gray-200">{formatAmount(result.gross)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-500 dark:text-gray-400">{t('label_tax_amount')}</span>
                                            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 px-2 py-0.5 rounded-full">{result.taxRateDisplay}</span>
                                        </div>
                                        <span className="font-semibold text-red-600 dark:text-red-400">-{formatAmount(result.tax)}</span>
                                    </div>
                                </div>

                                {result.warning && (
                                    <div className="text-xs text-center text-orange-600 dark:text-orange-400 italic bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mt-2">
                                        {result.warning}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-xs text-gray-400 text-center">
                    {t('msg_tax_disclaimer')}
                </p>
            </div>
            <CalculatorInfo calculatorId="lottoTax" />
        </div>
    );
};

export default LottoTaxCalculator;
