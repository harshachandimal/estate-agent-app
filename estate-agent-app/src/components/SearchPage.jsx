import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaHeart, FaTrash, FaSearch } from 'react-icons/fa';
// Import your properties data
import propertiesData from '../data/properties.json';

// --- Helper: Filter Logic ---
const filterProperties = (properties, criteria) => {
    return properties.filter(prop => {
        // 1. Type
        if (criteria.type !== 'Any' && prop.type !== criteria.type) return false;
        // 2. Price
        if (criteria.minPrice && prop.price < Number(criteria.minPrice)) return false;
        if (criteria.maxPrice && prop.price > Number(criteria.maxPrice)) return false;
        // 3. Bedrooms
        if (criteria.minBeds && prop.bedrooms < Number(criteria.minBeds)) return false;
        if (criteria.maxBeds && prop.bedrooms > Number(criteria.maxBeds)) return false;
        // 4. Postcode (Basic startswith check)
        if (criteria.postcode) {
            const pCode = prop.location.split(' ').pop();
            if (!pCode.startsWith(criteria.postcode.toUpperCase())) return false;
        }
        // 5. Date Logic
        const monthMap = { "January":0, "February":1, "March":2, "April":3, "May":4, "June":5, "July":6, "August":7, "September":8, "October":9, "November":10, "December":11 };
        const propDate = new Date(prop.added.year, monthMap[prop.added.month], prop.added.day);
        if (criteria.dateAfter && propDate < criteria.dateAfter) return false;
        if (criteria.dateBefore && propDate > criteria.dateBefore) return false;

        return true;
    });
};

// --- Component: Draggable Property Card ---
const PropertyCard = ({ property, onAddFav }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'PROPERTY',
        item: { id: property.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            <img src={property.picture} alt={property.type} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">£{property.price.toLocaleString()}</h3>
                <p className="text-gray-600 font-medium">{property.type} - {property.bedrooms} Beds</p>
                <p className="text-gray-500 text-sm truncate">{property.location}</p>
                <p className="text-gray-500 text-xs mt-1 mb-3 line-clamp-2">{property.description}</p>

                <div className="flex justify-between items-center mt-4">
                    <Link
                        to={`/property/${property.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={() => onAddFav(property.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Add to Favourites"
                    >
                        <FaHeart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Component: Droppable Favourites Box ---
const FavouritesPanel = ({ favourites, removeFav, clearFavs, onDropProp }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'PROPERTY',
        drop: (item) => onDropProp(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    // Drop target for removing items (Drag out)
    const [{ isOverTrash }, dropTrash] = useDrop(() => ({
        accept: 'FAV_ITEM',
        drop: (item) => removeFav(item.id),
        collect: (monitor) => ({ isOverTrash: !!monitor.isOver() })
    }));

    return (
        <div ref={drop} className={`p-4 rounded-lg border-2 transition-colors duration-300 ${isOver ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Favourites</h2>
                <button onClick={clearFavs} className="text-xs text-red-600 underline hover:text-red-800">Clear All</button>
            </div>

            {favourites.length === 0 ? (
                <p className="text-gray-400 text-center italic py-8">Drag properties here</p>
            ) : (
                <div className="space-y-3">
                    {favourites.map(fav => (
                        <DraggableFavItem key={fav.id} fav={fav} removeFav={removeFav} />
                    ))}
                </div>
            )}

            {/* Trash Zone for Dragging Out */}
            <div ref={dropTrash} className={`mt-4 border-2 border-dashed border-red-200 rounded p-2 text-center text-red-400 text-sm ${isOverTrash ? 'bg-red-100' : ''}`}>
                <FaTrash className="mx-auto mb-1"/> Drag here to remove
            </div>
        </div>
    );
};

// --- Helper: Draggable Favourite Item (For removing by drag) ---
const DraggableFavItem = ({ fav, removeFav }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'FAV_ITEM',
        item: { id: fav.id },
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() })
    }));

    return (
        <div ref={drag} className={`flex justify-between items-center bg-white p-2 rounded shadow text-sm ${isDragging ? 'opacity-50' : ''}`}>
            <span className="truncate w-32 font-medium">{fav.location}</span>
            <span className="font-bold text-blue-600">£{fav.price.toLocaleString()}</span>
            <button onClick={() => removeFav(fav.id)} className="text-red-400 hover:text-red-600">
                <FaTrash />
            </button>
        </div>
    );
}

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