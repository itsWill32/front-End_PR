import './Datas.css';

export default function Datas() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#000000] via-[#1E3545] to-[#000000] bg-[length:200%] animate-gradient-x flex items-center justify-center">
      <div className="w-full max-w-lg bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-10 text-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-8">INGRESA TUS DATOS</h2>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4"> 
            <div className="relative">
              <label htmlFor="sexo" className="block font-semibold text-base mb-2">
                SEXO:
              </label>
              <select
                id="sexo"
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-500 focus:outline-none text-base transition-all duration-300 ease-in-out"
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="relative">
              <label htmlFor="edad" className="block font-semibold text-base mb-2">
                EDAD:
              </label>
              <input
                type="number"
                id="edad"
                name="edad"
                placeholder="23"
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-500 focus:outline-none text-base transition-all duration-300 ease-in-out"
              />
            </div>

            <div className="relative">
              <label htmlFor="peso" className="block font-semibold text-base mb-2">
                PESO:
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  id="peso"
                  name="peso"
                  placeholder="7"
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-500 focus:outline-none text-base transition-all duration-300 ease-in-out"
                />
                <span className="ml-2">KG</span>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="talla" className="block font-semibold text-base mb-2">
                TALLA:
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="talla"
                  name="talla"
                  placeholder="Talla"
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-500 focus:outline-none text-base transition-all duration-300 ease-in-out"
                />
                <span className="ml-2">CM</span>
              </div>
            </div>

            <div className="relative w-full md:col-span-2">
  <label className="block font-semibold text-base mb-2 text-center">
    ¿CUENTAS CON ALGUNA PATOLOGÍA CARDÍACA? <br />(se te asignaran parametros mas reducidos)
  </label>
  <div className="flex justify-center items-center space-x-8 md:space-x-4">
    <div className="flex items-center">
      <input
        type="radio"
        id="patologia-si"
        name="patologia"
        value="sí"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
      />
      <label htmlFor="patologia-si" className="ml-2 text-base">
        Sí
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="radio"
        id="patologia-no"
        name="patologia"
        value="no"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
      />
      <label htmlFor="patologia-no" className="ml-2 text-base">
        No
      </label>
    </div>
  </div>
</div>


          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="w-full px-6 py-3 border border-white rounded-md hover:bg-white hover:text-black transition duration-200 text-base font-semibold"
            >
              CONFIRMAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
