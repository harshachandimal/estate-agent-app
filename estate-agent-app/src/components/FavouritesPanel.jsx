import React from 'react';
import { useDrop } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';
import DraggableFavItem from './DraggableFavItem.jsx';

const FavouritesPanel = ({ favourites, removeFav, clearFavs, onDropProp }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'PROPERTY',
        drop: (item) => onDropProp(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const [{ isOver: isOverTrash }, dropTrash] = useDrop(() => ({
        accept: 'FAV_ITEM',
        drop: (item) => removeFav(item.id),
        collect: (monitor) => ({ isOverTrash: !!monitor.isOver() }),
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
                    {favourites.map((fav) => (
                        <DraggableFavItem key={fav.id} fav={fav} removeFav={removeFav} />
                    ))}
                </div>
            )}

            <div ref={dropTrash} className={`mt-4 border-2 border-dashed border-red-200 rounded p-2 text-center text-red-400 text-sm ${isOverTrash ? 'bg-red-100' : ''}`}>
                <FaTrash className="mx-auto mb-1" /> Drag here to remove
            </div>
        </div>
    );
};

export default FavouritesPanel;
