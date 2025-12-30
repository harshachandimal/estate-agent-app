import React from 'react';
import PropertyCard from './PropertyCard.jsx';

const ResultsGrid = ({ filteredProps, onAddFav , onRemoveFav}) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Properties For Sale</h2>
        <p className="text-gray-500">{filteredProps.length} results found</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProps.map((prop) => (
          <PropertyCard key={prop.id} property={prop} onAddFav={onAddFav} onRemoveFav={onRemoveFav} />
        ))}
        {filteredProps.length === 0 && (
          <p className="col-span-2 text-center text-gray-500 mt-10">No properties match your criteria.</p>
        )}
      </div>
    </>
  );
};

export default ResultsGrid;
