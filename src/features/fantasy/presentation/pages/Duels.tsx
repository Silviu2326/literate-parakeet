import { useState } from 'react';
import { ArrowLeft, Swords, Plus, Trophy, ChevronRight, Target } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MobileLayout } from '../shared/MobileLayout';
import { useFantasyStore } from '../../application/store/fantasyStore';
import { useRanking } from '../../application/hooks/useFantasy';

interface Duel {
  id: string;
  opponent: {
    id: string;
    name: string;
    avatar?: string;
  };
  pointsAtStake: number;
  status: 'pending' | 'active' | 'finished';
  myScore: number;
  opponentScore: number;
  matchday: number;
  winnerId?: string;
  createdAt: string;
}

const MOCK_DUELS: Duel[] = [
  {
    id: 'd1',
    opponent: { id: 'u2', name: 'LauraFútbol' },
    pointsAtStake: 20,
    status: 'active',
    myScore: 45,
    opponentScore: 38,
    matchday: 1,
    createdAt: '2026-06-10',
  },
  {
    id: 'd2',
    opponent: { id: 'u5', name: 'MiguelStats' },
    pointsAtStake: 15,
    status: 'pending',
    myScore: 0,
    opponentScore: 0,
    matchday: 2,
    createdAt: '2026-06-09',
  },
  {
    id: 'd3',
    opponent: { id: 'u3', name: 'RodrigoTáctico' },
    pointsAtStake: 25,
    status: 'finished',
    myScore: 52,
    opponentScore: 41,
    matchday: 1,
    winnerId: 'me',
    createdAt: '2026-06-08',
  },
];

export function DuelsPage() {
  const { setView } = useFantasyStore();
  const { myStanding } = useRanking();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const activeDuels = MOCK_DUELS.filter(d => d.status !== 'finished');
  const finishedDuels = MOCK_DUELS.filter(d => d.status === 'finished');
  
  const duels = activeTab === 'active' ? activeDuels : finishedDuels;
  
  return (
    <MobileLayout>
      <div style={{ paddingBottom: 100 }}>
        {/* HEADER */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-primary)',
          padding: 'var(--space-4)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <button
              onClick={() => setView('dashboard')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={24} />
            </button>
            
            <div style={{ textAlign: 'center' }}>
              <h1 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>
                Duelos
              </h1>
              <p style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
              }}>
                1 vs 1 con amigos
              </p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--color-primary)',
                border: 'none',
                color: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Plus size={20} />
            </button>
          </div>
          
          {/* TABS */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-4)',
            borderBottom: '1px solid var(--border-primary)',
          }}>
            <TabButton
              label="Activos"
              count={activeDuels.length}
              isActive={activeTab === 'active'}
              onClick={() => setActiveTab('active')}
            />
            <TabButton
              label="Historial"
              count={finishedDuels.length}
              isActive={activeTab === 'history'}
              onClick={() => setActiveTab('history')}
            />
          </div>
        </div>
        
        {/* CONTENIDO */}
        <div style={{ padding: 'var(--space-4)' }}>
          {/* STATS RÁPIDAS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-4)',
          }}>
            <StatCard
              value={activeDuels.length}
              label="Activos"
              icon={<Swords size={16} />}
              color="var(--color-primary)"
            />
            <StatCard
              value={finishedDuels.filter(d => d.winnerId === 'me').length}
              label="Ganados"
              icon={<Trophy size={16} />}
              color="var(--color-accent)"
            />
            <StatCard
              value={myStanding?.totalPoints || 0}
              label="Tus pts"
              icon={<Target size={16} />}
              color="var(--color-success)"
            />
          </div>
          
          {/* LISTA DE DUELOS */}
          <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
            {duels.map((duel) => (
              <DuelCard key={duel.id} duel={duel} />
            ))}
          </div>
          
          {duels.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: 'var(--space-12)',
              color: 'var(--text-tertiary)',
            }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>⚔️</div>
              <div style={{
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-2)',
              }}>
                {activeTab === 'active' ? 'No tienes duelos activos' : 'No hay historial'}
              </div>
              <div style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
                {activeTab === 'active' 
                  ? 'Crea un duelo y reta a tus amigos' 
                  : 'Los duelos terminados aparecerán aquí'}
              </div>
              {activeTab === 'active' && (
                <Button onClick={() => setShowCreateModal(true)}>
                  Crear duelo
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* MODAL CREAR DUELO */}
        {showCreateModal && (
          <CreateDuelModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </MobileLayout>
  );
}

function TabButton({ label, count, isActive, onClick }: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 'var(--space-3) 0',
        background: 'transparent',
        border: 'none',
        borderBottom: `2px solid ${isActive ? 'var(--color-primary)' : 'transparent'}`,
        color: isActive ? 'var(--color-primary)' : 'var(--text-tertiary)',
        fontSize: 'var(--text-sm)',
        fontWeight: isActive ? 'var(--font-bold)' : 'var(--font-medium)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
      }}
    >
      {label}
      <span style={{
        padding: '2px 6px',
        background: isActive ? 'var(--color-primary)' : 'var(--bg-elevated)',
        color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
        borderRadius: 'var(--radius-full)',
        fontSize: '10px',
      }}>
        {count}
      </span>
    </button>
  );
}

function StatCard({ value, label, icon, color }: {
  value: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3)',
      textAlign: 'center',
    }}>
      <div style={{
        color: color,
        marginBottom: 'var(--space-1)',
        display: 'flex',
        justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: 'var(--text-xl)',
        fontWeight: 'var(--font-black)',
        color: 'var(--text-primary)',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '10px',
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  );
}

function DuelCard({ duel }: { duel: Duel }) {
  const isWinner = duel.winnerId === 'me';
  const isLoser = duel.winnerId && duel.winnerId !== 'me';
  
  return (
    <Card>
      <Card.Body>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
        }}>
          {/* AVATAR OPONENTE */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--bg-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}>
            👤
          </div>
          
          {/* INFO */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
              color: 'var(--text-primary)',
              marginBottom: '2px',
            }}>
              vs {duel.opponent.name}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <Badge 
                variant={duel.status === 'active' ? 'primary' : duel.status === 'pending' ? 'warning' : 'neutral'}
                size="sm"
              >
                {duel.status === 'active' ? 'En juego' : duel.status === 'pending' ? 'Pendiente' : 'Terminado'}
              </Badge>
              <span style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
              }}>
                {duel.pointsAtStake} pts
              </span>
            </div>
          </div>
          
          {/* RESULTADO */}
          {duel.status === 'finished' ? (
            <div style={{
              textAlign: 'right',
            }}>
              <div style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-black)',
                color: isWinner 
                  ? 'var(--color-success)' 
                  : isLoser 
                    ? 'var(--color-error)' 
                    : 'var(--text-primary)',
              }}>
                {(isWinner ? '+' : isLoser ? '-' : '') + duel.pointsAtStake}
              </div>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
              }}>
                {duel.myScore} - {duel.opponentScore}
              </div>
            </div>
          ) : duel.status === 'active' ? (
            <div style={{
              textAlign: 'right',
            }}>
              <div style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-black)',
                color: duel.myScore > duel.opponentScore 
                  ? 'var(--color-success)' 
                  : duel.myScore < duel.opponentScore 
                    ? 'var(--color-error)' 
                    : 'var(--text-primary)',
              }}>
                {duel.myScore}
              </div>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
              }}>
                vs {duel.opponentScore}
              </div>
            </div>
          ) : (
            <ChevronRight size={20} style={{ color: 'var(--text-tertiary)' }} />
          )}
        </div>
        
        {/* BARRA DE PROGRESO PARA ACTIVOS */}
        {duel.status === 'active' && (
          <div style={{
            marginTop: 'var(--space-3)',
          }}>
            <div style={{
              height: 6,
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              display: 'flex',
            }}>
              <div style={{
                width: `${(duel.myScore / (duel.myScore + duel.opponentScore || 1)) * 100}%`,
                background: 'var(--color-primary)',
              }} />
              <div style={{
                width: `${(duel.opponentScore / (duel.myScore + duel.opponentScore || 1)) * 100}%`,
                background: 'var(--color-error)',
              }} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 'var(--space-1)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
            }}>
              <span>Tú</span>
              <span>{duel.opponent.name}</span>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

function CreateDuelModal({ onClose }: { onClose: () => void }) {
  const { standings } = useRanking();
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);
  const [points, setPoints] = useState(10);
  
  const opponents = standings.filter(s => !s.isMe);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      zIndex: 300,
      display: 'flex',
      alignItems: 'flex-end',
    }}>
      <div style={{
        width: '100%',
        maxHeight: '80vh',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        padding: 'var(--space-4)',
        overflow: 'auto',
      }}>
        {/* HEADER */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)',
        }}>
          <h2 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
          }}>
            Nuevo duelo
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
        
        {/* SELECCIONAR OPONENTE */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <label style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-2)',
            display: 'block',
          }}>
            Selecciona un oponente
          </label>
          <div style={{
            maxHeight: 200,
            overflow: 'auto',
            display: 'grid',
            gap: 'var(--space-2)',
          }}>
            {opponents.map((opponent) => (
              <button
                key={opponent.userId}
                onClick={() => setSelectedOpponent(opponent.userId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  background: selectedOpponent === opponent.userId 
                    ? 'rgba(0, 200, 83, 0.15)' 
                    : 'var(--bg-tertiary)',
                  border: `1px solid ${selectedOpponent === opponent.userId 
                    ? 'var(--color-primary)' 
                    : 'var(--border-primary)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'var(--bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                }}>
                  👤
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--text-primary)',
                  }}>
                    {opponent.userName}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                  }}>
                    #{opponent.position} • {opponent.totalPoints} pts
                  </div>
                </div>
                {selectedOpponent === opponent.userId && (
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* SELECCIONAR PUNTOS */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-2)',
            display: 'block',
          }}>
            Puntos a apostar: <span style={{ color: 'var(--color-primary)' }}>{points}</span>
          </label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            style={{
              width: '100%',
              height: 8,
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-elevated)',
              outline: 'none',
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'var(--space-1)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
          }}>
            <span>5 pts</span>
            <span>50 pts</span>
          </div>
        </div>
        
        {/* BOTÓN CREAR */}
        <Button
          fullWidth
          size="lg"
          disabled={!selectedOpponent}
          onClick={() => {
            onClose();
          }}
        >
          Crear duelo
        </Button>
      </div>
    </div>
  );
}
