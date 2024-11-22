import { useEffect, useState } from 'react';
import { FaRunning } from 'react-icons/fa';

interface Activity {
  _id: string;
  type: string;
  description: string;
  distance: string;
  time: string;
  date: string;
}

const RecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        //https://athlete-band-api.integrador.xyz/activities
        const response = await fetch('https://athlete-band-api.integrador.xyz/activities', {
        //const response = await fetch('http://localhost:3000/activities', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Error al obtener actividades recientes');
        }

        const data = await response.json();
        setActivities(data.activities || []);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <p className="text-white text-center">Cargando actividades...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="mx-4 mt-8">
      <h2 className="text-white text-lg font-bold">ACTIVIDADES RECIENTES</h2>
      <div className="bg-[#000000b9] rounded-lg p-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity._id}
              className="flex justify-between items-center mb-4 p-2 rounded-lg bg-[#1E3545]"
            >
              <div className="flex items-center space-x-4">
                <FaRunning className="h-6 w-6 text-white" />
                <div>
                  <p className="text-white text-sm font-semibold">{activity.type}</p>
                  <p className="text-gray-400 text-xs">{activity.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Distancia: {activity.distance}</p>
                <p className="text-gray-400 text-sm">Tiempo: {activity.time}</p>
                <p className="text-gray-400 text-sm">
                  Fecha: {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No hay actividades recientes</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
