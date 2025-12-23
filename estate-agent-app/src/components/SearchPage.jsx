import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from 'react-icons/fa';
import propertiesData from '../data/properties.json';
import { filterProperties } from '../utils/filter.js';
import PropertyCard from './PropertyCard.jsx';
import FavouritesPanel from './FavouritesPanel.jsx';


// --- Main Page Component ---
const SearchPage = () => {
    const [properties, setProperties] = useState(propertiesData.properties);
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
                    <div className="bg-blue-50 p-6 rounded-lg shadow-sm sticky top-4">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FaSearch /> Search</h2>
                        <form onSubmit={handleSearch} className="space-y-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select value={type} onChange={e => setType(e.target.value)} className="w-full mt-1 p-2 border rounded">
                                    <option value="Any">Any</option>
                                    <option value="House">House</option>
                                    <option value="Flat">Flat</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Min Price</label>
                                    <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="£0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Max Price</label>
                                    <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="£Max" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Min Beds</label>
                                    <input type="number" value={minBeds} onChange={e => setMinBeds(e.target.value)} className="w-full mt-1 p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Max Beds</label>
                                    <input type="number" value={maxBeds} onChange={e => setMaxBeds(e.target.value)} className="w-full mt-1 p-2 border rounded" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Postcode Area</label>
                                <input type="text" value={postcode} onChange={e => setPostcode(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="e.g. BR1" />
                            </div>

                            {/* React DatePicker Widget */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Added Between</label>
                                <div className="space-y-2">
                                    <DatePicker selected={dateAfter} onChange={setDateAfter} placeholderText="Start Date" className="w-full p-2 border rounded" />
                                    <DatePicker selected={dateBefore} onChange={setDateBefore} placeholderText="End Date" className="w-full p-2 border rounded" />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">Search Properties</button>
                        </form>
                    </div>
                </div>

                {/* Middle Column: Results */}
                <div className="lg:col-span-2">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Properties For Sale</h2>
                        <p className="text-gray-500">{filteredProps.length} results found</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredProps.map(prop => (
                            <PropertyCard key={prop.id} property={prop} onAddFav={addFavourite} />
                        ))}
                        {filteredProps.length === 0 && <p className="col-span-2 text-center text-gray-500 mt-10">No properties match your criteria.</p>}
                    </div>
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