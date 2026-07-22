import "./style.css";

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
      setMenuPosicion({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const esTituloReal = (linea) => {
    return (
      linea.length < 40 &&
      linea === linea.toUpperCase() &&
      !linea.endsWith(".") &&
      !linea.endsWith("?") &&
      !linea.endsWith("!")
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
      }}
    >
      {lineasTexto.map((linea, index) =>
        esTituloReal(linea) ? (
          <h3
            key={index}
            className="titulo-pdf"
            style={{
              fontSize: `${tamanioLetra * 1.35}px`,
            }}
          >
            {linea}
          </h3>
        ) : (
          <p key={index} className="parrafo-pdf">
            {linea}
          </p>
        )
      )}
    </div>
  );
}