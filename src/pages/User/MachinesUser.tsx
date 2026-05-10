import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const icon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
});

const MachinesUser = () => {
  const machines = [
    { id: 1, address: "12th Street #23-1", pos: [3.3416, -76.5306] as [number, number] },
    { id: 2, address: "09th Street #21-2", pos: [3.3450, -76.5350] as [number, number] },
    { id: 3, address: "09th Street #21-2", pos: [3.3390, -76.5280] as [number, number] },
  ];

  return (
    <div className="flex flex-col h-screen bg-white animate-in slide-in-from-right duration-500 pb-20">
      {/* MAPA (Parte superior) */}
      <div className="h-[40%] w-full shadow-inner relative z-10">
        <MapContainer center={[3.3416, -76.5306]} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {machines.map((m) => (
            <Marker key={m.id} position={m.pos} icon={icon}>
              <Popup>{m.address}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* LISTA DE MÁQUINAS (Parte inferior) */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50 rounded-t-[40px] -mt-10 relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        {machines.map((m) => (
          <div key={m.id} className="bg-white p-4 rounded-3xl shadow-sm flex items-center gap-4 border border-gray-100">
            {/* Número verde cuadrado de tu diseño */}
            <div className="bg-(--color-revalue-green) w-20 h-20 rounded-2xl flex items-center justify-center text-white text-4xl font-black">
              {m.id}
            </div>
            {/* Dirección */}
            <div className="flex-1">
              <p className="text-xl font-black text-slate-800 leading-tight">
                {m.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachinesUser;