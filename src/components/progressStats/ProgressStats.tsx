export default function ProgressStats() {
    return (
        <div className="flex flex-col items-center bg-gradient-to-br from-[#131922] via-[#1E3545] to-[#1A2A37] p-4 rounded-lg mx-4 mt-4 border border-blue-500">
  <h2 className="text-white text-md font-bold mb-2">MI PROGRESO</h2>
  
  <div className="grid grid-rows-2 gap-2 w-full text-center">
    <div className="row-span-1">
      <p className="text-white text-2xl font-semibold">35.00</p>
      <p className="text-gray-400 text-xs">KM TOTALES</p>
    </div>

    <div className="grid grid-cols-3 gap-2">
      <div>
        <p className="text-white text-lg font-semibold">3.33</p>
        <p className="text-gray-400 text-xs">HORAS TOTALES</p>
      </div>
      <div>
        <p className="text-white text-lg font-semibold">1700</p>
        <p className="text-gray-400 text-xs">KCAL TOTALES</p>
      </div>
      <div>
        <p className="text-white text-lg font-semibold">85.6</p>
        <p className="text-gray-400 text-xs">RITMO PROMEDIO</p>
      </div>
    </div>
  </div>
</div>    
    );
  }
  