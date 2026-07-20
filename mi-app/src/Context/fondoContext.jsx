
import { createContext, useState, useEffect } from "react";



export const ColorContext = createContext();



export const ColorProvider = ({ children }) => { 

  const [colorFondo, setColorFondo] = useState("#2A576A");

  const [colorTexto, setColorTexto] = useState("#0e0707");



  useEffect(() => {

    document.documentElement.style.setProperty("--color-fondo-dinamico", colorFondo);

    document.documentElement.style.setProperty("--color-texto-dinamico", colorTexto);

  }, [colorFondo, colorTexto]);

const colores = { colorFondo, setColorFondo, colorTexto, setColorTexto };

  return (

    <ColorContext.Provider value={colores}>

      {children}

    </ColorContext.Provider>

  );

} 