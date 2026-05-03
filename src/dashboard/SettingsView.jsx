// src/dashboard/SettingsView.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, FileText, Calendar, Upload, Save, FileDown, CheckCircle2, Loader2, Link as LinkIcon, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { useAuditData } from '../hooks/useAuditData';

export default function SettingsView() {
    const fileInputRef = useRef(null);
    const chart1Ref = useRef(null);
    const chart2Ref = useRef(null);
    const printRef = useRef(null);

    // Estado del formulario
    const [formData, setFormData] = useState({
        razonSocial: '',
        cuit: '',
        periodo: '',
        sheetUrl: '',
        logoCliente: null
    });

    // Estado para la URL guardada
    const [activeUrl, setActiveUrl] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Carga inicial desde LocalStorage
    useEffect(() => {
        const savedData = localStorage.getItem('md_audit_settings');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setFormData(parsed);
            setActiveUrl(parsed.sheetUrl || '');
        }
    }, []);

    // Fetch de datos usando la URL activa
    const { data: resumenData, loading: loadingResumen } = useAuditData(activeUrl, 'resumen');
    const { data: analyticsData, loading: loadingAnalytics } = useAuditData(activeUrl, 'auditoria_bi');
    const { data: gestionData, loading: loadingGestion } = useAuditData(activeUrl, 'gestion');

    const isDataLoading = loadingResumen || loadingAnalytics || loadingGestion;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) return alert('El archivo es demasiado grande. Máximo 2MB.');
            const reader = new FileReader();
            reader.onloadend = () => setFormData(prev => ({ ...prev, logoCliente: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        localStorage.setItem('md_audit_settings', JSON.stringify(formData));
        setActiveUrl(formData.sheetUrl);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleReset = () => {
        if (window.confirm('¿Estás seguro de finalizar el encargo? Esto borrará toda la configuración y datos del cliente actual.')) {
            localStorage.removeItem('md_audit_settings');
            window.location.reload();
        }
    };

    // Helper para convertir SVG de Recharts a PNG limpiamente
    const svgToPng = (svgElement, width, height) => {
        return new Promise((resolve, reject) => {
            try {
                const serializer = new XMLSerializer();
                let svgString = serializer.serializeToString(svgElement);
                if (!svgString.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
                    svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
                }
                const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(svgBlob);
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const scale = 4; // Aumentado a 4 para super alta resolución en PDF
                    canvas.width = width * scale;
                    canvas.height = height * scale;
                    const ctx = canvas.getContext('2d');
                    ctx.scale(scale, scale);
                    ctx.drawImage(img, 0, 0, width, height);
                    URL.revokeObjectURL(url);
                    resolve(canvas.toDataURL('image/png', 1.0));
                };
                img.onerror = reject;
                img.src = url;
            } catch (e) {
                reject(e);
            }
        });
    };

    // Motor de Generación PDF Premium (Nativo Vectorial Seguro)
    const generatePDF = async () => {
        if (!activeUrl) return alert('Primero debes guardar una URL de Google Sheets válida.');

        setIsGenerating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800)); // Esperar renderizado completo de datos asíncronos

            const doc = new jsPDF('p', 'mm', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            const drawDarkBackground = () => {
                doc.setFillColor(22, 25, 31); // #16191f
                doc.rect(0, 0, pageWidth, pageHeight, 'F');
            };

            drawDarkBackground();
            let currentY = 15;

            // --- ENCABEZADO ---
            if (formData.logoCliente) {
                doc.addImage(formData.logoCliente, 'JPEG', 14, 10, 35, 15);
            }

            doc.setFontSize(9);
            doc.setTextColor(148, 163, 184);
            doc.text(`Cliente: ${formData.razonSocial || 'No especificado'}`, pageWidth - 14, 15, { align: 'right' });
            doc.text(`CUIT: ${formData.cuit || 'No especificado'}`, pageWidth - 14, 20, { align: 'right' });
            doc.text(`Periodo: ${formData.periodo || 'No especificado'}`, pageWidth - 14, 25, { align: 'right' });

            // --- TÍTULO ---
            currentY = 40;
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.text('DICTAMEN DE AUDITORÍA EXTERNA', pageWidth / 2, currentY, { align: 'center' });

            currentY += 6;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(99, 102, 241);
            doc.text('Resumen Ejecutivo y Hallazgos', pageWidth / 2, currentY, { align: 'center' });

            currentY += 15;

            // --- 1. KPIs NATIVOS VECTORIALES ---
            const kpiWidth = (pageWidth - 28 - 12) / 3;
            if (resumenData && resumenData.length > 0) {
                resumenData.forEach((kpi, index) => {
                    const kpiX = 14 + (index * (kpiWidth + 6));
                    
                    // Fondo principal de la tarjeta
                    doc.setFillColor(30, 34, 43); // #1e222b
                    doc.rect(kpiX, currentY, kpiWidth, 28, 'F');
                    
                    // Barra de acento superior (Indigo corporativo)
                    doc.setFillColor(99, 102, 241); // #6366f1
                    doc.rect(kpiX, currentY, kpiWidth, 1.5, 'F');
                    
                    // Título (Con Auto-Wrap por si es muy largo)
                    doc.setFontSize(7);
                    doc.setTextColor(148, 163, 184); // slate-400
                    doc.setFont('helvetica', 'bold');
                    const splitTitle = doc.splitTextToSize(String(kpi.indicador).toUpperCase(), kpiWidth - 8);
                    doc.text(splitTitle, kpiX + 4, currentY + 6);
                    
                    // Si el título ocupó 2 líneas, bajamos un poco los valores
                    const titleLinesOffset = splitTitle.length > 1 ? 3 : 0;
                    
                    // Valor Actual
                    doc.setFontSize(14);
                    doc.setTextColor(255, 255, 255);
                    doc.text(String(kpi.valor_actual), kpiX + 4, currentY + 16 + titleLinesOffset);
                    
                    // Meta (En su propia línea para evitar amontonamiento)
                    doc.setFontSize(7);
                    doc.setTextColor(100, 116, 139); // slate-500
                    doc.setFont('helvetica', 'normal');
                    doc.text(`Meta esperada: ${kpi.meta}`, kpiX + 4, currentY + 22 + titleLinesOffset);
                });
                currentY += 36; // Aumentamos el margen inferior para respirar
            }

            // --- 2. GRÁFICOS NATIVOS ---
            const chartWidth = (pageWidth - 28 - 6) / 2;
            
            // Fondos de gráficos
            doc.setFillColor(30, 34, 43); // #1e222b
            doc.rect(14, currentY, chartWidth, 75, 'F');
            doc.rect(14 + chartWidth + 6, currentY, chartWidth, 75, 'F');
            
            // Barras de acento superior (Indigo corporativo)
            doc.setFillColor(99, 102, 241); // #6366f1
            doc.rect(14, currentY, chartWidth, 1.5, 'F');
            doc.rect(14 + chartWidth + 6, currentY, chartWidth, 1.5, 'F');

            // Títulos de gráficos
            doc.setFontSize(8);
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.text('DESVIACIÓN: ACTUAL VS META', 14 + 6, currentY + 8);
            doc.text('TENDENCIAS MENSUALES', 14 + chartWidth + 6 + 6, currentY + 8);

            // Extraer y pintar SVGs
            const svg1 = chart1Ref.current?.querySelector('svg');
            const svg2 = chart2Ref.current?.querySelector('svg');

            if (svg1) {
                const dataUrl1 = await svgToPng(svg1, 300, 200);
                doc.addImage(dataUrl1, 'PNG', 14 + 2, currentY + 12, chartWidth - 4, 48);
            }
            if (svg2) {
                const dataUrl2 = await svgToPng(svg2, 300, 200);
                doc.addImage(dataUrl2, 'PNG', 14 + chartWidth + 6 + 2, currentY + 12, chartWidth - 4, 48);
            }

            // Leyendas Nativas
            doc.setFillColor(79, 70, 229);
            doc.rect(14 + 6, currentY + 65, 3, 3, 'F');
            doc.setFontSize(7);
            doc.setTextColor(148, 163, 184);
            doc.setFont('helvetica', 'normal');
            doc.text('Auditado', 14 + 11, currentY + 67.5);

            doc.setFillColor(16, 185, 129);
            doc.rect(14 + 28, currentY + 65, 3, 3, 'F');
            doc.text('Meta', 14 + 33, currentY + 67.5);

            doc.setFillColor(236, 72, 153);
            doc.rect(14 + chartWidth + 6 + 6, currentY + 65, 3, 3, 'F');
            doc.text('Evolución', 14 + chartWidth + 6 + 11, currentY + 67.5);

            currentY += 85;

            // --- TABLA DE GESTIÓN ---
            doc.setFontSize(12);
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.text('Control de Gestión y Riesgos', 14, currentY);

            const tableColumn = ["Indicador Analizado", "Estado Actual / Valor", "Nivel de Riesgo"];
            const tableRows = gestionData.map(item => [
                item.indicador, item.valor_actual, item.meta
            ]);

            autoTable(doc, {
                startY: currentY + 5,
                head: [tableColumn],
                body: tableRows,
                theme: 'grid',
                headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
                styles: {
                    fillColor: [30, 34, 42],
                    textColor: [200, 200, 200],
                    lineColor: [40, 40, 40],
                    lineWidth: 0.1,
                    fontSize: 8,
                    cellPadding: 4
                },
                alternateRowStyles: { fillColor: [22, 25, 31] },
                willDrawPage: function (data) { 
                    if (data.pageNumber > 1) {
                        drawDarkBackground(); 
                    }
                },
                didParseCell: function (data) {
                    if (data.section === 'body') {
                        const content = String(data.cell.raw || '').toUpperCase().trim();
                        
                        // Estado Negativo / Riesgo Alto
                        if (content === 'NO CONFORME' || content.includes('CRÍTICO') || content.includes('CRITICO') || content === 'ALTO') {
                            data.cell.styles.fillColor = [239, 68, 68]; // Rojo (ef4444)
                            data.cell.styles.textColor = [255, 255, 255];
                            data.cell.styles.fontStyle = 'bold';
                        }
                        // Estado Positivo / Riesgo Bajo
                        else if (content === 'CONFORME' || content === 'BAJO' || content === 'CUMPLE' || content === 'ÓPTIMO') {
                            data.cell.styles.fillColor = [16, 185, 129]; // Verde esmeralda (10b981)
                            data.cell.styles.textColor = [255, 255, 255];
                            data.cell.styles.fontStyle = 'bold';
                        }
                        // Estado Intermedio / Riesgo Medio
                        else if (content === 'MEDIO' || content === 'REGULAR' || content === 'EN PROCESO' || content.includes('PARCIAL')) {
                            data.cell.styles.fillColor = [245, 158, 11]; // Naranja ambar (f59e0b)
                            data.cell.styles.textColor = [255, 255, 255];
                            data.cell.styles.fontStyle = 'bold';
                        }
                    }
                }
            });

            // --- HALLAZGOS Y RECOMENDACIONES ---
            const finalY = doc.lastAutoTable.finalY + 15;
            let obsY = finalY;

            if (finalY > 250) {
                doc.addPage();
                drawDarkBackground();
                obsY = 20;
            }

            // Título de Sección
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text('Hallazgos y Recomendaciones Detalladas', 14, obsY);
            
            // Subrayado sutil
            doc.setDrawColor(40, 44, 52);
            doc.line(14, obsY + 2, pageWidth - 14, obsY + 2);

            obsY += 10;

            const validObs = gestionData.filter(item =>
                item.observacion &&
                item.observacion.toLowerCase() !== 'sin observaciones' &&
                item.observacion.toLowerCase() !== 'n/a'
            );

            if (validObs.length === 0) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(148, 163, 184);
                doc.text('No se detectaron hallazgos que requieran planes de acción o comentarios adicionales.', 14, obsY);
            } else {
                validObs.forEach(item => {
                    const risk = String(item.meta).toUpperCase().trim();
                    const isCritical = risk.includes('CRÍTICO') || risk.includes('CRITICO');
                    
                    doc.setFontSize(8);
                    const splitText = doc.splitTextToSize(item.observacion, pageWidth - 36);
                    const cardHeight = 10 + (splitText.length * 4);
                    
                    if (obsY + cardHeight > 280) {
                        doc.addPage();
                        drawDarkBackground();
                        obsY = 20;
                    }
                    
                    // Fondo de la tarjeta (Gris muy oscuro)
                    doc.setFillColor(30, 34, 43);
                    doc.rect(14, obsY, pageWidth - 28, cardHeight, 'F');
                    
                    // Línea lateral de acento (Rojo si es crítico, Índigo si es normal)
                    if (isCritical) {
                        doc.setFillColor(239, 68, 68); 
                    } else {
                        doc.setFillColor(99, 102, 241); 
                    }
                    doc.rect(14, obsY, 2, cardHeight, 'F');
                    
                    // Título del Hallazgo
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(255, 255, 255);
                    doc.text(String(item.indicador), 20, obsY + 6);
                    
                    // Etiqueta de Riesgo flotante a la derecha
                    const riskWidth = doc.getTextWidth(risk);
                    if (isCritical) {
                        doc.setFillColor(239, 68, 68); // Rojo
                    } else {
                        doc.setFillColor(71, 85, 105); // Slate 600
                    }
                    doc.rect(pageWidth - 14 - riskWidth - 4, obsY + 2.5, riskWidth + 4, 4.5, 'F');
                    doc.setFontSize(6);
                    doc.setTextColor(255, 255, 255);
                    doc.text(risk, pageWidth - 14 - riskWidth - 2, obsY + 6);
                    
                    // Párrafo de la observación
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(160, 174, 192); // slate-400
                    doc.text(splitText, 20, obsY + 11);
                    
                    obsY += cardHeight + 4; // Margen inferior
                });
            }

            // --- PIE DE PÁGINA ---
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(100, 100, 100);
                doc.text(`Generado por MD Analytics - Página ${i} de ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
            }

            doc.save(`Dictamen_Auditoria_${formData.razonSocial.replace(/\s+/g, '_') || 'Cliente'}.pdf`);
        } catch (error) {
            console.error("Error crítico generando PDF:", error);
            alert("Hubo un error al generar el PDF. Revisa la consola para más detalles técnicos.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl relative">

            {/* Overlay de carga que oculta el renderizado de gráficos */}
            <AnimatePresence>
                {isGenerating && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 bg-[#16191f] z-[9999] flex flex-col items-center justify-center"
                    >
                        <Loader2 size={48} className="animate-spin text-indigo-500 mb-4" />
                        <h2 className="text-2xl font-black text-white tracking-tighter mb-2">Generando Dictamen PDF</h2>
                        <p className="text-slate-400 text-sm">Compilando gráficos, KPIs y observaciones...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* GRÁFICOS OCULTOS PARA EXTRACCIÓN NATIVA SVG */}
            <div className="fixed left-[-9999px] top-0 opacity-0 pointer-events-none">
                <div ref={chart1Ref}>
                    <BarChart id="pdf-bar-chart-1" width={300} height={200} data={analyticsData} isAnimationActive={false}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
                        <XAxis dataKey="indicador" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} />
                        <Bar dataKey="valor_actual" fill="#4f46e5" isAnimationActive={false} />
                        <Bar dataKey="meta" fill="#10b981" isAnimationActive={false} />
                    </BarChart>
                </div>
                <div ref={chart2Ref}>
                    <LineChart id="pdf-line-chart-2" width={300} height={200} data={analyticsData.filter(item => item.periodo && !String(item.periodo).toUpperCase().includes('Q'))} isAnimationActive={false}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
                        <XAxis dataKey="periodo" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} />
                        <Line type="monotone" dataKey="valor_actual" stroke="#ec4899" strokeWidth={3} isAnimationActive={false} />
                    </LineChart>
                </div>
            </div>
            {/* FIN CONTENEDOR MAESTRO OCULTO */}

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.5em] mb-2">Configuración</h2>
                    <h1 className="text-4xl font-black text-white tracking-tighter">Gestión del Encargo.</h1>
                    <p className="text-slate-500 text-sm mt-2 italic">Parámetros del cliente y personalización de reportes de auditoría.</p>
                </div>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center gap-2"
                >
                    <Trash2 size={16} /> Finalizar Encargo
                </button>
            </header>

            <div className="space-y-6">
                {/* Sección 1: Parámetros y URL */}
                <div className="bg-[#16191f] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                        <Building2 className="text-indigo-500" size={18} /> Parámetros del Cliente
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Razón Social / Cliente</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input type="text" name="razonSocial" value={formData.razonSocial} onChange={handleChange} placeholder="Ej. TechCorp Logistics S.A." className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CUIT / ID Fiscal</label>
                            <input type="text" name="cuit" value={formData.cuit} onChange={handleChange} placeholder="Ej. 30-71234567-8" className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Periodo Auditado</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                <input type="text" name="periodo" value={formData.periodo} onChange={handleChange} placeholder="Ej. 01 Enero 2025 - 31 Diciembre 2025" className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">URL de Fuente de Datos (CSV)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={16} />
                                <input type="text" name="sheetUrl" value={formData.sheetUrl} onChange={handleChange} placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv" className="w-full bg-indigo-500/5 border border-indigo-500/20 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1">Pega aquí el enlace CSV publicado de Google Sheets para alimentar todo el Dashboard.</p>
                        </div>
                    </div>
                </div>

                {/* Sección 2: Logo */}
                <div className="bg-[#16191f] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                        <Upload className="text-indigo-500" size={18} /> Personalización de Reportes
                    </h3>
                    <div className="flex items-center gap-8">
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/png, image/jpeg" className="hidden" />
                        <div onClick={() => fileInputRef.current.click()} className="w-32 h-32 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer bg-white/[0.01] overflow-hidden relative group">
                            {formData.logoCliente ? (
                                <>
                                    <img src={formData.logoCliente} alt="Logo" className="w-full h-full object-contain p-2" />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Upload size={20} className="text-white" /></div>
                                </>
                            ) : (
                                <><Upload size={24} className="mb-2" /><span className="text-[10px] font-bold uppercase tracking-widest text-center px-2">Subir Logo</span></>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">Sube el logotipo de la firma auditora o del cliente. Aparecerá en la cabecera de los dictámenes PDF.</p>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Formatos: PNG, JPG (Max 2MB)</p>
                        </div>
                    </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                    <button
                        onClick={generatePDF}
                        disabled={isGenerating || !activeUrl || isDataLoading}
                        className="px-8 py-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
                        {isGenerating ? 'Procesando...' : 'Generar Dictamen PDF'}
                    </button>
                    <button onClick={handleSave} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Save size={18} /> Guardar Configuración
                    </button>
                </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50">
                        <CheckCircle2 size={20} />
                        <span className="text-sm font-bold tracking-wide">Configuración Guardada Exitosamente</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}