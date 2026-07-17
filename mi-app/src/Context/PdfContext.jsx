import { createContext, useState, useEffect } from "react";
import * as pdfjsLib from 'pdfjs-dist';
// Importamos el worker como un módulo de Vite
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfData, setPdfData] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    // 1. Lógica de procesamiento (ahora es una función reutilizable)
    const cargarDocumento = async (url) => {
        setCargando(true);
        setError(null);
        try {
            const urlMoodleEncodada = encodeURIComponent(url);
            const res = await fetch(`/api/v1/view?fileUrl=${urlMoodleEncodada}`);
            
            if (!res.ok) throw new Error("Error al obtener el PDF");

            const arrayBuffer = await res.arrayBuffer();
            const documentoPdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            // Procesamiento de texto
            let textoAcumulado = '';
            for (let i = 1; i <= documentoPdf.numPages; i++) {
                const pagina = await documentoPdf.getPage(i);
                const contenido = await pagina.getTextContent();
                textoAcumulado += contenido.items.map(item => item.str).join(' ') + '\n';
            }
            
            setPdfData(textoAcumulado);
            setPdfUrl(url);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

   
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlInicial = params.get('pdfUrl');
        if (urlInicial) {
            cargarDocumento(urlInicial);
        }
    }, []); 

    return (
        <PdfContext.Provider value={{ pdfUrl, pdfData, cargarDocumento, cargando, error }}>
            {children}
        </PdfContext.Provider>
    );
};