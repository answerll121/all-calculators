import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useLocalStorage('calcu_favorites', []);
    const [recents, setRecents] = useLocalStorage('calcu_recents', []);

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

    const addRecent = (id) => {
        if (!id) return;
        setRecents(prev => {
            const filtered = prev.filter(r => r !== id);
            return [id, ...filtered].slice(0, 5); // Max 5 recent calculators
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, recents, addRecent }}>
            {children}
        </FavoritesContext.Provider>
    );
};
