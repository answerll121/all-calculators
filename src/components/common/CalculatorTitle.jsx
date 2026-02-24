import React from 'react';
import { Star } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useTranslation } from 'react-i18next';
import SEO from './SEO';

const CalculatorTitle = ({ title, id }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const { t } = useTranslation();

    const description = t(`info.${id}.description`, { defaultValue: '' });
    const fallbackDesc = description || t('fallback_desc', { title, defaultValue: `이 ${title}는 복잡한 계산을 쉽고 빠르게 해결할 수 있도록 도와주는 무료 도구입니다.` });

    return (
        <div className="flex justify-between items-center mb-4">
            <SEO title={title} description={fallbackDesc} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            <button
                onClick={() => toggleFavorite(id)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Toggle Favorite"
            >
                <Star
                    size={20}
                    className={isFavorite(id) ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"}
                />
            </button>
        </div>
    );
};

export default CalculatorTitle;
