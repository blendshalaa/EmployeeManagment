import React, { useEffect, useState } from "react";
import "../styles/tailwind.css";
import Sidebar from "../components/SideBar.jsx";
import axios from "axios";

function Dashboard() {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [departmentCount, setDepartmentCount] = useState(0);
    const[benefitsCount,setBenefitsCount]=useState(0)

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const employeeResponse = await axios.get("http://localhost:5000/api/employees");
                setEmployeeCount(employeeResponse.data.length);

                const departmentResponse = await axios.get("http://localhost:5000/api/departments"); // Correct endpoint for departments
                setDepartmentCount(departmentResponse.data.length);

                const benefitsResponse=await axios.get('http://localhost:5000/api/benefits');
                setBenefitsCount(benefitsResponse.data.length);

            } catch (error) {
                console.error("Error fetching counts", error);
            }
        };
        fetchCounts();
    }, []);

    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-700">Total Employees</h2>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{employeeCount}</p>
                    </div>


                    <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-700">Total Departments</h2>
                        <p className="text-3xl font-bold text-green-600 mt-2">{departmentCount}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-700">Total Benefits</h2>
                        <p className="text-3xl font-bold text-green-600 mt-2">{benefitsCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
