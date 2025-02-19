// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Departments from './pages/Departments.jsx';
import Employees from './pages/Employees.jsx';
import BenefitsPage from './pages/BenefitsPage.jsx';
import AttendancePage from './pages/AttendancePage.jsx';
import PerformanceReviewPage from './pages/PerformanceReviewPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar.jsx';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>

                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />


                    <Route element={<ProtectedRoute allowedRoles={['HR', 'Admin']} />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/departments" element={<Departments />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/benefits" element={<BenefitsPage />} />
                        <Route path="/attendance" element={<AttendancePage />} />
                        <Route path="/performanceReview" element={<PerformanceReviewPage />} />
                    </Route>





                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;