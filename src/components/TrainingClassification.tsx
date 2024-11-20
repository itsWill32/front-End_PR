import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TrainingClassificationProps {
  mes: string;
}

const TrainingClassification: React.FC<TrainingClassificationProps> = ({ mes }) => {
  const data = {
    labels: ['0 min', '10 min', '20 min', '30 min', '40 min', '50 min', '60 min'], // Tiempo acumulado
    datasets: [
      {
        label: 'Baja Intensidad',
        data: [0, 1, 2, 3, 4, 5, 6], // Distancia recorrida
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Media Intensidad',
        data: [0, 2, 4, 6, 8, 10, 12], // Distancia recorrida
        borderColor: 'rgba(255, 205, 86, 1)',
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Alta Intensidad',
        data: [0, 3, 6, 9, 12, 15, 18], // Distancia recorrida
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Relación Tiempo vs. Distancia en ${mes}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tiempo (min)',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Distancia (km)',
        },
      },
    },
  };

  return (
    <div className="bg-[#1E3545] p-6 rounded-lg shadow-lg">
      <h2 className="text-white text-lg mb-4">Relación Tiempo vs. Distancia</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TrainingClassification;
