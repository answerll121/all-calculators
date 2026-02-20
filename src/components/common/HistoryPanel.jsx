import React from 'react';
import { useTranslation } from 'react-i18next';
import { History, Clock } from 'lucide-react';

const HistoryPanel = ({ history = [] }) => {
    const { t } = useTranslation();

    if (!history || history.length === 0) return null;

    return (
        <div className="mt-8 border-t border-gray-100 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-4">
                <History size={16} />
                {t('history') || 'Recent Calculations'}
            </h4>
            <div className="space-y-3">
                {history.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-[20px] text-sm group hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                        <div className="text-gray-600 dark:text-gray-300">
                            {item.summary}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">
                            {item.result}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryPanel;
