import { PdfContext } from '../../../Context/PdfContext'; 
import {  useContext } from 'react';






const Resumen=({ solicitarResumen }) => {
 const { pdfData} = useContext(PdfContext);  
 return(  
<div>
<button className='p-3 bg-blue-800 border-black text-amber-100 border-2 rounded-2xl' onClick={() => solicitarResumen(pdfData)}>Generar Resumen</button>

</div>

 )
}
export default Resumen;