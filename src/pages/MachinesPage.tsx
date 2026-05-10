import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Arreglo para el icono de Leaflet
const icon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

const MachinesPage = () => {
  const machines = [
    { id: 1, name: "Máquina ICESI - Edificio L", position: [3.3416, -76.5306] as [number, number], status: "Full" },
    { id: 2, name: "Máquina Unicentro", position: [3.3768, -76.5332] as [number, number], status: "Active" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-(--color-revalue-dark)">My Machines</h1>
        <p className="text-gray-500 font-medium">Track your recycling points and their current status.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          {machines.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Machine #{m.id}</span>
              <h3 className="font-black text-lg text-(--color-revalue-dark)">{m.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${m.status === 'Full' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className="text-sm font-bold text-gray-600">{m.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-xl">
          <MapContainer center={[3.3416, -76.5306]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {machines.map(m => (
              <Marker key={m.id} position={m.position} icon={icon}>
                <Popup>
                  <strong>{m.name}</strong><br/>Status: {m.status}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MachinesPage;