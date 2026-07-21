import './Navbar.css'
import Concentrado from './Concentrado/Concentrado'
import { PdfContext } from '../../Context/PdfContext';
import { useContext, useState,useContextRef } from 'react';
import User from './User/User'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { pdfData, userData } = useContextRef || useContext(PdfContext); 
  
  // Evitamos que falle si userData todavía es null al iniciar
  console.log(userData?.email);

  return (
    <nav className="nav-links">
      <div>
<img src="../../../public/Captura.JPG" alt="logo" />
      </div>
      
      
      <div>
        <button className='boton-concentrado' onClick={() => setShowModal(true)}>Modo Concentrado</button>
        <Concentrado isOpen={showModal} onClose={() => setShowModal(false)} pdfData={pdfData} />
      </div>

   
      {userData && <User userData={userData} />}
    </nav>
  )
}

export default Navbar;
