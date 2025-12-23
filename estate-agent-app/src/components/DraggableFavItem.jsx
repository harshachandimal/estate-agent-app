import React from 'react';
import { useDrag } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';

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
};

export default DraggableFavItem;
