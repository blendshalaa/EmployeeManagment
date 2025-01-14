import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function BenefitsPage() {
    const [benefits, setBenefits] = useState([]);
    const [newBenefit, setNewBenefit] = useState({
        employee_id: '',
        benefit_type: '',
        benefit_details: '',
        start_date: '',
        end_date: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [currentBenefit, setCurrentBenefit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBenefits = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/benefits');
                setBenefits(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching benefits:', err);
                setError('Failed to load benefits.');
                setIsLoading(false);
            }
        };
        fetchBenefits();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:5000/api/benefits', newBenefit);
            setBenefits([...benefits, response.data]);
            setNewBenefit({
                employee_id: '',
                benefit_type: '',
                benefit_details: '',
                start_date: '',
                end_date: '',
            });
            setIsLoading(false);
        } catch (err) {
            console.error('Error creating new benefit:', err);
            setError('Failed to create new benefit.');
            setIsLoading(false);
        }
    };

    const handleEditClick = (benefit) => {
        setEditMode(true);
        setCurrentBenefit(benefit);
        setNewBenefit({ ...benefit });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();


        const updatedBenefits = benefits.map((benefit) =>
            benefit.benefit_id === currentBenefit.benefit_id ? { ...benefit, ...newBenefit } : benefit
        );
        setBenefits(updatedBenefits);

        try {
            setIsLoading(true);
            const response = await axios.put(
                `http://localhost:5000/api/benefits/${currentBenefit.benefit_id}`,
                newBenefit
            );


            setBenefits(
                benefits.map((benefit) =>
                    benefit.benefit_id === currentBenefit.benefit_id ? response.data : benefit
                )
            );

        } catch (err) {
            console.error("Error editing benefit:", err);
            // 3. Revert to the original state if the server request fails
            setBenefits(prevBenefits => prevBenefits);
            setError("Failed to edit benefit.");
        } finally {
            setEditMode(false);
            setNewBenefit({
                employee_id: "",
                benefit_type: "",
                benefit_details: "",
                start_date: "",
                end_date: "",
            });
            setCurrentBenefit(null);
            setIsLoading(false);
        }
    };

    const handleDelete = async (benefit_id) => {
        try {
            setIsLoading(true);
            await axios.delete(`http://localhost:5000/api/benefits/${benefit_id}`);
            setBenefits(benefits.filter((benefit) => benefit.benefit_id !== benefit_id));
            setIsLoading(false);
        } catch (err) {
            console.error('Error deleting benefit:', err);
            setError('Failed to delete benefit.');
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setNewBenefit({
            ...newBenefit,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-28">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Benefits List</h1>

                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                    Benefit ID
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                    Employee ID
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                    Benefit Type
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                    Details
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                    Start Date
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                    End Date
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {benefits.length > 0 ? (
                                benefits.map((benefit) => (
                                    <tr key={benefit.benefit_id}>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {benefit.benefit_id}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {benefit.employee_id}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {benefit.benefit_type}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {benefit.benefit_details}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {benefit.start_date
                                                ? new Date(benefit.start_date).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
                                            {benefit.end_date ? new Date(benefit.end_date).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">
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
                                        className="px-4 py-2 text-center text-sm text-gray-500"
                                    >
                                        No benefits available.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">
                        {editMode ? 'Edit Benefit' : 'Add New Benefit'}
                    </h2>
                    <form onSubmit={editMode ? handleEditSubmit : handleSubmit}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                name="employee_id"
                                value={newBenefit.employee_id}
                                onChange={handleInputChange}
                                placeholder="Employee ID"
                                className="border rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="benefit_type"
                                value={newBenefit.benefit_type}
                                onChange={handleInputChange}
                                placeholder="Benefit Type"
                                className="border rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="benefit_details"
                                value={newBenefit.benefit_details}
                                onChange={handleInputChange}
                                placeholder="Benefit Details"
                                className="border rounded-md p-2"
                            />
                            <input
                                type="date"
                                name="start_date"
                                value={newBenefit.start_date}
                                onChange={handleInputChange}
                                className="border rounded-md p-2"
                            />
                            <input
                                type="date"
                                name="end_date"
                                value={newBenefit.end_date}
                                onChange={handleInputChange}
                                placeholder="End Date"
                                className="border rounded-md p-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            {editMode ? 'Save Changes' : 'Add Benefit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BenefitsPage;