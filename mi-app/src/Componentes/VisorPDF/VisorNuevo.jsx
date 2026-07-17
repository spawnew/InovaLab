import { useState, useContext } from 'react';
import PanelHerramientas from './PanelHerramientas/PanelHerramientas.jsx';
import HojaTexto from './HojaTexto';
import './style.css';
import { ColorContext } from '../../Context/fondoContext.jsx';
import { PdfContext } from '../../Context/PdfContext.jsx';
import Concentrado from './Concentrado/Concentrado.jsx';

export default function VisorAccesibleLTI() {
  const { pdfData, cargando, error } = useContext(PdfContext);
  const { colorFondo,  colorTexto } = useContext(ColorContext);
 const [colorFondoPDF2, setColorFondoPDF2] = useState('#ffffff');
const [colorTextoPDF2, setColorTextoPDF2] = useState('#1a1a1a');;
  const [tamanioLetra, setTamanioLetra] = useState(16);
  const [textoGlobalSeleccionado, setTextoGlobalSeleccionado] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [menuPosicion, setMenuPosicion] = useState(null);
  const [reproduciendoSeleccion, setReproduciendoSeleccion] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // --- ESTADOS NUEVOS PARA LA EXPLICACIÓN ---
  const [showExplicacionModal, setShowExplicacionModal] = useState(false);
  const [explicacionTexto, setExplicacionTexto] = useState('');
  const [cargandoExplicacion, setCargandoExplicacion] = useState(false);

 
  const solicitarExplicacion = async (texto) => {
    setCargandoExplicacion(true);
    console.log("Solicitando explicación para:", texto); 
    try {
      const response = await fetch('http://localhost:8080/api/v1/explanation', {
        method: 'POST',
        
        headers: {
          'Content-Type': 'text/plain',
        },
        body: texto,
      });
      const data = await response.text();
      setExplicacionTexto(data || "No se recibió respuesta.");
      setShowExplicacionModal(true);
    } catch (error) {
      console.error("Error al pedir explicación:", error);
      alert("Error al conectar con el servidor.");
    } finally {
      setCargandoExplicacion(false);
      setMenuPosicion(null); 
    }
  };
  // Función para resumir el documento completo
const solicitarResumen = async (textoCompleto) => {
  setCargandoExplicacion(true);
  try {
    const response = await fetch('http://localhost:8080/api/v1/summarization', { // Endpoint distinto
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: textoCompleto }),
    });
    const data = await response.json();
    setExplicacionTexto(data.respuesta || "No se recibió resumen.");
    setShowExplicacionModal(true);
  } catch (error) {
    console.error("Error al pedir resumen:", error);
  } finally {
    setCargandoExplicacion(false);
    setMenuPosicion(null);
  }
};

  // --- LÓGICA DE VOZ Y TEMAS (Original) ---
  const leerTexto = () => {
    if (!pdfData) return;
    speechSynthesis.cancel();
    const voz = new SpeechSynthesisUtterance(pdfData);
    voz.lang = "es-AR";
    speechSynthesis.speak(voz);
  };

  const leerTextoSeleccionado = (texto) => {
    speechSynthesis.cancel();
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "es-AR";
    voz.onstart = () => setReproduciendoSeleccion(true);
    voz.onend = () => setReproduciendoSeleccion(false);
    speechSynthesis.speak(voz);
    setMenuPosicion(null);
  };

  const detenerTexto = () => {
    speechSynthesis.cancel();
    setReproduciendoSeleccion(false);
  };

const aplicarTemaPDF = (fondo, texto) => {
  setColorFondoPDF2(fondo);
  setColorTextoPDF2(texto);
 
};
  const aplicarTemafondo = (fondo) => {
  setColorFondoPDF2(fondo);
  
 
  };
  const aplicarTematexto = ( texto) => {
  
  setColorTextoPDF2(texto);
 
};
  




  if (cargando) return <div className="pdf-status">Extrayendo y optimizando el texto para accesibilidad...</div>;
  if (error) return <div className="pdf-status" style={{ color: '#ef4444', padding: '20px' }}><h3>⚠️ Error</h3><p>{error}</p></div>;

  return (
    <div className="visor-container" style={{ padding: '20px',  
  backgroundColor: colorFondo, 
  color: colorTexto, 
  minHeight: '100vh', 
  transition: 'background-color 0.3s ease' // ¡Un toque suave para los cambios!
}}  onClick={() => setMenuPosicion(null)}>
      {pdfData ? (
        <>
          <div className="info-lti-header" style={{ marginBottom: '15px', color: colorTexto }}>
            <h2>Documento procesado</h2>
          </div>
<div className='botonera'>
            
          <button className="boton-accesible" onClick={() => setMenuAbierto(true)}>⚙️ Abrir Menú</button>
          <button className="boton-accesible2" onClick={() => setMenuAbierto(false)}>⚙️ Cerrar Menú</button>
         <button className='boton-concentrado' onClick={() => setShowModal(true)}>Modo Concentrado</button>
            <Concentrado isOpen={showModal} onClose={() => setShowModal(false)} pdfData={pdfData} />
          </div>
          
          {reproduciendoSeleccion && (
            <button className="boton-dinamico" onClick={detenerTexto}>🛑 Detener Lectura</button>
          )}

          {/* Menú Contextual con botón de Explicación */}
          {menuPosicion && (
            <div style={{ position: 'fixed', top: menuPosicion.y, left: menuPosicion.x, zIndex: 1500, background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
              <button onClick={() => leerTextoSeleccionado(textoGlobalSeleccionado)}>📢 Escuchar</button>
              <button onClick={() => solicitarExplicacion(textoGlobalSeleccionado)} style={{ marginLeft: '5px', background: '#0d64dd', color: '#fff' }}>
                {cargandoExplicacion ? "..." : "✨ Explícamelo"}
              </button>
            </div>
          )}

          <PanelHerramientas
             
           aplicarTemaFondo={aplicarTemafondo}
            aplicarTemaTexto={aplicarTematexto}
           aplicarTemaPDF={aplicarTemaPDF} 
            show={menuAbierto}
            handleClose={() => setMenuAbierto(false)}
            tamanioLetra={tamanioLetra}
            setTamanioLetra={setTamanioLetra}
            alEscuchar={leerTexto}
            alDetener={detenerTexto}
           
            generarResumen={() => solicitarResumen(pdfData)}
          />

          <HojaTexto
           
              colorFondoPDF={colorFondoPDF2}
             colorTextoPDF={colorTextoPDF2}
            lineasTexto={pdfData.split('\n')}
            colorFondo={colorFondo}
            colorTexto={colorTexto}
            tamanioLetra={tamanioLetra}
            setTextoGlobalSeleccionado={setTextoGlobalSeleccionado}
            setMenuPosicion={setMenuPosicion}
          />

          

          {/* Modal de Explicación */}
          {showExplicacionModal && (
            <div className="modal-overlay" onClick={() => setShowExplicacionModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Explicación del fragmento</h3>
                <p style={{ whiteSpace: 'pre-wrap' }}>{explicacionTexto}</p>
                <button onClick={() => setShowExplicacionModal(false)}>Cerrar</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="pdf-status">No hay documento para mostrar.</div>
      )}
    </div>
  );
}