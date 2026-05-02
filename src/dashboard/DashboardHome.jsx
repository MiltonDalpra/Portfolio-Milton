// src/dashboard/DashboardHome.jsx
import React from 'react';
import { motion } from 'framer-motion';
import KPIvsGoalCard from './KPIvsGoalCard';

export default function DashboardHome() {
    // KPIs actualizados con terminología de auditoría
    const kpiData = [
        { title: "Cumplimiento Normativo", current: 98, goal: 100, suffix: "%" },
        { title: "Integridad de Datos", current: 995, goal: 1000, suffix: " pts" },
        { title: "Margen de Riesgo", current: 12, goal: 15, suffix: "%" } // Un riesgo menor a la meta es positivo (el componente lo calculará, idealmente requeriría lógica inversa para riesgo, pero mantenemos tu estructura)
    ];

    const chartData = [
        { month: 'Ene', value: 65 }, { month: 'Feb', value: 78 },
        { month: 'Mar', value: 82 }, { month: 'Abr', value: 95 },
        { month: 'May', value: 88 }, { month: 'Jun', value: 105 },
    ];
    const maxChartValue = Math.max(...chartData.map(d => d.value));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
        >
            <header>
                <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-2">Panel de Control</h2>
                <h1 className="text-4xl font-black text-white tracking-tighter">Resumen de Auditoría.</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kpiData.map((kpi, idx) => (
                    <KPIvsGoalCard
                        key={idx}
                        title={kpi.title}
                        currentValue={kpi.current}
                        goalValue={kpi.goal}
                        prefix={kpi.prefix}
                        suffix={kpi.suffix}
                    />
                ))}
            </div>

            <div className="bg-[#16191f] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-white tracking-tight">Volumen de Transacciones Auditadas</h3>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Histórico 6 meses</p>
                </div>

                <div className="h-64 flex items-end gap-4 md:gap-8">
                    {chartData.map((data, idx) => {
                        const heightPct = (data.value / maxChartValue) * 100;
                        return (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className="w-full bg-white/[0.02] rounded-t-xl flex items-end justify-center relative h-full">
                                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-xs font-bold py-1 px-3 rounded-lg pointer-events-none">
                                        {data.value}
                                    </div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${heightPct}%` }}
                                        transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                        className="w-full bg-indigo-500/80 hover:bg-indigo-400 rounded-t-xl transition-colors border-t border-indigo-300/30"
                                    />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    {data.month}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}