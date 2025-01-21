import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {data} from "autoprefixer";
import { useQuery, useMutation, useQueryClient } from "react-query";
import SearchFilter from "../components/SearchFilter.jsx";

const fetchBenefits = async () => {
    const response = await axios.get("http://localhost:5000/api/benefits");
    return response.data;
};

const fetchEmployees = async () => {
    const response = await axios.get("http://localhost:5000/api/employees");
    return response.data;
};


function BenefitsPage() {
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState("");
    const [newBenefit, setNewBenefit] = useState({
        employee_id: "",
        benefit_type: "",
        benefit_details: "",
        start_date: "",
        end_date: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [currentBenefit, setCurrentBenefit] = useState(null);

    const { data: benefits, isLoading, isError, error } = useQuery(
        "benefits",
        fetchBenefits
    );

    const { data: employees } = useQuery("employees", fetchEmployees);





    const addBenefitMutation = useMutation(
        (newBenefit) => axios.post("http://localhost:5000/api/benefits", newBenefit),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("benefits");
            },
        }
    );


    const editBenefitMutation = useMutation(
        ({ benefitId, updatedBenefit }) =>
            axios.put(
                `http://localhost:5000/api/benefits/${benefitId}`,
                updatedBenefit
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("benefits");
                setEditMode(false);
                setCurrentBenefit(null);
            },
        }
    );

    // Delete Benefit
    const deleteBenefitMutation = useMutation(
        (benefitId) =>
            axios.delete(`http://localhost:5000/api/benefits/${benefitId}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("benefits");
            },
        }
    );

    const handleInputChange = (e) => {
        setNewBenefit({ ...newBenefit, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            editBenefitMutation.mutate({
                benefitId: currentBenefit.benefit_id,
                updatedBenefit: newBenefit,
            });
        } else {
            addBenefitMutation.mutate(newBenefit);
        }

        setNewBenefit({
            employee_id: "",
            benefit_type: "",
            benefit_details: "",
            start_date: "",
            end_date: "",
        });
    };

    const handleEditClick = (benefit) => {
        setEditMode(true);
        setCurrentBenefit(benefit);
        setNewBenefit({ ...benefit });
    };

    const handleDelete = (benefitId) => {
        deleteBenefitMutation.mutate(benefitId);
    };


    const filteredBenefits = benefits?.filter((benefit) =>
        ["benefit_type", "benefit_details", "employee_id", "benefit_id"].some(
            (field) =>
                String(benefit[field]).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-28">
                <h1 className="text-2xl font-bold text-white mb-6">Benefits List</h1>
                <SearchFilter
                    query={searchQuery}
                    onSearchChange={setSearchQuery}
                    placeholder="Search benefits..."
                    className="bg-gray-700 text-white rounded-md px-4 py-2 mb-4"
                />

                <div className="bg-gray-700 shadow rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-900">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Benefit ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Employee ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Benefit Type
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Details
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Start Date
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                End Date
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                        {filteredBenefits.length > 0 ? (
                            filteredBenefits.map((benefit) => (
                                <tr key={benefit.benefit_id} className="hover:bg-gray-600">
                                    <td className="px-4 py-2 text-sm">{benefit.benefit_id}</td>
                                    <td className="px-4 py-2 text-sm">{benefit.employee_id}</td>
                                    <td className="px-4 py-2 text-sm">{benefit.benefit_type}</td>
                                    <td className="px-4 py-2 text-sm">{benefit.benefit_details}</td>
                                    <td className="px-4 py-2 text-sm">
                                        {benefit.start_date
                                            ? new Date(benefit.start_date).toLocaleDateString("en-CA")
                                            : "N/A"}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {benefit.end_date
                                            ? new Date(benefit.end_date).toLocaleDateString("en-CA")
                                            : "N/A"}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 mr-2"
                                            onClick={() => handleEditClick(benefit)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                                            onClick={() => handleDelete(benefit.benefit_id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-4 py-2 text-center text-sm text-gray-300"
                                >
                                    No benefits available.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4">
                        {editMode ? "Edit Benefit" : "Add New Benefit"}
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-700 p-6 rounded-lg shadow-md"
                    >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                name="employee_id"
                                value={newBenefit.employee_id}
                                onChange={handleInputChange}
                                placeholder="Employee ID"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                            />
                            <input
                                type="text"
                                name="benefit_type"
                                value={newBenefit.benefit_type}
                                onChange={handleInputChange}
                                placeholder="Benefit Type"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                            />
                            <input
                                type="text"
                                name="benefit_details"
                                value={newBenefit.benefit_details}
                                onChange={handleInputChange}
                                placeholder="Benefit Details"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                            />
                            <input
                                type="date"
                                name="start_date"
                                value={newBenefit.start_date}
                                onChange={handleInputChange}
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                            />
                            <input
                                type="date"
                                name="end_date"
                                value={newBenefit.end_date}
                                onChange={handleInputChange}
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                        >
                            {editMode ? "Save Changes" : "Add Benefit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default BenefitsPage;