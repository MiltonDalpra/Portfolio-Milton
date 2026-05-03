// src/dashboard/OperationsView.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, ClipboardCheck, ShieldAlert } from 'lucide-react';
import { useAuditData } from '../hooks/useAuditData';

const savedSettings = JSON.parse(localStorage.getItem('md_audit_settings') || '{}');
const GOOGLE_SHEETS_CSV_URL = savedSettings.sheetUrl || '';

export default function OperationsView() {
    const { data, loading, error } = useAuditData(GOOGLE_SHEETS_CSV_URL, 'gestion');

    const getStatusBadge = (status) => {
        const s = String(status).toLowerCase();
        let styles = 'bg-slate-500/10 text-slate-400 border-slate-500/20';

        if (s.includes('cumple') && !s.includes('no')) styles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        if (s.includes('no cumple') || s.includes('fallo')) styles = 'bg-red-500/10 text-red-400 border-red-500/20';
        if (s.includes('proceso') || s.includes('parcial')) styles = 'bg-amber-500/10 text-amber-400 border-amber-500/20';

        return <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${styles}`}>{status}</span>;
    };

    // Lógica de renderizado de Riesgo actualizada
    const getRiskBadge = (risk) => {
        const r = String(risk).toUpperCase().trim();
        let styles = 'text-slate-400'; // Color por defecto

        if (r.includes('CRÍTICO') || r.includes('CRITICO')) {
            styles = 'text-red-500';
        } else if (r.includes('MEDIO')) {
            styles = 'text-amber-500';
        } else if (r.includes('BAJO')) {
            styles = 'text-emerald-500';
        }

        return (
            <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${styles}`}>
                <ShieldAlert size={14} className={styles} /> {risk}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-[#16191f] border border-white/5 rounded-[2rem]">
                <Loader2 className="text-indigo-500 animate-spin mb-4" size={32} />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cargando registros...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-4 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem]">
                <AlertCircle className="text-red-400" size={24} />
                <div>
                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest">Error de Lectura</h3>
                    <p className="text-sm text-slate-400 mt-1">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <header>
                <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-2">Control de Gestión</h2>
                <h1 className="text-4xl font-black text-white tracking-tighter">Checklist de Auditoría.</h1>
            </header>

            <div className="bg-[#16191f] border border-white/5 rounded-[2rem] shadow-xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <ClipboardCheck className="text-indigo-500" size={24} />
                    <h3 className="text-lg font-bold text-white tracking-tight">Registro de Hallazgos</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Punto de Control</th>
                                <th className="p-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Estado de Auditoría</th>
                                <th className="p-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nivel de Riesgo</th>
                                <th className="p-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.map((item, idx) => (
                                <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="p-6 text-sm text-slate-300 font-medium">{item.indicador}</td>
                                    <td className="p-6">{getStatusBadge(item.valor_actual)}</td>
                                    <td className="p-6">{getRiskBadge(item.meta)}</td>
                                    <td className="p-6 text-xs text-slate-400 italic">{item.observacion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}