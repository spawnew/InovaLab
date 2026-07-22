import { useContext } from 'react';
import { PdfContext } from '../../../Context/PdfContext';
import { MdAutoAwesome } from "react-icons/md";

const Resumen = ({ solicitarResumen }) => {
  const { pdfData } = useContext(PdfContext);  

  return (
    <div className="flex">
      <button 
        onClick={() => solicitarResumen(pdfData)}
        className="flex items-center gap-2 px-4 py-2.5 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl shadow-md transition-all duration-200 cursor-pointer"
      >
        <MdAutoAwesome className="text-xl" />
        <span>Generar Resumen</span>
      </button>
    </div>
  );
};

export default Resumen;