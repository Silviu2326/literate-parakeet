import { getFlagImage } from '../../utils/helpers';

interface GroupsProps {
  onNavigate: (view: string) => void;
}

const GROUPS = [
  {
    name: 'A',
    teams: [
      { name: 'México', pts: 6, w: 2, d: 0, l: 0, gf: 5, ga: 1 },
      { name: 'Sudáfrica', pts: 3, w: 1, d: 0, l: 1, gf: 2, ga: 3 },
      { name: 'Corea del Sur', pts: 3, w: 1, d: 0, l: 1, gf: 3, ga: 3 },
      { name: 'Por definir (A)', pts: 0, w: 0, d: 0, l: 2, gf: 1, ga: 4 },
    ]
  },
  {
    name: 'B',
    teams: [
      { name: 'Canadá', pts: 4, w: 1, d: 1, l: 0, gf: 3, ga: 1 },
      { name: 'Qatar', pts: 4, w: 1, d: 1, l: 0, gf: 2, ga: 1 },
      { name: 'Suiza', pts: 1, w: 0, d: 1, l: 1, gf: 1, ga: 2 },
      { name: 'Por definir (B)', pts: 1, w: 0, d: 1, l: 1, gf: 1, ga: 3 },
    ]
  },
  // Add more groups as needed
];

export const Groups = ({ onNavigate }: GroupsProps) => {
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
        <h1 className="text-white font-black text-2xl mb-1">Grupos</h1>
        <p className="text-gray-500 text-sm">Clasificación y estadísticas por grupo</p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GROUPS.map((group) => (
            <div key={group.name} className="bg-[#141414] border border-[#252525] rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#00E676]/20 to-[#00E676]/10 px-4 py-3 border-b border-[#252525]">
                <h2 className="text-white font-black text-lg">Grupo {group.name}</h2>
              </div>
              <div className="p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-500 text-left">
                      <th className="pb-2">Equipo</th>
                      <th className="pb-2 text-center">PJ</th>
                      <th className="pb-2 text-center">Pts</th>
                      <th className="pb-2 text-center">DG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.teams.map((team, idx) => (
                      <tr key={idx} className="border-t border-[#252525]">
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${idx < 2 ? 'text-[#00E676]' : 'text-gray-500'}`}>
                              {idx + 1}
                            </span>
                            <img
                              src={getFlagImage(team.name, 24)}
                              alt={team.name}
                              className="w-6 h-4 rounded object-cover"
                              onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                            <span className="text-white font-bold">{team.name}</span>
                          </div>
                        </td>
                        <td className="text-center text-gray-400">{team.w + team.d + team.l}</td>
                        <td className="text-center font-black text-white">{team.pts}</td>
                        <td className="text-center text-gray-400">{team.gf - team.ga}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
