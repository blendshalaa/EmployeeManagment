import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from 'axios';

// Fetch attendance data from the API
const fetchAttendance = async () => {
    const response = await axios.get('http://localhost:5000/api/attendance');
    return response.data;
};

const AttendancePage = () => {
    const queryClient = useQueryClient();
    const [newRecord, setNewRecord] = useState({
        employee_id: "",
        date: "",
        status: "Present",
        hours_worked: "",
        leave_reason: ""
    });
    const [editMode, setEditMode] = useState(false);
    const [currentAttendance, setCurrentAttendance] = useState(null);

    // Fetch attendance data using react-query
    const { data: attendance, isLoading, isError, error } = useQuery("attendance", fetchAttendance);

    // Mutation to add a new attendance record
    const addRecordMutation = useMutation(
        (newRecord) => axios.post('http://localhost:5000/api/attendance', newRecord),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('attendance');
            }
        }
    );

    // Mutation to edit an existing attendance record
    const editAttendanceMutation = useMutation(
        ({ attendance_id, updatedAttendance }) =>
            axios.put(`http://localhost:5000/api/attendance/${attendance_id}`, updatedAttendance),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("attendance");
                setEditMode(false);
                setCurrentAttendance(null);
            },
        }
    );

    // Mutation to delete an attendance record
    const deleteAttendanceMutation = useMutation(
        (attendance_id) => axios.delete(`http://localhost:5000/api/attendance/${attendance_id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('attendance');
            },
        }
    );

    // Handle input changes in the form
    const handleInputChange = (e) => {
        setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            editAttendanceMutation.mutate({
                attendance_id: currentAttendance.attendance_id,
                updatedAttendance: newRecord,
            });
        } else {
            addRecordMutation.mutate(newRecord);
        }

        // Reset the form after submission
        setNewRecord({
            employee_id: "",
            date: "",
            status: "Present",
            hours_worked: "",
            leave_reason: ""
        });
    };

    // Handle edit button click
    const handleEditClick = (attendance) => {
        setEditMode(true);
        setCurrentAttendance(attendance);
        setNewRecord({ ...attendance });
    };

    // Handle delete button click
    const handleDelete = (attendance_id) => {
        deleteAttendanceMutation.mutate(attendance_id);
    };

    // Render the component
    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-28">
                <h1 className="text-2xl font-bold text-white mb-6">Attendance List</h1>

                <div className="bg-gray-700 shadow rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-900">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Employee ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Date
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Status
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Hours Worked
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Leave Reason
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                        {attendance?.length > 0 ? (
                            attendance.map((record) => (
                                <tr key={record.attendance_id} className="hover:bg-gray-600">
                                    <td className="px-4 py-2 text-sm">{record.employee_id}</td>
                                    <td className="px-4 py-2 text-sm">{record.date}</td>
                                    <td className="px-4 py-2 text-sm">{record.status}</td>
                                    <td className="px-4 py-2 text-sm">{record.hours_worked}</td>
                                    <td className="px-4 py-2 text-sm">{record.leave_reason}</td>
                                    <td className="px-4 py-2 text-sm">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 mr-2"
                                            onClick={() => handleEditClick(record)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                                            onClick={() => handleDelete(record.attendance_id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-4 py-2 text-center text-sm text-gray-300"
                                >
                                    No attendance records available.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4">
                        {editMode ? "Edit Attendance Record" : "Add New Attendance Record"}
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-700 p-6 rounded-lg shadow-md"
                    >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                name="employee_id"
                                value={newRecord.employee_id}
                                onChange={handleInputChange}
                                placeholder="Employee ID"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                                required
                            />
                            <input
                                type="date"
                                name="date"
                                value={newRecord.date}
                                onChange={handleInputChange}
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                                required
                            />
                            <select
                                name="status"
                                value={newRecord.status}
                                onChange={handleInputChange}
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                                required
                            >
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                            </select>
                            <input
                                type="text"
                                name="hours_worked"
                                value={newRecord.hours_worked}
                                onChange={handleInputChange}
                                placeholder="Hours Worked"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                            />
                            <input
                                type="text"
                                name="leave_reason"
                                value={newRecord.leave_reason}
                                onChange={handleInputChange}
                                placeholder="Leave Reason"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                        >
                            {editMode ? "Save Changes" : "Add Record"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;



