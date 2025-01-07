import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen">

            <button
                className="fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✖' : '☰'}
            </button>


            <aside
                className={`${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed md:relative md:translate-x-0 w-64 bg-gray-800 text-white p-4 h-full transition-transform duration-300 z-40`}
            >
                <h2 className="text-lg font-bold mb-6">My Dashboard</h2>
                <ul className="space-y-4 mt-6">
                    <li>
                        <Link to="/" className="text-lg hover:text-gray-300">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/departments" className="text-lg hover:text-gray-300">
                            Departments
                        </Link>
                    </li>
                    <li>
                        <Link to="/employees" className="text-lg hover:text-gray-300">
                            Employees
                        </Link>
                    </li>
                    <li>
                        <Link to="/benefits" className="text-lg hover:text-gray-300">
                            Benefits
                        </Link>
                    </li>
                </ul>
            </aside>


        </div>
    );
};

export default Sidebar;
