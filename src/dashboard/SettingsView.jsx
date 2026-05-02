// src/dashboard/SettingsView.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, FileText, Calendar, Upload, Save } from 'lucide-react';

export default function SettingsView() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl">
            <header>
                <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-2">Configuración</h2>
                <h1 className="text-4xl font-black text-white tracking-tighter">Gestión del Encargo.</h1>
                <p className="text-slate-500 text-sm mt-2 italic">Parámetros del cliente y personalización de reportes de auditoría.</p>
            </header>

            <div className="space-y-6">
                {/* Sección 1: Parámetros del Cliente */}
                <div className="bg-[#16191f] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                        <Building2 className="text-indigo-500" size={18} /> Parámetros del Cliente
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Razón Social / Cliente</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input type="text" defaultValue="TechCorp Logistics S.A." className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CUIT / ID Fiscal</label>
                            <input type="text" defaultValue="30-71234567-8" className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Periodo Auditado</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input type="text" defaultValue="01 Enero 2025 - 31 Diciembre 2025" className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 2: Personalización */}
                <div className="bg-[#16191f] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                        <Upload className="text-indigo-500" size={18} /> Personalización de Reportes
                    </h3>

                    <div className="flex items-center gap-8">
                        <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer bg-white/[0.01]">
                            <Upload size={24} className="mb-2" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Subir Logo</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                Sube el logotipo de la firma auditora o del cliente. Este logo aparecerá en la cabecera de todos los dictámenes y reportes exportados en PDF.
                            </p>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Formatos: PNG, JPG (Max 2MB)</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Save size={18} /> Guardar Configuración
                    </button>
                </div>
            </div>
        </motion.div>
    );
}