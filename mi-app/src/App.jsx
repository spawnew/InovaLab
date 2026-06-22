
import LectorPdf from './Componentes/LectorPdf/LectorPdf'
import './App.css'
import LectorPdf2 from './Componentes/LectorPdf2/LectorPDF2'
import Leer from './Componentes/LeerText/Leer'
import LectorPDF3 from './Componentes/LectorPDF3/LectorPDF3.jsx'

import PaletaColor from './Componentes/Paleta/PaletaColor.jsx'
import { ColorProvider } from './Context/fondoContext';


function App() {
 

  return (
    <>
      <ColorProvider>
        <PaletaColor />
         <Leer></Leer>
      <LectorPdf2 />
      <LectorPDF3 />
      </ColorProvider>
     
    </>
  )
}

export default App
