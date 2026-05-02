import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, ArrowUpRight, Mail, MapPin, LineChart, Layout, PieChart, BarChart3,
  Layers, FileDown, Code2, Cpu, CheckCircle2, TrendingDown, MessageSquare,
  Terminal, Search, Zap, X, Users, Activity, Menu, Eye, GraduationCap, Award, Briefcase,
  UserCircle
} from 'lucide-react';

import DecryptedText from './components/DecryptedText';
import DotGrid from './components/DotGrid';
import BorderGlow from './components/BorderGlow';
import StatsChart from './components/StatsChart';
import ProfitChart from './components/ProfitChart';
import CountUpStat from './components/CountUpStat';
import ProfilePage from './components/ProfilePage';

// Iconos (Mantenemos tu base impecable)
const Linkedin = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.3" /><path d="M7 11c.5 0 1 .5 1 1a5 5 0 0 0 5 5c.5 0 1-.5 1-1" /><path d="M12 7h.01" /><path d="M17 7h.01" /><path d="M14 11h.01" /><path d="M22 21l-4.3-4.3" />
  </svg>
);

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  // 1. Estado inicial calculado al instante
  const [isAvailable, setIsAvailable] = useState(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return day >= 1 && day <= 5 && hour >= 9 && hour < 20;
  });

  // 2. Efecto dedicado para el reloj en tiempo real
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const status = day >= 1 && day <= 5 && hour >= 9 && hour < 20;

      setIsAvailable((prev) => (prev !== status ? status : prev));
    };

    const timer = setInterval(check, 1000); // Revisión cada 1 segundo
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = currentView === 'home' ? "Milton | Data & Software" : "Milton | Perfil Profesional";
  }, [currentView]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 20, duration: 1.2 }
    }
  };

  const techStack = [
    { name: "Power BI", icon: <PieChart size={16} /> },
    { name: "Excel VBA", icon: <Layout size={16} /> },
    { name: "SAP / ERP", icon: <Database size={16} /> },
    { name: "SQL Server", icon: <Terminal size={16} /> },
    { name: "React JS", icon: <Code2 size={16} /> },
    { name: "Python", icon: <Cpu size={16} /> }
  ];

  const misProyectos = [
    {
      title: 'Honda Ramón Suárez',
      desc: 'Catálogo dinámico Mobile First con etiquetas en vivo.',
      fullDesc: 'Desarrollé una solución UX Front con React para Honda Ramón Suárez. Implementé filtrado dinámico en tiempo real[cite: 2].',
      tech: ['React', 'Mobile First', 'UX Front'],
      link: 'https://hondaramonsuarez.com.ar/',
      icon: <Layers size={20} />
    },
    {
      title: 'Optimización DIA Argentina',
      desc: 'Reducción de pérdida del 8% al 1.5% mediante KPIs.',
      fullDesc: 'Lideró la optimización operativa en DIA Argentina. Logré reducir la merma del 8% al 1.5% mediante análisis de datos[cite: 2].',
      tech: ['Data Analysis', 'ERP', 'KPIs'],
      link: '#',
      icon: <TrendingDown size={20} />
    }
  ];

  const servicios = [
    { title: "Automatización & BI", desc: "Transformo procesos manuales en flujos automatizados.", icon: <Zap size={24} /> },
    { title: "Eficiencia Operativa", desc: "Optimización de inventarios y control de KPIs.", icon: <BarChart3 size={24} /> },
    { title: "Ingeniería de Software", desc: "Desarrollo de interfaces con React.", icon: <Code2 size={24} /> }
  ];

  const educacion = [
    { title: "Business Intelligence & Power BI", institution: "CAC", date: "Enero 2026", desc: "Especialización en modelado de datos y ETL.", type: "Certificación" },
    { title: "Técnico en Diseño", institution: "Bellas Artes", date: "Dic 2019", desc: "Estética aplicada a productos.", type: "Título Técnico" },
    { title: "Técnico Electromecánico", institution: "E.E.T. N.º 1", date: "Dic 2017", desc: "Lógica industrial.", type: "Título Técnico" }
  ];

  return (
    <div id="inicio" className="min-h-screen bg-[#0f1115] text-slate-400 font-sans selection:bg-indigo-500/30 overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-[#0f1115]/90 backdrop-blur-md py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={handleLogoClick} className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase relative z-[60] cursor-pointer hover:text-indigo-400 transition-colors">
            MILTON <span className="text-indigo-500">.</span>
          </button>

          <button className="md:hidden text-slate-400 hover:text-white transition-colors relative z-[60]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] items-center">
            {currentView === 'home' ? (
              <>
                <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
                <a href="#data" className="hover:text-white transition-colors">Analítica</a>
                <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
                <button onClick={() => setCurrentView('profile')} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-indigo-500 transition-all flex items-center gap-2 uppercase font-bold tracking-widest text-[10px]">MI PERFIL <UserCircle size={14} /></button>
              </>
            ) : (
              <button onClick={() => setCurrentView('home')} className="hover:text-white border-b border-indigo-500 pb-1 uppercase font-bold tracking-widest text-[10px]">Inicio</button>
            )}
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* HERO */}
              <section className="relative pt-64 pb-32 px-6 min-h-screen flex items-center text-left">
                <div className="absolute inset-0 z-0"><DotGrid dotSize={5} gap={15} baseColor="#1e1b4b" activeColor="#5227FF" /></div>
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="max-w-6xl mx-auto relative z-10 w-full">

                  {/* INDICADOR DINÁMICO REFORZADO[cite: 2] */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                      {isAvailable ? 'Disponible' : 'Fuera de horario'}
                    </span>
                  </div>

                  <p className="text-indigo-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-6 animate-pulse">MILTON . DATA ANALYST & SOFTWARE ENGINEER</p>
                  <h1 className="text-7xl md:text-[140px] font-bold text-white mb-10 tracking-tighter leading-[0.8]"><DecryptedText text="Solve with Data." className="italic text-slate-300" parentClassName="inline-block" /></h1>
                  <p className="text-2xl md:text-3xl text-slate-500 max-w-4xl mb-16 leading-tight">Especialista en transformar registros administrativos en reportes estratégicos mediante <span className="text-white font-bold">Excel, Big Data y Power BI</span>.</p>
                  <div className="flex flex-wrap gap-6 items-center">
                    <a href="#contacto" className="px-12 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all uppercase tracking-widest text-xs flex items-center gap-2">HABLEMOS <MessageSquare size={16} /></a>
                    <a href="/CV_Milton_Dalpra_Administrativo_Analista.pdf" download="CV_Milton_Dalpra.pdf" className="px-8 py-5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white hover:text-black transition-all text-xs tracking-widest">DESCARGAR CV <FileDown size={18} /></a>
                    <a href="https://www.linkedin.com/in/miltondalpra/" target="_blank" rel="noreferrer" className="hover:text-white transition-all ml-4"><Linkedin size={28} /></a>
                  </div>
                </motion.div>
              </section>

              {/* SERVICIOS */}
              <motion.section id="servicios" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-4">Soluciones Corporativas</h2>
                  <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-20">¿Cómo puedo ayudarte?</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {servicios.map((s, i) => (
                      <div key={i} className="p-12 bg-[#16191f] border border-white/5 rounded-[3rem] hover:border-indigo-500/30 transition-all group text-left">
                        <div className="mb-8 p-4 bg-indigo-500/10 w-fit rounded-2xl text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">{s.icon}</div>
                        <h4 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">{s.title}</h4>
                        <p className="text-slate-400 leading-relaxed italic">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* TECH CAROUSEL */}
              <section className="py-12 border-b border-white/5 overflow-hidden">
                <div className="flex animate-marquee gap-20 items-center whitespace-nowrap">
                  {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-500 hover:text-indigo-400 transition-colors">{tech.icon}<span className="text-xs font-bold uppercase tracking-widest">{tech.name}</span></div>
                  ))}
                </div>
              </section>

              {/* MÉTRICAS */}
              <motion.section variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="py-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-4">Métricas de Éxito</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-10 bg-indigo-600 rounded-[2.5rem] text-white">
                      <TrendingDown className="mb-6 opacity-50 mx-auto" size={32} />
                      <p className="text-5xl font-black mb-2 tracking-tighter"><CountUpStat endValue={6.5} prefix="-" suffix="%" decimals={1} duration={2500} /></p>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/80">Pérdida de Stock</p>
                    </div>
                    <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[2.5rem]">
                      <CheckCircle2 className="mb-6 text-indigo-500 mx-auto" size={32} />
                      <p className="text-5xl font-black text-white mb-2 tracking-tighter"><CountUpStat endValue={100} suffix="%" duration={2000} /></p>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Auditorías OK</p>
                    </div>
                    <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[2.5rem]">
                      <Eye className="mb-6 text-indigo-500 mx-auto" size={32} />
                      <p className="text-5xl font-black text-white mb-2 tracking-tighter"><CountUpStat endValue={125} prefix="+" suffix="%" duration={3000} /></p>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Visitas al Sitio</p>
                    </div>
                    <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[2.5rem]">
                      <Activity className="mb-6 text-indigo-500 mx-auto" size={32} />
                      <p className="text-5xl font-black text-white mb-2 tracking-tighter"><CountUpStat endValue={24} suffix="/7" duration={2500} /></p>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Catálogo en Vivo</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* ANALÍTICA */}
              <motion.section id="data" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="py-32 px-4 md:px-10 border-t border-white/5">
                <BorderGlow glowColor="#4f46e5">
                  <div className="p-12 md:p-20 grid md:grid-cols-2 gap-20 items-center">
                    <div className="text-left">
                      <h2 className="text-xs font-bold uppercase tracking-[0.4em] mb-8 text-indigo-200 italic">Data Intelligence</h2>
                      <h3 className="text-5xl font-bold mb-8 tracking-tighter text-white leading-tight">Ingeniería de Decisiones.</h3>
                      <p className="text-xl text-slate-400 mb-10 leading-relaxed italic">Automatizo la gestión administrativa para transformarla en BI estratégico.</p>
                      <div className="grid md:grid-cols-2 gap-8 items-stretch"><StatsChart /><ProfitChart /></div>
                    </div>
                    <div className="bg-[#16191f] p-12 rounded-[2.5rem] border border-white/5 text-left h-full flex flex-col justify-center shadow-2xl">
                      <Briefcase size={40} className="text-indigo-500 mb-8" /><h4 className="text-white font-bold mb-8 italic tracking-widest uppercase text-xs">Liderazgo Operativo</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                          <div className="flex items-center gap-4"><div className="bg-indigo-500/10 p-3 rounded-xl"><Users size={18} className="text-indigo-400" /></div><span className="text-slate-300 font-medium text-sm">Equipo a Cargo</span></div><span className="text-indigo-400 font-black text-xl tracking-tighter">8 Senior</span>
                        </div>
                        <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                          <div className="flex items-center gap-4"><div className="bg-emerald-500/10 p-3 rounded-xl"><Activity size={18} className="text-emerald-400" /></div><span className="text-slate-300 font-medium text-sm">Error Tesorería</span></div><span className="text-emerald-400 font-black text-xl tracking-tighter">&lt;2%</span>
                        </div>
                        <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                          <div className="flex items-center gap-4"><div className="bg-amber-500/10 p-3 rounded-xl"><Award size={18} className="text-amber-400" /></div><span className="text-slate-300 font-medium text-sm">Audit Score</span></div><span className="text-amber-400 font-black text-xl tracking-tighter">100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </motion.section>

              {/* PROYECTOS */}
              <motion.section id="proyectos" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="py-32 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto text-left">
                  <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-20 leading-none uppercase text-center">Proyectos <br /> <span className="text-indigo-500 italic">Anteriores.</span></h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    {misProyectos.map((p, i) => (
                      <div key={i} className="group bg-white/[0.01] border border-white/5 rounded-[3rem] p-12 hover:border-indigo-500/20 transition-all shadow-lg block">
                        <div className="flex justify-between items-start mb-10"><div className="text-indigo-400 bg-indigo-500/5 p-4 rounded-2xl">{p.icon}</div><a href={p.link} target="_blank" rel="noreferrer"><ArrowUpRight className="text-slate-800 group-hover:text-white transition-all" size={24} /></a></div>
                        <h4 className="text-3xl font-bold text-white mb-4 tracking-tight">{p.title}</h4>
                        <p className="text-lg text-slate-500 mb-10 leading-relaxed italic opacity-80">{p.desc}</p>
                        <button onClick={() => setSelectedProject(p)} className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white transition-colors mb-4 block">Ver Proceso Técnico</button>
                        <div className="flex flex-wrap gap-3">{p.tech.map(t => (<span key={t} className="text-[9px] font-bold text-slate-600 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">{t}</span>))}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* EDUCACIÓN[cite: 2] */}
              <motion.section id="educacion" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="py-32 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-4">Respaldo Académico</h2>
                  <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-20 text-center">Formación & Títulos.</h3>
                  <div className="grid md:grid-cols-3 gap-8 text-left">
                    {educacion.map((ed, i) => (
                      <div key={i} className="p-10 border border-white/5 rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                        <div className="flex items-center gap-4 mb-8">
                          <span className="text-indigo-500">{ed.type === "Certificación" ? <Award size={32} /> : <GraduationCap size={32} />}</span>
                          <div><p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">{ed.type}</p><p className="text-xs text-slate-500 font-bold">{ed.date}</p></div>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{ed.title}</h4>
                        <p className="text-sm text-slate-500 font-bold mb-4">{ed.institution}</p>
                        <p className="text-sm text-slate-400 leading-relaxed italic">{ed.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            </motion.div>
          ) : (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProfilePage />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTACTO SIEMPRE VISIBLE */}
        <section id="contacto" className="py-48 px-6 bg-[#0c0e12] border-t border-white/5 text-left">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-20 items-center">
            <div className="md:w-1/2 text-left">
              <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-12 italic">Contacto</h2>
              <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-16 leading-[0.8]">Hablemos de <br /> <span className="italic text-slate-600">tu negocio.</span></h3>
              <p className="text-xl text-white font-medium flex items-center gap-4"><MapPin size={20} className="text-indigo-500" /> Baradero, Buenos Aires</p>
            </div>
            <div className="md:w-1/2 w-full max-w-lg grid md:grid-cols-2 gap-6 md:ml-auto">
              <a href="mailto:miltondalpra@gmail.com" className="block bg-white/[0.03] border border-white/5 p-6 rounded-3xl group hover:bg-indigo-600 transition-all duration-700 shadow-xl"><Mail className="mb-4 text-indigo-500 group-hover:text-white" size={24} aria-hidden="true" /><p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 group-hover:text-indigo-200">Escribime</p><p className="text-lg font-bold text-white truncate">miltondalpra@gmail.com</p></a>
              <a href="https://wa.me/543329627497" target="_blank" rel="noreferrer" className="block bg-white/[0.03] border border-white/5 p-6 rounded-3xl group hover:bg-emerald-600 transition-all duration-700 shadow-xl"><WhatsAppIcon size={24} className="mb-4 text-green-500 group-hover:text-white" aria-hidden="true" /><p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 group-hover:text-emerald-200">WhatsApp</p><p className="text-lg font-bold text-white truncate">+54 3329 627497</p></a>
              <a href="https://www.linkedin.com/in/miltondalpra/" target="_blank" rel="noreferrer" className="md:col-span-2 block bg-white/[0.03] border border-white/5 p-5 rounded-2xl text-center hover:bg-white hover:text-black transition-all text-white shadow-md"><Linkedin size={24} className="mx-auto" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-slate-800 border-t border-white/5">Hecho con ❤️ por Milton — {new Date().getFullYear()}</footer>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0f1115]/95 backdrop-blur-sm" role="dialog" aria-modal="true">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="max-w-2xl w-full bg-[#16191f] border border-white/10 rounded-[3rem] p-12 relative text-left">
              <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
              <h5 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-4">Caso de Estudio</h5>
              <h4 className="text-4xl font-black text-white mb-8 tracking-tighter">{selectedProject.title}</h4>
              <p className="text-xl text-slate-400 leading-relaxed mb-10">{selectedProject.fullDesc}</p>
              <div className="flex flex-wrap gap-3">{selectedProject.tech.map(t => <span key={t} className="text-[10px] font-bold text-white uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">{t}</span>)}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}