// src/dashboard/DashboardHome.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import KPIvsGoalCard from './KPIvsGoalCard';
import { useAuditData } from '../hooks/useAuditData';

const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRSeEHG81Nizo3RkHYw3gv6cF_ZIwAYusaD9CDOej_SCDVRLyzcFJXsXK7DqI-LQ22tKSj2PFspMZO/pub?output=csv';

export default function DashboardHome() {
    const { data, loading, error } = useAuditData(GOOGLE_SHEETS_CSV_URL, 'resumen');

    const getSuffix = (indicador) => {
        const lower = String(indicador).toLowerCase();
        if (lower.includes('riesgo') || lower.includes('cumplimiento')) return '%';
        if (lower.includes('integridad')) return ' pts';
        return '';
    };

    const customTooltipStyle = {
        backgroundColor: '#16191f',
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: '1rem',
        color: '#94a3b8'
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-[#16191f] border border-white/5 rounded-[2rem]">
                <Loader2 className="text-indigo-500 animate-spin mb-4" size={32} />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sincronizando datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-4 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem]">
                <AlertCircle className="text-red-400" size={24} />
                <div>
                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest">Error de Conexión</h3>
                    <p className="text-sm text-slate-400 mt-1">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <header>
                <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-2">Panel de Control</h2>
                <h1 className="text-4xl font-black text-white tracking-tighter">Resumen de Auditoría.</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((kpi, idx) => (
                    <KPIvsGoalCard
                        key={idx}
                        title={kpi.indicador}
                        currentValue={kpi.valor_actual}
                        goalValue={kpi.meta}
                        suffix={getSuffix(kpi.indicador)}
                    />
                ))}
            </div>

            <div className="bg-[#16191f] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-white tracking-tight">Evolución Histórica de Auditoría</h3>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Tendencia por Periodo</p>
                </div>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis dataKey="periodo" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={customTooltipStyle} />
                            <Area type="monotone" dataKey="valor_actual" name="Valor Registrado" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValor)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}