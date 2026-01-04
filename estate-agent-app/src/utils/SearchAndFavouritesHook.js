import { useState, useEffect } from 'react';
import propertiesData from '../data/properties.json';
import { filterProperties } from './filter.js';

export const useSearchAndFavourites = () => {
    const [properties] = useState(propertiesData.properties);
    const [filteredProps, setFilteredProps] = useState(propertiesData.properties);
    
    const [favourites, setFavourites] = useState(() => {
        const savedFavs = localStorage.getItem('favourites');
        if (savedFavs) {
            try {
                return JSON.parse(savedFavs);
            } catch (e) {
                console.error("Failed to parse favourites from localStorage", e);
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const [type, setType] = useState('Any');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minBeds, setMinBeds] = useState('');
    const [maxBeds, setMaxBeds] = useState('');
    const [postcode, setPostcode] = useState('');
    const [dateAfter, setDateAfter] = useState(null);
    const [dateBefore, setDateBefore] = useState(null);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        const results = filterProperties(properties, { 
            type, minPrice, maxPrice, minBeds, maxBeds, postcode, dateAfter, dateBefore 
        });
        setFilteredProps(results);
    };

    const addFavourite = (id) => {
        setFavourites((prevFavourites) => {
            if (prevFavourites.find(f => f.id === id)) return prevFavourites;
            const propToAdd = properties.find(p => p.id === id);
            return propToAdd ? [...prevFavourites, propToAdd] : prevFavourites;
        });
    };

    const removeFavourite = (id) => {
        setFavourites((prevFavourites) => prevFavourites.filter(f => f.id !== id));
    };

    const clearFavourites = () => setFavourites([]);

    return {
        filteredProps,
        favourites,
        type, setType,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        minBeds, setMinBeds,
        maxBeds, setMaxBeds,
        postcode, setPostcode,
        dateAfter, setDateAfter,
        dateBefore, setDateBefore,
        handleSearch,
        addFavourite,
        removeFavourite,
        clearFavourites
    };
};
