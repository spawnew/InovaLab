
import './styleLetra.css';

const TamañoLetra = ({ tamaño, setTamaño, aplicarTemaTexto, colorTextoPDF }) => {
    return (
        <div className="grupo-control">
            <h5>Tamaño de Letra</h5>
            
            {/* Contenedor principal: botones a la izquierda, color a la derecha */}
            <div className="tamaño-container">
                
                <div className="botones-tamano">
                    <button className="btn btn-outline" onClick={() => setTamaño(prev => Math.max(12, prev - 2))}>A-</button>
                    <span className="valor-px">{tamaño}px</span>
                    <button className="btn btn-outline" onClick={() => setTamaño(prev => prev + 2)}>A+</button>
                </div>

                <div className="selector-texto">
                    <label>Color de texto:</label>
                    <input 
                        type="color" 
                        value={colorTextoPDF} 
                        onChange={(e) => aplicarTemaTexto(e.target.value)} 
                    />
                </div>
            </div>
        </div>
    );
};

export default TamañoLetra;