// src/dashboard/KPIvsGoalCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KPIvsGoalCard({ title, currentValue, goalValue, prefix = '', suffix = '' }) {
    const percentage = goalValue > 0 ? (currentValue / goalValue) * 100 : 0;

    // Lógica de estados de rendimiento
    const getPerformanceData = () => {
        if (percentage >= 100) return { color: 'text-emerald-400', bg: 'bg-emerald-500', icon: <TrendingUp size={16} /> };
        if (percentage >= 80) return { color: 'text-amber-400', bg: 'bg-amber-500', icon: <Minus size={16} /> };
        return { color: 'text-red-400', bg: 'bg-red-500', icon: <TrendingDown size={16} /> };
    };

    const { color, bg, icon } = getPerformanceData();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#16191f] border border-white/5 p-6 rounded-[2rem] shadow-xl relative overflow-hidden group"
        >
            {/* Glow effect sutil en hover */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 ${bg} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500 rounded-full`} />

            <div className="flex justify-between items-start mb-6">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    {title}
                </h3>
                <div className={`p-2 rounded-xl bg-white/[0.02] border border-white/5 ${color}`}>
                    <Target size={18} />
                </div>
            </div>

            <div className="flex items-end gap-4 mb-4">
                <span className="text-4xl font-black text-white tracking-tighter">
                    {prefix}{currentValue.toLocaleString()}{suffix}
                </span>
                <span className="text-sm text-slate-500 font-medium mb-1">
                    / {prefix}{goalValue.toLocaleString()}{suffix}
                </span>
            </div>

            <div className="flex items-center justify-between mb-2">
                <div className={`flex items-center gap-1 text-xs font-bold tracking-widest ${color}`}>
                    {icon}
                    <span>{percentage.toFixed(1)}%</span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">Cumplimiento</span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${bg}`}
                />
            </div>
        </motion.div>
    );
}