import React, { useState } from "react";

function DepartmentCard({ department, onEdit, handleDelete ,handleEditClick}) {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails((prev) => !prev);
    };

    return (
        <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Card Header */}
            <div className="p-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
                    🏢
                </div>
                <h5 className="mt-3 text-lg font-semibold text-gray-800">
                    {department.name}
                </h5>
                <p className="text-sm text-gray-600 text-center">
                    {department.description}
                </p>
            </div>

            {/* Details Section */}
            {showDetails && (
                <div className="px-4 py-2 bg-gray-50 text-sm text-gray-700 rounded-b-lg">
                    <p className="mb-2">
                        <strong>Managed By:</strong> {department.managed_by || "No manager"}
                    </p>
                    <p className="mb-2">
                        <strong>Employees:</strong> {department.employeeCount || "N/A"}
                    </p>
                    <p>
                        <strong>Location:</strong> {department.location || "Not specified"}
                    </p>
                </div>
            )}

            {/* Buttons Section */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-gray-100 rounded-b-lg">
                <button
                    onClick={() => handleEditClick(department)}
                    className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={toggleDetails}
                    className="px-3 py-1 text-sm text-gray-700 border border-gray-300 hover:bg-gray-200 rounded"
                >
                    {showDetails ? "Hide Details" : "View Details"}
                </button>
                <button
                    onClick={() => handleDelete(department.department_id)}
                    className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DepartmentCard;
