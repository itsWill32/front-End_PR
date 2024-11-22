import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logoAthleteBand from "../../assets/ATHLETEBANDLogo.png";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch('https://athlete-band-api.integrador.xyz/register', {
        //const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Registro exitoso. Redirigiendo...");
        setTimeout(() => navigate('/login'), 2000); // Redirige al login después de 2 segundos
      } else {
        setErrorMessage(data.message || 'Error al registrarse');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setErrorMessage('Ocurrió un error al conectar con el servidor');
    }
  };

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

        <form className="space-y-5" onSubmit={handleRegister}>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out"
                required
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Escribe tu correo"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-300 transition"
              >
                {/* Icono */}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-sm transition-all duration-300 ease-in-out"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-300 transition"
              >
                {/* Icono */}
              </button>
            </div>
          </div>

          {/* Botón de Registro */}
          <div className="text-center mt-5">
            <button
              type="submit"
              className="w-full px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition duration-200 text-sm font-semibold"
            >
              REGISTRARSE
            </button>
          </div>

          {/* Link para Iniciar Sesión */}
          <div className="text-center mt-5">
            <p className="text-sm border-b-2 border-transparent hover:border-gray-300 inline-block pb-1 transition duration-300 ease-in-out">
              YA TIENES UNA CUENTA?{' '}
              <a href="/login" className="text-white">
                INICIA SESIÓN
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
