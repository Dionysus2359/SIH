// src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import CollegePortal from '../components/CollegePortal';
import FacultyDashboard from '../components/FacultyDashboard';
import ProtectedRoute from '../components/ProtectedRoute'; // 1. Import ProtectedRoute
import { USER_ROLES } from '../constants'; // Import roles for clarity

export default function App() {
  return (
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* This route is for any logged-in user */}
            <Route path="/portal" element={<CollegePortal />} /> 
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.FACULTY]} />}>
            {/* This route is ONLY for logged-in users with the 'faculty' role */}
            <Route path="/faculty" element={<FacultyDashboard />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
  );
}