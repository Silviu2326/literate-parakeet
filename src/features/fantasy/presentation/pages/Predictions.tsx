import { useState } from 'react';
import { Check, Clock, Minus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MobileLayout } from '../shared/MobileLayout';
import { PageHeader } from '../shared/PageHeader';
import { useFantasyStore } from '../../application/store/fantasyStore';
import { usePredictions } from '../../application/hooks/useFantasy';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeNationId: string;
  awayNationId: string;
  date: string;
  time: string;
  stadium: string;
  group: string;
}

// Mock matches con nation IDs para obtener las banderas
const MOCK_MATCHES: Match[] = [
  { id: 'm1', homeTeam: 'México', awayTeam: 'Sudáfrica', homeNationId: 'mex', awayNationId: 'rsa', date: '11 Jun', time: '18:00', stadium: 'Azteca', group: 'A' },
  { id: 'm2', homeTeam: 'Argentina', awayTeam: 'Argelia', homeNationId: 'arg', awayNationId: 'alg', date: '11 Jun', time: '21:00', stadium: 'Hard Rock', group: 'B' },
  { id: 'm3', homeTeam: 'España', awayTeam: 'Uruguay', homeNationId: 'esp', awayNationId: 'uru', date: '12 Jun', time: '15:00', stadium: 'Santiago Bernabéu', group: 'C' },
  { id: 'm4', homeTeam: 'Francia', awayTeam: 'Colombia', homeNationId: 'fra', awayNationId: 'col', date: '12 Jun', time: '18:00', stadium: 'Stade de France', group: 'D' },
  { id: 'm5', homeTeam: 'Brasil', awayTeam: 'Marruecos', homeNationId: 'bra', awayNationId: 'mar', date: '12 Jun', time: '21:00', stadium: 'Maracaná', group: 'E' },
  { id: 'm6', homeTeam: 'Inglaterra', awayTeam: 'Japón', homeNationId: 'eng', awayNationId: 'jpn', date: '13 Jun', time: '15:00', stadium: 'Wembley', group: 'F' },
  { id: 'm7', homeTeam: 'Alemania', awayTeam: 'Corea del Sur', homeNationId: 'ger', awayNationId: 'kor', date: '13 Jun', time: '18:00', stadium: 'Allianz Arena', group: 'G' },
  { id: 'm8', homeTeam: 'Portugal', awayTeam: 'USA', homeNationId: 'por', awayNationId: 'usa', date: '13 Jun', time: '21:00', stadium: 'Estádio da Luz', group: 'H' },
];

// Mapa de banderas
const FLAG_URLS: Record<string, string> = {
  mex: 'https://flagcdn.com/w80/mx.png',
  rsa: 'https://flagcdn.com/w80/za.png',
  arg: 'https://flagcdn.com/w80/ar.png',
  alg: 'https://flagcdn.com/w80/dz.png',
  esp: 'https://flagcdn.com/w80/es.png',
  uru: 'https://flagcdn.com/w80/uy.png',
  fra: 'https://flagcdn.com/w80/fr.png',
  col: 'https://flagcdn.com/w80/co.png',
  bra: 'https://flagcdn.com/w80/br.png',
  mar: 'https://flagcdn.com/w80/ma.png',
  eng: 'https://flagcdn.com/w80/gb-eng.png',
  jpn: 'https://flagcdn.com/w80/jp.png',
  ger: 'https://flagcdn.com/w80/de.png',
  kor: 'https://flagcdn.com/w80/kr.png',
  por: 'https://flagcdn.com/w80/pt.png',
  usa: 'https://flagcdn.com/w80/us.png',
};

export function PredictionsPage() {
  const { setView } = useFantasyStore();
  const { stats } = usePredictions();
  
  const [predictions, setPredictions] = useState<Record<string, { home: number; away: number }>>({});
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  
  const handleSavePrediction = (matchId: string, home: number, away: number) => {
    setPredictions(prev => ({
      ...prev,
      [matchId]: { home, away }
    }));
    setSelectedMatch(null);
  };
  
  const predictedCount = Object.keys(predictions).length;
  
  return (
    <MobileLayout>
      <div style={{ paddingBottom: 100 }}>
        {/* HEADER */}
        <PageHeader
          title="PREDICCIONES"
          subtitle={`${predictedCount}/${MOCK_MATCHES.length} partidos • +15 pts resultado exacto`}
          onBack={() => setView('dashboard')}
        />
        
        {/* CONTENIDO */}
        <div style={{ padding: 'var(--space-4)' }}>
          
          {/* STATS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-4)',
          }}>
            <StatCard
              value={predictedCount}
              label="Predichos"
              color="var(--color-primary)"
            />
            <StatCard
              value={stats.exact || 0}
              label="Exactos"
              color="var(--color-success)"
            />
            <StatCard
              value={stats.totalPoints || 0}
              label="Puntos"
              color="var(--color-accent)"
            />
          </div>
          
          {/* LISTA DE PARTIDOS */}
          <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
            {MOCK_MATCHES.map((match) => {
              const prediction = predictions[match.id];
              const hasPrediction = !!prediction;
              const homeFlag = FLAG_URLS[match.homeNationId];
              const awayFlag = FLAG_URLS[match.awayNationId];
              
              return (
                <Card
                  key={match.id}
                  variant={hasPrediction ? undefined : "interactive"}
                  onClick={() => !hasPrediction && setSelectedMatch(match)}
                  style={hasPrediction ? { border: '1px solid var(--color-primary)' } : undefined}
                >
                  <Card.Body>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      {/* EQUIPO LOCAL */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        flex: 1,
                      }}>
                        <img 
                          src={homeFlag} 
                          alt={match.homeTeam}
                          style={{
                            width: 48,
                            height: 32,
                            borderRadius: 'var(--radius-sm)',
                            objectFit: 'cover',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                        />
                        <span style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-bold)',
                          color: 'var(--text-primary)',
                          textAlign: 'center',
                        }}>
                          {match.homeTeam}
                        </span>
                        {hasPrediction && (
                          <span style={{
                            fontSize: 'var(--text-2xl)',
                            fontWeight: 'var(--font-black)',
                            color: 'var(--color-primary)',
                          }}>
                            {prediction.home}
                          </span>
                        )}
                      </div>
                      
                      {/* INFO PARTIDO */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '0 var(--space-4)',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-1)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-tertiary)',
                          marginBottom: 'var(--space-1)',
                        }}>
                          <Clock size={12} />
                          {match.date}
                        </div>
                        <div style={{
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--font-black)',
                          color: 'var(--text-primary)',
                        }}>
                          {match.time}
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: 'var(--text-tertiary)',
                          marginTop: '2px',
                        }}>
                          {match.stadium}
                        </div>
                        
                        {hasPrediction ? (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginTop: 'var(--space-2)',
                            padding: 'var(--space-1) var(--space-2)',
                            background: 'rgba(0, 200, 83, 0.15)',
                            borderRadius: 'var(--radius-md)',
                          }}>
                            <Check size={14} style={{ color: 'var(--color-primary)' }} />
                            <span style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--color-primary)',
                              fontWeight: 'var(--font-bold)',
                            }}>
                              Predicho
                            </span>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            style={{ marginTop: 'var(--space-2)' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMatch(match);
                            }}
                          >
                            Predecir
                          </Button>
                        )}
                      </div>
                      
                      {/* EQUIPO VISITANTE */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        flex: 1,
                      }}>
                        <img 
                          src={awayFlag} 
                          alt={match.awayTeam}
                          style={{
                            width: 48,
                            height: 32,
                            borderRadius: 'var(--radius-sm)',
                            objectFit: 'cover',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                        />
                        <span style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-bold)',
                          color: 'var(--text-primary)',
                          textAlign: 'center',
                        }}>
                          {match.awayTeam}
                        </span>
                        {hasPrediction && (
                          <span style={{
                            fontSize: 'var(--text-2xl)',
                            fontWeight: 'var(--font-black)',
                            color: 'var(--color-primary)',
                          }}>
                            {prediction.away}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* MODAL DE PREDICCIÓN */}
        {selectedMatch && (
          <PredictionModal
            match={selectedMatch}
            onClose={() => setSelectedMatch(null)}
            onSave={handleSavePrediction}
          />
        )}
      </div>
    </MobileLayout>
  );
}

function StatCard({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3)',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 'var(--text-2xl)',
        fontWeight: 'var(--font-black)',
        color: color,
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

function PredictionModal({ 
  match, 
  onClose, 
  onSave 
}: { 
  match: Match; 
  onClose: () => void;
  onSave: (matchId: string, home: number, away: number) => void;
}) {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  
  const homeFlag = FLAG_URLS[match.homeNationId];
  const awayFlag = FLAG_URLS[match.awayNationId];
  
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
      }}>
        <h2 style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-black)',
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: 'var(--space-6)',
        }}>
          Tu predicción
        </h2>
        
        {/* EQUIPOS */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-6)',
        }}>
          {/* LOCAL */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <img 
              src={homeFlag} 
              alt={match.homeTeam}
              style={{
                width: 64,
                height: 44,
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                boxShadow: 'var(--shadow-md)',
              }}
            />
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>
              {match.homeTeam}
            </span>
          </div>
          
          {/* GOLES */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}>
            {/* LOCAL INPUT */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <button
                onClick={() => setHomeScore(Math.max(0, homeScore + 1))}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xl)',
                  cursor: 'pointer',
                }}
              >
                +
              </button>
              <span style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-black)',
                color: 'var(--color-primary)',
                minWidth: 50,
                textAlign: 'center',
              }}>
                {homeScore}
              </span>
              <button
                onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xl)',
                  cursor: 'pointer',
                }}
              >
                <Minus size={20} />
              </button>
            </div>
            
            <span style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-black)',
              color: 'var(--text-tertiary)',
            }}>
              :
            </span>
            
            {/* VISITANTE INPUT */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <button
                onClick={() => setAwayScore(Math.max(0, awayScore + 1))}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xl)',
                  cursor: 'pointer',
                }}
              >
                +
              </button>
              <span style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-black)',
                color: 'var(--color-primary)',
                minWidth: 50,
                textAlign: 'center',
              }}>
                {awayScore}
              </span>
              <button
                onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xl)',
                  cursor: 'pointer',
                }}
              >
                <Minus size={20} />
              </button>
            </div>
          </div>
          
          {/* VISITANTE */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <img 
              src={awayFlag} 
              alt={match.awayTeam}
              style={{
                width: 64,
                height: 44,
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                boxShadow: 'var(--shadow-md)',
              }}
            />
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>
              {match.awayTeam}
            </span>
          </div>
        </div>
        
        {/* PUNTOS POSIBLES */}
        <div style={{
          background: 'rgba(0, 200, 83, 0.1)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3)',
          marginBottom: 'var(--space-6)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            marginBottom: 'var(--space-1)',
          }}>
            Puntos posibles
          </div>
          <div style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-primary)',
            fontWeight: 'var(--font-bold)',
          }}>
            Resultado exacto: +15 pts
          </div>
          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
          }}>
            Solo ganador: +5 pts
          </div>
        </div>
        
        {/* BOTONES */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
        }}>
          <Button
            variant="secondary"
            fullWidth
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            fullWidth
            onClick={() => onSave(match.id, homeScore, awayScore)}
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
