// src/dashboard/AnalyticsView.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import {
    ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
    BarChart, Bar, AreaChart, Area
} from 'recharts';

export default function AnalyticsView() {
    const scatterData = [
        { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 }, { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 }, { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
        { x: 250, y: 800, z: 900 },
    ];

    const budgetData = [
        { name: 'Q1', Operativo: 4000, Marketing: 2400, RRHH: 2400 },
        { name: 'Q2', Operativo: 3000, Marketing: 1398, RRHH: 2210 },
        { name: 'Q3', Operativo: 2000, Marketing: 9800, RRHH: 2290 },
        { name: 'Q4', Operativo: 2780, Marketing: 3908, RRHH: 2000 },
    ];

    const marginData = [
        { month: 'Ene', margen: 15 }, { month: 'Feb', margen: 18 }, { month: 'Mar', margen: 12 },
        { month: 'Abr', margen: 22 }, { month: 'May', margen: 25 }, { month: 'Jun', margen: 19 },
    ];

    const customTooltipStyle = {
        backgroundColor: '#16191f',
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: '1rem',
        color: '#94a3b8'
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <header>
                <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-2">Auditoría de Datos</h2>
                <h1 className="text-4xl font-black text-white tracking-tighter">Panel de Hallazgos.</h1>
                <p className="text-slate-500 text-sm mt-2 italic">Detección de anomalías y validación de veracidad financiera.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">

                    {/* Gráfico 1 */}
                    <div className="bg-[#16191f] border border-white/5 p-6 rounded-[2rem] shadow-xl">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Dispersión de Ingresos vs. Egresos</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                    <XAxis type="number" dataKey="x" name="Ingresos" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis type="number" dataKey="y" name="Egresos" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={customTooltipStyle} />
                                    <Scatter name="Transacciones" data={scatterData} fill="#6366f1" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Gráfico 2 */}
                        <div className="bg-[#16191f] border border-white/5 p-6 rounded-[2rem] shadow-xl">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Desviación Presupuestaria</h3>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={budgetData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: '#ffffff05' }} />
                                        <Bar dataKey="Operativo" stackId="a" fill="#4f46e5" radius={[0, 0, 4, 4]} />
                                        <Bar dataKey="Marketing" stackId="a" fill="#ec4899" />
                                        <Bar dataKey="RRHH" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Gráfico 3 */}
                        <div className="bg-[#16191f] border border-white/5 p-6 rounded-[2rem] shadow-xl">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Tendencia de Ingresos Auditados</h3>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={marginData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorMargen" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                        <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={customTooltipStyle} />
                                        <Area type="monotone" dataKey="margen" stroke="#10b981" fillOpacity={1} fill="url(#colorMargen)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel Lateral */}
                <div className="bg-[#16191f] border border-white/5 rounded-[2rem] p-6 shadow-xl h-fit">
                    <div className="flex items-center gap-3 mb-8">
                        <ShieldCheck className="text-indigo-500" size={24} />
                        <h3 className="text-lg font-bold text-white tracking-tight">Insights de Auditoría</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-4 items-start">
                            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                            <div>
                                <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Anomalía Detectada</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">Transacción atípica registrada en Q3. Desviación del 340% en cuenta de Marketing.</p>
                            </div>
                        </div>

                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-4 items-start">
                            <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={18} />
                            <div>
                                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Riesgo Moderado</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">Caída del margen de utilidad en Marzo (12%). Requiere revisión de costos fijos.</p>
                            </div>
                        </div>

                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex gap-4 items-start">
                            <TrendingUp className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                            <div>
                                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Punto de Control OK</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">Conciliación bancaria Q1 y Q2 sin discrepancias materiales.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}