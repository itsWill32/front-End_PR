import { useEffect, useState } from 'react';
import { FaRunning } from 'react-icons/fa';

interface Activity {
  distance: string;
  time: string;
  date: string;
}

const RecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/activities', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${document.cookie.split('token=')[1]}`, // Leer token desde cookies
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener actividades recientes');
        }
        return response.json();
      })
      .then((data) => setActivities(data.activities))
      .catch((error) => console.error('Error al cargar actividades:', error));
  }, []);

  return (
    <div className="mx-4 mt-8">
      <h2 className="text-white text-lg font-bold">ACTIVIDADES RECIENTES</h2>
      <div className="bg-[#000000b9] rounded-lg p-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 p-2 rounded-lg bg-[#1E3545]"
            >
              <div className="flex items-center space-x-4">
                <FaRunning className="h-6 w-6 text-white" />
                <div>
                  <p className="text-white text-sm font-semibold">{activity.distance}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{activity.date}</p>
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
