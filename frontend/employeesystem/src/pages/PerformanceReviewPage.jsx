import React, {useState} from 'react';
import axios from "axios";
import {useQuery,useMutation,useQueryClient} from "react-query";
import Navbar from "../components/Navbar.jsx";


const fetchPerformanceReview=async()=>{
    const response=await axios.get('http://localhost:5000/api/performanceReview');
    return response.data

};

const fetchEmployees=async()=>{
    const response=await axios.get('http://localhost:5000/api/employees');
    return response.data
}

function PerformanceReviewPage() {
    const queryClient = useQueryClient();
    const [newReview, setNewReview] = useState({
        employee_id: "",
        review_date: "",
        review_period: "",
        rating: "",
        reviewer: "",
        comments: "",
        goals: ""
    });
    const [editMode, setEditMode] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    const {data: performanceReview, isLoadingEmp, isErrorEmp, errorEmp} = useQuery("performanceReview", fetchPerformanceReview);
const {
    data:employees,
    isLoading,
    isError,
    error
}=useQuery("employees",fetchEmployees);

//mutation per me kriju

    const addReviewMutation = useMutation(
        (newReview) => axios.post('http://localhost:5000/api/performanceReview', newReview),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('performanceReview')
            }
        }
    );

    const editReviewMutation = useMutation(
        ({
             performance_id,
             updatedReview
         }) => axios.put(`http://localhost:5000/api/performanceReview/${performance_id}`, updatedReview),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('performanceReview');
                setEditMode(false);
                setCurrentReview(null)
            }
        }
    );

    const deleteReviewMutation = useMutation(
        (performance_id) => axios.delete(`http://localhost:5000/api/performanceReview/${performance_id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('performanceReview')
            }
        }
    );

    const handleInputChange = (e) => {
        setNewReview({...newReview, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            editReviewMutation.mutate({
                performance_id: currentReview.performance_id,
                updatedReview: newReview
            });
        } else {
            addReviewMutation.mutate(newReview)
        }

        setNewReview({
            employee_id: "",
            review_date: "",
            review_period: "",
            rating: "",
            reviewer: "",
            comments: "",
            goals: ""
        })
    };

    const handleEditClick = (performanceReview) => {
        setEditMode(true);
        setCurrentReview(performanceReview);
        setNewReview({...performanceReview})
    }

    const handleDelete = (performance_id) => {
        deleteReviewMutation.mutate(performance_id)
    }

    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <Navbar/>
            <div className="container mx-auto px-4 py-28">
                <h1 className="text-2xl font-bold text-white mb-6">Performance Reviews</h1>

                {/* Performance Review Table */}
                <div className="bg-gray-700 shadow rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-900">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Employee ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Review Date
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Review Period
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Rating
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Reviewer
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Comments
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Goals
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                        {performanceReview?.map((review) => (
                            <tr key={review.performance_id} className="hover:bg-gray-600">
                                <td className="px-4 py-2 text-sm">{review.employee_id}</td>
                                <td className="px-4 py-2 text-sm">{review.review_date}</td>
                                <td className="px-4 py-2 text-sm">{review.review_period}</td>
                                <td className="px-4 py-2 text-sm">{review.rating}</td>
                                <td className="px-4 py-2 text-sm">{review.reviewer}</td>
                                <td className="px-4 py-2 text-sm">{review.comments}</td>
                                <td className="px-4 py-2 text-sm">{review.goals}</td>
                                <td className="px-4 py-2 text-sm">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 mr-2"
                                        onClick={() => handleEditClick(review)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                                        onClick={() => handleDelete(review.performance_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4">
                        {editMode ? "Edit Performance Review" : "Add New Performance Review"}
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-700 p-6 rounded-lg shadow-md"
                    >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <select name="employee_id"
                                    value={newReview.employee_id}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                                    required
                            >
                                <option value="">Select Employee ID</option>
                                {employees?.map((employee) => (
                                    <option key={employee.employee_id} value={employee.employee_id}>
                                        {employee.employee_id} - {employee.name}
                                    </option>
                                    ))}

                                    </select>
                                    <input
                                    type="date"
                                    name="review_date"
                                    value={newReview.review_date}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                                    required
                            />
                            <input
                                type="text"
                                name="review_period"
                                value={newReview.review_period}
                                onChange={handleInputChange}
                                placeholder="Review Period"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                                required
                            />
                            <input
                                type="number"
                                name="rating"
                                value={newReview.rating}
                                onChange={handleInputChange}
                                placeholder="Rating"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                                required
                            />
                            <input
                                type="text"
                                name="reviewer"
                                value={newReview.reviewer}
                                onChange={handleInputChange}
                                placeholder="Reviewer"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                                required
                            />
                            <input
                                type="text"
                                name="comments"
                                value={newReview.comments}
                                onChange={handleInputChange}
                                placeholder="Comments"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                            />
                            <input
                                type="text"
                                name="goals"
                                value={newReview.goals}
                                onChange={handleInputChange}
                                placeholder="Goals"
                                className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                        >
                            {editMode ? "Save Changes" : "Add Review"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}


export default PerformanceReviewPage;