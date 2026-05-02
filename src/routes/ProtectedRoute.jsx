// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    // Constante temporal para simular la autenticación
    const isAuth = true;

    // Si no está autenticado, redirige a la Landing Page pública
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    // Si está autenticado, renderiza los componentes hijos (el Dashboard)
    return children;
}