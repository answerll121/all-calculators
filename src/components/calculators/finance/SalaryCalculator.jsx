import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CalculatorInfo from '../../CalculatorInfo';

import NumberInput from '../../common/NumberInput';
import ResultCard from '../../common/ResultCard';
import HistoryPanel from '../../common/HistoryPanel';
import { useCurrency } from '../../../context/CurrencyContext';
import CalculatorTitle from '../../common/CalculatorTitle';

const SalaryCalculator = () => {
    const { t } = useTranslation();
    const { symbol, currency } = useCurrency();
    const [country, setCountry] = useState('KR');
    const [annualSalary, setAnnualSalary] = useState(30000000);
    const [nonTaxable, setNonTaxable] = useState(200000); // KR specific
    const [dependents, setDependents] = useState(1); // KR specific
    const [stateTaxRate, setStateTaxRate] = useState(0); // US specific
    const [genericTaxRate, setGenericTaxRate] = useState(20); // Other specific

    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    // Auto-detect country based on currency
    useEffect(() => {
        if (currency === 'KRW') setCountry('KR');
        else if (currency === 'USD') setCountry('US');
        else setCountry('Other');
    }, [currency]);

    useEffect(() => {
        calculate(false);
    }, [annualSalary, nonTaxable, dependents, country, stateTaxRate, genericTaxRate]);

    const calculateKR = (salary) => {
        // 1. National Pension (4.5%, Max monthly share 248,850 approx, max income 5.53M)
        // 2024 Max Monthly Income Base: 5,900,000 KRW -> Max Pension: 265,500 KRW
        const monthlyIncome = salary / 12;
        const taxableIncome = monthlyIncome - nonTaxable;

        let pension = taxableIncome * 0.045;
        if (pension > 265500) pension = 265500;

        // 2. Health Insurance (3.545%)
        const health = taxableIncome * 0.03545;

        // 3. Long-term Care (12.95% of Health)
        const care = health * 0.1295;

        // 4. Employment Insurance (0.9%)
        const emp = taxableIncome * 0.009;

        // 5. Income Tax (Simplified Logic based on Earned Income Deduction & Brackets)
        // Earned Income Deduction
        let earnedDeduction = 0;
        if (salary <= 5000000) earnedDeduction = salary * 0.7;
        else if (salary <= 15000000) earnedDeduction = 3500000 + (salary - 5000000) * 0.4;
        else if (salary <= 45000000) earnedDeduction = 7500000 + (salary - 15000000) * 0.15;
        else if (salary <= 100000000) earnedDeduction = 12000000 + (salary - 45000000) * 0.05;
        else earnedDeduction = 14750000 + (salary - 100000000) * 0.02;

        // Basic Defuction
        const personalDeduction = dependents * 1500000;

        const taxBase = salary - earnedDeduction - personalDeduction - (pension + health + emp) * 12; // Approximation of deduction

        // Tax Brackets 2024
        let yearTax = 0;
        if (taxBase <= 14000000) yearTax = taxBase * 0.06;
        else if (taxBase <= 50000000) yearTax = 840000 + (taxBase - 14000000) * 0.15;
        else if (taxBase <= 88000000) yearTax = 6240000 + (taxBase - 50000000) * 0.24;
        else if (taxBase <= 150000000) yearTax = 15360000 + (taxBase - 88000000) * 0.35;
        else yearTax = 37060000 + (taxBase - 150000000) * 0.38; // Cap at 38% for logic simplicity

        const monthlyTax = Math.max(0, yearTax / 12);
        const localTax = monthlyTax * 0.1;

        return {
            pension, health, care, emp, incomeTax: monthlyTax, localTax,
            total: pension + health + care + emp + monthlyTax + localTax
        };
    };

    const calculateUS = (salary) => {
        // Federal Tax Brackets 2024 (Single)
        const standardDeduction = 14600;
        const taxable = Math.max(0, salary - standardDeduction);

        let federalTax = 0;
        if (taxable <= 11600) federalTax = taxable * 0.10;
        else if (taxable <= 47150) federalTax = 1160 + (taxable - 11600) * 0.12;
        else if (taxable <= 100525) federalTax = 5426 + (taxable - 47150) * 0.22;
        else if (taxable <= 191950) federalTax = 17168.5 + (taxable - 100525) * 0.24;
        else if (taxable <= 243725) federalTax = 39110.5 + (taxable - 191950) * 0.32;
        else if (taxable <= 609350) federalTax = 55678.5 + (taxable - 243725) * 0.35;
        else federalTax = 183647.25 + (taxable - 609350) * 0.37;

        // FICA
        // Social Security: 6.2% on first $168,600
        const ssLimit = 168600;
        const ssTax = Math.min(salary, ssLimit) * 0.062;

        // Medicare: 1.45% all + 0.9% over $200k
        let medicareTax = salary * 0.0145;
        if (salary > 200000) medicareTax += (salary - 200000) * 0.009;

        // State Tax
        const stTax = salary * (stateTaxRate / 100);

        const annualTotalTax = federalTax + ssTax + medicareTax + stTax;

        return {
            federal: federalTax / 12,
            socialSecurity: ssTax / 12,
            medicare: medicareTax / 12,
            state: stTax / 12,
            total: annualTotalTax / 12
        };
    };

    const calculate = (addToHistory) => {
        if (!annualSalary) return;

        let deductions = {};
        let monthlyNet = 0;
        const monthlyGross = annualSalary / 12;

        if (country === 'KR') {
            deductions = calculateKR(annualSalary);
        } else if (country === 'US') {
            deductions = calculateUS(annualSalary);
        } else {
            // Generic
            const tax = monthlyGross * (genericTaxRate / 100);
            deductions = { total: tax };
        }

        monthlyNet = monthlyGross - deductions.total;

        const formattedNet = new Intl.NumberFormat().format(Math.round(monthlyNet));
        const formattedDeduct = new Intl.NumberFormat().format(Math.round(deductions.total));

        setResult({
            net: formattedNet,
            gross: new Intl.NumberFormat().format(Math.round(monthlyGross)),
            deduct: formattedDeduct,
            details: deductions
        });

        if (addToHistory) {
            setHistory(prev => [{
                summary: `${t('calc_salary')} (${country}): ${symbol}${new Intl.NumberFormat().format(annualSalary)}`,
                result: `${symbol}${formattedNet} / mo`
            }, ...prev].slice(0, 5));
        }
    };

    const handleReset = () => {
        setAnnualSalary(30000000);
        setNonTaxable(200000);
    };



    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-[32px] shadow-[var(--shadow-soft)] border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_salary')} id="salary" />

            {/* Country Selector */}
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
                    label={country === 'US' ? "Annual Salary (Gross)" : t('label_principal').replace('Principal', 'Annual Salary')}
                    value={annualSalary}
                    onChange={setAnnualSalary}
                    unit={symbol}
                />

                {country === 'KR' && (
                    <>
                        <NumberInput
                            label="Non-taxable Income (Mo)"
                            value={nonTaxable}
                            onChange={setNonTaxable}
                            unit={symbol}
                        />
                        <NumberInput
                            label="Dependents (Count)"
                            value={dependents}
                            onChange={setDependents}
                            unit="Ppl"
                        />
                    </>
                )}

                {country === 'US' && (
                    <NumberInput
                        label="State Tax Rate"
                        value={stateTaxRate}
                        onChange={setStateTaxRate}
                        unit="%"
                        max={15}
                    />
                )}

                {country === 'Other' && (
                    <NumberInput
                        label="Estimated Tax Rate"
                        value={genericTaxRate}
                        onChange={setGenericTaxRate}
                        unit="%"
                        max={100}
                    />
                )}

                <button onClick={() => calculate(true)} className="w-full py-5 md:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-[24px] shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]">{t('label_calculate')}</button>

                {result && (
                    <ResultCard
                        title="Monthly Net Pay"
                        value={result.net}
                        unit={symbol}
                        subText={`Gross: ${symbol}${result.gross} - Tax: ${symbol}${result.deduct}`}
                        onReset={handleReset}
                        relatedLinks={[{ label: t('calc_severance'), url: '/finance' }]}
                    >
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm space-y-1">
                            {country === 'KR' && (
                                <>
                                    <div className="flex justify-between"><span>National Pension</span><span>-{Math.round(result.details.pension).toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span>Health Ins.</span><span>-{Math.round(result.details.health).toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span>Care Ins.</span><span>-{Math.round(result.details.care).toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span>Employment Ins.</span><span>-{Math.round(result.details.emp).toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span>Income Tax</span><span>-{Math.round(result.details.incomeTax).toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span>Local Tax</span><span>-{Math.round(result.details.localTax).toLocaleString()}</span></div>
                                </>
                            )}
                            {country === 'US' && (
                                <>
                                    <div className="flex justify-between"><span>Federal Tax</span><span>-{Math.round(result.details.federal).toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span>Social Security</span><span>-{Math.round(result.details.socialSecurity).toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span>Medicare</span><span>-{Math.round(result.details.medicare).toLocaleString()}</span></div>
                                    <div className="flex justify-between"><span>State Tax</span><span>-{Math.round(result.details.state).toLocaleString()}</span></div>
                                </>
                            )}
                        </div>
                    </ResultCard>
                )}
                <HistoryPanel history={history} />
            </div>
            <CalculatorInfo calculatorId="salary" />
        </div>
    );
};
export default SalaryCalculator;
