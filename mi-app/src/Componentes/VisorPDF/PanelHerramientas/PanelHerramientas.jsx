import Offcanvas from 'react-bootstrap/Offcanvas';
import PaletaColor from '../../Paleta/PaletaColor.jsx';
import '../../VisorPDF/style.css';
import ColorFondo from './ColorFondo.jsx';
import HerramientaVoz from './HerramientaVoz.jsx';
import TamañoLetra from './LetraHerramienta/TamañoLetra.jsx';
import './style.css';
 function PanelHerramientas({ 
  show, 
  handleClose, 
  tamanioLetra, 
  setTamanioLetra, 
  alEscuchar, 
  alDetener, 
   aplicarTemaPDF,
  aplicarTemaFondo,
  aplicarTemaTexto
 
}) {
  return (
    <Offcanvas
    show={show}
    onHide={handleClose}
    placement="start"
   
      backdrop={false}
      className="panel-accesibilidad"
>
      <Offcanvas.Header closeButton className="header-panel">
        <Offcanvas.Title>Opciones de Accesibilidad ⚙️</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="panel-body"> 
        
              <div className="form-panel">
     <TamañoLetra tamaño={tamanioLetra} setTamaño={setTamanioLetra} aplicarTemaTexto={aplicarTemaTexto}  aplicarTemaPDF={aplicarTemaPDF}  />

       
        <div className="grupo-control">
          <h5>Herramientas de Voz</h5>
          <HerramientaVoz alEscuchar={alEscuchar} alDetener={alDetener} />
        </div>

        {/* Sección de Temas */}
        <div className="grupo-control">
          <h5>Color del Fondo PDF</h5>
         <ColorFondo 
    aplicarTemaPDF={aplicarTemaPDF} 
    aplicarTemaFondo={aplicarTemaFondo}
    
/>
                  </div>
                  <PaletaColor  />
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <button 
        onClick={handleClose} 
        style={{ 
          background: '#ef4444', 
          color: 'white', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '5px',
          cursor: 'pointer' 
        }}
      >
        Cerrar Panel
          </button>
          </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
export default PanelHerramientas;