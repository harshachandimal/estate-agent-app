
import React, { useState } from 'react';

const PropertyGallery = ({ property }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const galleryImages = property.images || [property.picture];
    const mainImage = selectedImage || property.picture;

    const getImageUrl = (img) => {
        return img.startsWith('/estate') ? img : `/estate-agent-app/${img}`;
    };

    return (
        <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Main Large Image */}
                <div className="md:col-span-3">
                    <img 
                        src={getImageUrl(mainImage)} 
                        alt="Main" 
                        className="w-full h-96 object-cover rounded-lg shadow-sm transition-all duration-300" 
                    />
                </div>
                {/* Thumbnails */}
                <div className="md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-2 h-96 overflow-y-auto">
                    {galleryImages.map((img, index) => (
                        <img
                            key={index}
                            src={getImageUrl(img)}
                            alt={`Thumbnail ${index}`}
                            onClick={() => setSelectedImage(img)}
                            className={`w-full h-24 object-cover rounded cursor-pointer hover:opacity-75 border-2 transition ${
                                (selectedImage === img || (!selectedImage && img === property.picture)) 
                                ? 'border-blue-500 shadow-md' 
                                : 'border-transparent'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertyGallery;
