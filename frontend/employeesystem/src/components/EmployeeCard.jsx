// components/EmployeeCard.js
import React from 'react';

function EmployeeCard({ employee ,handleDelete,handleEditClick}) {
    return (
        <div
            className="max-w-xs bg-gray-800 border border-gray-400 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center pt-6">
                <div
                    className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl">
                    👤
                </div>
            </div>
            <div className="text-center pb-6">
                <h5 className="text-xl font-medium text-gray-100 dark:text-white">{employee.name}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-100">{employee.role}</p>
                <div className="mt-4 text-gray-100  ">
                    <div><strong>Email:</strong> {employee.email}</div>
                    <div><strong>Department ID:</strong> {employee.department_id}</div>
                    <div><strong>Hire Date:</strong> {new Date(employee.hire_date).toLocaleDateString()}</div>
                </div>
                <div className="pt-4 flex justify-around">
                    <button onClick={()=>handleEditClick(employee)} className="rounded-lg bg-blue-500 px-4 py-2 text-gray-100">Edit</button>
                    <button onClick={()=>handleDelete(employee.employee_id)} className="rounded-lg bg-red-500 px-4 py-2 text-white">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;
