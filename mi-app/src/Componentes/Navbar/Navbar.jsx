import './Navbar.css'
import Concentrado from './Concentrado/Concentrado'
import { PdfContext } from '../../Context/PdfContext';
import { useContext,useState } from 'react';


const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
   const { pdfData} = useContext(PdfContext); 
  return (
    <nav className="nav-links">
      <img src="../../../public/Captura.JPG" alt="logo" srcset="" />
      <div>
       <button className='boton-concentrado' onClick={() => setShowModal(true)}>Modo Concentrado</button>
            <Concentrado isOpen={showModal} onClose={() => setShowModal(false)} pdfData={pdfData} />
          </div>
    </nav>
  )
}

export default Navbar
