import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const FavoritesContext = createContext();

export function FavoritesProvider({ children}) {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (id) => {
        setFavorites((prevFavorites) => [...prevFavorites, id]);
    };

    const removeFavorite = (id) => {
        setFavorites((prevFavorites) => prevFavorites.filter(item => item !== id));
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (savedFavorites.length > 0) {
            setFavorites(savedFavorites);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    , [favorites]);

    const isFavorite = (id) => {
        return favorites.includes(id);
    }

    const toggleFavorite = (id, name) => {
        if (isFavorite(id)) {
            removeFavorite(id);
            toast.info(`${name} has been removed from favorites!`);
        } else {
            addFavorite(id);
            toast.success(`${name} has been added to favorites!`);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, clearFavorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}