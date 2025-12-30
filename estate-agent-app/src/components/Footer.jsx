import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Column 1: Brand & Description */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-blue-500">EstateAgent App</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Helping you find your dream home with ease. We specialize in luxury properties, city apartments, and suburban family homes.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>
                                <Link to="/" className="hover:text-blue-500 transition duration-300">Home</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex items-center gap-2">
                                <span>📍</span> 123 Real Estate Avenue, Colombo 7
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📞</span> +94 77 123 4567
                            </li>
                            <li className="flex items-center gap-2">
                                <span>✉️</span> info@estateagent.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Socials */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} EstateAgent App. All rights reserved.
                    </p>

                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {/* Social Icons (SVGs) */}
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;