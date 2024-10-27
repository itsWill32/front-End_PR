import './Welcome.css';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#000000] via-[#0B0F14] to-[#000000] bg-[length:200%] animate-gradient-x flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gradient-to-br from-[#131922] via-[#1A2A37] to-[#1E3545] p-16 text-white shadow-md rounded-lg"> 
        <div className="flex justify-center mb-10">
          <div className="w-24 h-24 bg-white rounded-full"></div>
        </div>
        <h3 className="text-center text-4xl font-bold mb-8">HOLA BIENVENIDO AH ATLETH BAND</h3>

        <p className="text-center text-lg mb-10">
          ANTES DE EMPEZAR, PERMITENOS CONOCERTE MEJOR RECOLECTANDO DATOS DE SUMA IMPORTANCIA
          PARA AYUDARTE A LLEVAR UN MEJOR CONTROL.
        </p>

        <div className="text-center">
          <button
            type="button"
            className="px-10 py-3 border border-white rounded-md hover:bg-white hover:text-black transition duration-200 text-lg font-semibold"
          >
            ACEPTAR
          </button>
        </div>
      </div>
    </div>
  );
}
