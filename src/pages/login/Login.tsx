import './Login.css';
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userHooks';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser, isAuthenticated } = useUser();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://athlete-band-api.integrador.xyz/login', {
      //const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({
          name: data.user.name,
          email: data.user.email,
          token: data.token || "",
          profilePicture: data.user.profilePicture || undefined,
        });
        setSuccess('Inicio de sesión exitoso');
        setError(null);
      } else {
        setError(data.message || 'Credenciales inválidas');
        setSuccess(null);
      }
    } catch (error) {
      setError('Error al iniciar sesión');
      setSuccess(null);
      console.error('Error:', error);
    }
  };

  // Redirige a /home si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#000000] via-[#1E3545] to-[#000000] bg-[length:200%] animate-gradient-x flex items-center justify-center">
      <div className="w-full max-w-lg bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-10 text-white shadow-md rounded-lg">
        <div className="flex justify-center mb-10">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <img />
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-8">ATHLET-BAND</h2>

        <form onSubmit={handleLogin} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-base transition-all duration-300 ease-in-out relative z-10"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-500 focus:outline-none placeholder-gray-300 text-base transition-all duration-300 ease-in-out relative z-10"
              />
            </div>
          </div>

          {error && (
            <p className="text-center text-red-400 bg-red-900 bg-opacity-30 p-2 rounded mt-4">
              {error}
            </p>
          )}

          {success && (
            <p className="text-center text-green-400 bg-green-900 bg-opacity-30 p-2 rounded mt-4">
              {success}
            </p>
          )}

          <div className="text-center mt-8">
            <button
              type="submit"
              className="w-full px-6 py-3 border border-white rounded-md hover:bg-white hover:text-black transition duration-200 text-base font-semibold"
            >
              INICIAR SESIÓN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
