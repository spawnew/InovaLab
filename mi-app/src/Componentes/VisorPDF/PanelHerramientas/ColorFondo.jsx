const ColorFondo = ({ aplicarTemaPDF, colorFondoPDF, aplicarTemaFondo }) => {
    return (
        <div className="botones">
            {/* Botones de Temas */}
            <button onClick={() => aplicarTemaPDF('#f0e7e7', '#334155')} className="btn-tema" style={{ background: '#f0e7e7' }}>
                ☀️ Modo Claro
            </button>
            <button onClick={() => aplicarTemaPDF('#f4f1ea', '#433422')} className="btn-tema" style={{ background: '#f4f1ea' }}>
                📜 Modo Sepia
            </button>
            <button onClick={() => aplicarTemaPDF('#1e293b', '#f8fafc')} className="btn-tema" style={{ background: '#1e293b', color: '#f8fafc' }}>
                🌙 Modo Oscuro
            </button>

            {/* Separador visual */}
            <hr style={{ width: '100%', border: '0', borderTop: '1px solid #cbd5e1' }} />

            {/* Selector de Color */}
            <div className="color-picker-container">
                <label>Texto Color:</label>
                <input 
                    type="color" 
                    value={colorFondoPDF} 
                    onChange={(e) => aplicarTemaFondo(e.target.value)} 
                />
            </div>
        </div>
    );
};

export default ColorFondo;