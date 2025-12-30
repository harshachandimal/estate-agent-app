import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { FaHeart } from 'react-icons/fa';

const PropertyCard = ({ property, onAddFav }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'PROPERTY',
        item: { id: property.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    // 1. Setup the state
    const [isFavorite, setIsFavorite] = useState(false);

// 2. CHECK ON LOAD: Is this property already in storage?
    useEffect(() => {
        // Get the current list of favorites from the browser
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Check if THIS property is in that list
        // Note: We use 'some' to see if any item matches the ID
        const isListed = savedFavorites.some((fav) => fav.id === property.id);

        // Set the button color based on what we found
        setIsFavorite(isListed);
    }, [property.id]); // Run this check whenever we load a new property

// 3. HANDLE CLICK: Add or Remove from storage
    const toggleFavorite = () => {
        // Get the current list again (it might have changed)
        let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (isFavorite) {
            // === REMOVE IT ===
            // Filter keeps everything EXCEPT the one with this ID
            const newFavorites = savedFavorites.filter((fav) => fav.id !== property.id);

            // Save the new list back to the browser
            localStorage.setItem('favorites', JSON.stringify(newFavorites));

            // Update the button color to White
            setIsFavorite(false);

        } else {
            // === ADD IT ===
            // Add this property to the array
            savedFavorites.push(property);

            // Save the new list back to the browser
            localStorage.setItem('favorites', JSON.stringify(savedFavorites));

            // Update the button color to Red
            setIsFavorite(true);
        }
    };

    return (
        <div
            ref={drag}
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            <img src={`/estate-agent-app/${property.picture}`} alt={property.type} className="w-full h-48 object-cover" />

            <div className="p-4 relative"> {/* Added 'relative' for better positioning if needed */}
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

                    {/* FAVOURITE BUTTON */}
                    <button
                        onClick={toggleFavorite}  // <--- IMPORTANT: Link to the function above
                        className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            // If favorite is true -> Fill it. If false -> No fill.
                            fill={isFavorite ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            // If favorite -> Red. If not -> White.
                            className={`w-8 h-8 transition-colors duration-300 ${
                                isFavorite ? 'text-red-500' : 'text-white'
                            }`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;