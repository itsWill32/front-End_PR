import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { connectWebSocket } from '../websocket';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Interfaces
interface Stats {
  mean: number;
  median: number | string;
  mode: string;
  std: number;
  min: number;
  max: number;
}

interface DataPoint {
  timestamp: string;
  temp_corp: number;
}

interface BinomialDataPoint {
  k: number;
  prob: number;
}

// Funciones Auxiliares (mover fuera del componente)
const factorial = (x: number): number => {
  if (x <= 1) return 1;
  let f = 1;
  for (let i = 2; i <= x; i++) f *= i;
  return f;
};

const combination = (n: number, k: number): number => {
  return factorial(n) / (factorial(k) * factorial(n - k));
};

const calcStats = (values: number[]): Stats | null => {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((acc, v) => acc + v, 0) / n;
  const median =
    n % 2 !== 0
      ? sorted[Math.floor(n / 2)]
      : (sorted[Math.floor(n / 2) - 1] + sorted[Math.floor(n / 2)]) / 2;

  const freq: Record<number, number> = {};
  let maxFreq = 0;
  const modeVals: number[] = [];
  for (const val of sorted) {
    freq[val] = (freq[val] || 0) + 1;
    if (freq[val] > maxFreq) {
      maxFreq = freq[val];
    }
  }
  for (const k in freq) {
    if (freq[k] === maxFreq) {
      modeVals.push(Number(k));
    }
  }
  const mode =
    modeVals.length === sorted.length ? 'No hay moda' : modeVals.join(', ');

  const diffs = sorted.map((v) => (v - mean) ** 2);
  const std = Math.sqrt(diffs.reduce((a, b) => a + b, 0) / n);
  const min = sorted[0];
  const max = sorted[n - 1];

  return { mean, median, mode, std, min, max };
};

const calcBinomial = (values: number[], threshold: number): { n: number; p: number; distribution: BinomialDataPoint[] } => {
  const n = values.length;
  if (n === 0) return { n: 0, p: 0, distribution: [] };
  const successes = values.filter((t) => t > threshold).length;
  const p = successes / n;
  const distribution: BinomialDataPoint[] = [];

  // Limitar la cantidad de puntos para el gráfico
  const maxPoints = 100; // Número máximo de puntos a graficar
  const step = Math.floor(n / maxPoints) || 1; // Evitar step=0
  for (let k = 0; k <= n; k += step) {
    const prob = combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    distribution.push({ k, prob });
  }
  // Asegurar que el último punto se incluya
  if (n % step !== 0) {
    const prob = combination(n, n) * Math.pow(p, n) * Math.pow(1 - p, 0);
    distribution.push({ k: n, prob });
  }

  return { n, p, distribution };
};

const GraficaTemperatura: React.FC = () => {
  const [days, setDays] = useState(1);
  const [historyData, setHistoryData] = useState<DataPoint[]>([]);
  const [startDate, setStartDate] = useState('2023-11-15');
  const [endDate, setEndDate] = useState('2023-11-19');
  const [threshold, setThreshold] = useState(37.5);

  const [stats, setStats] = useState<Stats | null>(null);
  const [binomialData, setBinomialData] = useState<BinomialDataPoint[]>([]);

  const wsRef = useRef<WebSocket | null>(null);

  // Función para filtrar datos por días
  const getValuesForDays = useCallback(() => {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return historyData
      .filter((pt) => new Date(pt.timestamp) >= since)
      .map((pt) => pt.temp_corp);
  }, [historyData, days]);

  // Filtrar datos por rango de fechas para la gráfica de historial
  const filterByDateRange = (
    data: DataPoint[],
    start: string,
    end: string
  ): DataPoint[] => {
    const startD = new Date(start);
    const endD = new Date(end);
    endD.setHours(23, 59, 59, 999);
    return data.filter((pt) => {
      const t = new Date(pt.timestamp);
      return t >= startD && t <= endD;
    });
  };

  // Cargar datos iniciales desde el backend (historial)
  const fetchInitialHistory = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/sensor/temperature-history?start=${startDate}&end=${endDate}`,
        {
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (data.success && data.data) {
        setHistoryData(data.data);
      } else {
        setHistoryData([]);
      }
    } catch (error) {
      console.error(error);
      setHistoryData([]);
    }
  }, [startDate, endDate]);

  // Recalcular estadísticas y binomial cada vez que cambian datos, días o umbral
  useEffect(() => {
    const valuesForDays = getValuesForDays();
    const st = calcStats(valuesForDays);
    setStats(st);

    // Calcular binomial localmente
    const binomial = calcBinomial(valuesForDays, threshold);
    setBinomialData(binomial.distribution);
  }, [historyData, days, threshold, getValuesForDays]);

  // Cargar datos iniciales al montar el componente
  useEffect(() => {
    fetchInitialHistory();
  }, [fetchInitialHistory]);

  // Conectar WebSocket en tiempo real
  useEffect(() => {
    const ws = connectWebSocket();
    wsRef.current = ws;
    ws.onmessage = (message) => {
      console.log('Mensaje recibido del WebSocket:', message.data);
      try {
        const msg = JSON.parse(message.data);
        if (msg.type === 'temperatura') {
          const tempCorp = parseFloat(msg.data);
          const newPoint: DataPoint = {
            timestamp: new Date().toISOString(),
            temp_corp: tempCorp,
          };
          setHistoryData((prev) => [...prev, newPoint]);

          // Recalcular estadísticas y binomial después de recibir nuevo dato
          const valuesForDays = getValuesForDays();
          const st = calcStats(valuesForDays);
          setStats(st);

          const binomial = calcBinomial(valuesForDays, threshold);
          setBinomialData(binomial.distribution);
        }
      } catch (err) {
        console.error(err);
      }
    };
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [getValuesForDays, threshold]);

  // Datos para gráfica histórica
  const historyFiltered = filterByDateRange(historyData, startDate, endDate);
  const historyChartData = {
    labels: historyFiltered.map((d) => new Date(d.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: historyFiltered.map((d) => d.temp_corp),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
      },
    ],
  };

  // Datos para gráfica binomial
  const binomialChartData = {
    labels: binomialData.map((b) => b.k.toString()),
    datasets: [
      {
        label: 'Probabilidad',
        data: binomialData.map((b) => b.prob),
        backgroundColor: 'rgba(153,102,255,0.5)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className="bg-[#1E3545] p-6 rounded-lg shadow-lg text-white"
      style={{ marginTop: '20px' }}
    >
      <h2 className="text-white text-lg mb-4">
        Análisis de Temperatura (Tiempo Real)
      </h2>

      {/* Selección de días para resumen diario */}
      <div className="mb-4">
        <label>Días a resumir: </label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value, 10))}
          className="text-black p-1"
          min="1"
        />
      </div>

      {/* Mostrar resumen en tabla */}
      {stats ? (
        <table className="table-auto text-sm mb-4 w-full">
          <thead>
            <tr>
              <th className="px-3 py-2 border-b border-gray-500 text-left">
                Media
              </th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">
                Mediana
              </th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">
                Moda
              </th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">
                Desv. Estándar
              </th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">
                Mín
              </th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">
                Máx
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border-b border-gray-500">
                {stats.mean.toFixed(2)} °C
              </td>
              <td className="px-3 py-2 border-b border-gray-500">
                {stats.median} °C
              </td>
              <td className="px-3 py-2 border-b border-gray-500">
                {stats.mode}
              </td>
              <td className="px-3 py-2 border-b border-gray-500">
                {stats.std.toFixed(2)}
              </td>
              <td className="px-3 py-2 border-b border-gray-500">
                {stats.min} °C
              </td>
              <td className="px-3 py-2 border-b border-gray-500">
                {stats.max} °C
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No hay datos para este periodo</p>
      )}

      {/* Historial */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Historial (selección por fechas)</h3>
        <label>Inicio: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="text-black p-1"
        />
        <label className="ml-2">Fin: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="text-black p-1"
        />
        {/* El historial se actualiza automáticamente si cambian fechas o llegan datos nuevos */}
        <div style={{ height: '300px', marginTop: '20px' }}>
          {historyFiltered.length > 0 ? (
            <Line data={historyChartData} />
          ) : (
            <p>No hay datos en el rango seleccionado</p>
          )}
        </div>
      </div>

      {/* Binomial */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">
          Modelo Binomial (temperatura &gt; threshold)
        </h3>
        <label>Umbral (°C): </label>
        <input
          type="number"
          step="0.1"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="text-black p-1"
          min="0"
        />
        {/* La gráfica binomial se actualiza cada vez que cambian datos o el threshold */}
        {binomialData.length > 0 ? (
          <div style={{ marginTop: '20px', height: '300px' }}>
            <Line
              data={binomialChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      color: 'white',
                    },
                  },
                  title: {
                    display: true,
                    text: 'Distribución Binomial',
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
                      text: 'Número de Éxitos (k)',
                      color: 'white',
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: 'white',
                    },
                    title: {
                      display: true,
                      text: 'Probabilidad',
                      color: 'white',
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <p>No hay datos binomial</p>
        )}
      </div>
    </div>
  );
};

export default GraficaTemperatura;
