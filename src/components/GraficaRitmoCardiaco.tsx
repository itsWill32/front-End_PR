import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficaRitmoCardiaco: FC = () => {
  const heartRateData = [
    { date: '2023-11-15', bpm: 85 },
    { date: '2023-11-16', bpm: 76 },
    { date: '2023-11-17', bpm: 81 },
    { date: '2023-11-18', bpm: 95 },
    { date: '2023-11-19', bpm: 91 },
  ];

  // Cálculos estadísticos
  const bpmValues = heartRateData.map((data) => data.bpm);

  const mean =
    bpmValues.reduce((acc, val) => acc + val, 0) / bpmValues.length;

  const median = (() => {
    const sorted = [...bpmValues].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  })();

  const mode = (() => {
    const frequency: { [key: number]: number } = {};
    bpmValues.forEach((value) => {
      frequency[value] = (frequency[value] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter((key) => frequency[Number(key)] === maxFreq)
      .map(Number);
    return modes.length === bpmValues.length ? 'No hay moda' : modes.join(', ');
  })();

  const stdDeviation = (() => {
    const avg = mean;
    const squareDiffs = bpmValues.map((value) => {
      const diff = value - avg;
      return diff * diff;
    });
    const avgSquareDiff =
      squareDiffs.reduce((acc, val) => acc + val, 0) / squareDiffs.length;
    return Math.sqrt(avgSquareDiff);
  })();

  const lastFiveValues = bpmValues.slice(-5);

  const data = {
    labels: heartRateData.map((data) => data.date),
    datasets: [
      {
        label: 'Ritmo Cardíaco (bpm)',
        data: bpmValues,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: `Ritmo Cardíaco del 15 al 19 de Noviembre`,
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        title: {
          display: true,
          text: 'Fecha',
          color: 'white',
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          color: 'white',
        },
        title: {
          display: true,
          text: 'Latidos por Minuto (bpm)',
          color: 'white',
        },
      },
    },
  };

  return (
    <div
      className="bg-[#1E3545] p-6 rounded-lg shadow-lg text-white"
      style={{ height: '500px', width: '100%' }}
    >
      <h2 className="text-white text-lg mb-4">Ritmo Cardíaco</h2>
      {/* Mostrar estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="font-semibold">Media:</p>
          <p>{mean.toFixed(2)} bpm</p>
        </div>
        <div>
          <p className="font-semibold">Mediana:</p>
          <p>{median} bpm</p>
        </div>
        <div>
          <p className="font-semibold">Moda:</p>
          <p>{mode}</p>
        </div>
        <div>
          <p className="font-semibold">Desviación Estándar:</p>
          <p>{stdDeviation.toFixed(2)}</p>
        </div>
        <div>
          <p className="font-semibold">Últimos 5 Valores:</p>
          <p>{lastFiveValues.join(', ')} bpm</p>
        </div>
      </div>
      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraficaRitmoCardiaco;
