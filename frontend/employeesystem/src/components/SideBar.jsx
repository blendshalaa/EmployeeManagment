import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen">


            <button
                className="fixed top-4 left-4 z-50 text-white bg-blue-600 p-3 rounded-full shadow-md md:hidden hover:bg-blue-700 transition duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✖' : '☰'}
            </button>


            <aside
                className={`${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed md:relative md:translate-x-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 h-full transition-transform duration-300 z-40 shadow-lg`}
            >
                {/* Sidebar Header */}
                <h2 className="text-2xl font-bold mb-8 border-b border-gray-700 pb-4 text-center">
                   Dashboard
                </h2>

                {/* Sidebar Navigation */}
                <ul className="space-y-6">
                    <li>
                        <Link
                            to="/"
                            className="flex items-center text-lg font-medium hover:text-blue-400 hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-200"
                        >
                            🏠 Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/departments"
                            className="flex items-center text-lg font-medium hover:text-blue-400 hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-200"
                        >
                            🏢 Departments
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/employees"
                            className="flex items-center text-lg font-medium hover:text-blue-400 hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-200"
                        >
                            👥 Employees
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/benefits"
                            className="flex items-center text-lg font-medium hover:text-blue-400 hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-200"
                        >
                            🎁 Benefits
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/performanceReview"
                            className="flex items-center text-lg font-medium hover:text-blue-400 hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-200"
                        >
                            👥 Performance
                        </Link>
                    </li>
                </ul>


                <div className="absolute bottom-4 w-full text-center text-sm text-gray-400">
                    © 2025 Dashboard
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
