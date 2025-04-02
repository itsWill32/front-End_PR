import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

function combination(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = (result * (n - i + 1)) / i;
  }
  return result;
}

function calcStats(values: number[]): Stats | null {
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
}

function calcBinomial(values: number[], threshold: number): { n: number; p: number; distribution: BinomialDataPoint[] } {
  const n = values.length;
  if (n === 0) {
    console.log('calcBinomial: no hay datos (n=0), no se puede calcular binomial');
    return { n: 0, p: 0, distribution: [] };
  }

  const successes = values.filter((t) => t > threshold).length;
  const p = successes / n;

  console.log(`calcBinomial: n=${n}, éxitos=${successes}, p=${p}, umbral=${threshold}`);

  const distribution: BinomialDataPoint[] = [];
  for (let k = 0; k <= n; k++) {
    const prob = combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    distribution.push({ k, prob });
  }

  console.log('calcBinomial: distribution calculada', distribution);
  return { n, p, distribution };
}

const GraficaTemperatura: React.FC = () => {
  const [days, setDays] = useState<number>(1);
  const [historyData, setHistoryData] = useState<DataPoint[]>([]);
  const [startDate, setStartDate] = useState('2023-11-15');
  const [endDate, setEndDate] = useState('2024-12-08'); 
  const [threshold, setThreshold] = useState<number>(37.5);
  const [stats, setStats] = useState<Stats | null>(null);
  const [binomialData, setBinomialData] = useState<BinomialDataPoint[]>([]);

  const wsRef = useRef<WebSocket | null>(null);

  const fetchInitialHistory = useCallback(async () => {
    console.log('fetchInitialHistory: intentando obtener datos del backend', {start:startDate,end:endDate});
    try {
      const res = await fetch(
        `http://localhost:3000/sensor/temperature-history?start=${startDate}&end=${endDate}`,
        {
          credentials: 'include',
        }
      );
      const data = await res.json();
      console.log('fetchInitialHistory: respuesta del backend', data);
      if (data.success && Array.isArray(data.data)) {
        const filtered = data.data.filter((pt: DataPoint) => typeof pt.temp_corp === 'number' && !isNaN(pt.temp_corp));
        console.log('fetchInitialHistory: datos filtrados con temp_corp numérico', filtered);
        setHistoryData(filtered);
      } else {
        console.log('fetchInitialHistory: no se encontraron datos');
        setHistoryData([]);
      }
    } catch (error) {
      console.error(error);
      setHistoryData([]);
    }
  }, [startDate, endDate]);

  const getValuesForDays = useCallback(() => {
    const validDays = isNaN(days) || days <= 0 ? 1 : days;
    const since = new Date(Date.now() - validDays * 24 * 60 * 60 * 1000);
    const vals = historyData
      .filter((pt) => {
        const d = new Date(pt.timestamp);
        if (isNaN(d.getTime())) {
          console.log('getValuesForDays: timestamp inválido en', pt);
          return false;
        }
        return d >= since;
      })
      .map((pt) => pt.temp_corp)
      .filter((v) => typeof v === 'number' && !isNaN(v));
    console.log('getValuesForDays: días=', validDays, 'valores=', vals);
    return vals;
  }, [historyData, days]);

  const filterByDateRange = (data: DataPoint[], start: string, end: string): DataPoint[] => {
    const startD = new Date(start);
    const endD = new Date(end);
    endD.setHours(23, 59, 59, 999);
    const filtered = data.filter((pt) => {
      const t = new Date(pt.timestamp);
      if(isNaN(t.getTime())){
        console.log('filterByDateRange: timestamp inválido en', pt);
        return false;
      }
      return t >= startD && t <= endD;
    });
    console.log('filterByDateRange:', {start, end, filtered});
    return filtered;
  };

  useEffect(() => {
    const valuesForDays = getValuesForDays();
    const st = calcStats(valuesForDays);
    setStats(st);

    console.log('Calculando binomial...');
    const safeThreshold = isNaN(threshold) ? 37.5 : threshold;
    const bin = calcBinomial(valuesForDays, safeThreshold);
    setBinomialData(bin.distribution);
    console.log('binomialData actual:', bin.distribution);
  }, [historyData, days, threshold, getValuesForDays]);

  useEffect(() => {
    fetchInitialHistory();
  }, [fetchInitialHistory]);

  useEffect(() => {
    console.log('Intentando conectar al WebSocket...');
    const ws = connectWebSocket();
    wsRef.current = ws;
    ws.onmessage = (message) => {
      console.log('Mensaje recibido del WebSocket:', message.data);
      try {
        const msg = JSON.parse(message.data);
        if (msg.type === 'temperatura') {
          const tempCorp = parseFloat(msg.data);
          if (!isNaN(tempCorp)) {
            const newPoint: DataPoint = {
              timestamp: new Date().toISOString(),
              temp_corp: tempCorp,
            };
            setHistoryData((prev) => {
              const updated = [...prev, newPoint];
              console.log('Nuevos datos tras WebSocket:', updated);
              return updated;
            });
          } else {
            console.log('WebSocket: dato de temperatura no válido:', msg.data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    ws.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const safeThreshold = isNaN(threshold) ? 37.5 : threshold;
  const historyFiltered = filterByDateRange(historyData, startDate, endDate);
  const safeDays = isNaN(days) || days <= 0 ? 1 : days;

  const historyChartData = {
    labels: historyFiltered.map((d) => {
      const dt = new Date(d.timestamp);
      if (isNaN(dt.getTime())) {
        return d.timestamp; 
      }
      return dt.toLocaleString();
    }),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: historyFiltered.map((d) => d.temp_corp),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false as const,
      },
    ],
  };

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
      <h2 className="text-white text-lg mb-4">Análisis de Temperatura (Tiempo Real)</h2>

      <div className="mb-4">
        <label>Días a resumir: </label>
        <input
          type="number"
          value={safeDays}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if(!isNaN(val) && val>0) setDays(val);
          }}
          className="text-black p-1"
          min="1"
        />
      </div>

      {stats ? (
        <table className="table-auto text-sm mb-4 w-full">
          <thead>
            <tr>
              <th className="px-3 py-2 border-b border-gray-500 text-left">Media</th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">Mediana</th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">Moda</th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">Desv. Estándar</th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">Mín</th>
              <th className="px-3 py-2 border-b border-gray-500 text-left">Máx</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border-b border-gray-500">{stats.mean.toFixed(2)} °C</td>
              <td className="px-3 py-2 border-b border-gray-500">{stats.median} °C</td>
              <td className="px-3 py-2 border-b border-gray-500">{stats.mode}</td>
              <td className="px-3 py-2 border-b border-gray-500">{stats.std.toFixed(2)}</td>
              <td className="px-3 py-2 border-b border-gray-500">{stats.min} °C</td>
              <td className="px-3 py-2 border-b border-gray-500">{stats.max} °C</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No hay datos para este periodo</p>
      )}

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
        <div style={{ height: '300px', marginTop: '20px' }}>
          {historyFiltered.length > 0 ? (
            <Line data={historyChartData} />
          ) : (
            <p>No hay datos en el rango seleccionado</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">
          Modelo Binomial (temperatura &gt; {safeThreshold})
        </h3>
        <label>Umbral (°C): </label>
        <input
          type="number"
          step="0.1"
          value={isNaN(threshold) ? '' : threshold}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if(!isNaN(val)) setThreshold(val);
          }}
          className="text-black p-1"
          min="0"
        />
        {binomialData.length > 0 ? (
          <div style={{ marginTop: '20px', height: '300px' }}>
            <Bar
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
