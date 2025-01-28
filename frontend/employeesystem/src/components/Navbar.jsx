import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center">

                <div className="text-white text-2xl font-semibold">
                    <Link to="/">HRConnect</Link>
                </div>

                {/* Navbar links */}
                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="text-white hover:text-gray-300">
                        Dashboard
                    </Link>
                    <Link to="/departments" className="text-white hover:text-gray-300">
                        Departments
                    </Link>
                    <Link to="/employees" className="text-white hover:text-gray-300">
                        Employees
                    </Link>
                    <Link to="/benefits" className="text-white hover:text-gray-300">
                        Benefits
                    </Link>
                    <Link to="/attendance" className="text-white hover:text-gray-300">
                        Attendance
                    </Link>
                </div>

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden">
                    <button
                        className="text-white p-2"
                        // Add functionality to open/close mobile menu if needed
                    >
                        ☰
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
