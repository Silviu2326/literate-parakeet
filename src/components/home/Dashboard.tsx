import { useState, useEffect } from 'react';
import { 
  Settings, 
  ChevronRight,
  Zap,
  Trophy,
  BarChart3,
  Users,
  MapPin,
  Gamepad2,
  Home,
  FileText,
  Tv,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface DashboardProps {
  points: number;
  streak: number;
  ranking: number;
  precision: number;
  onNavigate: (view: string) => void;
}

export const Dashboard = ({ points, streak, ranking, precision, onNavigate }: DashboardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNav, setActiveNav] = useState('partidos');

  const slides = [
    {
      title: 'Campo animado · Minuto a minuto · 22 jugadores',
      badge: 'MATCH CENTER EN VIVO',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=400&fit=crop',
      buttonText: 'Probar →',
      buttonColor: 'var(--color-primary)',
    },
    {
      title: 'Arma tu Selección Ideal',
      badge: '⚡ FANTASY MUNDIAL',
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=400&fit=crop',
      buttonText: 'JUGAR →',
      buttonColor: 'var(--color-primary)',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'apuestas', icon: <FileText size={20} />, label: 'Mis Apuestas' },
    { id: 'match', icon: <Tv size={20} />, label: 'Match' },
    { id: 'partidos', icon: <Zap size={20} />, label: 'Partidos' },
    { id: 'grupos', icon: <BarChart3 size={20} />, label: 'Grupos' },
    { id: 'selecciones', icon: <Users size={20} />, label: 'Selecciones' },
    { id: 'sedes', icon: <MapPin size={20} />, label: 'Sedes' },
    { id: 'mododt', icon: <Gamepad2 size={20} />, label: 'Modo DT' },
  ];

  const upcomingMatches = [
    {
      id: 1,
      group: 'Grupo A',
      stadium: 'Estadio Azteca',
      homeTeam: { name: 'México', flag: 'mx', score: 1 },
      awayTeam: { name: 'Sudáfrica', flag: 'za', score: 0 },
      status: 'live',
      time: "34'",
    },
    {
      id: 2,
      group: 'Grupo A',
      stadium: 'Estadio Akron',
      homeTeam: { name: 'Corea del Sur', flag: 'kr' },
      awayTeam: { name: 'Por definir (A)', flag: 'xx' },
      status: 'upcoming',
      date: '11 Jun',
      time: '17:00',
      odds: { home: 50, draw: 28, away: 22 },
    },
    {
      id: 3,
      group: 'Grupo C',
      stadium: 'AT&T Stadium',
      homeTeam: { name: 'Brasil', flag: 'br' },
      awayTeam: { name: 'Marruecos', flag: 'ma' },
      status: 'upcoming',
      date: '12 Jun',
      time: '14:00',
      odds: { home: 55, draw: 26, away: 19 },
    },
    {
      id: 4,
      group: 'Grupo D',
      stadium: 'SoFi Stadium',
      homeTeam: { name: 'EE.UU.', flag: 'us' },
      awayTeam: { name: 'Paraguay', flag: 'py' },
      status: 'upcoming',
      date: '12 Jun',
      time: '19:00',
      odds: { home: 58, draw: 24, away: 18 },
    },
    {
      id: 5,
      group: 'Grupo B',
      stadium: 'BMO Field',
      homeTeam: { name: 'Canadá', flag: 'ca' },
      awayTeam: { name: 'Por definir (B)', flag: 'xx' },
      status: 'upcoming',
      date: '12 Jun',
      time: '13:00',
      odds: { home: 52, draw: 28, away: 20 },
    },
    {
      id: 6,
      group: 'Grupo H',
      stadium: 'Hard Rock Stadium',
      homeTeam: { name: 'España', flag: 'es' },
      awayTeam: { name: 'Cabo Verde', flag: 'cv' },
      status: 'upcoming',
      date: '13 Jun',
      time: '14:00',
      odds: { home: 85, draw: 10, away: 5 },
    },
  ];

  const news = [
    {
      id: 1,
      category: 'OFICIAL',
      time: '2h',
      title: 'Mbappé y Haaland: el duelo estelar del Grupo I',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&h=80&fit=crop',
      categoryColor: 'var(--color-primary)',
    },
    {
      id: 2,
      category: 'ANÁLISIS',
      time: '4h',
      title: 'Grupo de la muerte: ¿C, H o L?',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&h=80&fit=crop',
      categoryColor: 'var(--color-accent)',
    },
    {
      id: 3,
      category: 'SELECCIONES',
      time: '6h',
      title: 'México preparado para su 3er Mundial como sede',
      image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=120&h=80&fit=crop',
      categoryColor: 'var(--color-success)',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      paddingBottom: 90,
    }}>
      {/* HEADER - CENTRADO */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--border-primary)',
        position: 'relative',
      }}>
        {/* Settings a la izquierda */}
        <button 
          style={{
            position: 'absolute',
            left: 'var(--space-4)',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
        >
          <Settings size={18} />
        </button>

        {/* Logo centrado */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <div style={{
            width: 32,
            height: 32,
            background: 'var(--color-primary)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}>
            🏆
          </div>
          <span style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-black)',
            color: 'var(--text-primary)',
          }}>
            QuinielaMundial
          </span>
        </div>
        
        {/* Puntos a la derecha */}
        <div style={{
          position: 'absolute',
          right: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          {/* Bandera ES */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-primary)',
          }}>
            <span style={{ fontSize: '14px' }}>🇪🇸</span>
            <span style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>ES</span>
          </div>
          
          {/* Puntos */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-primary)',
          }}>
            <Zap size={14} style={{ color: 'var(--color-primary)' }} />
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-black)',
              color: 'var(--color-primary)',
            }}>
              {points}
            </span>
          </div>
        </div>
      </div>

      {/* NAVEGACIÓN HORIZONTAL */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--space-3) 0',
        borderBottom: '1px solid var(--border-primary)',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          padding: '0 var(--space-4)',
          minWidth: 'max-content',
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: 'var(--space-2) var(--space-3)',
                background: activeNav === item.id 
                  ? 'var(--bg-elevated)' 
                  : 'transparent',
                border: activeNav === item.id 
                  ? '1px solid var(--border-secondary)' 
                  : '1px solid transparent',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                minWidth: '64px',
              }}
            >
              <div style={{
                color: activeNav === item.id ? 'var(--color-primary)' : 'var(--text-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: activeNav === item.id ? 'var(--font-semibold)' : 'var(--font-medium)',
                color: activeNav === item.id ? 'var(--color-primary)' : 'var(--text-tertiary)',
                whiteSpace: 'nowrap',
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ padding: 'var(--space-4)' }}>
        
        {/* CARRUSEL DESTACADO CON IMÁGENES */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          marginBottom: 'var(--space-4)',
          minHeight: '160px',
        }}>
          {/* Imagen de fondo */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          
          {/* Overlay gradiente */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
          }} />
          
          {/* Contenido */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            padding: 'var(--space-5)',
          }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 'var(--font-black)',
              color: 'var(--color-primary)',
              letterSpacing: '1px',
              marginBottom: 'var(--space-2)',
            }}>
              {slides[currentSlide].badge}
            </div>
            <h2 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-bold)',
              color: '#ffffff',
              lineHeight: 1.3,
              maxWidth: '70%',
              marginBottom: 'var(--space-4)',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}>
              {slides[currentSlide].title}
            </h2>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <button
                onClick={() => onNavigate(currentSlide === 0 ? 'match' : 'fantasy')}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: slides[currentSlide].buttonColor,
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--bg-primary)',
                  fontWeight: 'var(--font-bold)',
                  fontSize: 'var(--text-sm)',
                  cursor: 'pointer',
                }}
              >
                {slides[currentSlide].buttonText}
              </button>
              
              {/* Indicadores */}
              <div style={{
                display: 'flex',
                gap: '6px',
              }}>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      width: idx === currentSlide ? 20 : 6,
                      height: 6,
                      borderRadius: '3px',
                      background: idx === currentSlide ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PARTIDO EN VIVO */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
        }}>
          {/* Header del partido */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-3)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{
                width: 8,
                height: 8,
                background: 'var(--color-error)',
                borderRadius: '50%',
                animation: 'pulse 1.5s infinite',
              }} />
              <span style={{
                fontSize: '11px',
                fontWeight: 'var(--font-black)',
                color: 'var(--color-error)',
              }}>
                EN VIVO
              </span>
            </div>
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
            }}>
              Toca para Match Center →
            </span>
          </div>
          
          {/* Score */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-3)',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <img 
                src="https://flagcdn.com/w80/mx.png" 
                alt="México"
                style={{
                  width: 48,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover',
                  boxShadow: 'var(--shadow-md)',
                }}
              />
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>
                México
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <span style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-black)',
                color: 'var(--text-primary)',
              }}>
                1
              </span>
              <span style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--text-tertiary)',
              }}>
                -
              </span>
              <span style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-black)',
                color: 'var(--text-primary)',
              }}>
                0
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <img 
                src="https://flagcdn.com/w80/za.png" 
                alt="Sudáfrica"
                style={{
                  width: 48,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover',
                  boxShadow: 'var(--shadow-md)',
                }}
              />
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>
                Sudáfrica
              </span>
            </div>
          </div>
          
          {/* Predicción ganando */}
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-2)',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-3)',
          }}>
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-success)',
              fontWeight: 'var(--font-semibold)',
            }}>
              Tu predicción va ganando ✓
            </span>
          </div>
          
          {/* Botones de acción */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-2)',
          }}>
            <ActionButton icon="📊" label="Match" />
            <ActionButton icon="🎮" label="Modo DT" />
            <ActionButton icon="⚡" label="Micro" />
            <ActionButton icon="🎉" label="Party" />
          </div>
        </div>

        {/* ESPACIO PUBLICITARIO */}
        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)',
        }}>
          <span style={{ fontSize: 'var(--text-md)' }}>📢</span>
          <span style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-tertiary)',
            fontWeight: 'var(--font-medium)',
          }}>
            ESPACIO PUBLICITARIO
          </span>
          <span style={{
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            marginLeft: 'auto',
          }}>
            AD
          </span>
        </div>

        {/* MIS APUESTAS */}
        <div
          onClick={() => onNavigate('bets')}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}>
            <div style={{
              width: 44,
              height: 44,
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}>
              📋
            </div>
            <div>
              <div style={{
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>
                Mis Apuestas
              </div>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
              }}>
                2 activas · 1 ganada
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <span style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-black)',
              color: 'var(--color-primary)',
            }}>
              3
            </span>
            <ChevronRight size={20} style={{ color: 'var(--text-tertiary)' }} />
          </div>
        </div>

        {/* MODO ACTUAL */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-3) var(--space-4)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <span style={{ fontSize: 'var(--text-md)' }}>🎮</span>
            <span style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
            }}>
              Modo actual:
            </span>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-primary)',
            }}>
              GRATIS
            </span>
          </div>
          <button style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--color-primary)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}>
            Cambiar →
          </button>
        </div>

        {/* STATS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
        }}>
          <StatCard value={points} label="PUNTOS" />
          <StatCard value={`#${ranking}`} label="RANKING" />
          <StatCard value={streak} label="RACHA" icon="🔥" />
          <StatCard value={`${precision}%`} label="PRECISIÓN" />
        </div>

        {/* PRÓXIMOS PARTIDOS */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-3)',
          }}>
            <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-black)',
              color: 'var(--text-primary)',
              letterSpacing: '0.5px',
            }}>
              PRÓXIMOS PARTIDOS
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}>
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-3)',
                }}
              >
                {/* Header del partido */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-2)',
                }}>
                  <span style={{
                    fontSize: '10px',
                    color: 'var(--text-tertiary)',
                  }}>
                    {match.group} · {match.stadium}
                  </span>
                  {match.status === 'live' ? (
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 'var(--font-black)',
                      color: 'var(--color-error)',
                    }}>
                      ● EN VIVO {match.time}
                    </span>
                  ) : (
                    <span style={{
                      fontSize: '10px',
                      color: 'var(--text-secondary)',
                    }}>
                      {match.date} · {match.time}
                    </span>
                  )}
                </div>
                
                {/* Equipos y cuotas */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  {/* Local */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-1)',
                    flex: 1,
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                    }}>
                      <img 
                        src={`https://flagcdn.com/w40/${match.homeTeam.flag}.png`}
                        alt={match.homeTeam.name}
                        style={{
                          width: 24,
                          height: 16,
                          borderRadius: 'var(--radius-sm)',
                          objectFit: 'cover',
                        }}
                      />
                      <span style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-semibold)',
                        color: 'var(--text-primary)',
                      }}>
                        {match.homeTeam.name}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                    }}>
                      <img 
                        src={`https://flagcdn.com/w40/${match.awayTeam.flag}.png`}
                        alt={match.awayTeam.name}
                        style={{
                          width: 24,
                          height: 16,
                          borderRadius: 'var(--radius-sm)',
                          objectFit: 'cover',
                        }}
                      />
                      <span style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-semibold)',
                        color: 'var(--text-primary)',
                      }}>
                        {match.awayTeam.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Score o Cuotas */}
                  {match.status === 'live' ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: 'var(--space-1)',
                    }}>
                      <span style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-black)',
                        color: 'var(--text-primary)',
                      }}>
                        {match.homeTeam.score}
                      </span>
                      <span style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-black)',
                        color: 'var(--text-primary)',
                      }}>
                        {match.awayTeam.score}
                      </span>
                    </div>
                  ) : match.odds ? (
                    <div style={{
                      display: 'flex',
                      gap: 'var(--space-1)',
                    }}>
                      <OddButton label="1" value={match.odds.home} />
                      <OddButton label="X" value={match.odds.draw} />
                      <OddButton label="2" value={match.odds.away} />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ESPACIO PUBLICITARIO 2 */}
        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)',
        }}>
          <span style={{ fontSize: 'var(--text-md)' }}>📢</span>
          <span style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-tertiary)',
            fontWeight: 'var(--font-medium)',
          }}>
            ESPACIO PUBLICITARIO
          </span>
          <span style={{
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            marginLeft: 'auto',
          }}>
            AD
          </span>
        </div>

        {/* NOTICIAS */}
        <div>
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
              <FileText size={18} style={{ color: 'var(--color-primary)' }} />
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-black)',
                color: 'var(--text-primary)',
                letterSpacing: '0.5px',
              }}>
                NOTICIAS
              </span>
            </div>
            <button style={{
              padding: 'var(--space-1) var(--space-3)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-semibold)',
              color: 'var(--color-primary)',
              cursor: 'pointer',
            }}>
              Ver más
            </button>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}>
            {news.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: 'var(--space-3)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-3)',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: 80,
                    height: 60,
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                  }}
                />
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    marginBottom: '4px',
                  }}>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 'var(--font-black)',
                      color: item.categoryColor,
                    }}>
                      {item.category}
                    </span>
                    <span style={{
                      fontSize: '9px',
                      color: 'var(--text-tertiary)',
                    }}>
                      · {item.time}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.4,
                    margin: 0,
                  }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAVEGACIÓN INFERIOR */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 100,
      }}>
        <BottomNavItem icon={<Home size={22} />} label="Inicio" isActive onClick={() => {}} />
        <BottomNavItem icon={<FileText size={22} />} label="Mis Apuestas" onClick={() => onNavigate('bets')} />
        <BottomNavItem icon={<Tv size={22} />} label="Match" onClick={() => onNavigate('match')} />
        <BottomNavItem icon={<Trophy size={22} />} label="Ranking" onClick={() => onNavigate('ranking')} />
        <BottomNavItem icon={<MessageSquare size={22} />} label="IA" onClick={() => onNavigate('ai')} />
      </nav>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

// Componentes auxiliares

function ActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      padding: 'var(--space-2) var(--space-1)',
      background: 'var(--bg-tertiary)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
    }}>
      <span style={{ fontSize: '16px' }}>{icon}</span>
      <span style={{
        fontSize: '10px',
        fontWeight: 'var(--font-semibold)',
        color: 'var(--text-secondary)',
      }}>
        {label}
      </span>
    </button>
  );
}

function StatCard({ 
  value, 
  label,
  icon,
}: { 
  value: string | number; 
  label: string;
  icon?: string;
}) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3) var(--space-2)',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-black)',
        color: 'var(--color-primary)',
        marginBottom: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
      }}>
        {value}
        {icon && <span style={{ fontSize: '12px' }}>{icon}</span>}
      </div>
      <div style={{
        fontSize: '9px',
        fontWeight: 'var(--font-black)',
        color: 'var(--text-tertiary)',
        letterSpacing: '0.5px',
      }}>
        {label}
      </div>
    </div>
  );
}

function OddButton({ label, value }: { label: string; value: number }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 'var(--space-1) var(--space-2)',
      background: 'var(--bg-tertiary)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-md)',
      minWidth: 32,
    }}>
      <span style={{
        fontSize: '9px',
        fontWeight: 'var(--font-black)',
        color: 'var(--text-tertiary)',
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-bold)',
        color: 'var(--color-primary)',
      }}>
        {value}
      </span>
    </div>
  );
}

function BottomNavItem({ 
  icon, 
  label, 
  isActive = false,
  onClick,
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        background: 'transparent',
        border: 'none',
        padding: 'var(--space-2)',
        cursor: 'pointer',
        color: isActive ? 'var(--color-primary)' : 'var(--text-tertiary)',
      }}
    >
      {icon}
      <span style={{
        fontSize: '10px',
        fontWeight: isActive ? 'var(--font-bold)' : 'var(--font-medium)',
      }}>
        {label}
      </span>
    </button>
  );
}
