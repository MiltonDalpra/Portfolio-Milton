// src/dashboard/OperationsView.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, ShieldAlert, FileSearch } from 'lucide-react';

export default function OperationsView() {
    // Datos actualizados con el campo 'observation'
    const auditFindings = [
        { id: 'AUD-001', point: 'Conciliación de Cuentas por Cobrar', status: 'Cumple', risk: 'Bajo', observation: 'Sin discrepancias materiales.' },
        { id: 'AUD-002', point: 'Control de Inventario Físico vs Sistema', status: 'No Cumple', risk: 'Alto', observation: 'Diferencia del 4% en almacén central.' },
        { id: 'AUD-003', point: 'Validación de Firmas Autorizadas', status: 'Cumple', risk: 'Medio', observation: 'Actualización de legajos pendiente.' },
        { id: 'AUD-004', point: 'Amortización de Activos Fijos', status: 'N/A', risk: 'Bajo', observation: 'Fuera del alcance del periodo.' },
        { id: 'AUD-005', point: 'Segregación de Funciones en Tesorería', status: 'No Cumple', risk: 'Alto', observation: 'Superposición de roles detectada.' },
    ];

    const getStatusBadge = (status) => {
        const styles = {
            'Cumple': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            'No Cumple': 'bg-red-500/10 text-red-400 border-red-500/20',
            'N/A': 'bg-slate-500/10 text-slate-400 border-slate-500/20'
        };
        return <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${styles[status]}`}>{status}</span>;
    };

    const getRiskBadge = (risk) => {
        const styles = {
            'Alto': 'text-red-400', 'Medio': 'text-amber-400', 'Bajo': 'text-emerald-400'
        };
        return <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${styles[risk]}`}><ShieldAlert size={14} /> {risk}</span>;
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-2">Control de Gestión</h2>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Checklist de Auditoría.</h1>
                    <p className="text-slate-500 text-sm mt-2 italic">Revisión sistemática de controles internos y operativos.</p>
                </div>
                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center gap-2">
                    <FileSearch size={16} /> Generar Dictamen
                </button>
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
                                <th className="p-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID Ref</th>
                                <th className="p-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Punto de Control</th>
                                <th className="p-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Estado de Auditoría</th>
                                <th className="p-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nivel de Riesgo</th>
                                <th className="p-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {auditFindings.map((item) => (
                                <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="p-6 text-xs font-bold text-slate-600">{item.id}</td>
                                    <td className="p-6 text-sm text-slate-300 font-medium">{item.point}</td>
                                    <td className="p-6">{getStatusBadge(item.status)}</td>
                                    <td className="p-6">{getRiskBadge(item.risk)}</td>
                                    <td className="p-6 text-xs text-slate-400 italic">{item.observation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}