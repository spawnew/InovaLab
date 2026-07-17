import './style.css';

export default function HojaTexto({
  lineasTexto,
  colorFondoPDF,
  colorTextoPDF,
  tamanioLetra,
  setTextoGlobalSeleccionado,
  setMenuPosicion,
 
}) {

 

  const manejarClickSecundario = (e) => {
    const seleccion = window.getSelection();
    const texto = seleccion.toString().trim();

    if (texto.length > 0) {
      e.preventDefault();
      setTextoGlobalSeleccionado(texto);
      setMenuPosicion({ x: e.clientX, y: e.clientY });
    }
  };

  const esTituloReal = (linea) => {
    return (
      linea.length < 40 &&
      linea === linea.toUpperCase() &&
      !linea.endsWith('.') &&
      !linea.endsWith('?') &&
      !linea.endsWith('!')
    );
  };

  return (
    <div
      className="texto-dinamico"
      onContextMenu={manejarClickSecundario}
      style={{
        backgroundColor: colorFondoPDF,
        color: colorTextoPDF,
        fontSize: `${tamanioLetra}px`,
        cursor: 'text',
        padding: '24px',
        borderRadius: '8px',
        lineHeight: '1.5',
        textAlign: 'left'
      }}
    >
      {lineasTexto.map((linea, index) => {
        if (esTituloReal(linea)) {
          return (
            <h3 key={index} style={{ fontSize: `${tamanioLetra * 1.25}px`, marginTop: '1.5rem' }}>
              {linea}
            </h3>
          );
        }

        return (
          <span key={index} style={{ display: 'block', marginBottom: '8px' }}>
            {linea}
            
           
          </span>
        );
      })}
    </div>
  );
}