// src/dashboard/AnalyticsView.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAuditData } from '../hooks/useAuditData';

const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRSeEHG81Nizo3RkHYw3gv6cF_ZIwAYusaD9CDOej_SCDVRLyzcFJXsXK7DqI-LQ22tKSj2PFspMZO/pub?output=csv';

export default function AnalyticsView() {
    const { data, loading, error } = useAuditData(GOOGLE_SHEETS_CSV_URL, 'auditoria_bi');

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
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Analizando datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-4 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem]">
                <AlertCircle className="text-red-400" size={24} />
                <div>
                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest">Error de Análisis</h3>
                    <p className="text-sm text-slate-400 mt-1">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <header>
                <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-2">Auditoría de Datos</h2>
                <h1 className="text-4xl font-black text-white tracking-tighter">Panel de Hallazgos.</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#16191f] border border-white/5 p-8 rounded-[2rem] shadow-xl">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Desviación: Actual vs Meta</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="indicador" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: '#ffffff05' }} />
                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Bar dataKey="valor_actual" name="Valor Auditado" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="meta" name="Meta Establecida" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#16191f] border border-white/5 p-8 rounded-[2rem] shadow-xl">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Tendencias Mensuales</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="periodo" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={customTooltipStyle} />
                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="valor_actual" name="Evolución" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, fill: '#ec4899', strokeWidth: 2, stroke: '#16191f' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}