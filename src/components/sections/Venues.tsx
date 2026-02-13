interface VenuesProps {
  onNavigate: (view: string) => void;
}

const VENUES = [
  { name: 'Estadio Azteca', city: 'Ciudad de México', country: 'México', capacity: '87,523', matches: 6 },
  { name: 'SoFi Stadium', city: 'Los Ángeles', country: 'EE.UU.', capacity: '70,240', matches: 8 },
  { name: 'MetLife Stadium', city: 'Nueva York', country: 'EE.UU.', capacity: '82,500', matches: 8 },
  { name: 'AT&T Stadium', city: 'Dallas', country: 'EE.UU.', capacity: '80,000', matches: 9 },
  { name: 'Arrowhead Stadium', city: 'Kansas City', country: 'EE.UU.', capacity: '76,416', matches: 6 },
  { name: 'NRG Stadium', city: 'Houston', country: 'EE.UU.', capacity: '72,220', matches: 7 },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'EE.UU.', capacity: '71,000', matches: 8 },
  { name: 'Lincoln Financial Field', city: 'Filadelfia', country: 'EE.UU.', capacity: '69,796', matches: 6 },
  { name: 'Lumen Field', city: 'Seattle', country: 'EE.UU.', capacity: '69,000', matches: 6 },
  { name: 'Levi\'s Stadium', city: 'San Francisco', country: 'EE.UU.', capacity: '68,500', matches: 6 },
  { name: 'Gillette Stadium', city: 'Boston', country: 'EE.UU.', capacity: '65,878', matches: 7 },
  { name: 'Hard Rock Stadium', city: 'Miami', country: 'EE.UU.', capacity: '64,767', matches: 7 },
  { name: 'BC Place', city: 'Vancouver', country: 'Canadá', capacity: '54,500', matches: 7 },
  { name: 'BMO Field', city: 'Toronto', country: 'Canadá', capacity: '45,500', matches: 6 },
  { name: 'Estadio BBVA', city: 'Monterrey', country: 'México', capacity: '53,500', matches: 7 },
  { name: 'Estadio Akron', city: 'Guadalajara', country: 'México', capacity: '46,232', matches: 6 },
];

export const Venues = ({ onNavigate }: VenuesProps) => {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <div className="bg-[#141414] border-b border-[#252525] px-4 py-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="mb-3 text-gray-400 hover:text-[#00E676] font-bold text-sm flex items-center gap-2 transition-colors"
        >
          ← Volver al inicio
        </button>
        <h1 className="text-white font-black text-2xl mb-1">Sedes</h1>
        <p className="text-gray-500 text-sm">Estadios del Mundial 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VENUES.map((venue, idx) => (
            <div
              key={idx}
              className="bg-[#141414] border border-[#252525] rounded-xl p-5 hover:border-[#00E676] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-black text-base mb-1">{venue.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {venue.city}, {venue.country}
                  </p>
                </div>
                <span className="text-2xl">🏟️</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-500">Capacidad: </span>
                  <span className="text-[#00E676] font-bold">{venue.capacity}</span>
                </div>
                <div>
                  <span className="text-gray-500">Partidos: </span>
                  <span className="text-white font-bold">{venue.matches}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
