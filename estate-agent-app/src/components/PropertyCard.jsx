import React from 'react';
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

    return (
        <div
            ref={drag}
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            <img src={`/estate-agent-app/${property.picture}`} alt={property.type} className="w-full h-48 object-cover" />
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

export default PropertyCard;
