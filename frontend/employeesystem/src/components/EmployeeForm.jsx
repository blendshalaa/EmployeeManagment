import React, { useEffect, useState } from 'react';
import axios from "axios";

function EmployeeForm({ newEmployee, handleSubmit, handleInputChange, editMode }) {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/departments');
                console.log(response.data); // Inspect the response here
                setDepartments(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchDepartments();
    }, []);

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Create an Employee</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-100 ">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newEmployee.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border bg-gray-900 border-gray-300 rounded-md p-2 text-gray-400"
                        placeholder="Employee Name"
                    />
                </div>
                <div>
                    <label className="block text-gray-100">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={newEmployee.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-900 border text-gray-400 border-gray-300 rounded-md p-2"
                        placeholder="Enter employee email"
                    />
                </div>
                <div>
                    <label className="block text-gray-100">Department</label>
                    <select
                        name="department_id"
                        value={newEmployee.department_id}
                        onChange={handleInputChange}
                        required
                        className="w-full border bg-gray-900 border-gray-300 rounded-md p-2 text-gray-400"
                    >
                        <option value="">Select Department</option>
                        {departments.map((department) => (
                            <option key={department.department_id} value={department.department_id}>
                                {department.name} ({department.department_id})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-100">Hire Date</label>
                    <input
                        type="date"
                        name="hire_date"
                        value={newEmployee.hire_date}
                        onChange={handleInputChange}
                        required
                        className="w-full border bg-gray-900 border-gray-300 rounded-md p-2 text-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-100">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={newEmployee.role}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-900 border border-gray-300 rounded-md p-2 text-gray-400"
                        placeholder="Role"
                    />
                </div>

                <button type="submit" className="bg-blue-500 rounded-md p-2 text-white hover:bg-blue-600">
                    {editMode ? "Update Employee" : "Create Employee"}
                </button>
            </form>
        </div>
    );
}

export default EmployeeForm;
