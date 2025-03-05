// components/AdminFeatures.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../authContext.jsx';

function AdminFeatures() {
    const { user } = useContext(AuthContext);

    if (!user || !user.token) {
        return null; // Ensure only authenticated users see this
    }

    const decoded = JSON.parse(atob(user.token.split('.')[1]));
    const isAdmin = decoded.role === 'Admin';

    if (!isAdmin) {
        return null; // Only render for Admin users
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCreateHRUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/create-hr-user', { username, email, password });
            setSuccessMessage('HR user created successfully!');
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error creating HR user:', error.response?.data || error.message);
            setSuccessMessage('Failed to create HR user.');
        }
    };

    return (
        <div className="mt-8 bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Admin Features</h2>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>
            )}

            {/* Create HR User Form */}
            <form onSubmit={handleCreateHRUser}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        className="w-full px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Create HR User
                </button>
            </form>
        </div>
    );
}

export default AdminFeatures;