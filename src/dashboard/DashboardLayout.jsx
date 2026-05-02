// src/dashboard/DashboardLayout.jsx
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout, BarChart3, Activity, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout() {
    const navigate = useNavigate();

    // Navegación actualizada con terminología de Auditoría Externa
    const menuItems = [
        { icon: <Layout size={20} />, label: 'Panel de Control', path: '/dashboard' },
        { icon: <BarChart3 size={20} />, label: 'Auditoría de Datos', path: '/dashboard/analitica' },
        { icon: <Activity size={20} />, label: 'Control de Gestión', path: '/dashboard/operaciones' },
        { icon: <Settings size={20} />, label: 'Perfil', path: '/dashboard/configuracion' },
    ];

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-[#0f1115] text-slate-400 font-sans overflow-hidden selection:bg-indigo-500/30">
            <motion.aside
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                className="w-64 bg-[#16191f] border-r border-white/5 flex flex-col justify-between relative z-20"
            >
                <div>
                    <div className="p-8 border-b border-white/5">
                        <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
                            MD <span className="text-indigo-500">.</span>
                        </h1>
                        <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-[0.3em] mt-1">
                            Audit & Analytics
                        </p>
                    </div>

                    <nav className="p-4 space-y-2">
                        {menuItems.map((item, idx) => (
                            <NavLink
                                key={idx}
                                to={item.path}
                                end={item.path === '/dashboard'}
                                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-2xl transition-all text-xs font-bold uppercase tracking-widest
                  ${isActive
                                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                        : 'text-slate-500 hover:bg-white/[0.02] hover:text-white border border-transparent'}
                `}
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
                    >
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </motion.aside>

            <main className="flex-1 overflow-y-auto relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#0f1115] to-[#0f1115] -z-10 pointer-events-none" />
                <div className="p-8 md:p-12 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}