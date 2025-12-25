import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NavBar = () => {
    return (
        <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo / Brand Name */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-800 hover:text-blue-600 transition">
                    <FaHome className="text-blue-600" />
                    <span>Estate<span className="text-blue-500">Agent</span></span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className="flex items-center gap-1 font-medium text-gray-600 hover:text-blue-600 transition duration-200"
                    >
                        <FaSearch className="text-sm" />
                        <span className="hidden sm:inline">Find Property</span>
                    </Link>

                    {/* You can add more links here later, e.g. "About", "Contact" */}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;