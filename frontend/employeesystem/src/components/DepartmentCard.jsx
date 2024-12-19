import React, { useState } from 'react';

function DepartmentCard({ department }) {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails((prev) => !prev);
    };

    return (
        <div className="max-w-xs bg-gray-50 border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 text-center">
                <div
                    className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-3xl">
                    🏢
                </div>
                <h5 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{department.name}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{department.description}</p>
                {showDetails && (
                    <div className="mt-4 text-left text-gray-700 dark:text-gray-300">
                        <div>
                            <strong>Managed By:</strong> {department.managed_by || "No manager assigned"}
                        </div>
                        <div>
                            <strong>Employees:</strong> {department.employeeCount || "N/A"}
                        </div>
                        <div>
                            <strong>Location:</strong> {department.location || "Not specified"}
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    <button
                        onClick={toggleDetails}
                        className="rounded-lg bg-gray-700 text-white px-4 py-2 hover:bg-gray-800"
                    >
                        {showDetails ? "Hide Details" : "View Details"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DepartmentCard;
