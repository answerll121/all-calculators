import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp } from 'lucide-react';
import useScrollToHash from '../hooks/useScrollToHash';
import SEO from '../components/common/SEO';
import LoanCalculator from '../components/calculators/finance/LoanCalculator';
import SavingsCalculator from '../components/calculators/finance/SavingsCalculator';
import DepositCalculator from '../components/calculators/finance/DepositCalculator';
import SalaryCalculator from '../components/calculators/finance/SalaryCalculator';
import SeveranceCalculator from '../components/calculators/finance/SeveranceCalculator';
import RealEstateCalculator from '../components/calculators/finance/RealEstateCalculator';
import StockCalculator from '../components/calculators/finance/StockCalculator';
import ExchangeCalculator from '../components/calculators/finance/ExchangeCalculator';
import InflationCalculator from '../components/calculators/finance/InflationCalculator';
import GiftTaxCalculator from '../components/calculators/finance/GiftTaxCalculator';
import MarginCalculator from '../components/calculators/finance/MarginCalculator';
import SalaryHourlyCalculator from '../components/calculators/finance/SalaryHourlyCalculator';
import Retirement401kCalculator from '../components/calculators/finance/Retirement401kCalculator';
import RothIraCalculator from '../components/calculators/finance/RothIraCalculator';
import CompoundInterestCalculator from '../components/calculators/finance/CompoundInterestCalculator';
import CreditCardPayoffCalculator from '../components/calculators/finance/CreditCardPayoffCalculator';
import ErrorBoundary from '../components/common/ErrorBoundary';

const FinanceCalculator = () => {
    const { t } = useTranslation();
    useScrollToHash();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": t('calc_loan'),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Calculate monthly payments and total interest for various loan types."
                }
            },
            {
                "@type": "Question",
                "name": t('calc_salary'),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Estimate your net income after tax deductions."
                }
            }
        ]
    };

    return (
        <div className="space-y-8">
            <SEO
                title={t('category_finance')}
                description="Comprehensive financial calculators for loans, salary, savings, and investment."
                keywords="finance calculator, loan calculator, salary calculator, investment calculator"
                schema={jsonLd}
            />
            <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('category_finance')}</h1>
            </div>

            {/* Featured / Complex Calculators - Wider Layout */}
            <div className="space-y-6">
                <div id="401k"><ErrorBoundary><Retirement401kCalculator /></ErrorBoundary></div>
                <div id="roth"><ErrorBoundary><RothIraCalculator /></ErrorBoundary></div>
                <div id="salary_hourly"><ErrorBoundary><SalaryHourlyCalculator /></ErrorBoundary></div>
            </div>

            <div className="masonry-grid">
                <div id="loan" className="break-inside-avoid mb-6"><ErrorBoundary><LoanCalculator /></ErrorBoundary></div>
                <div id="savings" className="break-inside-avoid mb-6"><ErrorBoundary><SavingsCalculator /></ErrorBoundary></div>
                <div id="deposit" className="break-inside-avoid mb-6"><ErrorBoundary><DepositCalculator /></ErrorBoundary></div>
                <div id="salary" className="break-inside-avoid mb-6"><ErrorBoundary><SalaryCalculator /></ErrorBoundary></div>
                <div id="margin" className="break-inside-avoid mb-6"><ErrorBoundary><MarginCalculator /></ErrorBoundary></div>
                <div id="severance" className="break-inside-avoid mb-6"><ErrorBoundary><SeveranceCalculator /></ErrorBoundary></div>
                <div id="estate" className="break-inside-avoid mb-6"><ErrorBoundary><RealEstateCalculator /></ErrorBoundary></div>
                <div id="stock" className="break-inside-avoid mb-6"><ErrorBoundary><StockCalculator /></ErrorBoundary></div>
                <div id="exchange" className="break-inside-avoid mb-6"><ErrorBoundary><ExchangeCalculator /></ErrorBoundary></div>
                <div id="inflation" className="break-inside-avoid mb-6"><ErrorBoundary><InflationCalculator /></ErrorBoundary></div>
                <div id="gift" className="break-inside-avoid mb-6"><ErrorBoundary><GiftTaxCalculator /></ErrorBoundary></div>
                <div id="compound" className="break-inside-avoid mb-6"><ErrorBoundary><CompoundInterestCalculator /></ErrorBoundary></div>
                <div id="cc_payoff" className="break-inside-avoid mb-6"><ErrorBoundary><CreditCardPayoffCalculator /></ErrorBoundary></div>
            </div>
        </div>
    );
};

export default FinanceCalculator;


