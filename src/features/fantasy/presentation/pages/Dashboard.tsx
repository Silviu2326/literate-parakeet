import { useEffect } from 'react';
import { Swords, ChevronRight, Flame, Trophy, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MobileLayout } from '../shared/MobileLayout';
import { PageHeader } from '../shared/PageHeader';
import { useFantasy, useSquad, useRanking } from '../../application/hooks/useFantasy';
import { MOCK_NATIONS, MOCK_PLAYERS, MOCK_MATCHDAYS, MOCK_STANDINGS } from '../../infrastructure/repositories/mockData';

export function FantasyDashboard() {
  const { loadNations, loadPlayers, loadMatchdays, loadStandings, setView, currentMatchday } = useFantasy();
  const { stats: squadStats } = useSquad();
  const { myStanding, standings } = useRanking();
  
  useEffect(() => {
    loadNations(MOCK_NATIONS);
    loadPlayers(MOCK_PLAYERS);
    loadMatchdays(MOCK_MATCHDAYS);
    loadStandings(MOCK_STANDINGS);
  }, []);
  
  const timeLeft = { hours: 48, minutes: 32, seconds: 15 };
  
  return (
    <MobileLayout>
      <div style={{ paddingBottom: 100 }}>
        {/* HEADER */}
        <PageHeader
          title="FANTASY"
          onBack={() => window.location.href = '/'}
        />
        
        {/* INFO JORNADA Y CONTADOR */}
        <div style={{
          background: 'var(--bg-secondary)',
          padding: 'var(--space-4)',
          borderBottom: '1px solid var(--border-primary)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-4)',
          }}>
            <Badge variant="primary" size="md">INICIO</Badge>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>
              JORNADA {currentMatchday}
            </span>
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
            }}>
              FASE DE GRUPOS
            </span>
          </div>
          
          {/* CONTADOR */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
          }}>
            <TimeUnit value={timeLeft.hours} label="HRS" />
            <span style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-black)',
              color: 'var(--text-tertiary)',
            }}>:</span>
            <TimeUnit value={timeLeft.minutes} label="MIN" />
            <span style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-black)',
              color: 'var(--text-tertiary)',
            }}>:</span>
            <TimeUnit value={timeLeft.seconds} label="SEG" />
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: 'var(--space-2)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-error)',
            fontWeight: 'var(--font-bold)',
          }}>
            ⏰ CIERRE DE JORNADA
          </div>
        </div>
        
        {/* CONTENIDO */}
        <div style={{ padding: 'var(--space-4)' }}>
          
          {/* MI POSICIÓN */}
          {myStanding && (
            <Card 
              variant="elevated" 
              style={{ 
                marginBottom: 'var(--space-4)',
                border: '2px solid var(--color-primary)',
              }}
              onClick={() => setView('user-detail')}
            >
              <Card.Body>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--bg-primary)',
                  }}>
                    #{myStanding.position}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                      marginBottom: '2px',
                    }}>
                      Tu posición
                    </div>
                    <div style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-bold)',
                      color: 'var(--text-primary)',
                    }}>
                      {myStanding.userName}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      marginTop: 'var(--space-1)',
                    }}>
                      <span style={{
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-black)',
                        color: 'var(--color-primary)',
                      }}>
                        {myStanding.totalPoints} pts
                      </span>
                      {myStanding.streak > 0 && (
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-accent)',
                        }}>
                          <Flame size={12} />
                          {myStanding.streak}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={24} style={{ color: 'var(--color-primary)' }} />
                </div>
              </Card.Body>
            </Card>
          )}
          
          {/* CLASIFICACIÓN */}
          <Card style={{ marginBottom: 'var(--space-4)' }}>
            <Card.Header>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}>
                <Trophy size={20} style={{ color: 'var(--color-accent)' }} />
                <span style={{
                  fontSize: 'var(--text-md)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                }}>
                  Clasificación
                </span>
              </div>
              <span style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
              }}>
                {standings.length} participantes
              </span>
            </Card.Header>
            <Card.Body padding="none">
              <div style={{ maxHeight: 400, overflow: 'auto' }}>
                {standings.map((standing, index) => (
                  <div
                    key={standing.userId}
                    onClick={() => setView('user-detail')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3) var(--space-4)',
                      borderBottom: index < standings.length - 1 ? '1px solid var(--border-primary)' : 'none',
                      background: standing.isMe ? 'rgba(0, 200, 83, 0.05)' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 'var(--radius-md)',
                      background: standing.position <= 3 
                        ? 'var(--color-accent)' 
                        : 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-bold)',
                      color: standing.position <= 3 ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    }}>
                      {standing.position}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-semibold)',
                        color: standing.isMe ? 'var(--color-primary)' : 'var(--text-primary)',
                      }}>
                        {standing.userName} {standing.isMe && '(Tú)'}
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: 'var(--text-md)',
                        fontWeight: 'var(--font-black)',
                        color: 'var(--text-primary)',
                      }}>
                        {standing.totalPoints}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 2,
                        fontSize: '10px',
                        color: standing.previousPosition > standing.position 
                          ? 'var(--color-success)'
                          : standing.previousPosition < standing.position
                            ? 'var(--color-error)'
                            : 'var(--text-tertiary)',
                      }}>
                        {standing.previousPosition > standing.position ? (
                          <><TrendingUp size={10} /> +{standing.previousPosition - standing.position}</>
                        ) : standing.previousPosition < standing.position ? (
                          <><TrendingDown size={10} /> {standing.previousPosition - standing.position}</>
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          
          {/* DUELOS */}
          <Card 
            variant="interactive"
            onClick={() => setView('duels')}
            style={{ marginBottom: 'var(--space-4)' }}
          >
            <Card.Body>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Swords size={28} color="white" />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                    marginBottom: '2px',
                  }}>
                    Duelos 1 vs 1
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-tertiary)',
                  }}>
                    Reta a tus amigos y apuesta puntos
                  </div>
                </div>
                
                <ChevronRight size={24} style={{ color: 'var(--color-primary)' }} />
              </div>
            </Card.Body>
          </Card>
          
          {/* MI EQUIPO */}
          <Card 
            variant="interactive"
            onClick={() => setView('squad')}
          >
            <Card.Body>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-3)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}>
                  <Target size={20} style={{ color: 'var(--color-primary)' }} />
                  <span style={{
                    fontSize: 'var(--text-md)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                  }}>
                    Mi Equipo
                  </span>
                </div>
                <Badge variant={squadStats.isComplete ? 'success' : 'primary'}>
                  {squadStats.total}/15
                </Badge>
              </div>
              
              <div style={{
                height: 8,
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(squadStats.total / 15) * 100}%`,
                  height: '100%',
                  background: squadStats.isComplete ? 'var(--color-success)' : 'var(--color-primary)',
                  borderRadius: 'var(--radius-full)',
                }} />
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'var(--space-2)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
              }}>
                <span>{squadStats.starters} titulares</span>
                <span>{squadStats.bench} suplentes</span>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{
      background: 'var(--bg-tertiary)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-3) var(--space-4)',
      minWidth: 60,
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 'var(--text-2xl)',
        fontWeight: 'var(--font-black)',
        color: 'var(--text-primary)',
        lineHeight: 1,
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{
        fontSize: '10px',
        color: 'var(--text-tertiary)',
        fontWeight: 'var(--font-bold)',
        marginTop: '4px',
      }}>
        {label}
      </div>
    </div>
  );
}
