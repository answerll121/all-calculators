import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';

/**
 * Reusable Chart for Financial Growth (Loans, Compound Interest)
 * 
 * @param {Array} data - Array of objects e.g., [{ name: 'Year 1', principal: 1000, interest: 50 }]
 * @param {String} type - "stacked-bar" or "line"
 * @param {Array} dataKeys - Array of key configurations: [{ key: 'principal', name: 'Principal', color: '#8884d8' }]
 * @param {String} xAxisKey - Key for the X-axis mapping
 */
const AssetChart = ({ data, type = "stacked-bar", dataKeys = [], xAxisKey = "name", valueFormatter = (val) => val }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{entry.name}:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {valueFormatter(entry.value)}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-72 lg:h-80 mt-8">
            <ResponsiveContainer width="100%" height="100%">
                {type === 'stacked-bar' ? (
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey={xAxisKey} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tickFormatter={(val) => valueFormatter(val, true)} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        {dataKeys.map((dk, idx) => (
                            <Bar key={idx} dataKey={dk.key} name={dk.name} stackId="a" fill={dk.color} radius={idx === dataKeys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
                        ))}
                    </BarChart>
                ) : (
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey={xAxisKey} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tickFormatter={(val) => valueFormatter(val, true)} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        {dataKeys.map((dk, idx) => (
                            <Line key={idx} type="monotone" dataKey={dk.key} name={dk.name} stroke={dk.color} strokeWidth={3} dot={{ r: 4, fill: dk.color }} activeDot={{ r: 6 }} />
                        ))}
                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default AssetChart;
