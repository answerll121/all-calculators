import React from 'react';
import { Star } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

const CalculatorTitle = ({ title, id }) => {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div className="flex justify-between items-center mb-4">
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
