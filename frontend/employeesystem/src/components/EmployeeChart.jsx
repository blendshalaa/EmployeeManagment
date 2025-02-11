import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const EmployeeChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");


        const employeeData = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Engineering", "HR", "Marketing", "Sales", "IT"], // Departments
                datasets: [
                    {
                        label: "Employee Count",
                        data: [25, 10, 15, 20, 12], // Employee counts
                        backgroundColor: [
                            "#1abc9c",
                            "#3498db",
                            "#9b59b6",
                            "#e74c3c",
                            "#f1c40f",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });


        return () => {
            employeeData.destroy();
        };
    }, []);

    return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default EmployeeChart;
