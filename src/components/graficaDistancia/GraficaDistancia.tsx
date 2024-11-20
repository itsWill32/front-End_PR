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

const GraficaDistancia: FC = () => {
  const data = {
    labels: ['15 Nov', '16 Nov', '17 Nov', '18 Nov', '19 Nov'],
    datasets: [
      {
        label: 'Distancia (km)',
        data: [5, 6, 7, 8, 9],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
        text: `Distancia Recorrida del 15 al 19 de Noviembre`,
      },
    },
    scales: {
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
    <div
      className="bg-[#1E3545] p-6 rounded-lg shadow-lg"
      style={{ height: '400px', width: '100%' }}
    >
      <h2 className="text-white text-lg mb-4">Distancia Recorrida</h2>
      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraficaDistancia;
