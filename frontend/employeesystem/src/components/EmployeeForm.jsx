import React from 'react';

function EmployeeForm({newEmployee,handleSubmit,handleInputChange,editMode}) {

    return (

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Create an Employee</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input type="text"
                           name="name"
                           value={newEmployee.name}
                           onChange={handleInputChange} required
                           className="w-full border border-gray-300 rounded-md p-2"
                           placeholder="Department Name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input type="text"
                           name="email"
                           value={newEmployee.email}
                           onChange={handleInputChange} required
                           className="w-full border border-gray-300 rounded-md p-2"
                           placeholder="Enter employee email"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Department ID</label>

                </div>
                <div>
                    <label className="block text-gray-700">Location</label>
                    <input type="date"
                           name="hire_date"
                           value={newEmployee.hire_date}
                           onChange={handleInputChange} required
                           className="w-full border border-gray-300 rounded-md p-2"
                           placeholder="Hire Date"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Role</label>
                    <input type="text"
                           name="role"
                           value={newEmployee.role}
                           onChange={handleInputChange} required
                           className="w-full border border-gray-300 rounded-md p-2"
                           placeholder="Role"
                    />
                </div>

                <button type='submit' className="bg-blue-500 rounded-md p-2 text-white hover:bg-blue-600">
                    {editMode ? "Update Employee" : "Create Employee"}
                </button>

            </form>

        </div>
    );
}

export default EmployeeForm;