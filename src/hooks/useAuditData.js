// src/hooks/useAuditData.js
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const useAuditData = (csvUrl, filterSection) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!csvUrl) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        const fetchCsvData = async () => {
            try {
                setLoading(true);
                setError(null);

                let response;
                let retries = 3;
                let success = false;

                while (retries > 0 && !success) {
                    try {
                        response = await fetch(csvUrl);
                        if (!response.ok) throw new Error(`HTTP ${response.status}`);
                        success = true;
                    } catch (err) {
                        retries -= 1;
                        if (retries === 0) throw err;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }

                const csvText = await response.text();

                Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: false, // Desactivado para controlar el parseo manualmente
                    skipEmptyLines: true,
                    complete: (results) => {
                        if (!isMounted) return;

                        // Sanitización y Parseo Inteligente
                        const sanitizedData = results.data.map(row => {
                            const parsedActual = parseFloat(row.valor_actual);
                            const parsedMeta = parseFloat(row.meta);

                            return {
                                indicador: row.indicador ? String(row.indicador).trim() : 'N/A',
                                // Si es un número válido lo convierte, si es texto (ej. "Cumple") lo mantiene
                                valor_actual: isNaN(parsedActual) ? (row.valor_actual || 'N/A') : parsedActual,
                                meta: isNaN(parsedMeta) ? (row.meta || 'N/A') : parsedMeta,
                                periodo: row.periodo ? String(row.periodo).trim() : 'N/A',
                                seccion: row.seccion ? String(row.seccion).trim() : 'N/A',
                                observacion: row.observacion ? String(row.observacion).trim() : 'Sin observaciones'
                            };
                        });

                        // Filtrado dinámico por sección
                        const filteredData = filterSection
                            ? sanitizedData.filter(item => item.seccion === filterSection)
                            : sanitizedData;

                        setData(filteredData);
                        setLoading(false);
                    },
                    error: (err) => {
                        if (!isMounted) return;
                        setError(`Error de formato CSV: ${err.message}`);
                        setLoading(false);
                    }
                });

            } catch (err) {
                if (!isMounted) return;
                setError(`Error de conexión tras 3 intentos: ${err.message}`);
                setLoading(false);
            }
        };

        fetchCsvData();

        return () => {
            isMounted = false;
        };
    }, [csvUrl, filterSection]);

    return { data, loading, error };
};