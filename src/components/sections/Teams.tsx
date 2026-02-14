import { useState } from 'react';
import { TEAMS } from '../../data/teams';
import { getFlagImage } from '../../utils/helpers';
import { Header } from '../home/Header';
import { MobileLayout } from '../../features/fantasy/presentation/shared/MobileLayout';
import type { Player } from '../../types/index.ts';
import './Teams.css';

interface TeamsProps {
  onNavigate: (view: string) => void;
  points: number;
}

export const Teams = ({ onNavigate, points }: TeamsProps) => {
  const teamList = Object.keys(TEAMS);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const getPlayersByPosition = (players: Player[]) => {
    const positions = {
      POR: players.filter(p => p.p === 'POR'),
      DEF: players.filter(p => p.p === 'DEF'),
      MED: players.filter(p => p.p === 'MED'),
      DEL: players.filter(p => p.p === 'DEL'),
    };
    return positions;
  };

  const positionNames = {
    POR: 'Porteros',
    DEF: 'Defensas',
    MED: 'Centrocampistas',
    DEL: 'Delanteros',
  };

  return (
    <MobileLayout onNavigate={onNavigate} currentView="dashboard">
      <div className="min-h-screen bg-[#0D0D0D]">
        {/* Header Principal */}
        <Header points={points} />

      {/* Header Visual */}
      <div className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Banner Image */}
        <div className="teams-banner-container">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
            alt="Teams Banner"
            className="teams-banner-image"
          />
          <div className="teams-banner-overlay" />
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
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-2">
                Selecciones
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="px-4 py-1.5 bg-[#141414] border border-[#252525] rounded-full text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Mundial 2026
                </span>
                <span className="px-4 py-1.5 bg-[#00E676]/10 border border-[#00E676]/20 rounded-full text-[#00E676] text-xs font-bold uppercase tracking-widest">
                  {teamList.length} Naciones
                </span>
                <span className="px-4 py-1.5 bg-[#141414] border border-[#252525] rounded-full text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Fase de Grupos
                </span>
              </div>
            </div>

            {/* Visual Stats Bar (The bar from reference) */}
            <div className="w-full max-w-md bg-gradient-to-r from-transparent via-[#141414] to-transparent border-y border-[#252525]/30 py-4" style={{ marginTop: '48px', marginBottom: '48px' }}>
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <div className="text-[#00E676] font-black text-xl leading-none">48</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">Equipos Totales</div>
                </div>
                <div className="w-px h-8 bg-[#252525]" />
                <div className="text-center">
                  <div className="text-white font-black text-xl leading-none">16</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">Sedes</div>
                </div>
                <div className="w-px h-8 bg-[#252525]" />
                <div className="text-center">
                  <div className="text-white font-black text-xl leading-none">3</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">Países Host</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teamList.slice(0, 32).map((teamName) => {
            const team = TEAMS[teamName];
            return (
              <div
                key={teamName}
                onClick={() => setSelectedTeam(teamName)}
                className="group bg-gradient-to-br from-[#141414] to-[#0D0D0D] border border-[#252525] rounded-2xl p-5 hover:border-[#00E676] hover:shadow-[0_0_20px_rgba(0,230,118,0.15)] transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#00E676] opacity-0 group-hover:opacity-10 rounded-lg blur-xl transition-opacity" />
                    <img
                      src={getFlagImage(teamName, 80)}
                      alt={teamName}
                      className="w-20 h-14 rounded-lg object-cover shadow-2xl relative z-10 border border-[#252525]"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-white font-bold text-base block">{teamName}</span>
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <span className="text-gray-400">Ranking:</span>
                      <span className="text-[#00E676] font-bold">#{team.rk}</span>
                    </div>
                    <div className="text-gray-500 text-xs">{team.coach}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Jugadores */}
      {selectedTeam && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="bg-[#141414] border border-[#252525] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 bg-gradient-to-b from-[#141414] to-[#141414]/95 border-b border-[#252525] p-6 backdrop-blur-sm z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={getFlagImage(selectedTeam, 80)}
                    alt={selectedTeam}
                    className="w-16 h-12 rounded-lg object-cover shadow-lg border border-[#252525]"
                  />
                  <div>
                    <h2 className="text-white font-black text-2xl mb-1">{selectedTeam}</h2>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400">
                        DT: <span className="text-white font-medium">{TEAMS[selectedTeam].coach}</span>
                      </span>
                      <span className="text-gray-400">
                        Sistema: <span className="text-[#00E676] font-medium">{TEAMS[selectedTeam].schema}</span>
                      </span>
                      <span className="text-gray-400">
                        Grupo: <span className="text-[#00E676] font-bold">{TEAMS[selectedTeam].g}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Lista de Jugadores por Posición */}
            <div className="p-6 space-y-6">
              {Object.entries(getPlayersByPosition(TEAMS[selectedTeam].squad)).map(([position, players]) => (
                players.length > 0 && (
                  <div key={position}>
                    <h3 className="text-[#00E676] font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#00E676] rounded-full" />
                      {positionNames[position as keyof typeof positionNames]}
                      <span className="text-gray-500 text-xs">({players.length})</span>
                    </h3>
                    <div className="grid gap-2">
                      {players.map((player) => (
                        <div
                          key={player.id}
                          className="bg-[#0D0D0D] border border-[#252525] rounded-xl p-4 hover:border-[#00E676]/30 transition-all group"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="flex-shrink-0">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${player.h
                                  ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500/50 text-yellow-400'
                                  : 'bg-[#252525] text-gray-400'
                                  }`}>
                                  {player.p}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-bold text-sm truncate">{player.n}</span>
                                  {player.h && (
                                    <span className="text-yellow-400 text-xs">⭐</span>
                                  )}
                                </div>
                                <div className="text-gray-500 text-xs truncate">{player.club}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              <div className="text-right">
                                <div className="text-gray-400 text-xs">Valor</div>
                                <div className="text-[#00E676] font-bold text-sm">${player.v}M</div>
                              </div>
                              <div className="text-right">
                                <div className="text-gray-400 text-xs">OVR</div>
                                <div className={`font-bold text-sm ${player.s >= 85 ? 'text-yellow-400' :
                                  player.s >= 80 ? 'text-[#00E676]' :
                                    'text-white'
                                  }`}>
                                  {player.s}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </MobileLayout>
  );
};
