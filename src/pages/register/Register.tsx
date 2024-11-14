import './Register.css'; 
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#000000] via-[#1E3545] to-[#000000] bg-[length:200%] animate-gradient-x flex items-center justify-center">
      <div className="w-full max-w-md bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-6 text-white shadow-md rounded-lg"> {/* Aumenté el padding y max-w */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-white rounded-full"></div> 
        </div>
        <h2 className="text-center text-xl font-bold mb-6">ATHLETIC-BAND</h2> 

        <form className="space-y-5"> 
          <div className="space-y-4">
            
            <div className="relative">
              <label htmlFor="name" className="block font-semibold text-sm mb-1"> 
                NOMBRE COMPLETO
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Escribe tu nombre"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out relative z-10" 
                onFocus={(e) => e.target.classList.add('animate-border-animate')}
                onBlur={(e) => e.target.classList.remove('animate-border-animate')}
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="block font-semibold text-sm mb-1">
                CORREO ELECTRONICO
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Escribe tu correo"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out relative z-10"
                onFocus={(e) => e.target.classList.add('animate-border-animate')}
                onBlur={(e) => e.target.classList.remove('animate-border-animate')}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block font-semibold text-sm mb-1">
                CONTRASEÑA
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out relative z-10"
                onFocus={(e) => e.target.classList.add('animate-border-animate')}
                onBlur={(e) => e.target.classList.remove('animate-border-animate')}
              />
            </div>

            <div className="relative">
              <label htmlFor="confirm-password" className="block font-semibold text-sm mb-1">
                CONFIRMAR CONTRASEÑA
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out relative z-10"
                onFocus={(e) => e.target.classList.add('animate-border-animate')}
                onBlur={(e) => e.target.classList.remove('animate-border-animate')}
              />
            </div>

          </div>

          <div className="text-center mt-5">
            <button
              type="submit"
              className="w-full px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition duration-200 text-sm font-semibold"
            >
              <Link to={"/wel"}>
                REGISTRARSE
              </Link>
            </button>
          </div>

          <div className="text-center mt-5">
            <p className="text-sm border-b-2 border-transparent hover:border-gray-300 inline-block pb-1 transition duration-300 ease-in-out">
              YA TIENES UNA CUENTA? 
              <Link to={"/login"}>
                INICIA SESIÓN
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
