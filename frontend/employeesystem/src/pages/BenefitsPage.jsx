import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';

function BenefitsPage() {
    const [benefits, setBenefits] = useState([]);

    useEffect(() => {
        const fetchBenefits = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/benefits');
                setBenefits(response.data);
            } catch (error) {
                console.error('Error fetching benefits', error);
            }
        };
        fetchBenefits();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-28">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Benefits List</h1>


                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Benefit ID</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Employee ID</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Benefit Type</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Details</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Start Date</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">End Date</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {benefits.length > 0 ? (
                            benefits.map((benefit) => (
                                <tr key={benefit.benefit_id}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{benefit.benefit_id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{benefit.employee_id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{benefit.benefit_type}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{benefit.benefit_details}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{benefit.start_date}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {benefit.end_date || 'Ongoing'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-4 py-2 text-center text-sm text-gray-500"
                                >
                                    No benefits available.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BenefitsPage;
