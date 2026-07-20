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
    
    // --- NUEVO ESTADO PARA LOS DATOS DEL USUARIO ---
    const [userData, setUserData] = useState(null);
    
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


    // --- EFECTO COMBINADO PARA PARÁMETROS DE URL ---
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        
        // 1. Capturar datos del usuario y del PDF desde los parámetros
        const userId = params.get('userId');
        const user = params.get('user');
        const email = params.get('email');
        const course = params.get('course');
        const section = params.get('section');
        const urlInicial = params.get('pdfUrl');

        // 2. Si vienen los datos del usuario, los guardamos en el estado
        if (userId) {
            setUserData({ userId, user, email, course, section, pdfUrl: urlInicial });
        }

        // 3. Si hay una URL de PDF, disparamos la carga del documento
        if (urlInicial) {
            cargarDocumento(urlInicial);
        }

        // 4. Limpiamos la URL para remover los parámetros por seguridad/estética
        if (userId || urlInicial) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []); 

    return (
        <PdfContext.Provider value={{ pdfUrl, pdfData, cargarDocumento, cargando, error, userData }}>
            {children}
        </PdfContext.Provider>
    );
};
