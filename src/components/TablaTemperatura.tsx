import React, { useState, useEffect } from 'react';

interface SensorValue {
  temp_corp?: number;
  [key: string]: unknown; 
}

interface Reading {
  _id: string;
  sensorType: string;
  value: SensorValue;
  timestamp: string;
}

const TablaTemperatura: React.FC = () => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res = await fetch('http://localhost:3000/sensor/readings',{credentials:'include'});
        if(!res.ok) {
          throw new Error('Error al obtener las lecturas');
        }
        const data: Reading[] = await res.json(); // Declaramos el tipo Reading[] al data.
        // Filtrar solo las lecturas de tipo 'temperatura' que tengan value.temp_corp numérico
        const tempReadings = data.filter((r:Reading)=>
          r.sensorType==='temperatura' && 
          r.value && 
          typeof r.value.temp_corp === 'number'
        );
        setReadings(tempReadings);
        setError(null);
      } catch(e) {
        if(e instanceof Error){
          setError(e.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[]);

  if(loading) {
    return <p className="text-white">Cargando lecturas...</p>;
  }

  if(error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if(readings.length===0) {
    return <p className="text-white">No hay lecturas de temperatura disponibles.</p>;
  }

  return (
    <div className="bg-[#1E3545] p-6 rounded-lg shadow-lg text-white" style={{marginTop:'20px'}}>
      <h2 className="text-white text-lg mb-4">Todas las Lecturas de Temperatura</h2>
      <table className="table-auto text-sm w-full">
        <thead>
          <tr>
            <th className="px-3 py-2 border-b border-gray-500 text-left">Timestamp</th>
            <th className="px-3 py-2 border-b border-gray-500 text-left">Temperatura (°C)</th>
          </tr>
        </thead>
        <tbody>
          {readings.map(r=>(
            <tr key={r._id}>
              <td className="px-3 py-2 border-b border-gray-500">{new Date(r.timestamp).toLocaleString()}</td>
              <td className="px-3 py-2 border-b border-gray-500">{r.value.temp_corp?.toFixed(2)} °C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaTemperatura;
