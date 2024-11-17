import { useEffect, useState } from 'react';

export default function ProfileInfo() {
  const [profile, setProfile] = useState({ name: '', email: '', profilePicture: '' });

  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${document.cookie.split('token=')[1]}`, // Leer token desde cookies
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener datos del perfil');
        }
        return response.json();
      })
      .then((data) => setProfile(data.data))
      .catch((error) => console.error('Error al cargar el perfil:', error));
  }, []);

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 rounded-lg w-full max-w-[350px] mx-auto mt-4">
      <img
        src={profile.profilePicture || '/default-avatar.png'}
        alt="Profile"
        className="w-16 h-16 bg-white rounded-full mb-2"
      />
      <p className="text-white text-sm font-semibold text-center">{profile.name || 'Usuario'}</p>
      <p className="text-gray-400 text-sm text-center">{profile.email || 'email@example.com'}</p>
    </div>
  );
}
