import React from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, GraduationCap, Code2, LineChart,
    MapPin, User, ChevronRight, Award,
    Database, ShoppingCart, PenTool
} from 'lucide-react';
import BorderGlow from './BorderGlow';

const ProfilePage = () => {
    const containerVariants = {
        animate: { transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const competencias = [
        { title: "Data Intelligence", desc: "Creación de Dashboards estratégicos en Power BI y Looker Studio.", icon: <LineChart /> },
        { title: "Gestión Operativa", desc: "Liderazgo de tiendas y control de stock físico vs. sistémico.", icon: <Database /> },
        { title: "Análisis de Compras", desc: "Gestión de suministros y adquisiciones para distribución local.", icon: <ShoppingCart /> },
        { title: "Diseño Técnico", desc: "Comunicación visual avanzada para reportes corporativos.", icon: <PenTool /> }
    ];

    const trayectoria = [
        { empresa: "MD Analytics", puesto: "Fundador y Consultor Principal", periodo: "Mayo 2026 – Presente", logros: ["Auditorías externas de datos para retail.", "Optimización de rentabilidad mediante reducción de mermas."] },
        { empresa: "Distribuidora Local", puesto: "Departamento de Compras", periodo: "Abril 2026 – Presente", logros: ["Gestión de inventarios y análisis de datos.", "Optimización de procesos de compra."] },
        { empresa: "Supermercados Día%", puesto: "Store Leader", periodo: "2020 – Marzo 2026", logros: ["Liderazgo integral de sucursal.", "Cumplimiento de objetivos de venta."] }
    ];

    return (
        <div className="min-h-screen bg-[#0f1115] text-slate-400 pt-64 pb-24 px-6">
            <div className="max-w-6xl mx-auto">

                {/* ENCABEZADO */}
                <motion.header
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-20 text-left"
                >
                    <h2 className="text-indigo-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-4">Perfil Profesional</h2>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-none">Milton Xavier Dalpra</h1>
                    <div className="flex flex-wrap gap-6 items-center text-lg text-slate-300 font-bold italic">
                        <span className="flex items-center gap-2"><Briefcase size={20} className="text-indigo-500" /> Estratega de Retail & Data Analytics</span>
                        <span className="flex items-center gap-2 font-normal not-italic"><MapPin size={20} className="text-indigo-500" /> Baradero, Buenos Aires</span>
                    </div>
                </motion.header>

                {/* TRAYECTORIA CON STAGGER (CASCADA) */}
                <motion.section
                    variants={containerVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.1 }}
                    className="mb-20"
                >
                    <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-10 text-left underline decoration-indigo-500 underline-offset-8">Trayectoria Profesional</h3>
                    <div className="space-y-12">
                        {trayectoria.map((t, i) => (
                            <motion.div key={i} variants={itemVariants} className="relative pl-8 border-l border-white/5 text-left">
                                <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[6.5px] top-2 shadow-[0_0_15px_#5227FF]" />
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                    <h4 className="text-2xl font-black text-white tracking-tight">{t.empresa}</h4>
                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{t.periodo}</span>
                                </div>
                                <p className="text-indigo-200 font-bold mb-4 uppercase text-xs">{t.puesto}</p>
                                <ul className="space-y-2">
                                    {t.logros.map((l, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm">
                                            <ChevronRight size={14} className="mt-1 text-indigo-500 flex-shrink-0" /> {l}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* RESTO DE SECCIONES (SINTONIZADAS) */}
                <div className="grid md:grid-cols-2 gap-12 text-left">
                    <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                        <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2"><GraduationCap size={16} /> Formación</h3>
                        <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                            <p className="text-white font-bold text-sm mb-1 uppercase">Licenciatura en Administración</p>
                            <p className="text-xs text-indigo-400 mb-2 font-bold italic">En curso — Foco en BI</p>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                        <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2"><Code2 size={16} /> Stack</h3>
                        <div className="flex flex-wrap gap-3 uppercase text-[10px] font-bold tracking-widest">
                            {["Power BI", "React", "SQL", "Excel VBA"].map(tech => (
                                <span key={tech} className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300">{tech}</span>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;