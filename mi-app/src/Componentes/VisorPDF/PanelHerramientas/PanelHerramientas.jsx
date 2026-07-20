import Offcanvas from 'react-bootstrap/Offcanvas';
import PaletaColor from '../../Paleta/PaletaColor.jsx';
import '../../VisorPDF/style.css';
import ColorFondo from './ColorFondo.jsx';
import HerramientaVoz from './HerramientaVoz.jsx';
import TamañoLetra from './LetraHerramienta/TamañoLetra.jsx';
import Resumen from './Resumen.jsx'
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
   aplicarTemaTexto,
  solicitarResumen
 
}) {
  return (
    <Offcanvas
    show={show}
    onHide={handleClose}
    placement="start"
      scroll={true}
      backdrop={true}
      className="panel-accesibilidad "
>
      <Offcanvas.Header closeButton className="text-amber-50 flex flex-col ">
        <Offcanvas.Title>Opciones de Accesibilidad ⚙️</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body className="panel-body "> 
        
              <div className="form-panel">
     <TamañoLetra tamaño={tamanioLetra} setTamaño={setTamanioLetra} aplicarTemaTexto={aplicarTemaTexto}  aplicarTemaPDF={aplicarTemaPDF}  />

         
        <div className="grupo-control">
          <h5>Herramientas de Voz</h5>
            <HerramientaVoz alEscuchar={alEscuchar} alDetener={alDetener} />
       <div>
             <Resumen solicitarResumen={solicitarResumen}></Resumen>
       </div>
        </div>

        {/* Sección de Temas */}
        <div className="grupo-control">
          <h5>Color del Fondo PDF</h5>
         <ColorFondo 
    aplicarTemaPDF={aplicarTemaPDF} 
    aplicarTemaFondo={aplicarTemaFondo}
    
            />
            <PaletaColor />
        
          
                  </div >
                 
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <button 
        onClick={handleClose} 
            className='bg-red-600 p-2  rounded-2xl text-amber-50 hover:bg-black hover:text-red-600'
      >
        Cerrar Panel 
          </button>
          </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
export default PanelHerramientas;