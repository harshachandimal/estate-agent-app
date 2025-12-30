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

    // Local state to toggle color
    const [isClicked, setIsClicked] = useState(false);

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
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsClicked(!isClicked);
                            onAddFav(property.id);
                        }}
                        // FIX: Default color is gray-300 so it is visible on white background
                        className={`transition-colors duration-300 p-2 rounded-full hover:bg-gray-100 ${
                            isClicked ? 'text-red-600' : 'text-gray-300 hover:text-red-200'
                        }`}
                        title="Add to Favourites"
                    >
                        <FaHeart size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;