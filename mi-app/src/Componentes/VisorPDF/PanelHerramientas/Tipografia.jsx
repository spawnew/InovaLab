

import { MdTextFields, MdFontDownload } from "react-icons/md";

const Tipografia = ({ cambiarLetra }) => {
    return (
        <div className="flex flex-col items-center">
            {/* Título con ícono */}
            <div className="flex items-center space-x-2 mb-2">
                <MdTextFields className="text-lg text-gray-700" />
                <h6 className="font-bold m-0">Tipografía</h6>
            </div>

            <div className="flex flex-col items-center p-2 m-3 bg-gray-200 rounded-2xl w-11/12">
                {/* Botón de Tipografía 1 */}
                <button 
                    onClick={() => cambiarLetra("sans-serif")} 
                    className="btn-tema m-3 flex items-center justify-center space-x-2" 
                    style={{ background: '#f0ecec' }}
                >
                    <MdFontDownload className="text-sm" />
                    <span>Modo Letra1</span>
                </button>

                {/* Botón de Tipografía 2 */}
                <button 
                    onClick={() => cambiarLetra("nunito")} 
                    className="btn-tema m-3 flex items-center justify-center space-x-2" 
                    style={{ background: '#dd9f0d', color: '#fff' }}
                >
                    <MdFontDownload className="text-sm" />
                    <span>Modo Letra2</span>
                </button>

                {/* Botón de Tipografía 3 (Dislexia) */}
                <button 
                    onClick={() => cambiarLetra("OpenDyslexic")} 
                    className="btn-tema m-3 flex items-center justify-center space-x-2" 
                    style={{ background: '#08090a', color: '#f8fafc' }}
                >
                    <MdFontDownload className="text-sm" />
                    <span>Modo Letra3</span>
                </button>
            </div>
        </div>
    );
};

export default Tipografia