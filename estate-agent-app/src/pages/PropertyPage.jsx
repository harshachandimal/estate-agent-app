import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Default styles
import { FaArrowLeft, FaBed, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import propertiesData from '../data/properties.json';
import PropertyGallery from '../components/PropertyGallery';

const PropertyPage = () => {
    const { id } = useParams();
    const property = propertiesData.properties.find(p => p.id === id);

    if (!property) return <div className="p-10 text-center text-red-500">Property not found!</div>;

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <Link to="/" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
                <FaArrowLeft className="mr-2"/> Back to Search
            </Link>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                {/* Header Section */}
                <div className="p-6 border-b">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.location}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                        <span className="flex items-center gap-1"><FaTag /> {property.type}</span>
                        <span className="flex items-center gap-1"><FaBed /> {property.bedrooms} Bedrooms</span>
                        <span className="flex items-center gap-1 text-green-600 font-bold text-xl">£{property.price.toLocaleString()}</span>
                    </div>
                </div>

                <PropertyGallery property={property} />

                {/* Tabs Section (7%) */}
                <div className="p-6">
                    <Tabs>
                        <TabList className="flex border-b mb-4">
                            <Tab className="mr-1 px-4 py-2 cursor-pointer border-t border-l border-r rounded-t hover:bg-gray-100 outline-none selected:bg-blue-50 selected:text-blue-600">Description</Tab>
                            <Tab className="mr-1 px-4 py-2 cursor-pointer border-t border-l border-r rounded-t hover:bg-gray-100 outline-none">Floor Plan</Tab>
                            <Tab className="mr-1 px-4 py-2 cursor-pointer border-t border-l border-r rounded-t hover:bg-gray-100 outline-none">Google Map</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <h3 className="text-xl font-semibold mb-2">Property Details</h3>
                                <p>{property.description}</p>
                                <p className="mt-4">
                                    <strong>Tenure:</strong> {property.tenure}<br/>
                                    <strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}
                                </p>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="flex justify-center items-center h-64 bg-gray-100 rounded border-2 border-dashed border-gray-300">
                                <span className="text-gray-500">[Floor Plan Image Placeholder]</span>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="h-64 bg-gray-200 rounded overflow-hidden relative">
                                                                                                                                                                                                                                      {/* Embed Google Map or Placeholder */}
                                <div className="absolute inset-0 flex justify-center items-center text-gray-500">
                                    <span className="flex items-center gap-2"><FaMapMarkerAlt /></span>
                                </div>
                                {
                                    <iframe
                                        width="100%"
                                        height="400"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src={`https://maps.google.com/maps?q=${property.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}>
                                    </iframe>
                                }
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;