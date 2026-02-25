import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useTranslation } from 'react-i18next';
import SEO from './SEO';

const CalculatorTitle = ({ title, id }) => {
    const { toggleFavorite, isFavorite, addRecent } = useFavorites();
    const { t } = useTranslation();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (id) {
            addRecent(id);
        }
    }, [id]);

    const handleToggle = () => {
        toggleFavorite(id);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    };

    const description = t(`info.${id}.description`, { defaultValue: '' });
    const seoDesc = t(`seo_desc_${id}`, { defaultValue: '' });
    // seo_desc_loan, seo_desc_bmi etc.
    const finalDesc = description || seoDesc || t('fallback_desc', { title, defaultValue: `이 ${title}는 복잡한 계산을 쉽게 해결해주는 무료 도구입니다.` });

    return (
        <div className="flex justify-between items-center mb-4">
            <SEO title={title} description={finalDesc} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            <button
                onClick={handleToggle}
                className={`p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all duration-300 ${animate ? 'scale-125' : 'scale-100'}`}
                title="Toggle Favorite"
            >
                <Heart
                    size={24}
                    className={isFavorite(id) ? "fill-rose-500 text-rose-500" : "text-gray-300 hover:text-rose-400"}
                />
            </button>
        </div>
    );
};

export default CalculatorTitle;
