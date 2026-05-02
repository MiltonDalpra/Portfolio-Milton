// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../App';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../dashboard/DashboardLayout';
import DashboardHome from '../dashboard/DashboardHome';

// Nuevas Vistas Importadas
import AnalyticsView from '../dashboard/AnalyticsView';
import OperationsView from '../dashboard/OperationsView';
import SettingsView from '../dashboard/SettingsView';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardHome />} />
                    {/* Nuevas rutas mapeadas exactamente como solicitaste */}
                    <Route path="analitica" element={<AnalyticsView />} />
                    <Route path="operaciones" element={<OperationsView />} />
                    <Route path="configuracion" element={<SettingsView />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}