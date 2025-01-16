import React from 'react';

function DepartmentForm({newDepartment,handleSubmit,handleInputChange,editMode}) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Create a department</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newDepartment.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-600 bg-gray-900 text-white rounded-md p-2"
                        placeholder="Department Name"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={newDepartment.description}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-600 bg-gray-900 text-white rounded-md p-2"
                        placeholder="Department Description"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Managed by</label>
                    <input
                        type="text"
                        name="managed_by"
                        value={newDepartment.managed_by}
                        onChange={handleInputChange}
                        className="w-full border border-gray-600 bg-gray-900 text-white rounded-md p-2"
                        placeholder="Department Manager"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={newDepartment.location}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-600 bg-gray-900 text-white rounded-md p-2"
                        placeholder="Department Location"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 rounded-md p-2 text-white hover:bg-blue-600"
                >
                    {editMode ? "Update Department" : "Create Department"}
                </button>
            </form>
        </div>
    );


}

export default DepartmentForm;