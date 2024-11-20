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

const GraficaTiempo: FC = () => {
  const data = {
    labels: ['15 Nov', '16 Nov', '17 Nov', '18 Nov', '19 Nov'],
    datasets: [
      {
        label: 'Tiempo (min)',
        data: [30, 35, 40, 45, 50],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
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
        text: `Tiempo de Entrenamiento del 15 al 19 de Noviembre`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tiempo (min)',
        },
      },
    },
  };

  return (
    <div
      className="bg-[#1E3545] p-6 rounded-lg shadow-lg"
      style={{ height: '400px', width: '100%' }}
    >
      <h2 className="text-white text-lg mb-4">Tiempo de Entrenamiento</h2>
      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraficaTiempo;
