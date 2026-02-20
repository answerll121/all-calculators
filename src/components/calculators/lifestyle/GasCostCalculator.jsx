import React, { useState, useEffect } from 'react';
import CalculatorTitle from '../../common/CalculatorTitle';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../../context/CurrencyContext';
import { Fuel, Map, DollarSign, Gauge } from 'lucide-react';

const GasCostCalculator = () => {
    const { t } = useTranslation();
    const { formatAmount, symbol } = useCurrency();

    const [unitSystem, setUnitSystem] = useState('metric'); // metric (km, L/100km, price/L), us (miles, MPG, price/gal)

    const [distance, setDistance] = useState(100);
    const [efficiency, setEfficiency] = useState(10); // L/100km or MPG depending on unit
    const [price, setPrice] = useState(1.5); // Price per liter or gallon

    const [result, setResult] = useState(null);

    // Default values on unit switch
    useEffect(() => {
        if (unitSystem === 'metric') {
            setDistance(100);
            setEfficiency(10); // 10 L/100km
            setPrice(1.6); // ~1.6 EUR/L
        } else {
            setDistance(60);
            setEfficiency(25); // 25 MPG
            setPrice(3.5); // ~3.5 USD/Gal
        }
    }, [unitSystem]);

    const calculateCost = () => {
        let cost = 0;
        let fuelNeeded = 0;

        if (unitSystem === 'metric') {
            // Distance (km), Eff (L/100km), Price (/L)
            // Fuel = (Distance / 100) * Eff
            fuelNeeded = (parseFloat(distance) / 100) * parseFloat(efficiency);
            cost = fuelNeeded * parseFloat(price);
        } else {
            // Distance (miles), Eff (MPG), Price (/Gal)
            // Fuel = Distance / Eff
            if (parseFloat(efficiency) > 0) {
                fuelNeeded = parseFloat(distance) / parseFloat(efficiency);
                cost = fuelNeeded * parseFloat(price);
            }
        }

        setResult({
            cost,
            fuelNeeded
        });
    };

    useEffect(() => {
        calculateCost();
    }, [distance, efficiency, price, unitSystem]);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">
            <CalculatorTitle title={t('calc_gas')} id="gas" icon={<Fuel className="text-orange-500" />} />

            <div className="space-y-6 mt-6">
                {/* Unit Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                    <button onClick={() => setUnitSystem('metric')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${unitSystem === 'metric' ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}>Metric (km, L/100km)</button>
                    <button onClick={() => setUnitSystem('us')} className={`flex-1 py-1 rounded-lg text-sm font-medium transition-all ${unitSystem === 'us' ? 'bg-white dark:bg-gray-600 shadow text-blue-600' : 'text-gray-500'}`}>US (mi, MPG)</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('label_distance')} ({unitSystem === 'metric' ? 'km' : 'miles'})
                            </label>
                            <div className="relative">
                                <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('label_efficiency')} ({unitSystem === 'metric' ? 'L/100km' : 'MPG'})
                            </label>
                            <div className="relative">
                                <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={efficiency}
                                    onChange={(e) => setEfficiency(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('label_gas_price')} ({unitSystem === 'metric' ? `${symbol}/L` : `${symbol}/Gal`})
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl flex flex-col justify-center">
                        {result && (
                            <div className="space-y-6 text-center">
                                <div>
                                    <p className="text-sm text-orange-600 dark:text-orange-300 mb-1 font-medium">{t('label_trip_cost')}</p>
                                    <p className="text-5xl font-bold text-orange-900 dark:text-orange-100">
                                        {formatAmount(result.cost)}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-orange-200 dark:border-orange-800">
                                    <p className="text-xs text-orange-500 dark:text-orange-400">{t('label_fuel_needed')}</p>
                                    <p className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                                        {result.fuelNeeded.toFixed(2)} {unitSystem === 'metric' ? 'Liters' : 'Gallons'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GasCostCalculator;
