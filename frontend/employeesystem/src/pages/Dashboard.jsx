import React, { useEffect, useState } from "react";
import "../styles/tailwind.css";
import Sidebar from "../components/SideBar.jsx";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [departmentCount, setDepartmentCount] = useState(0);
    const [benefitsCount, setBenefitsCount] = useState(0);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const employeeResponse = await axios.get("http://localhost:5000/api/employees");
                setEmployees(employeeResponse.data);
                setEmployeeCount(employeeResponse.data.length);

                const departmentResponse = await axios.get("http://localhost:5000/api/departments");
                setDepartments(departmentResponse.data);
                setDepartmentCount(departmentResponse.data.length);

                const benefitsResponse = await axios.get("http://localhost:5000/api/benefits");
                setBenefitsCount(benefitsResponse.data.length);
            } catch (error) {
                console.error("Error fetching counts", error);
            }
        };
        fetchCounts();
    }, []);

    useEffect(() => {
        if (departments.length && employees.length) {
            const departmentCounts = departments.map((dept) => {
                const count = employees.filter((emp) => emp.department_id === dept.department_id).length;
                return { name: dept.name, count };
            });

            setChartData({
                labels: departmentCounts.map((d) => d.name),
                datasets: [
                    {
                        label: "Employee Count",
                        data: departmentCounts.map((d) => d.count),
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [departments, employees]);
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-900 text-white"> {/* Matches sidebar theme */}

                {/* Header */}
                <h1 className="text-3xl font-bold mb-8 text-gray-100">Dashboard</h1>

                {/* Statistics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-800 shadow-md rounded-lg p-6 text-center border border-gray-700 hover:shadow-lg transition">
                        <h2 className="text-lg font-semibold uppercase text-gray-400">
                            Total Employees
                        </h2>
                        <p className="text-4xl font-bold text-blue-400 mt-2">
                            {employeeCount}
                        </p>
                    </div>

                    <div className="bg-gray-800 shadow-md rounded-lg p-6 text-center border border-gray-700 hover:shadow-lg transition">
                        <h2 className="text-lg font-semibold uppercase text-gray-400">
                            Total Departments
                        </h2>
                        <p className="text-4xl font-bold text-green-400 mt-2">
                            {departmentCount}
                        </p>
                    </div>

                    <div className="bg-gray-800 shadow-md rounded-lg p-6 text-center border border-gray-700 hover:shadow-lg transition">
                        <h2 className="text-lg font-semibold uppercase text-gray-400">
                            Total Benefits
                        </h2>
                        <p className="text-4xl font-bold text-purple-400 mt-2">
                            {benefitsCount}
                        </p>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-gray-800 shadow-md rounded-lg p-8 mt-8 border border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-300 mb-6">
                        Employee Count per Department
                    </h2>
                    {chartData ? (
                        <div className="w-full h-96">
                            <Bar
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                            labels: {
                                                color: "white", // Matches theme
                                            },
                                        },
                                        title: {
                                            display: true,
                                            text: "Employee Count per Department",
                                            color: "white", // Matches theme
                                        },
                                    },
                                    scales: {
                                        x: {
                                            ticks: { color: "white" },
                                            grid: { color: "gray" },
                                        },
                                        y: {
                                            ticks: { color: "white" },
                                            grid: { color: "gray" },
                                        },
                                    },
                                }}
                            />
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center">Loading chart...</p>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Dashboard;
