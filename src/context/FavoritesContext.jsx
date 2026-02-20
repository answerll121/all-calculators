import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('calcu_favorites');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load favorites', e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('calcu_favorites', JSON.stringify(favorites));
        } catch (e) {
            console.error('Failed to save favorites', e);
        }
    }, [favorites]);

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            if (prev.includes(id)) {
                return prev.filter(favId => favId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const isFavorite = (id) => favorites.includes(id);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
