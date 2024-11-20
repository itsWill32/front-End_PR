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

const TrainingClassification: React.FC = () => {
  const data = {
    labels: ['15 Nov', '16 Nov', '17 Nov', '18 Nov', '19 Nov'],
    datasets: [
      {
        label: 'Baja Intensidad',
        data: [5, 5.5, 6, 6.5, 7],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Media Intensidad',
        data: [7, 7.5, 8, 8.5, 9],
        borderColor: 'rgba(255, 205, 86, 1)',
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Alta Intensidad',
        data: [9, 9.5, 10, 10.5, 11],
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
        text: `Clasificación de Entrenamientos del 15 al 19 de Noviembre`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
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
      <h2 className="text-white text-lg mb-4">Clasificación de Entrenamientos</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TrainingClassification;
