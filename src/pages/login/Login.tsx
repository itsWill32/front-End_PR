import './Login.css';


export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#000000] via-[#1E3545] to-[#000000] bg-[length:200%] animate-gradient-x flex items-center justify-center">
      <div className="w-full max-w-lg bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-10 text-white shadow-md rounded-lg"> {/* Aumenté el padding */}
        <div className="flex justify-center mb-10">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
         <img  />
        </div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-8">ATHLETIC-BAND</h2>

        <form className="space-y-6">
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="block font-semibold text-base mb-2">
                CORREO ELECTRONICO
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Escribe tu correo"
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-base transition-all duration-300 ease-in-out relative z-10"
                onFocus={(e) => e.target.classList.add('animate-border-animate')}
                onBlur={(e) => e.target.classList.remove('animate-border-animate')}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block font-semibold text-base mb-2">
                CONTRASEÑA
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-base transition-all duration-300 ease-in-out relative z-10"
                onFocus={(e) => e.target.classList.add('animate-border-animate')}
                onBlur={(e) => e.target.classList.remove('animate-border-animate')}
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="w-full px-6 py-3 border border-white rounded-md hover:bg-white hover:text-black transition duration-200 text-base font-semibold"
            >
              INICIAR SESION
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm border-b-2 border-transparent hover:border-gray-300 inline-block pb-1 transition duration-300 ease-in-out">
              NO CUENTAS CON ALGUNA CUENTA?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
