import { MATCHES } from '../../data/matches';
import { getFlagImage } from '../../utils/helpers';

interface MatchesProps {
  onNavigate: (view: string) => void;
}

export const Matches = ({ onNavigate }: MatchesProps) => {
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
        <h1 className="text-white font-black text-2xl mb-1">Partidos</h1>
        <p className="text-gray-500 text-sm">Todos los partidos del Mundial 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid gap-3">
          {MATCHES.map((match) => (
            <div
              key={match.id}
              className="bg-[#141414] border border-[#252525] rounded-xl p-4 hover:border-[#00E676] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={getFlagImage(match.h, 40)}
                    alt={match.h}
                    className="w-10 h-7 rounded object-cover"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                  />
                  <span className="text-white font-bold">{match.h}</span>
                </div>

                <div className="text-center px-4">
                  <div className="text-gray-500 text-xs mb-1">{match.date}</div>
                  <div className="text-white font-black text-lg">
                    {match.live ? `${match.hS || 0} - ${match.aS || 0}` : match.time}
                  </div>
                  <div className="text-gray-600 text-xs">{match.city}</div>
                  {match.live && (
                    <div className="flex items-center gap-1 justify-center mt-1">
                      <span className="w-1.5 h-1.5 bg-[#FF4444] rounded-full animate-pulse"></span>
                      <span className="text-[#FF4444] text-xs font-bold">EN VIVO {match.min}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-1 justify-end">
                  <span className="text-white font-bold">{match.a}</span>
                  <img
                    src={getFlagImage(match.a, 40)}
                    alt={match.a}
                    className="w-10 h-7 rounded object-cover"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
