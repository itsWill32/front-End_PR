import { useUser } from '../../context/userHooks';

export default function ProfileInfo() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 rounded-lg w-full max-w-[350px] mx-auto mt-4">
      <img
        src={user?.profilePicture || '/default-avatar.png'}
        alt="Profile"
        className="w-16 h-16 bg-white rounded-full mb-2"
      />
      <p className="text-white text-sm font-semibold text-center">{user?.name || 'Usuario'}</p>
      <p className="text-gray-400 text-sm text-center">{user?.email || 'email@example.com'}</p>
    </div>
  );
}
