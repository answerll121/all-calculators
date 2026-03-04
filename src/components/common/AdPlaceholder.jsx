import React from 'react';
import { useTranslation } from 'react-i18next';

const AdPlaceholder = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center min-h-[100px] my-6 p-4 text-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('ad_space_placeholder', 'Advertisement Space')}
            </span>
        </div>
    );
};

export default AdPlaceholder;
