import  { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).href;

export default function VisorPdfPersonalizado() {
  const [lineasTexto, setLineasTexto] = useState([]);
  const [cargando, setCargando] = useState(false);

 
  const [tamanioLetra, setTamanioLetra] = useState(16); // Tamaño inicial en píxeles
  const [colorFondo, setColorFondo] = useState('#ffffff'); // Fondo inicial (Blanco)
  const [colorTexto, setColorTexto] = useState('#334155'); // Texto inicial (Gris oscuro)

  const procesarPDF = async (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    setCargando(true);
    try {
      const arrayBuffer = await archivo.arrayBuffer();
      const documentoPdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let textoAcumulado = '';

      for (let i = 1; i <= documentoPdf.numPages; i++) {
        const pagina = await documentoPdf.getPage(i);
        const contenidoTexto = await pagina.getTextContent();
        const textoPagina = contenidoTexto.items.map(item => item.str).join(' ');
        textoAcumulado += textoPagina + '\n';
      }

      const lineas = textoAcumulado
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);

      setLineasTexto(lineas);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  // Funciones rápidas para cambiar los temas de fondo
  const aplicarTema = (fondo, texto) => {
    setColorFondo(fondo);
    setColorTexto(texto);
  };

  return (
    <div className="visor-container">
      
      <div className="control-panel">
        <input type="file" accept="application/pdf" onChange={procesarPDF} />
        {cargando && <span> Cargando capas del documento...</span>}
      </div>

      {lineasTexto.length > 0 && (
        <div className="herramientas-disenio">
        
          <div className="grupo-control">
            <label>Letra: {tamanioLetra}px</label>
            <button onClick={() => setTamanioLetra(prev => prev + 2)}>Agrandar A+</button>
            <button onClick={() => setTamanioLetra(prev => Math.max(12, prev - 2))}>Achicar A-</button>
          </div>

        
          <div className="grupo-control">
            <label>Fondo:</label>
            <button onClick={() => aplicarTema('#ffffff', '#334155')} className="btn-tema claro">Claro</button>
            <button onClick={() => aplicarTema('#f4f1ea', '#433422')} className="btn-tema sepia">Sepia</button>
            <button onClick={() => aplicarTema('#1e293b', '#f8fafc')} className="btn-tema oscuro">Oscuro</button>
          </div>
        </div>
      )}

     
      {lineasTexto.length > 0 && (
        <div 
          className="hoja-render" 
          style={{ 
            backgroundColor: colorFondo, 
            color: colorTexto,
            fontSize: `${tamanioLetra}px` 
          }}
        >
          {lineasTexto.map((linea, index) => {
            
            if (linea.length < 40 && linea === linea.toUpperCase()) {
              return (
                <h2 key={index} style={{ fontSize: `${tamanioLetra * 1.3}px`, color: colorTexto === '#334155' ? '#0f172a' : colorTexto, marginTop: '1.5rem' }}>
                  {linea}
                </h2>
              );
            }
            
           
            return <p key={index} className="parrafo-dinamico">{linea}</p>;
          })}
        </div>
      )}
    </div>
  );
}