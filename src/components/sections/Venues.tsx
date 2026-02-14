import { Header } from '../home/Header';
import { MobileLayout } from '../../features/fantasy/presentation/shared/MobileLayout';
import './Venues.css';

interface VenuesProps {
  onNavigate: (view: string) => void;
  points: number;
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

export const Venues = ({ onNavigate, points }: VenuesProps) => {
  return (
    <MobileLayout onNavigate={onNavigate} currentView="dashboard">
      <div className="min-h-screen bg-[#0D0D0D]">
        {/* Header Principal */}
        <Header points={points} />

      {/* Header Visual */}
      <div className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Banner Image */}
        <div className="venues-banner-container">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
            alt="Venues Banner"
            className="venues-banner-image"
          />
          <div className="venues-banner-overlay" />
        </div>

        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#00E676]/5 blur-[120px] pointer-events-none z-[2]" />

        {/* Floating Back Button */}
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => onNavigate('dashboard')}
            className="absolute left-0 top-0 group flex items-center gap-2 text-gray-400 hover:text-[#00E676] transition-all duration-300 z-20"
            style={{ marginLeft: '20px', marginTop: '10px' }}
          >
            <div className="w-14 h-14 rounded-full bg-[#141414] border border-[#252525] flex items-center justify-center group-hover:border-[#00E676]/30 group-hover:bg-[#00E676]/5 transition-all">
              <span className="text-2xl">←</span>
            </div>
            <span className="hidden md:block text-xs font-bold tracking-widest uppercase">Volver</span>
          </button>

          {/* Centered Hero Content */}
          <div className="flex flex-col items-center text-center space-y-8 relative" style={{ paddingTop: '40px' }}>
            {/* Main Icon (Visual Anchor) */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#00E676] blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-20 h-20 rounded-2xl bg-[#141414] border-2 border-[#252525] flex items-center justify-center group shadow-[0_0_50px_rgba(0,230,118,0.1)]">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#00E676] fill-none stroke-current stroke-2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-2">
                Sedes
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="px-4 py-1.5 bg-[#141414] border border-[#252525] rounded-full text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Mundial 2026
                </span>
                <span className="px-4 py-1.5 bg-[#00E676]/10 border border-[#00E676]/20 rounded-full text-[#00E676] text-xs font-bold uppercase tracking-widest">
                  16 Estadios
                </span>
                <span className="px-4 py-1.5 bg-[#141414] border border-[#252525] rounded-full text-gray-400 text-xs font-bold uppercase tracking-widest">
                  3 Países
                </span>
              </div>
            </div>

            {/* Visual Stats Bar */}
            <div className="w-full max-w-md bg-gradient-to-r from-transparent via-[#141414] to-transparent border-y border-[#252525]/30 py-4" style={{ marginTop: '48px', marginBottom: '48px' }}>
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <div className="text-[#00E676] font-black text-xl leading-none">11</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">USA</div>
                </div>
                <div className="w-px h-8 bg-[#252525]" />
                <div className="text-center">
                  <div className="text-white font-black text-xl leading-none">3</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">México</div>
                </div>
                <div className="w-px h-8 bg-[#252525]" />
                <div className="text-center">
                  <div className="text-white font-black text-xl leading-none">2</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">Canadá</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Sedes por País */}
        {['México', 'EE.UU.', 'Canadá'].map((country, countryIdx) => {
          const countryVenues = VENUES.filter(v => v.country === country);
          const countryEmoji = country === 'México' ? '🇲🇽' : country === 'EE.UU.' ? '🇺🇸' : '🇨🇦';

          return (
            <div key={country} className="mb-16" style={{ marginTop: countryIdx > 0 ? '64px' : '0' }}>
              {/* Country Header */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-[#252525]">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00E676] blur-lg opacity-30" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#252525] flex items-center justify-center text-3xl shadow-lg">
                    {countryEmoji}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-white font-black text-3xl mb-1">{country}</h2>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-400">{countryVenues.length} Estadios</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{countryVenues.reduce((sum, v) => sum + v.matches, 0)} Partidos</span>
                  </div>
                </div>
                <div className="hidden md:block px-4 py-2 bg-[#00E676]/10 border border-[#00E676]/20 rounded-xl">
                  <span className="text-[#00E676] font-black text-sm uppercase tracking-wider">Host</span>
                </div>
              </div>

              {/* Venues Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {countryVenues.map((venue, idx) => {
                  const isLargest = parseInt(venue.capacity.replace(/,/g, '')) > 75000;
                  const isMostMatches = venue.matches >= 8;

                  return (
                    <div
                      key={idx}
                      className="group relative bg-gradient-to-br from-[#141414] to-[#0D0D0D] border border-[#252525] rounded-2xl overflow-hidden hover:border-[#00E676]/50 hover:shadow-[0_0_40px_rgba(0,230,118,0.2)] transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                    >
                      {/* Background Glow Effect */}
                      <div className="absolute inset-0 bg-[#00E676] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity pointer-events-none" />

                      {/* Top Badge */}
                      {(isLargest || isMostMatches) && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="px-3 py-1 bg-gradient-to-r from-[#00E676] to-[#00B359] rounded-full text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
                            {isLargest && isMostMatches ? '⭐ Premium' : isLargest ? 'Gran Capacidad' : 'Más Partidos'}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative p-6" style={{ paddingLeft: '20px' }}>
                        {/* Header */}
                        <div className="flex items-start justify-between mb-5" style={{ marginLeft: '-8px' }}>
                          <div className="flex-1 pr-4 min-w-0">
                            <h3 className="text-white font-black text-lg mb-2 leading-tight group-hover:text-[#00E676] transition-colors break-words">
                              {venue.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm mb-3">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500 fill-current">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                              </svg>
                              <span className="text-gray-400 font-medium">{venue.city}</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] border border-[#252525] flex items-center justify-center text-3xl group-hover:border-[#00E676]/30 group-hover:bg-[#00E676]/5 group-hover:scale-110 transition-all duration-300">
                              🏟️
                            </div>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#252525] rounded-xl p-4 group-hover:border-[#00E676]/30 transition-all">
                            <div className="flex items-center gap-2 mb-2">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#00E676] fill-none stroke-current stroke-2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                              <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Capacidad</div>
                            </div>
                            <div className="text-[#00E676] font-black text-xl leading-none">{venue.capacity}</div>
                          </div>
                          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#252525] rounded-xl p-4 group-hover:border-[#00E676]/30 transition-all">
                            <div className="flex items-center gap-2 mb-2">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-none stroke-current stroke-2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                              </svg>
                              <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Partidos</div>
                            </div>
                            <div className="text-white font-black text-xl leading-none">{venue.matches}</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 font-medium">Uso estimado</span>
                            <span className="text-gray-400 font-bold">{Math.round((venue.matches / 9) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#252525]">
                            <div
                              className="h-full bg-gradient-to-r from-[#00E676] to-[#00B359] transition-all duration-500 group-hover:shadow-[0_0_10px_rgba(0,230,118,0.5)]"
                              style={{ width: `${Math.round((venue.matches / 9) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </MobileLayout>
  );
};
