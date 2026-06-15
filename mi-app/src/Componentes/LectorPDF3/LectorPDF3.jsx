function LectorPDF3() {
  // esto es usando pdfslick
    return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "15px", color: "#333" }}>
        Visualizador de Apuntes
      </h2>

      {/* Contenedor con el lector nativo del navegador */}
      <div 
        style={{ 
          border: "1px solid #ccc", 
          borderRadius: "8px", 
          overflow: "hidden",
          height: "600px",
                  backgroundColor: "#ec0f0f",
          width: "600px",
          margin: "0 auto"
        }}
      >
        <iframe
          src="/01. TP integrador Esutdios judaicos 2024.pdf"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Visualizador PDF"
        />
      </div>
    </div>
  );
}

export default LectorPDF3;