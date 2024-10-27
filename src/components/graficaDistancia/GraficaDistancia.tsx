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

interface GraficaDistanciaProps {
  mes: string;
}

const GraficaDistancia: FC<GraficaDistanciaProps> = ({ mes }) => {
  const data = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Distancia (km)',
        data: [5, 7, 13, 25], 
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
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
        text: `Distancia Recorrida en ${mes}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-[#1E3545] p-6 rounded-lg shadow-lg" style={{ height: '400px', width: '100%' }}>
      <h2 className="text-white text-lg mb-4">Distancia Recorrida</h2>
      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraficaDistancia;
