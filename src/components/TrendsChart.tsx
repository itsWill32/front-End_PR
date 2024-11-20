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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendsChart: React.FC = () => {
  const data = {
    labels: ['15 Nov', '16 Nov', '17 Nov', '18 Nov', '19 Nov'],
    datasets: [
      {
        label: 'Tiempo (min)',
        data: [30, 35, 40, 45, 50],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Distancia (km)',
        data: [5, 6, 7, 8, 9],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Calorías (kcal)',
        data: [300, 320, 340, 360, 380],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
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
        text: `Tendencias de Entrenamiento del 15 al 19 de Noviembre`,
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
          text: 'Valores',
        },
      },
    },
  };

  return (
    <div className="bg-[#1E3545] p-6 rounded-lg shadow-lg">
      <h2 className="text-white text-lg mb-4">Análisis de Tendencias</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TrendsChart;
