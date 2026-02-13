import { useState } from 'react';
import { Search, Filter, ChevronRight, Plus, ArrowLeftRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MobileLayout } from '../shared/MobileLayout';
import { PageHeader } from '../shared/PageHeader';
import { useFantasyStore } from '../../application/store/fantasyStore';
import { useAvailablePlayers, useSquad } from '../../application/hooks/useFantasy';
import { PlayerPosition } from '../../domain/types';
import { getPositionLabel } from '../../domain/rules';

export function PlayersPage() {
  const { setView, nations } = useFantasyStore();
  const { canAdd, squad, addPlayer, removePlayer } = useSquad();
  
  const [view, setViewState] = useState<'nations' | 'players'>('nations');
  const [selectedNationId, setSelectedNationId] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState<PlayerPosition | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { players, nations: nationsWithCount } = useAvailablePlayers(
    selectedNationId || undefined,
    filterPosition || undefined
  );
  
  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectNation = (nationId: string) => {
    setSelectedNationId(nationId);
    setViewState('players');
  };
  
  const handleBack = () => {
    if (view === 'players') {
      setViewState('nations');
      setSelectedNationId(null);
      setFilterPosition(null);
      setSearchQuery('');
    } else {
      setView('dashboard');
    }
  };
  
  const handleAddPlayer = (player: any) => {
    const result = addPlayer(player);
    if (result.success) {
      // Opcional: mostrar toast de éxito
    }
  };
  
  const handleRemovePlayer = (playerId: string) => {
    removePlayer(playerId);
  };
  
  const selectedNation = nations.find(n => n.id === selectedNationId);
  
  return (
    <MobileLayout>
      <div style={{ paddingBottom: 100 }}>
        {/* HEADER */}
        <PageHeader
          title={view === 'nations' ? 'SELECCIONES' : selectedNation?.name.toUpperCase() || 'JUGADORES'}
          subtitle={view === 'nations' 
            ? `${nations.length} selecciones disponibles` 
            : `${filteredPlayers.length} jugadores • ${squad.players.length}/15`}
          onBack={handleBack}
          rightElement={
            view === 'players' ? (
              <button
                onClick={() => setFilterPosition(null)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-2)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                }}
              >
                <Filter size={18} />
              </button>
            ) : null
          }
        />
        
        {/* BÚSQUEDA Y FILTROS - Solo en vista de jugadores */}
        {view === 'players' && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-primary)',
            padding: 'var(--space-4)',
          }}>
            <div style={{
              position: 'relative',
              marginBottom: 'var(--space-3)',
            }}>
              <Search size={18} style={{
                position: 'absolute',
                left: 'var(--space-3)',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)',
              }} />
              <input
                type="text"
                placeholder="Buscar jugador..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3) var(--space-3) var(--space-3) 44px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                  outline: 'none',
                }}
              />
            </div>
            
            {/* FILTROS DE POSICIÓN */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              overflowX: 'auto',
              paddingBottom: 'var(--space-1)',
            }}>
              <FilterChip
                label="Todos"
                isActive={filterPosition === null}
                onClick={() => setFilterPosition(null)}
              />
              <FilterChip
                label="POR"
                isActive={filterPosition === PlayerPosition.GK}
                onClick={() => setFilterPosition(PlayerPosition.GK)}
              />
              <FilterChip
                label="DEF"
                isActive={filterPosition === PlayerPosition.DEF}
                onClick={() => setFilterPosition(PlayerPosition.DEF)}
              />
              <FilterChip
                label="MED"
                isActive={filterPosition === PlayerPosition.MID}
                onClick={() => setFilterPosition(PlayerPosition.MID)}
              />
              <FilterChip
                label="DEL"
                isActive={filterPosition === PlayerPosition.FWD}
                onClick={() => setFilterPosition(PlayerPosition.FWD)}
              />
            </div>
          </div>
        )}
        
        {/* CONTENIDO */}
        <div style={{ padding: 'var(--space-4)' }}>
          {view === 'nations' ? (
            /* VISTA DE SELECCIONES */
            <div style={{
              display: 'grid',
              gap: 'var(--space-3)',
            }}>
              {nationsWithCount.map((nation) => {
                const isMaxed = nation.playersCount >= 2;
                return (
                  <Card
                    key={nation.id}
                    variant={isMaxed ? undefined : "interactive"}
                    onClick={() => !isMaxed && handleSelectNation(nation.id)}
                    style={isMaxed ? { opacity: 0.6 } : undefined}
                  >
                    <Card.Body>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                      }}>
                        <img
                          src={nation.flag}
                          alt={nation.name}
                          style={{
                            width: 48,
                            height: 32,
                            borderRadius: 'var(--radius-sm)',
                            objectFit: 'cover',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                        />
                        
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 'var(--text-md)',
                            fontWeight: 'var(--font-bold)',
                            color: 'var(--text-primary)',
                          }}>
                            {nation.name}
                          </div>
                          <div style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-tertiary)',
                            marginTop: '2px',
                          }}>
                            Grupo {nation.group}
                          </div>
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                        }}>
                          <Badge 
                            variant={isMaxed ? 'error' : nation.playersCount === 1 ? 'warning' : 'neutral'}
                            size="md"
                          >
                            {nation.playersCount}/2
                          </Badge>
                          {!isMaxed && <ChevronRight size={20} style={{ color: 'var(--text-tertiary)' }} />}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* VISTA DE JUGADORES */
            <div>
              {/* STATS DE LA SELECCIÓN */}
              <Card style={{ marginBottom: 'var(--space-4)' }}>
                <Card.Body>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        marginBottom: '2px',
                      }}>
                        Jugadores de tu equipo
                      </div>
                      <div style={{
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-black)',
                        color: squad.players.filter(p => p.nationId === selectedNationId).length >= 2 
                          ? 'var(--color-error)' 
                          : 'var(--text-primary)',
                      }}>
                        {squad.players.filter(p => p.nationId === selectedNationId).length}/2
                      </div>
                    </div>
                    <img
                      src={selectedNation?.flag}
                      alt={selectedNation?.name}
                      style={{
                        width: 64,
                        height: 44,
                        borderRadius: 'var(--radius-md)',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
              
              {/* LISTA DE JUGADORES */}
              <div style={{
                display: 'grid',
                gap: 'var(--space-3)',
              }}>
                {filteredPlayers.map((player) => {
                  const addResult = canAdd(player);
                  const isInSquad = player.isInSquad;
                  
                  return (
                    <Card
                      key={player.id}
                      style={{
                        opacity: isInSquad ? 0.7 : 1,
                        border: isInSquad ? '1px solid var(--color-primary)' : undefined,
                      }}
                    >
                      <Card.Body>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                        }}>
                          {/* AVATAR */}
                          <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'var(--bg-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            flexShrink: 0,
                          }}>
                            ⚽
                          </div>
                          
                          {/* INFO */}
                          <div style={{ flex: 1 }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-2)',
                              marginBottom: '2px',
                            }}>
                              <span style={{
                                fontSize: 'var(--text-sm)',
                                fontWeight: 'var(--font-semibold)',
                                color: 'var(--text-primary)',
                              }}>
                                {player.name}
                              </span>
                              {player.isU23 && (
                                <Badge variant="accent" size="sm">U23</Badge>
                              )}
                            </div>
                            
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-2)',
                            }}>
                              <Badge variant="neutral" size="sm">
                                {getPositionLabel(player.position)}
                              </Badge>
                              <span style={{
                                fontSize: 'var(--text-xs)',
                                color: 'var(--color-primary)',
                                fontWeight: 'var(--font-bold)',
                              }}>
                                {player.points} pts
                              </span>
                            </div>
                          </div>
                          
                          {/* ACCIÓN */}
                          {isInSquad ? (
                            <button
                              onClick={() => handleRemovePlayer(player.id)}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'var(--color-error)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                              title="Quitar del equipo"
                            >
                              <ArrowLeftRight size={18} color="white" />
                            </button>
                          ) : (
                            <button
                              disabled={!addResult.allowed}
                              onClick={() => handleAddPlayer(player)}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: addResult.allowed 
                                  ? 'var(--color-primary)' 
                                  : 'var(--bg-elevated)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: addResult.allowed ? 'pointer' : 'not-allowed',
                                opacity: addResult.allowed ? 1 : 0.5,
                              }}
                              title={addResult.reason || 'Añadir al equipo'}
                            >
                              <Plus size={20} color={addResult.allowed ? 'var(--bg-primary)' : 'var(--text-tertiary)'} />
                            </button>
                          )}
                        </div>
                        
                        {/* MENSAJE DE ERROR */}
                        {!addResult.allowed && !isInSquad && (
                          <div style={{
                            marginTop: 'var(--space-2)',
                            padding: 'var(--space-2)',
                            background: 'rgba(255, 61, 0, 0.1)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-error)',
                          }}>
                            {addResult.reason}
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
              
              {filteredPlayers.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--space-12)',
                  color: 'var(--text-tertiary)',
                }}>
                  <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🔍</div>
                  <div style={{
                    fontSize: 'var(--text-md)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-2)',
                  }}>
                    No se encontraron jugadores
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)' }}>
                    Prueba con otros filtros
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}

function FilterChip({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 'var(--space-2) var(--space-3)',
        background: isActive ? 'var(--color-primary)' : 'var(--bg-tertiary)',
        border: 'none',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-bold)',
        color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}
