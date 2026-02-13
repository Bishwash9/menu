// src/Components/Auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');

    if (!token) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(role || '')) return <Navigate to="/unauthorized" />;

    return <>{children}</>;
};