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

interface TrendsChartProps {
  mes: string;
}

const TrendsChart: React.FC<TrendsChartProps> = ({ mes }) => {
  const data = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Tiempo (min)',
        data: [30, 45, 60, 50],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Distancia (km)',
        data: [5, 7, 13, 25],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Calorías (kcal)',
        data: [300, 400, 500, 450],
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
        text: `Tendencias de Entrenamiento en ${mes}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
