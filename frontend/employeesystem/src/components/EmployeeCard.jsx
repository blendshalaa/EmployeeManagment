// components/EmployeeCard.js
import React from 'react';

function EmployeeCard({ employee }) {
    return (
        <div
            className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center pt-6">
                <div
                    className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl">
                    👤
                </div>
            </div>
            <div className="text-center pb-6">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">{employee.name}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{employee.role}</p>
                <div className="mt-4">
                    <div><strong>Email:</strong> {employee.email}</div>
                    <div><strong>Department ID:</strong> {employee.department_id}</div>
                    <div><strong>Hire Date:</strong> {new Date(employee.hire_date).toLocaleDateString()}</div>
                </div>
                <div className="pt-4 flex justify-around">
                    <button className="rounded-lg bg-gray-300 px-4 py-2">Edit</button>
                    <button className="rounded-lg bg-red-500 px-4 py-2 text-white">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;