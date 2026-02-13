import { TEAMS } from '../../data/teams';
import { getFlagImage } from '../../utils/helpers';

interface TeamsProps {
  onNavigate: (view: string) => void;
}

export const Teams = ({ onNavigate }: TeamsProps) => {
  const teamList = Object.keys(TEAMS);

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
        <h1 className="text-white font-black text-2xl mb-1">Selecciones</h1>
        <p className="text-gray-500 text-sm">Todas las selecciones del Mundial 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {teamList.slice(0, 32).map((teamName) => (
            <div
              key={teamName}
              className="bg-[#141414] border border-[#252525] rounded-xl p-4 hover:border-[#00E676] transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center gap-3">
                <img
                  src={getFlagImage(teamName, 80)}
                  alt={teamName}
                  className="w-20 h-14 rounded object-cover shadow-lg"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
                <span className="text-white font-bold text-sm text-center">{teamName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
