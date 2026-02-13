import { getFlagImage } from '../../utils/helpers';
import { Header } from '../home/Header';

interface GroupsProps {
  onNavigate: (view: string) => void;
  points: number;
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

export const Groups = ({ onNavigate, points }: GroupsProps) => {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header Principal */}
      <Header points={points} />

      {/* Header Visual */}
      <div className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#00E676]/5 blur-[120px] pointer-events-none" />

        {/* Floating Back Button */}
        <div className="max-w-7xl mx-auto relative">
          <button
            onClick={() => onNavigate('dashboard')}
            className="absolute left-0 top-0 group flex items-center gap-2 text-gray-400 hover:text-[#00E676] transition-all duration-300"
            style={{ marginLeft: '20px', marginTop: '10px' }}
          >
            <div className="w-14 h-14 rounded-full bg-[#141414] border border-[#252525] flex items-center justify-center group-hover:border-[#00E676]/30 group-hover:bg-[#00E676]/5 transition-all">
              <span className="text-2xl">←</span>
            </div>
            <span className="hidden md:block text-xs font-bold tracking-widest uppercase">Volver</span>
          </button>

          {/* Centered Hero Content */}
          <div className="flex flex-col items-center text-center space-y-8" style={{ paddingTop: '40px' }}>
            {/* Main Icon (Visual Anchor) */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#00E676] blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-20 h-20 rounded-2xl bg-[#141414] border-2 border-[#252525] flex items-center justify-center group shadow-[0_0_50px_rgba(0,230,118,0.1)]">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#00E676] fill-none stroke-current stroke-2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-2">
                Grupos
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="px-4 py-1.5 bg-[#141414] border border-[#252525] rounded-full text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Mundial 2026
                </span>
                <span className="px-4 py-1.5 bg-[#00E676]/10 border border-[#00E676]/20 rounded-full text-[#00E676] text-xs font-bold uppercase tracking-widest">
                  12 Grupos
                </span>
                <span className="px-4 py-1.5 bg-[#141414] border border-[#252525] rounded-full text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Fase de Grupos
                </span>
              </div>
            </div>

            {/* Visual Stats Bar */}
            <div className="w-full max-w-md bg-gradient-to-r from-transparent via-[#141414] to-transparent border-y border-[#252525]/30 py-4" style={{ marginTop: '48px', marginBottom: '48px' }}>
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <div className="text-[#00E676] font-black text-xl leading-none">48</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">Equipos</div>
                </div>
                <div className="w-px h-8 bg-[#252525]" />
                <div className="text-center">
                  <div className="text-white font-black text-xl leading-none">12</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">Grupos</div>
                </div>
                <div className="w-px h-8 bg-[#252525]" />
                <div className="text-center">
                  <div className="text-white font-black text-xl leading-none">32</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">Clasifican</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {GROUPS.map((group) => (
            <div
              key={group.name}
              className="group/card relative bg-gradient-to-br from-[#141414] to-[#0D0D0D] border border-[#252525] rounded-2xl overflow-hidden hover:border-[#00E676]/50 hover:shadow-[0_0_30px_rgba(0,230,118,0.15)] transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-[#00E676] opacity-0 group-hover/card:opacity-5 blur-xl transition-opacity pointer-events-none" />

              {/* Header del Grupo */}
              <div className="relative bg-gradient-to-r from-[#00E676]/20 via-[#00E676]/10 to-transparent px-6 py-6 border-b border-[#00E676]/30">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#00E676] blur-md opacity-50" />
                    <span className="relative w-12 h-12 bg-gradient-to-br from-[#00E676] to-[#00B359] rounded-xl flex items-center justify-center text-black text-2xl font-black shadow-lg">
                      {group.name}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-white font-black text-2xl tracking-tight">
                      Grupo {group.name}
                    </h2>
                    <p className="text-gray-400 text-xs font-medium mt-1">Fase de Grupos • Mundial 2026</p>
                  </div>
                </div>
              </div>

              {/* Tabla */}
              <div className="relative p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-gray-500 border-b border-[#252525]/50">
                        <th className="pb-3 text-left font-bold text-[10px] uppercase tracking-widest">Equipo</th>
                        <th className="pb-3 text-center font-bold text-[10px] uppercase tracking-widest">PJ</th>
                        <th className="pb-3 text-center font-bold text-[10px] uppercase tracking-widest">Pts</th>
                        <th className="pb-3 text-center font-bold text-[10px] uppercase tracking-widest">DG</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.teams.map((team, idx) => (
                        <tr
                          key={idx}
                          className={`group/row hover:bg-[#1a1a1a]/50 transition-all ${
                            idx < group.teams.length - 1 ? 'border-b border-[#252525]/30' : ''
                          }`}
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className={`relative w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs transition-all ${
                                idx < 2
                                  ? 'bg-gradient-to-br from-[#00E676] to-[#00B359] text-black shadow-lg shadow-[#00E676]/20'
                                  : 'bg-[#1a1a1a] border border-[#252525] text-gray-500'
                              }`}>
                                {idx + 1}
                              </div>
                              <div className="relative w-10 h-7 rounded-md overflow-hidden border border-[#252525] flex-shrink-0 group-hover/row:border-[#00E676]/30 transition-colors">
                                <img
                                  src={getFlagImage(team.name, 40)}
                                  alt={team.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => e.currentTarget.style.display = 'none'}
                                />
                              </div>
                              <span className="text-white font-bold text-sm group-hover/row:text-[#00E676] transition-colors">
                                {team.name}
                              </span>
                            </div>
                          </td>
                          <td className="text-center text-gray-400 font-semibold text-sm py-4">
                            {team.w + team.d + team.l}
                          </td>
                          <td className="text-center font-black text-white text-xl py-4">
                            <span className="inline-block px-3 py-1 bg-[#1a1a1a] rounded-lg border border-[#252525] group-hover/row:border-[#00E676]/30 transition-colors">
                              {team.pts}
                            </span>
                          </td>
                          <td className="text-center font-bold text-sm py-4">
                            <span className={`inline-flex items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-lg font-bold transition-all ${
                              team.gf - team.ga > 0
                                ? 'text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20'
                                : team.gf - team.ga < 0
                                  ? 'text-red-400 bg-red-400/10 border border-red-400/20'
                                  : 'text-gray-400 bg-gray-400/10 border border-gray-400/20'
                            }`}>
                              {team.gf - team.ga > 0 ? '+' : ''}{team.gf - team.ga}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Leyenda */}
                <div className="mt-6 pt-5 border-t border-[#252525]/50 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#00E676] to-[#00B359] shadow-lg shadow-[#00E676]/20"></div>
                      <span className="text-gray-400 font-medium">Clasificados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-lg bg-[#1a1a1a] border border-[#252525]"></div>
                      <span className="text-gray-400 font-medium">Eliminados</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-bold">
                    Top 2 → Octavos
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
