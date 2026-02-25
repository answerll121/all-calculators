import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Calculator, ArrowRightLeft, Search, TrendingUp, Heart, Sigma, Coffee, Star,
    Ticket, Ruler, Coins, Activity, Shapes, Calendar, ChevronDown, ChevronUp, Clock
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import GeneralCalculator from '../components/tools/GeneralCalculator';
import SEO from '../components/common/SEO';

const Home = () => {
    const { t } = useTranslation();
    const { favorites, toggleFavorite, isFavorite, recents } = useFavorites();
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const recentSearches = [t('calc_loan'), t('calc_bmi'), t('calc_exchange')];
    const [showMobileCalc, setShowMobileCalc] = useState(false);



    const categories = [
        { id: 'unit', label: t('category_unit'), icon: <Ruler size={24} className="text-emerald-500" />, desc: "Convert any unit instantly", color: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
        { id: 'finance', label: t('category_finance'), icon: <Coins size={24} className="text-blue-500" />, desc: "Plan your financial future", color: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
        { id: 'health', label: t('category_health'), icon: <Activity size={24} className="text-rose-500" />, desc: "Track your body stats", color: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-400" },
        { id: 'math', label: t('category_math'), icon: <Shapes size={24} className="text-amber-500" />, desc: "Solve complex problems", color: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400" },
        { id: 'lifestyle', label: t('category_lifestyle'), icon: <Coffee size={24} className="text-indigo-500" />, desc: "Everyday convenience tools", color: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400" },
        { id: 'smartfarm', label: t('category_smartfarm', 'Smart Farm'), icon: <Activity size={24} className="text-lime-500" />, desc: "Agriculture & Hydroponics", color: "bg-lime-100 dark:bg-lime-900/30", text: "text-lime-600 dark:text-lime-400" },
        { id: 'electrical', label: t('category_electrical', 'Electrical'), icon: <Activity size={24} className="text-yellow-500" />, desc: "Electrical Engineering", color: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-600 dark:text-yellow-400" },
        { id: 'lotto', label: t('category_lotto_main'), icon: <Ticket size={24} className="text-purple-500" />, desc: "Test your luck", color: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
    ];

    const allCalculators = [
        // Unit Conversion
        { id: 'length_conv', title: t('calc_length_conv'), link: '/unit#length_conv', category: 'unit', icon: <ArrowRightLeft className="text-emerald-500" />, desc: 'm, cm, mm, km, inch, ft, yd', featured: true },
        { id: 'weight_conv', title: t('calc_weight_conv'), link: '/unit#weight_conv', category: 'unit', icon: <ArrowRightLeft className="text-emerald-500" />, desc: 'kg, g, lb, oz', featured: true },
        { id: 'volume_conv', title: t('calc_volume_conv'), link: '/unit#volume_conv', category: 'unit', icon: <ArrowRightLeft className="text-emerald-500" />, desc: 'L, ml, gal, oz', featured: true },
        { id: 'area_conv', title: t('calc_area_conv'), link: '/unit#area_conv', category: 'unit', icon: <ArrowRightLeft className="text-emerald-500" />, desc: 'm², ft², pyung, acre', featured: true },

        // Finance
        { id: 'loan', title: t('calc_loan'), link: '/finance#loan', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Mortgage & Personal Loans', featured: true },
        { id: 'salary', title: t('calc_salary'), link: '/finance#salary', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Net Pay & Tax Calculator', featured: true },
        { id: 'salary_hourly', title: t('calc_salary_hourly'), link: '/finance#salary_hourly', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Salary ??Hourly Converter', featured: true },
        { id: 'margin', title: t('calc_margin'), link: '/finance#margin', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Margin & Markup', featured: false },
        { id: 'exchange', title: t('calc_exchange'), link: '/finance#exchange', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Real-time Exchange Rates', featured: true },
        { id: 'savings', title: t('calc_savings'), link: '/finance#savings', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Savings Goal Planner', featured: true },
        { id: 'deposit', title: t('calc_deposit'), link: '/finance#deposit', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Term Deposit Interest', featured: false },
        { id: 'compound', title: t('calc_compound'), link: '/finance#compound', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Compound Interest Growth', featured: true },
        { id: 'severance', title: t('calc_severance'), link: '/finance#severance', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Severance Pay', featured: false },
        { id: 'estate', title: t('calc_estate'), link: '/finance#estate', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Real Estate Tax', featured: false },
        { id: 'stock', title: t('calc_stock'), link: '/finance#stock', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Stock Return', featured: false },
        { id: 'inflation', title: t('calc_inflation'), link: '/finance#inflation', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Inflation Calculator', featured: false },
        { id: 'gift', title: t('calc_gift'), link: '/finance#gift', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Gift Tax', featured: false },
        { id: '401k', title: t('calc_401k'), link: '/finance#401k', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: '401(k) Retirement', featured: true },
        { id: 'roth', title: t('calc_roth_vs_trad'), link: '/finance#roth', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Roth vs Traditional IRA', featured: true },
        { id: 'cc_payoff', title: t('calc_cc_payoff'), link: '/finance#cc_payoff', category: 'finance', icon: <TrendingUp className="text-blue-500" />, desc: 'Credit Card Payoff', featured: false },

        // Health
        { id: 'bmi', title: t('calc_bmi'), link: '/health#bmi', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Body Mass Index', featured: true },
        { id: 'calories', title: t('calc_calories'), link: '/health#calories', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Daily Calorie Needs', featured: true },
        { id: 'tdee', title: t('calc_tdee'), link: '/health#tdee', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Total Daily Energy Expenditure', featured: true },
        { id: 'sleep', title: t('calc_sleep'), link: '/health#sleep', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Sleep Cycle Calculator', featured: true },
        { id: 'bmr', title: t('calc_bmr'), link: '/health#bmr', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Basal Metabolic Rate', featured: true },
        { id: 'ideal', title: t('calc_ideal_weight'), link: '/health#ideal', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Ideal Weight', featured: true },
        { id: 'cycle', title: t('calc_cycle'), link: '/health#cycle', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Menstrual Cycle', featured: true },
        { id: 'whr', title: t('calc_whr'), link: '/health#whr', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Waist-Hip Ratio', featured: false },
        { id: 'water', title: t('calc_water'), link: '/health#water', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Water Intake', featured: false },
        { id: 'smoking', title: t('calc_smoking'), link: '/health#smoking', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Smoking Cost', featured: false },
        { id: 'growth', title: t('calc_growth'), link: '/health#growth', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Child Growth', featured: false },
        { id: 'caffeine', title: t('calc_caffeine'), link: '/health#caffeine', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Caffeine IntakeLimit', featured: false },
        { id: 'child_obesity', title: t('calc_child_obesity'), link: '/health#child_obesity', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Child Obesity', featured: false },
        { id: 'macro', title: t('calc_macro'), link: '/health#macro', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'Macro (Mifflin-St Jeor)', featured: true },
        { id: 'bac', title: t('calc_bac'), link: '/health#bac', category: 'health', icon: <Heart className="text-rose-500" />, desc: 'BAC (Blood Alcohol)', featured: false },

        // Math
        { id: 'percent', title: t('calc_percent'), link: '/math#percent', category: 'math', icon: <Sigma className="text-amber-500" />, desc: 'Percentage Calculator', featured: true },
        { id: 'vat', title: t('calc_vat'), link: '/math#vat', category: 'math', icon: <Sigma className="text-amber-500" />, desc: 'VAT / Tax Calculator', featured: true },
        { id: 'gpa', title: t('calc_gpa'), link: '/math#gpa', category: 'math', icon: <Sigma className="text-amber-500" />, desc: 'GPA Calculator', featured: true },
        { id: 'date', title: t('calc_date'), link: '/lifestyle#date', category: 'math', icon: <Calendar className="text-amber-500" />, desc: 'Date Difference / D-Day', featured: true }, // Moved Date here as it's often mathematical
        { id: 'time', title: t('calc_time'), link: '/math#time', category: 'math', icon: <Sigma className="text-amber-500" />, desc: 'Time Difference', featured: false },
        { id: 'area', title: t('calc_area'), link: '/math#area', category: 'math', icon: <Sigma className="text-amber-500" />, desc: 'Geometric Area', featured: false },
        { id: 'volume', title: t('calc_volume'), link: '/math#volume', category: 'math', icon: <Sigma className="text-amber-500" />, desc: 'Geometric Volume', featured: false },
        { id: 'unit_price', title: t('calc_unit_price'), link: '/math#unit_price', category: 'math', icon: <Sigma className="text-amber-500" />, desc: 'Unit Price Comparison', featured: false },
        { id: 'base', title: t('calc_base'), link: '/math#base', category: 'math', icon: <Sigma className="text-amber-500" />, desc: 'Base Converter', featured: false },

        // Lifestyle
        { id: 'age', title: t('calc_age'), link: '/lifestyle#age', category: 'lifestyle', icon: <Coffee className="text-indigo-500" />, desc: 'International Age', featured: true },
        { id: 'pet_age', title: t('calc_pet_age'), link: '/lifestyle#pet_age', category: 'lifestyle', icon: <Coffee className="text-indigo-500" />, desc: 'Pet Age (Dog/Cat)', featured: true },
        { id: 'dutch', title: t('calc_dutch'), link: '/lifestyle#dutch', category: 'lifestyle', icon: <Coffee className="text-indigo-500" />, desc: 'Dutch Pay / Split Bill', featured: true },
        { id: 'military', title: t('calc_military'), link: '/lifestyle#military', category: 'lifestyle', icon: <Coffee className="text-indigo-500" />, desc: 'Military Service', featured: true },
        { id: 'size', title: t('calc_size'), link: '/lifestyle#size', category: 'lifestyle', icon: <Coffee className="text-indigo-500" />, desc: 'Shoe/Clothing Size', featured: false },
        { id: 'cooking', title: t('calc_cooking'), link: '/lifestyle#cooking', category: 'lifestyle', icon: <Coffee className="text-indigo-500" />, desc: 'Cooking Units', featured: false },
        { id: 'discount', title: t('calc_discount'), link: '/lifestyle#discount', category: 'lifestyle', icon: <Coffee className="text-indigo-500" />, desc: 'Discount Calculator', featured: false },
        { id: 'tip', title: t('calc_tip'), link: '/lifestyle#tip', category: 'lifestyle', icon: <Coffee className="text-indigo-500" />, desc: 'Tip & Split', featured: true },
        { id: 'gas', title: t('calc_gas'), link: '/lifestyle#gas', category: 'lifestyle', icon: <Coffee className="text-indigo-500" />, desc: 'Gas Cost & Trip', featured: false },

        // Lottery
        { id: 'lotto_tax', title: t('calc_lotto_tax'), link: '/lotto#lotto_tax', category: 'lotto', icon: <Ticket className="text-amber-500" />, desc: 'Net Winning Amount', featured: true },
        { id: 'lotto_kr', title: t('calc_lotto_kr'), link: '/lotto#lotto_kr', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_kr'), featured: true },
        { id: 'lotto_powerball', title: t('calc_powerball'), link: '/lotto#lotto_powerball', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_powerball'), featured: true },
        { id: 'lotto_mega', title: t('calc_mega_millions'), link: '/lotto#lotto_mega', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_mega'), featured: true },
        { id: 'lotto_jp', title: t('calc_lotto_jp'), link: '/lotto#lotto_jp', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_jp'), featured: true },
        { id: 'lotto_zh', title: t('calc_lotto_zh'), link: '/lotto#lotto_zh', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_zh'), featured: true },
        { id: 'lotto_eu_millions', title: t('calc_euro_millions'), link: '/lotto#lotto_eu_millions', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_eu_millions'), featured: true },
        { id: 'lotto_euro_jackpot', title: t('calc_euro_jackpot'), link: '/lotto#lotto_euro_jackpot', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_euro_jackpot'), featured: true },
        { id: 'lotto_superenalotto', title: t('calc_superenalotto'), link: '/lotto#lotto_superenalotto', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_superenalotto'), featured: true },
        { id: 'lotto_megasena', title: t('calc_megasena'), link: '/lotto#lotto_megasena', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_megasena'), featured: true },
        { id: 'lotto_kerala', title: t('calc_kerala'), link: '/lotto#lotto_kerala', category: 'lotto', icon: <Ticket className="text-purple-500" />, desc: t('desc_lotto_kerala'), featured: true },

        // Smart Farm
        { id: 'fertilizer', title: t('calc_fertilizer', 'Fertilizer Dilution'), link: '/smartfarm#fertilizer', category: 'smartfarm', icon: <Activity className="text-lime-500" />, desc: t('desc_fertilizer', 'Calculate exact fertilizer amount required'), featured: true },
        { id: 'vpd', title: t('calc_vpd', 'VPD Calculator'), link: '/smartfarm#vpd', category: 'smartfarm', icon: <Activity className="text-lime-500" />, desc: t('desc_vpd', 'Calculate Vapor Pressure Deficit'), featured: true },

        // Electrical
        { id: 'ohms_law', title: t('calc_ohms_law', "Ohm's Law"), link: '/electrical#ohms_law', category: 'electrical', icon: <Activity className="text-yellow-500" />, desc: t('desc_ohms_law', 'Calculate Voltage, Current, Resistance, Power'), featured: true },
        { id: 'voltage_drop', title: t('calc_voltage_drop', 'Voltage Drop & Wire Size'), link: '/electrical#voltage_drop', category: 'electrical', icon: <Activity className="text-yellow-500" />, desc: t('desc_voltage_drop', 'Calculate voltage drop and minimum wire size'), featured: true },
    ];

    const getFilteredCalculators = (categoryId) => {
        return allCalculators.filter(item => {
            const matchesCategory = categoryId === 'all' || item.category === categoryId;
            const term = searchTerm.toLowerCase();
            const matchesSearch = !term ||
                item.title.toLowerCase().includes(term) ||
                item.desc.toLowerCase().includes(term);
            return matchesCategory && matchesSearch;
        });
    };

    const toggleFav = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
    };

    const renderCalculatorCard = (item) => (
        <Link key={item.id} to={item.link} className="group flex flex-col justify-between p-5 sm:p-6 bg-white dark:bg-gray-800 rounded-[20px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 relative h-full">
            <div className="absolute top-4 right-4 z-10">
                <button onClick={(e) => toggleFav(e, item.id)} className="p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors">
                    <Heart size={20} className={isFavorite(item.id) ? "fill-rose-500 text-rose-500" : "text-gray-300 hover:text-rose-400"} />
                </button>
            </div>
            <div>
                <div className="mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-700/50 group-hover:scale-105 transition-transform duration-300">
                        {item.icon}
                    </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{item.desc}</p>
            </div>
        </Link>
    );

    // Scroll Spy Logic
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id.replace('cat-', '');
                        setActiveCategory(id);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px' } // Trigger when section is near top
        );

        categories.forEach((cat) => {
            const element = document.getElementById(`cat-${cat.id}`);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // Helper to get button style based on category and active state
    const getCategoryButtonStyle = (cat) => {
        const isActive = activeCategory === cat.id;

        // Base styles
        let style = "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 border shadow-sm hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0 ";

        // Active/Inactive Logic
        if (isActive) {
            style += "shadow-md ring-2 ring-offset-2 dark:ring-offset-gray-900 scale-105 ";
            // Specific Active Colors
            if (cat.id === 'unit') style += "bg-emerald-500 border-emerald-500 text-white ring-emerald-400";
            else if (cat.id === 'finance') style += "bg-blue-500 border-blue-500 text-white ring-blue-400";
            else if (cat.id === 'health') style += "bg-rose-500 border-rose-500 text-white ring-rose-400";
            else if (cat.id === 'math') style += "bg-amber-500 border-amber-500 text-white ring-amber-400";
            else if (cat.id === 'smartfarm') style += "bg-lime-500 border-lime-500 text-white ring-lime-400";
            else if (cat.id === 'electrical') style += "bg-yellow-500 border-yellow-500 text-white ring-yellow-400";
            else if (cat.id === 'lifestyle') style += "bg-indigo-500 border-indigo-500 text-white ring-indigo-400";
            else if (cat.id === 'lotto') style += "bg-purple-500 border-purple-500 text-white ring-purple-400";
        } else {
            // Inactive (Colorful text/bg)
            style += "bg-white dark:bg-gray-800 hover:shadow-md ";
            if (cat.id === 'unit') style += "border-emerald-200 text-emerald-600 dark:border-emerald-900/50 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20";
            else if (cat.id === 'finance') style += "border-blue-200 text-blue-600 dark:border-blue-900/50 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20";
            else if (cat.id === 'health') style += "border-rose-200 text-rose-600 dark:border-rose-900/50 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20";
            else if (cat.id === 'math') style += "border-amber-200 text-amber-600 dark:border-amber-900/50 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20";
            else if (cat.id === 'smartfarm') style += "border-lime-200 text-lime-600 dark:border-lime-900/50 dark:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/20";
            else if (cat.id === 'electrical') style += "border-yellow-200 text-yellow-600 dark:border-yellow-900/50 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20";
            else if (cat.id === 'lifestyle') style += "border-indigo-200 text-indigo-600 dark:border-indigo-900/50 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20";
            else if (cat.id === 'lotto') style += "border-purple-200 text-purple-600 dark:border-purple-900/50 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20";
        }
        return style;
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Global Calculator",
        "url": "https://busan.dev",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://busan.dev/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <SEO
                title={t('app_title')}
                fullTitle={true}
                description="Free All-in-One Calculator for Finance, Health, Math, Lifestyle, and Unit Conversions."
                keywords="free online calculator, all in one calculator, unit converter, finance calculator, health calculator, math tools, lifestyle utilities, bmi, loan calculation, savings planner"
                schema={jsonLd}
            />
            {/* Hero Section */}
            <section className="relative z-10 rounded-[32px] bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl text-white p-6 sm:p-8 md:p-12 overflow-visible">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight break-keep">{t('app_title')}</h1>
                        <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 opacity-90">{t('hero_subtitle')}</p>
                        <div className="relative max-w-lg z-50">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder={t('search_placeholder', '원하는 계산기를 검색해 보세요')}
                                value={searchTerm}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 transition-all text-base sm:text-lg"
                            />
                            {isSearchFocused && !searchTerm && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                                    <div className="p-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('label_recent_search', 'Recent Searches')}</div>
                                    {recentSearches.map((term, index) => (
                                        <button key={index} onClick={() => setSearchTerm(term)} className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Calculator Toggle Button */}
                        <div className="mt-4 lg:hidden">
                            <button
                                onClick={() => setShowMobileCalc(!showMobileCalc)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white text-sm font-medium transition-all"
                            >
                                <Calculator size={18} />
                                {showMobileCalc ? t('action_close') || 'Close Calculator' : t('action_open_calc') || 'Open Calculator'}
                            </button>
                        </div>
                    </div>

                    {/* Desktop Calculator (Always Visible) */}
                    <div className="hidden lg:block w-full max-w-xl mx-auto h-[500px]">
                        <GeneralCalculator />
                    </div>

                    {/* Mobile Calculator (Collapsible) */}
                    {showMobileCalc && (
                        <div className="lg:hidden w-full max-w-xl mx-auto h-[450px] mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                            <GeneralCalculator />
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl"></div>
                </div>
            </section>

            {/* Quick Navigation (Sticky) */}
            <div className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-4 border-b border-gray-100 dark:border-gray-800 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 shadow-sm">
                <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap gap-3 pb-1">
                    {categories.map(cat => (
                        <a
                            key={cat.id}
                            href={`#cat-${cat.id}`}
                            onClick={(e) => setActiveCategory(cat.id)}
                            className={getCategoryButtonStyle(cat)}
                        >
                            {React.cloneElement(cat.icon, { size: 18, className: activeCategory === cat.id ? "text-white" : "" })}
                            <span>{cat.label}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Category Sections */}
            <div className="space-y-16 pb-8">

                {/* My Custom Tools Dashboard */}
                {searchTerm === '' && (
                    <div className="space-y-8 pb-8 pt-4">
                        {(favorites.length > 0 || recents.length > 0) ? (
                            <section id="custom-tools" className="scroll-mt-24 lg:scroll-mt-28">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 sm:p-4 rounded-xl bg-rose-100 text-rose-500 dark:bg-rose-900/30 dark:text-rose-400 shadow-sm">
                                        <Heart size={24} className="fill-rose-500 dark:fill-rose-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t('label_custom_tools', '내 맞춤 툴')}</h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">{t('desc_custom_tools', '자주 쓰는 계산기를 빠르게 이용하세요.')}</p>
                                    </div>
                                </div>

                                {favorites.length > 0 && (
                                    <div className="mb-8 bg-rose-50/50 dark:bg-rose-900/10 p-6 rounded-3xl border border-rose-100 dark:border-rose-900/40">
                                        <h3 className="text-lg font-bold text-rose-700 dark:text-rose-300 mb-4 flex items-center gap-2">
                                            <Heart size={18} className="fill-current" />
                                            {t('label_favorites', '내 즐겨찾기')}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                            {favorites.map(favId => {
                                                const item = allCalculators.find(c => c.id === favId);
                                                return item ? renderCalculatorCard(item) : null;
                                            })}
                                        </div>
                                    </div>
                                )}

                                {recents.length > 0 && (
                                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/40">
                                        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
                                            <Clock size={18} />
                                            {t('label_recents', '최근 본 계산기')}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                            {recents.map(recId => {
                                                const item = allCalculators.find(c => c.id === recId);
                                                return item ? renderCalculatorCard(item) : null;
                                            })}
                                        </div>
                                    </div>
                                )}
                            </section>
                        ) : (
                            <section className="bg-rose-50 dark:bg-rose-900/10 rounded-[32px] p-8 sm:p-12 text-center border border-rose-100 dark:border-rose-900/30 flex flex-col items-center justify-center">
                                <Heart size={48} className="text-rose-300 dark:text-rose-700 mb-4 animate-bounce duration-1000" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('msg_no_favorites', '자주 쓰는 계산기에 하트를 눌러보세요!')}</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{t('msg_no_favorites_desc', '하트를 누르면 이 공간에 추가되어 언제든 편하게 열어볼 수 있습니다.')}</p>
                            </section>
                        )}
                    </div>
                )}
                {categories.map(cat => {
                    const items = getFilteredCalculators(cat.id);
                    if (items.length === 0) return null; // Hide category if no matches from search

                    return (
                        <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24 lg:scroll-mt-28">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 sm:p-4 rounded-xl ${cat.color} ${cat.text} shadow-sm`}>
                                    {cat.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{cat.label}</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">{cat.desc}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {items.map(item => renderCalculatorCard(item))}
                            </div>
                        </section>
                    );
                })}

                {getFilteredCalculators('all').length === 0 && (
                    <div className="text-center py-20">
                        <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('msg_no_results', '검색 결과가 없습니다')}</h3>
                        <p className="text-gray-500 mt-2">{t('msg_try_another', '다른 검색어로 시도해 보세요.')}</p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Home;
