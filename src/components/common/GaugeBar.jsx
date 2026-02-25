import React from 'react';

/**
 * Reusable Gauge Bar Component for Health Calculators (e.g. BMI)
 * 
 * @param {Number} value - The current value to plot
 * @param {Number} min - Minimum value of the gauge
 * @param {Number} max - Maximum value of the gauge
 * @param {Array} zones - Array of zones defining the color segments
 *    Example: [
 *      { limit: 18.5, color: 'bg-blue-400', label: 'Underweight' },
 *      { limit: 25, color: 'bg-emerald-400', label: 'Normal' },
 *      { limit: 30, color: 'bg-yellow-400', label: 'Overweight' },
 *      { limit: 40, color: 'bg-rose-500', label: 'Obese' }
 *    ]
 */
const GaugeBar = ({ value, min = 10, max = 40, zones = [] }) => {
    // Constrain value within bounds
    const clampedValue = Math.min(Math.max(value, min), max);

    // Calculate percentage for the marker
    const percentage = ((clampedValue - min) / (max - min)) * 100;

    // Process zones to calculate their proportional widths
    let previousLimit = min;
    const processedZones = zones.map(zone => {
        const zoneMin = previousLimit;
        const zoneMax = Math.min(zone.limit, max);
        const widthPercent = ((zoneMax - zoneMin) / (max - min)) * 100;

        // Update for next iteration
        previousLimit = zone.limit;

        return { ...zone, widthPercent: Math.max(0, widthPercent) };
    });

    return (
        <div className="w-full mt-8 mb-4">
            {/* Gauge Bar */}
            <div className="relative h-6 rounded-full w-full flex overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-inner">
                {processedZones.map((zone, idx) => (
                    <div
                        key={idx}
                        className={`h-full ${zone.color}`}
                        style={{ width: `${zone.widthPercent}%` }}
                        title={zone.label}
                    />
                ))}

                {/* Marker */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-gray-900 border border-white shadow-md z-10 transition-all duration-500 ease-out"
                    style={{ left: `calc(${percentage}% - 2px)` }}
                >
                    {/* Tooltip on marker */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        {value.toFixed(1)}
                        {/* Caret pointing down */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400 font-medium px-1">
                {processedZones.map((zone, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1" style={{ width: `${zone.widthPercent}%` }}>
                        <span className="text-center truncate w-full px-1">{zone.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GaugeBar;
