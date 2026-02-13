import { useState } from 'react';
import { Settings, X, Crown, ChevronRight, Minus, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MobileLayout } from '../shared/MobileLayout';
import { PageHeader } from '../shared/PageHeader';
import { useFantasyStore } from '../../application/store/fantasyStore';
import { useSquad, useChips } from '../../application/hooks/useFantasy';
import { PlayerPosition } from '../../domain/types';
import { getPositionLabel, GAME_RULES } from '../../domain/rules';

export function SquadPage() {
  const { setView } = useFantasyStore();
  const {
    starters,
    bench,
    captain,
    viceCaptain,
    formation,
    stats,
    setFormation,
    setCaptain,
    setViceCaptain,
    setStarters,
    removePlayer
  } = useSquad();
  const { availableChips } = useChips();
  const [showFormationSelector, setShowFormationSelector] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const gk = starters.filter(p => p.position === PlayerPosition.GK);
  const defs = starters.filter(p => p.position === PlayerPosition.DEF);
  const mids = starters.filter(p => p.position === PlayerPosition.MID);
  const fwds = starters.filter(p => p.position === PlayerPosition.FWD);

  const allPlayers = [...starters, ...bench];

  const toggleStarter = (playerId: string) => {
    const player = allPlayers.find(p => p.id === playerId);
    if (!player) return;

    const newStarters = player.isStarter
      ? starters.filter(p => p.id !== playerId).map(p => p.id)
      : [...starters.map(p => p.id), playerId];

    if (!player.isStarter && starters.length >= 11) {
      alert('Ya tienes 11 titulares');
      return;
    }

    setStarters(newStarters);
  };

  return (
    <MobileLayout>
      <div style={{ paddingBottom: 100 }}>
        {/* HEADER */}
        <PageHeader
          title="MI EQUIPO"
          subtitle={`${stats.total}/15 jugadores`}
          onBack={() => setView('dashboard')}
          rightElement={
            stats.total > 0 ? (
              <button
                onClick={() => setShowFormationSelector(true)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-1) var(--space-2)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {formation}
                <Settings size={14} />
              </button>
            ) : null
          }
        />

        {/* RESTO DEL CONTENIDO IGUAL */}
        {stats.total > 0 && (
          <div style={{
            padding: 'var(--space-4)',
            background: stats.total === 15 ? 'rgba(0, 200, 83, 0.05)' : 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-primary)',
          }}>
            <div style={{
              height: 8,
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              marginBottom: 'var(--space-3)',
            }}>
              <div style={{
                width: `${(stats.total / 15) * 100}%`,
                height: '100%',
                background: stats.total === 15 ? 'var(--color-success)' : 'var(--color-primary)',
                borderRadius: 'var(--radius-full)',
                transition: 'width var(--transition-base)',
              }} />
            </div>

            {/* INDICADORES DE CAPITANES */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-3)',
              justifyContent: 'center',
            }}>
              <CaptainBadge
                player={captain}
                type="captain"
                onClick={() => captain && setSelectedPlayerId(captain.id)}
              />
              <CaptainBadge
                player={viceCaptain}
                type="vice"
                onClick={() => viceCaptain && setSelectedPlayerId(viceCaptain.id)}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-2)',
              textAlign: 'center',
            }}>
              <SquadStat
                label="Porteros"
                emoji="🧤"
                current={stats.byPosition[PlayerPosition.GK]}
                required={2}
              />
              <SquadStat
                label="Defensas"
                emoji="🛡️"
                current={stats.byPosition[PlayerPosition.DEF]}
                required={4}
              />
              <SquadStat
                label="Medios"
                emoji="⚙️"
                current={stats.byPosition[PlayerPosition.MID]}
                required={4}
              />
              <SquadStat
                label="Delanteros"
                emoji="⚡"
                current={stats.byPosition[PlayerPosition.FWD]}
                required={2}
              />
            </div>
          </div>
        )}

        {/* CAMPO DE JUEGO */}
        {stats.total > 0 ? (
          <div style={{
            padding: 'var(--space-6) var(--space-4)',
            background: 'linear-gradient(180deg, #1a4d1a 0%, #0f3a0f 50%, #0a2a0a 100%)',
            minHeight: 500,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Patrón de césped */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 80px)',
              opacity: 0.5,
            }} />

            {/* Líneas del campo */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
              viewBox="0 0 100 140"
              preserveAspectRatio="none"
            >
              {/* Borde exterior */}
              <rect
                x="5" y="5" width="90" height="130"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.3"
                rx="2"
              />

              {/* Línea de medio campo */}
              <line
                x1="5" y1="70" x2="95" y2="70"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.3"
              />

              {/* Círculo central */}
              <circle
                cx="50" cy="70" r="8"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.3"
              />
              <circle
                cx="50" cy="70" r="0.5"
                fill="rgba(255,255,255,0.3)"
              />

              {/* Área grande superior */}
              <rect
                x="20" y="5" width="60" height="20"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.3"
              />

              {/* Área chica superior */}
              <rect
                x="35" y="5" width="30" height="10"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.3"
              />

              {/* Área grande inferior */}
              <rect
                x="20" y="115" width="60" height="20"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.3"
              />

              {/* Área chica inferior */}
              <rect
                x="35" y="125" width="30" height="10"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.3"
              />

              {/* Punto de penal superior */}
              <circle cx="50" cy="15" r="0.5" fill="rgba(255,255,255,0.3)" />

              {/* Punto de penal inferior */}
              <circle cx="50" cy="125" r="0.5" fill="rgba(255,255,255,0.3)" />
            </svg>

            {/* Jugadores */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              padding: 'var(--space-8) 0',
              minHeight: 450,
            }}>
              <PlayerLine players={fwds} onPlayerClick={setSelectedPlayerId} />
              <PlayerLine players={mids} onPlayerClick={setSelectedPlayerId} />
              <PlayerLine players={defs} onPlayerClick={setSelectedPlayerId} />
              <PlayerLine players={gk} onPlayerClick={setSelectedPlayerId} />
            </div>
          </div>
        ) : (
          <div style={{
            padding: 'var(--space-12)',
            textAlign: 'center',
            color: 'var(--text-tertiary)',
          }}>
            <div style={{ fontSize: '64px', marginBottom: 'var(--space-4)' }}>⚽</div>
            <h2 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-2)',
            }}>
              Tu equipo está vacío
            </h2>
            <p style={{
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--space-4)',
            }}>
              Añade 15 jugadores de diferentes selecciones
            </p>
            <button
              onClick={() => setView('players')}
              style={{
                padding: 'var(--space-3) var(--space-6)',
                background: 'var(--color-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: 'var(--bg-primary)',
                fontWeight: 'var(--font-bold)',
                cursor: 'pointer',
              }}
            >
              Empezar a seleccionar
            </button>
          </div>
        )}

        {/* INFORMACIÓN DEL EQUIPO */}
        {stats.total > 0 && (
          <div style={{ padding: 'var(--space-4)' }}>
            <Card style={{ marginBottom: 'var(--space-4)' }}>
              <Card.Body>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-2)',
                }}>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                  }}>
                    Restricción de selecciones
                  </span>
                  <Badge
                    variant={stats.nationsWithTwo > GAME_RULES.NATIONS_WITH_DOUBLE ? 'error' : 'neutral'}
                    size="sm"
                  >
                    {stats.nationsWithTwo}/{GAME_RULES.NATIONS_WITH_DOUBLE}
                  </Badge>
                </div>
                <p style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-tertiary)',
                }}>
                  Máximo 3 selecciones con 2 jugadores cada una
                </p>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <div style={{
                  fontSize: 'var(--text-md)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                }}>
                  Tu plantilla ({stats.total}/15)
                </div>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-tertiary)',
                }}>
                  {starters.length} titulares • {bench.length} suplentes
                </div>
              </Card.Header>
              <Card.Body padding="none">
                {allPlayers.length === 0 ? (
                  <div style={{
                    padding: 'var(--space-6)',
                    textAlign: 'center',
                    color: 'var(--text-tertiary)',
                  }}>
                    No hay jugadores
                  </div>
                ) : (
                  <div>
                    {allPlayers.map((player) => (
                      <PlayerListItem
                        key={player.id}
                        player={player}
                        isCaptain={captain?.id === player.id}
                        isVice={viceCaptain?.id === player.id}
                        onClick={() => setSelectedPlayerId(player.id)}
                      />
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* COMODINES */}
            {availableChips.length > 0 && (
              <Card style={{ marginTop: 'var(--space-4)' }}>
                <Card.Header>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                  }}>
                    <span style={{ fontSize: '20px' }}>🃏</span>
                    <span style={{
                      fontSize: 'var(--text-md)',
                      fontWeight: 'var(--font-bold)',
                      color: 'var(--text-primary)',
                    }}>
                      Comodines
                    </span>
                  </div>
                  <Badge variant="primary" size="sm">{availableChips.length} disponibles</Badge>
                </Card.Header>
                <Card.Body>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}>
                    {availableChips.map((chip) => (
                      <div
                        key={chip.type}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                          padding: 'var(--space-3)',
                          background: 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border-primary)',
                        }}
                      >
                        <div style={{ fontSize: '28px' }}>
                          {chip.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-bold)',
                            color: 'var(--text-primary)',
                          }}>
                            {chip.name}
                          </div>
                          <div style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-tertiary)',
                          }}>
                            {chip.description}
                          </div>
                        </div>
                        <Badge variant="primary" size="sm">
                          ×{chip.usesRemaining}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        )}

        {/* BOTÓN FLOTANTE */}
        {stats.total < 15 && (
          <button
            onClick={() => setView('players')}
            style={{
              position: 'fixed',
              bottom: 90,
              right: 'var(--space-4)',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--color-primary)',
              border: 'none',
              color: 'var(--bg-primary)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 40,
            }}
          >
            +
          </button>
        )}

        {/* SELECTOR DE FORMACIÓN */}
        {showFormationSelector && (
          <FormationSelector
            currentFormation={formation}
            onClose={() => setShowFormationSelector(false)}
            onSelect={setFormation}
          />
        )}

        {/* MODAL DE JUGADOR */}
        {selectedPlayerId && (
          <PlayerModal
            player={allPlayers.find(p => p.id === selectedPlayerId)!}
            onClose={() => setSelectedPlayerId(null)}
            onRemove={removePlayer}
            onToggleStarter={toggleStarter}
            onSetCaptain={setCaptain}
            onSetViceCaptain={setViceCaptain}
          />
        )}
      </div>

      {/* Estilos CSS para animaciones */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </MobileLayout>
  );
}

// ... resto de componentes auxiliares sin cambios
function PlayerLine({ players, onPlayerClick }: { players: any[]; onPlayerClick: (id: string) => void }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
    }}>
      {players.map((player) => (
        <PlayerToken key={player.id} player={player} onClick={() => onPlayerClick(player.id)} />
      ))}
      {players.length === 0 && (
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 'var(--text-xs)' }}>
          Sin jugadores
        </span>
      )}
    </div>
  );
}

function PlayerToken({ player, onClick }: { player: any; onClick: () => void }) {
  const isCaptain = player.isCaptain;
  const isVice = player.isViceCaptain;

  // Obtener iniciales del jugador
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[parts.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* Avatar del jugador */}
      <div style={{
        position: 'relative',
        width: 64,
        height: 64,
      }}>
        {/* Anillo externo (capitán/vice) */}
        {(isCaptain || isVice) && (
          <div style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            background: isCaptain
              ? 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)'
              : 'linear-gradient(135deg, #E8E8E8 0%, #A0A0A0 100%)',
            padding: 3,
            animation: 'pulse 2s infinite',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'var(--bg-primary)',
            }} />
          </div>
        )}

        {/* Avatar principal */}
        <div style={{
          position: 'relative',
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
          border: '3px solid rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'var(--font-black)',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
          overflow: 'hidden',
        }}>
          {/* Gradiente de fondo */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,230,118,0.2) 0%, rgba(0,200,83,0.1) 100%)',
          }} />

          {/* Iniciales */}
          <span style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '20px',
            fontWeight: 'var(--font-black)',
            letterSpacing: '-1px',
          }}>
            {getInitials(player.name)}
          </span>
        </div>

        {/* Badge de capitán/vice */}
        {(isCaptain || isVice) && (
          <div style={{
            position: 'absolute',
            top: -2,
            right: -2,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: isCaptain
              ? 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)'
              : 'linear-gradient(135deg, #E8E8E8 0%, #A0A0A0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            color: isCaptain ? '#000' : '#fff',
            fontWeight: 'var(--font-black)',
            border: '2px solid var(--bg-primary)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}>
            {isCaptain ? 'C' : 'V'}
          </div>
        )}
      </div>

      {/* Nombre y puntos en card */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '4px 8px',
        textAlign: 'center',
        minWidth: 70,
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 'var(--font-bold)',
          color: '#fff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          marginBottom: '2px',
        }}>
          {player.name.split(' ').pop()}
        </div>
        <div style={{
          fontSize: '10px',
          color: 'var(--color-primary)',
          fontWeight: 'var(--font-bold)',
        }}>
          {player.points} pts
        </div>
      </div>
    </div>
  );
}

function CaptainBadge({ player, type, onClick }: { player: any; type: 'captain' | 'vice'; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-2) var(--space-3)',
        background: type === 'captain'
          ? 'rgba(255, 214, 0, 0.15)'
          : 'rgba(192, 192, 192, 0.15)',
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${type === 'captain' ? 'var(--color-accent)' : '#C0C0C0'}`,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <Crown size={14} style={{
        color: type === 'captain' ? 'var(--color-accent)' : '#C0C0C0'
      }} />
      <span style={{
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-bold)',
        color: type === 'captain' ? 'var(--color-accent)' : '#C0C0C0',
      }}>
        {type === 'captain' ? 'Capitán' : 'Vice'}
      </span>
      {player && (
        <span style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-primary)',
          marginLeft: 'var(--space-1)',
        }}>
          {player.name.split(' ').pop()}
        </span>
      )}
    </div>
  );
}

function SquadStat({
  label,
  emoji,
  current,
  required
}: {
  label: string;
  emoji: string;
  current: number;
  required: number
}) {
  const isComplete = current >= required;
  const percentage = (current / required) * 100;

  return (
    <div style={{
      background: 'rgba(0,0,0,0.2)',
      border: `1px solid ${isComplete ? 'rgba(0,230,118,0.3)' : 'rgba(255,255,255,0.1)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3) var(--space-2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Barra de progreso de fondo */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: `${percentage}%`,
        background: isComplete
          ? 'linear-gradient(180deg, rgba(0,230,118,0.15) 0%, rgba(0,230,118,0.05) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        transition: 'height 0.3s ease',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: '20px',
          marginBottom: '4px',
        }}>
          {emoji}
        </div>
        <div style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-black)',
          color: isComplete ? 'var(--color-success)' : 'var(--text-primary)',
          marginBottom: '2px',
        }}>
          {current}/{required}
        </div>
        <div style={{
          fontSize: '9px',
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          fontWeight: 'var(--font-semibold)',
          letterSpacing: '0.5px',
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function PlayerListItem({ player, isCaptain, isVice, onClick }: {
  player: any;
  isCaptain: boolean;
  isVice: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) var(--space-4)',
        borderBottom: '1px solid var(--border-primary)',
        cursor: 'pointer',
        background: player.isStarter ? 'rgba(0, 200, 83, 0.05)' : 'transparent',
      }}
    >
      <div style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: isCaptain
          ? 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)'
          : isVice
            ? 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)'
            : 'var(--bg-tertiary)',
        border: `2px solid ${isCaptain ? '#FFD700' : isVice ? '#C0C0C0' : 'transparent'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
      }}>
        ⚽
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--text-primary)',
          }}>
            {player.name}
          </span>
          {isCaptain && <Badge variant="accent" size="sm">C</Badge>}
          {isVice && <Badge variant="neutral" size="sm">V</Badge>}
        </div>
        <div style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <Badge variant={player.isStarter ? 'primary' : 'neutral'} size="sm">
            {player.isStarter ? 'Titular' : 'Suplente'}
          </Badge>
          <Badge variant="neutral" size="sm">{getPositionLabel(player.position)}</Badge>
          <span style={{ color: 'var(--color-primary)' }}>{player.points} pts</span>
        </div>
      </div>

      <ChevronRight size={18} style={{ color: 'var(--text-tertiary)' }} />
    </div>
  );
}

function FormationSelector({
  currentFormation,
  onClose,
  onSelect
}: {
  currentFormation: string;
  onClose: () => void;
  onSelect: (formation: any) => void;
}) {
  const formations = ['4-3-3', '4-4-2', '4-2-3-1', '3-5-2', '3-4-3', '5-3-2', '5-4-1'] as const;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'flex-end',
    }}>
      <div style={{
        width: '100%',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        padding: 'var(--space-4)',
        maxHeight: '70vh',
        overflow: 'auto',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)',
        }}>
          <h3 style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
          }}>
            Seleccionar formación
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gap: 'var(--space-3)',
        }}>
          {formations.map((formation) => {
            const slots = formation.split('-').map(Number);
            return (
              <button
                key={formation}
                onClick={() => {
                  onSelect(formation);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4)',
                  background: formation === currentFormation
                    ? 'rgba(0, 200, 83, 0.15)'
                    : 'var(--bg-tertiary)',
                  border: `1px solid ${formation === currentFormation
                    ? 'var(--color-primary)'
                    : 'var(--border-primary)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  fontSize: 'var(--text-md)',
                  fontWeight: 'var(--font-bold)',
                  color: formation === currentFormation
                    ? 'var(--color-primary)'
                    : 'var(--text-primary)',
                }}>
                  {formation}
                </div>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-tertiary)',
                }}>
                  {slots[0]}-{slots[1]}-{slots[2]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PlayerModal({
  player,
  onClose,
  onRemove,
  onToggleStarter,
  onSetCaptain,
  onSetViceCaptain
}: {
  player: any;
  onClose: () => void;
  onRemove: (id: string) => void;
  onToggleStarter: (id: string) => void;
  onSetCaptain: (id: string) => void;
  onSetViceCaptain: (id: string) => void;
}) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'flex-end',
    }}>
      <div style={{
        width: '100%',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        padding: 'var(--space-4)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)',
        }}>
          <h3 style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
          }}>
            {player.name}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'var(--bg-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
          }}>
            ⚽
          </div>
          <div>
            <Badge variant="primary" size="md">{getPositionLabel(player.position)}</Badge>
            <div style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-black)',
              color: 'var(--color-primary)',
              marginTop: 'var(--space-1)',
            }}>
              {player.points} pts
            </div>
            <div style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-tertiary)',
            }}>
              {player.isStarter ? 'Titular' : 'Suplente'}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gap: 'var(--space-3)',
        }}>
          <ActionButton
            label={player.isStarter ? 'Mover al banquillo' : 'Hacer titular'}
            icon={player.isStarter ? <Minus size={18} /> : <Plus size={18} />}
            variant="primary"
            onClick={() => {
              onToggleStarter(player.id);
              onClose();
            }}
          />

          {!player.isCaptain && (
            <ActionButton
              label="Designar capitán"
              icon={<Crown size={18} />}
              variant="accent"
              onClick={() => {
                onSetCaptain(player.id);
                onClose();
              }}
            />
          )}

          {!player.isViceCaptain && !player.isCaptain && (
            <ActionButton
              label="Designar vicecapitán"
              icon={<Crown size={18} />}
              variant="secondary"
              onClick={() => {
                onSetViceCaptain(player.id);
                onClose();
              }}
            />
          )}

          <ActionButton
            label="Quitar del equipo"
            icon={<X size={18} />}
            variant="danger"
            onClick={() => {
              onRemove(player.id);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon,
  variant,
  onClick
}: {
  label: string;
  icon: React.ReactNode;
  variant: 'primary' | 'accent' | 'secondary' | 'danger';
  onClick: () => void;
}) {
  const colors = {
    primary: { bg: 'var(--color-primary)', text: 'var(--bg-primary)' },
    accent: { bg: 'var(--color-accent)', text: 'var(--bg-primary)' },
    secondary: { bg: 'var(--bg-tertiary)', text: 'var(--text-primary)' },
    danger: { bg: 'rgba(255, 61, 0, 0.2)', text: 'var(--color-error)' },
  };

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-4)',
        background: colors[variant].bg,
        border: 'none',
        borderRadius: 'var(--radius-lg)',
        color: colors[variant].text,
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-bold)',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      {icon}
      {label}
    </button>
  );
}
