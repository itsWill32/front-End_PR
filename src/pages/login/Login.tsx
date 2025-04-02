import './Login.css';
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userHooks';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { setUser, isAuthenticated } = useUser();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, password: newPassword }),
      });

      if (response.ok) {
        setSuccess('Si el correo es correcto, te llegará la notificación y se llevará a cabo la restauración de la contraseña.');
        setError(null);
        
        // Agregar retraso para mostrar el mensaje de éxito
        setTimeout(() => {
          setShowResetModal(false); // Cierra el modal después de un retraso
        }, 1000); // 1 segundo de retraso
      } else {
        const data = await response.json();
        setError(data.message || 'Error al restablecer la contraseña');
      }
    } catch (error) {
      setError('Error de conexión');
      console.error(error);
    }
  };

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
          {error && <p className="text-center text-red-400 bg-red-900 bg-opacity-30 p-2 rounded mt-4">{error}</p>}
          {success && <p className="text-center text-green-400 bg-green-900 bg-opacity-30 p-2 rounded mt-4">{success}</p>}
          <div className="text-center mt-8">
            <button type="submit" className="w-full px-6 py-3 border border-white rounded-md hover:bg-white hover:text-black transition duration-200 text-base font-semibold">
              INICIAR SESIÓN
            </button>
          </div>
          <p className="text-center mt-4 text-sm cursor-pointer underline" onClick={() => setShowResetModal(true)}>¿Olvidaste tu contraseña?</p>
        </form>
      </div>
      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg text-white">
            <h2 className="text-lg font-bold">Restablecer Contraseña</h2>
            <form onSubmit={handleResetPassword} className="mt-4 space-y-4">
              <input type="email" placeholder="Correo electrónico" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="w-full px-4 py-3 border bg-transparent" required />
              <input type="password" placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 border bg-transparent" required />
              <input type="password" placeholder="Repetir contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 border bg-transparent" required />
              <button type="submit" className="w-full bg-white text-black py-3 rounded">Restablecer</button>
            </form>
            <button onClick={() => setShowResetModal(false)} className="mt-4 text-red-400">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
