import { useContext } from "react"; 
import { ColorContext } from "../../Context/fondoContext";
import './style.css';
function PaletaColor() {    
 
  const { colorFondo, setColorFondo, colorTexto, setColorTexto } = useContext(ColorContext);

  return (
    <div> 
    
      <h3>Personalizá el Estilo</h3>
      
      <div className="paleta-container">
        <label >Color de Fondo:</label>
        <input 
          type="color" 
          value={colorFondo} 
          onChange={(e) => setColorFondo(e.target.value)} 
        />
      </div>
     
    </div>
  );
}

export default PaletaColor;