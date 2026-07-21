import './style.css';
import PaletaColor from '../../Paleta/PaletaColor';
const ColorFondo = ({ aplicarTemaPDF, colorFondoPDF, aplicarTemaFondo }) => {
    return (
        <div className="flex flex-col items-center p-2 align-center m-3 bg-gray-200 rounded-2xl">
            {/* Botones de Temas */}
            <button onClick={() => aplicarTemaPDF('#f0e7e7', '#334155')} className="btn-tema m-3" style={{ background: '#f0ecec' }}>
                ☀️ Modo Claro
            </button>
            <button onClick={() => aplicarTemaPDF('#f4f1ea', '#433422')} className="btn-tema m-3" style={{ background: '#dd9f0d' }}>
                📜 Modo Sepia
            </button>
            <button onClick={() => aplicarTemaPDF('#1e293b', '#f8fafc')} className="btn-tema m-3" style={{ background: '#08090a', color: '#f8fafc' }}>
                🌙 Modo Oscuro
            </button>

         

      
            <div className="color-picker-container m-2 ">
                <label className='mr-3'> Color de fondo </label>
                <input 
                    type="color" 
                    value={colorFondoPDF} 
                    onChange={(e) => aplicarTemaFondo(e.target.value)} 
                />
            </div>
            <PaletaColor></PaletaColor>
        </div>
    );
};

export default ColorFondo;