// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../authContext.jsx';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        console.log('No user found, redirecting to /login');
        return <Navigate to="/login" replace />;
    }

    try {
        // Decode the JWT token
        const token = user.token;
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const userRole = decoded.role;

        console.log('Decoded Token:', decoded);
        console.log('User Role:', userRole);

        // Check if the user's role matches the allowed roles
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            console.log('User does not have permission to access this route');
            return <Navigate to="/unauthorized" replace />;
        }
    } catch (error) {
        console.error('Invalid token:', error);
        return <Navigate to="/login" replace />;
    }

    // Render the protected route content using Outlet
    console.log('Rendering protected route content');
    return <Outlet />;
};

export default ProtectedRoute;