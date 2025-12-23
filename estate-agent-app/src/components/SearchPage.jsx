import React, { useState } from 'react';
import propertiesData from '../data/properties.json';
import { filterProperties } from '../utils/filter.js';
import FavouritesPanel from './FavouritesPanel.jsx';
import SearchForm from './SearchForm.jsx';
import ResultsGrid from './ResultsGrid.jsx';

// --- Main Page Component ---
const SearchPage = () => {
    const [properties] = useState(propertiesData.properties);
    const [filteredProps, setFilteredProps] = useState(propertiesData.properties);
    const [favourites, setFavourites] = useState([]);

    // Search State
    const [type, setType] = useState('Any');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minBeds, setMinBeds] = useState('');
    const [maxBeds, setMaxBeds] = useState('');
    const [postcode, setPostcode] = useState('');
    const [dateAfter, setDateAfter] = useState(null);
    const [dateBefore, setDateBefore] = useState(null);

    // Search Handler
    const handleSearch = (e) => {
        e.preventDefault();
        const results = filterProperties(properties, { type, minPrice, maxPrice, minBeds, maxBeds, postcode, dateAfter, dateBefore });
        setFilteredProps(results);
    };

    // Favourites Handlers
    const addFavourite = (id) => {
        if (favourites.find(f => f.id === id)) return; // Prevent duplicates
        const propToAdd = properties.find(p => p.id === id);
        if (propToAdd) setFavourites([...favourites, propToAdd]);
    };

    const removeFavourite = (id) => {
        setFavourites(favourites.filter(f => f.id !== id));
    };

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-blue-800">EstateAgent<span className="text-blue-500">App</span></h1>
            </header>

            {/* Responsive Layout: Stacked on Mobile, 3-Col Grid on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left Column: Search Form */}
                <div className="lg:col-span-1">
                    <SearchForm
                        type={type}
                        setType={setType}
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        minBeds={minBeds}
                        setMinBeds={setMinBeds}
                        maxBeds={maxBeds}
                        setMaxBeds={setMaxBeds}
                        postcode={postcode}
                        setPostcode={setPostcode}
                        dateAfter={dateAfter}
                        setDateAfter={setDateAfter}
                        dateBefore={dateBefore}
                        setDateBefore={setDateBefore}
                        onSubmit={handleSearch}
                    />
                </div>

                {/* Middle Column: Results */}
                <div className="lg:col-span-2">
                    <ResultsGrid filteredProps={filteredProps} onAddFav={addFavourite} />
                </div>

                {/* Right Column: Favourites */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4">
                        <FavouritesPanel
                            favourites={favourites}
                            removeFav={removeFavourite}
                            clearFavs={() => setFavourites([])}
                            onDropProp={addFavourite}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SearchPage;