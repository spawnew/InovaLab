
import './App.css'
import { ColorProvider } from './Context/fondoContext';
import Navbar from './Componentes/Navbar/Navbar.jsx'
import VisorNuevo from './Componentes/VisorPDF/VisorNuevo.jsx';
import { PdfProvider } from './Context/PdfContext.jsx';

function App() {
 

  return (
    <>
     
      
    
      <Navbar />
    
    <PdfProvider> 
      <ColorProvider>
          <VisorNuevo /> 
        
      </ColorProvider>
    </PdfProvider>
  

    </>
  )
}

export default App
