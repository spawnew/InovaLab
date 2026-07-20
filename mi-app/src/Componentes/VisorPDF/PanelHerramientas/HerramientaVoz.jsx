import '../style.css';

const HerramientaVoz = ({ alEscuchar, alDetener }) => {
    
     
    
    return (<div className="flex flex-col p-1 hover:bg-gray-900 ">
            <button className="bg-emerald-500 p-2 m-2 rounded border-2 border-emerald-900 hover:bg-emerald-800 text-amber-100" onClick={alEscuchar}>Escuchar 🔊</button>
            <button className="bg-red-600 p-2 m-2 rounded border-2 border-emerald-900 hover:bg-red-800 text-amber-100" onClick={alDetener}>Detener 🛑</button>
          </div>




    )
}
  export default HerramientaVoz;