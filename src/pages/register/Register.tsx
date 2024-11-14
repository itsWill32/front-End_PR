import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Register.css';
import logoAthleteBand from "../../assets/ATHLETEBANDLogo.png";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#000000] via-[#1E3545] to-[#000000] bg-[length:200%] animate-gradient-x flex items-center justify-center">
      <div className="w-full max-w-md bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-6 text-white shadow-md rounded-lg">
        <div className="flex justify-center mb-6">
          <img
            src={logoAthleteBand}
            alt="Athlete Band Logo"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <h2 className="text-center text-xl font-bold mb-6">ATHLETIC-BAND</h2>

        <form className="space-y-5">
          <div className="space-y-4">
            {/* Nombre */}
            <div className="relative">
              <label htmlFor="name" className="block font-semibold text-sm mb-1">
                NOMBRE COMPLETO
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Escribe tu nombre"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Correo Electrónico */}
            <div className="relative">
              <label htmlFor="email" className="block font-semibold text-sm mb-1">
                CORREO ELECTRONICO
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Escribe tu correo"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <label htmlFor="password" className="block font-semibold text-sm mb-1">
                CONTRASEÑA
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-300 transition"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-3.85-10-7.5S6.477 4 12 4c1.35 0 2.633.249 3.825.675M15 15l5 5m0 0l-5-5m5 5H9" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5 5m0 0l-5-5m5 5H9m4-2a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Confirmar Contraseña */}
            <div className="relative">
              <label htmlFor="confirm-password" className="block font-semibold text-sm mb-1">
                CONFIRMAR CONTRASEÑA
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-300 transition"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-3.85-10-7.5S6.477 4 12 4c1.35 0 2.633.249 3.825.675M15 15l5 5m0 0l-5-5m5 5H9" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5 5m0 0l-5-5m5 5H9m4-2a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Botón de Registro */}
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

          {/* Link para Iniciar Sesión */}
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
