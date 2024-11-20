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
import { FC } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficaCalorias: FC = () => {
  const data = {
    labels: ['15 Nov', '16 Nov', '17 Nov', '18 Nov', '19 Nov'],
    datasets: [
      {
        label: 'Calorías (kcal)',
        data: [300, 320, 340, 360, 380],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Calorías Quemadas del 15 al 19 de Noviembre`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Calorías (kcal)',
        },
      },
    },
  };

  return (
    <div
      className="bg-[#1E3545] p-6 rounded-lg shadow-lg"
      style={{ height: '400px', width: '100%' }}
    >
      <h2 className="text-white text-lg mb-4">Calorías Quemadas</h2>
      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraficaCalorias;
