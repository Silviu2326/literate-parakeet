import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Zap,
  Activity,
  BarChart3,
  Users,
  Home,
  FileText,
  Tv,
  Trophy,
  MessageSquare
} from 'lucide-react';

interface MatchCenterProps {
  onNavigate: (view: string) => void;
}

// Datos del partido
const MATCH_DATA = {
  home: { name: 'México', flag: 'mx', score: 0, color: '#00A651', formation: '4-3-3' },
  away: { name: 'Sudáfrica', flag: 'za', score: 0, color: '#FFD700', formation: '4-4-2' },
  group: 'Grupo A',
  stadium: 'Estadio Azteca',
};

// Eventos del partido (minuto, tipo, equipo, descripción)
const MATCH_EVENTS = [
  { minute: 12, type: 'yellow', team: 'home', player: 'Moreno', icon: '🟨' },
  { minute: 23, type: 'goal', team: 'home', player: 'Santi', score: '1-0', icon: '⚽' },
  { minute: 34, type: 'sub', team: 'away', playerIn: 'Dolly', playerOut: 'Tau', icon: '↔️' },
  { minute: 41, type: 'yellow', team: 'away', player: 'Mokoena', icon: '🟨' },
  { minute: 56, type: 'goal', team: 'away', player: 'Nurkovic', score: '1-1', icon: '⚽' },
  { minute: 67, type: 'red', team: 'home', player: 'Romo', icon: '🟥' },
  { minute: 72, type: 'sub', team: 'home', playerIn: 'Jiménez', playerOut: 'Quiñones', icon: '↔️' },
  { minute: 78, type: 'goal', team: 'home', player: 'Lozano', score: '2-1', icon: '⚽' },
  { minute: 85, type: 'sub', team: 'away', playerIn: 'Mabiliso', playerOut: 'Mashego', icon: '↔️' },
];

// Alineaciones completas
const LINEUPS = {
  home: {
    formation: '4-3-3',
    coach: 'Jaime Lozano',
    players: [
      { num: 23, name: 'G. Ochoa', pos: 'POR', starter: true },
      { num: 3, name: 'C. Araujo', pos: 'DEF', starter: true },
      { num: 15, name: 'H. Moreno', pos: 'DEF', starter: true },
      { num: 2, name: 'J. Sánchez', pos: 'DEF', starter: true },
      { num: 6, name: 'G. Gallardo', pos: 'DEF', starter: true },
      { num: 16, name: 'H. Herrera', pos: 'MED', starter: true },
      { num: 8, name: 'L. Chávez', pos: 'MED', starter: true },
      { num: 7, name: 'L. Romo', pos: 'MED', starter: true },
      { num: 22, name: 'H. Lozano', pos: 'DEL', starter: true },
      { num: 11, name: 'S. Giménez', pos: 'DEL', starter: true },
      { num: 10, name: 'J. Quiñones', pos: 'DEL', starter: true },
      { num: 1, name: 'A. Malagón', pos: 'POR', starter: false },
      { num: 5, name: 'J. Vasquez', pos: 'DEF', starter: false },
      { num: 14, name: 'E. Álvarez', pos: 'MED', starter: false },
      { num: 9, name: 'R. Jiménez', pos: 'DEL', starter: false },
    ]
  },
  away: {
    formation: '4-4-2',
    coach: 'Hugo Broos',
    players: [
      { num: 1, name: 'R. Williams', pos: 'POR', starter: true },
      { num: 2, name: 'T. Mokoena', pos: 'DEF', starter: true },
      { num: 5, name: 'L. Xulu', pos: 'DEF', starter: true },
      { num: 14, name: 'R. De Reuck', pos: 'DEF', starter: true },
      { num: 3, name: 'A. Mashego', pos: 'DEF', starter: true },
      { num: 4, name: 'D. Furman', pos: 'MED', starter: true },
      { num: 8, name: 'T. Maboe', pos: 'MED', starter: true },
      { num: 15, name: 'S. Mokwena', pos: 'MED', starter: true },
      { num: 7, name: 'P. Tau', pos: 'MED', starter: true },
      { num: 10, name: 'T. Zwane', pos: 'DEL', starter: true },
      { num: 9, name: 'S. Nurkovic', pos: 'DEL', starter: true },
      { num: 16, name: 'V. Mabiliso', pos: 'DEF', starter: false },
      { num: 6, name: 'B. Mvala', pos: 'MED', starter: false },
      { num: 11, name: 'K. Dolly', pos: 'DEL', starter: false },
      { num: 17, name: 'Z. Lepasa', pos: 'DEL', starter: false },
    ]
  }
};

// Posiciones de jugadores en el campo
const FIELD_POSITIONS = {
  home: [
    { num: 23, name: 'Ochoa', x: 8, y: 50 },
    { num: 3, name: 'Araujo', x: 25, y: 20 },
    { num: 15, name: 'Moreno', x: 25, y: 40 },
    { num: 2, name: 'Sánchez', x: 25, y: 60 },
    { num: 6, name: 'Gallardo', x: 25, y: 80 },
    { num: 16, name: 'Herrera', x: 45, y: 35 },
    { num: 8, name: 'Chávez', x: 45, y: 50 },
    { num: 7, name: 'Romo', x: 45, y: 65 },
    { num: 22, name: 'Lozano', x: 65, y: 25 },
    { num: 11, name: 'Santi', x: 65, y: 50 },
    { num: 10, name: 'Quiñones', x: 65, y: 75 },
  ],
  away: [
    { num: 1, name: 'Williams', x: 92, y: 50 },
    { num: 2, name: 'Mokoena', x: 75, y: 20 },
    { num: 5, name: 'Xulu', x: 75, y: 35 },
    { num: 14, name: 'De Reuck', x: 75, y: 50 },
    { num: 3, name: 'Mashego', x: 75, y: 65 },
    { num: 4, name: 'Furman', x: 75, y: 80 },
    { num: 8, name: 'Maboe', x: 55, y: 30 },
    { num: 15, name: 'Mokwena', x: 55, y: 50 },
    { num: 7, name: 'Tau', x: 55, y: 70 },
    { num: 10, name: 'Zwane', x: 35, y: 40 },
    { num: 9, name: 'Nurkovic', x: 35, y: 60 },
  ],
};

export const MatchCenter = ({ onNavigate }: MatchCenterProps) => {
  const [activeTab, setActiveTab] = useState<'events' | 'stats' | 'lineups'>('events');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [visibleEvents, setVisibleEvents] = useState<typeof MATCH_EVENTS>([]);
  const [lastEvent, setLastEvent] = useState<(typeof MATCH_EVENTS)[0] | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animación del tiempo
  useEffect(() => {
    if (isPlaying && currentMinute < 90) {
      intervalRef.current = setInterval(() => {
        setCurrentMinute(prev => {
          const next = prev + (0.5 * speed);
          if (next >= 90) {
            setIsPlaying(false);
            return 90;
          }
          return next;
        });
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed]);

  // Detectar eventos
  useEffect(() => {
    const newEvents = MATCH_EVENTS.filter(e => 
      e.minute <= currentMinute && 
      !visibleEvents.find(ve => ve.minute === e.minute && ve.player === e.player)
    );

    if (newEvents.length > 0) {
      setVisibleEvents(prev => [...prev, ...newEvents]);
      
      // Mostrar el último evento
      const lastNewEvent = newEvents[newEvents.length - 1];
      setLastEvent(lastNewEvent);
      
      // Actualizar marcador si es gol
      if (lastNewEvent.type === 'goal') {
        const [home, away] = lastNewEvent.score?.split('-').map(Number) || [0, 0];
        setScore({ home, away });
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }

      // Auto-switch a eventos si hay uno nuevo
      if (activeTab !== 'events') {
        // Opcional: cambiar automáticamente a eventos
      }
    }
  }, [currentMinute]);

  const handlePlayPause = () => {
    if (currentMinute >= 90) {
      // Reiniciar
      setCurrentMinute(0);
      setScore({ home: 0, away: 0 });
      setVisibleEvents([]);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkip = useCallback((direction: 'back' | 'forward') => {
    if (direction === 'back') {
      setCurrentMinute(prev => Math.max(0, prev - 10));
    } else {
      setCurrentMinute(prev => Math.min(90, prev + 10));
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      paddingBottom: 90,
    }}>
      {/* HEADER */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--border-primary)',
        position: 'relative',
      }}>
        <button 
          onClick={() => onNavigate('dashboard')}
          style={{
            position: 'absolute',
            left: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 'var(--text-sm)',
          }}
        >
          <ChevronLeft size={18} />
          Inicio
        </button>

        <span style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 'var(--font-black)',
          color: 'var(--text-primary)',
        }}>
          QuinielaMundial
        </span>
        
        <div style={{
          position: 'absolute',
          right: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
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
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>ES</span>
          </div>
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
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)' }}>1847</span>
          </div>
        </div>
      </div>

      {/* EN VIVO */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 'var(--space-2) var(--space-4)',
      }}>
        <span style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-black)',
          color: 'var(--color-error)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <span style={{ width: 8, height: 8, background: 'var(--color-error)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
          EN VIVO
        </span>
      </div>

      {/* SCORE */}
      <div style={{ padding: '0 var(--space-4) var(--space-4)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-2)',
        }}>
          {/* Local */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: '32px' }}>🇲🇽</span>
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--text-primary)' }}>{MATCH_DATA.home.name}</span>
          </div>

          {/* Score */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-black)', color: 'var(--text-primary)' }}>{score.home}</span>
            <span style={{ fontSize: 'var(--text-2xl)', color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>—</span>
            <span style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-black)', color: 'var(--text-primary)' }}>{score.away}</span>
          </div>

          {/* Visitante */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-black)', color: 'var(--text-primary)' }}>{MATCH_DATA.away.name}</span>
            <span style={{ fontSize: '32px' }}>🇿🇦</span>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          {MATCH_DATA.group} · {MATCH_DATA.stadium}
        </div>
      </div>

      {/* CAMPO */}
      <div style={{ padding: '0 var(--space-4)', marginBottom: 'var(--space-4)', position: 'relative' }}>
        {/* Celebración de gol */}
        {showCelebration && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
            background: 'rgba(0,0,0,0.9)',
            padding: 'var(--space-4) var(--space-6)',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{ fontSize: '48px', marginBottom: 'var(--space-2)' }}>⚽</div>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-black)', color: 'var(--color-primary)' }}>¡GOOOOL!</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{lastEvent?.player}</div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-black)', color: 'white', marginTop: 'var(--space-2)' }}>{lastEvent?.score}</div>
          </div>
        )}

        <div style={{
          position: 'relative',
          aspectRatio: '16/10',
          background: 'linear-gradient(90deg, #1a5f1a 0%, #0d4a0d 50%, #1a5f1a 100%)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '3px solid #2d8a2d',
        }}>
          <FieldLines />
          
          {/* Jugadores */}
          {FIELD_POSITIONS.home.map(player => (
            <PlayerDot key={`home-${player.num}`} player={player} color={MATCH_DATA.home.color} />
          ))}
          {FIELD_POSITIONS.away.map(player => (
            <PlayerDot key={`away-${player.num}`} player={player} color={MATCH_DATA.away.color} />
          ))}

          {/* Balón */}
          <div style={{
            position: 'absolute',
            left: `${45 + (currentMinute % 10)}%`,
            top: `${40 + (currentMinute % 20)}%`,
            width: 14,
            height: 14,
            background: 'white',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            zIndex: 10,
            transition: 'all 0.5s ease',
          }}>⚽</div>

          {/* Marcador en campo */}
          <div style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.7)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            fontWeight: 'var(--font-bold)',
          }}>
            <span>🇲🇽</span>
            <span style={{ color: 'white' }}>{score.home} - {score.away}</span>
            <span>🇿🇦</span>
            <span style={{ color: 'var(--color-primary)', background: 'rgba(0,200,83,0.2)', padding: '2px 8px', borderRadius: 'var(--radius-md)' }}>
              {Math.floor(currentMinute)}'
            </span>
          </div>
        </div>
      </div>

      {/* CONTROLES */}
      <div style={{ padding: '0 var(--space-4)', marginBottom: 'var(--space-4)' }}>
        {/* Botones */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
        }}>
          <button onClick={() => handleSkip('back')} style={{
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-lg)', color: 'var(--text-secondary)', cursor: 'pointer',
          }}><SkipBack size={18} /></button>
          
          <button onClick={handlePlayPause} style={{
            width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-primary)', border: 'none', borderRadius: '50%',
            color: 'var(--bg-primary)', cursor: 'pointer',
          }}>{isPlaying ? <Pause size={24} /> : <Play size={24} />}</button>
          
          <button onClick={() => handleSkip('forward')} style={{
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-lg)', color: 'var(--text-secondary)', cursor: 'pointer',
          }}><SkipForward size={18} /></button>

          {[1, 2, 4].map(s => (
            <button key={s} onClick={() => setSpeed(s)} style={{
              padding: 'var(--space-1) var(--space-3)',
              background: speed === s ? 'var(--color-primary)' : 'var(--bg-tertiary)',
              border: speed === s ? 'none' : '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)',
              color: speed === s ? 'var(--bg-primary)' : 'var(--text-secondary)', cursor: 'pointer',
            }}>{s}x</button>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', height: 4, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-4)' }}>
          {/* Marcadores de eventos */}
          {MATCH_EVENTS.map((event, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(event.minute / 90) * 100}%`,
                top: -5,
                transform: 'translateX(-50%)',
                fontSize: '10px',
                zIndex: 5,
              }}
            >
              {event.type === 'goal' ? '⚽' : event.type === 'yellow' ? '🟨' : event.type === 'red' ? '🟥' : '🔄'}
            </div>
          ))}
          {/* Progreso */}
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${(currentMinute / 90) * 100}%`,
            background: 'var(--color-primary)', borderRadius: 'var(--radius-full)',
          }} />
        </div>

        {/* Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)' }}>
          <TabButton icon={<Activity size={16} />} label="Eventos" isActive={activeTab === 'events'} onClick={() => setActiveTab('events')} />
          <TabButton icon={<BarChart3 size={16} />} label="Estadísticas" isActive={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
          <TabButton icon={<Users size={16} />} label="Alineaciones" isActive={activeTab === 'lineups'} onClick={() => setActiveTab('lineups')} />
        </div>
      </div>

      {/* CONTENIDO DEL TAB */}
      <div style={{ padding: '0 var(--space-4) var(--space-6)' }}>
        {activeTab === 'events' && <EventsTab events={visibleEvents} currentMinute={currentMinute} isPlaying={isPlaying} />}
        {activeTab === 'stats' && <StatsTab currentMinute={currentMinute} />}
        {activeTab === 'lineups' && <LineupsTab />}
      </div>

      {/* NAVEGACIÓN INFERIOR */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: 70,
        background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', zIndex: 100,
      }}>
        <BottomNavItem icon={<Home size={22} />} label="Inicio" onClick={() => onNavigate('dashboard')} />
        <BottomNavItem icon={<FileText size={22} />} label="Mis Apuestas" onClick={() => onNavigate('bets')} />
        <BottomNavItem icon={<Tv size={22} />} label="Match" isActive onClick={() => {}} />
        <BottomNavItem icon={<Trophy size={22} />} label="Ranking" onClick={() => onNavigate('ranking')} />
        <BottomNavItem icon={<MessageSquare size={22} />} label="IA" onClick={() => onNavigate('ai')} />
      </nav>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
};

// Sub-componentes

function FieldLines() {
  return (
    <>
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.3)', transform: 'translateX(-50%)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: 80, height: 80, border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
      <div style={{ position: 'absolute', left: 0, top: '50%', width: 60, height: 120, border: '2px solid rgba(255,255,255,0.3)', borderLeft: 'none', transform: 'translateY(-50%)' }} />
      <div style={{ position: 'absolute', right: 0, top: '50%', width: 60, height: 120, border: '2px solid rgba(255,255,255,0.3)', borderRight: 'none', transform: 'translateY(-50%)' }} />
    </>
  );
}

function PlayerDot({ player, color }: { player: { num: number; name: string; x: number; y: number }; color: string }) {
  return (
    <div style={{ 
      position: 'absolute', 
      left: `${player.x}%`, 
      top: `${player.y}%`, 
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px',
    }}>
      <div style={{
        width: 24, height: 24, background: color, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '11px', fontWeight: 'var(--font-black)', color: 'white',
        textShadow: '0 1px 2px rgba(0,0,0,0.5)', boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.3)',
      }}>{player.num}</div>
      <span style={{
        fontSize: '9px',
        fontWeight: 'var(--font-bold)',
        color: 'white',
        textShadow: '0 1px 3px rgba(0,0,0,0.9)',
        whiteSpace: 'nowrap',
        background: 'rgba(0,0,0,0.4)',
        padding: '1px 4px',
        borderRadius: '2px',
      }}>{player.name}</span>
    </div>
  );
}

function TabButton({ icon, label, isActive, onClick }: { icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-1)',
      padding: 'var(--space-3)', background: isActive ? 'rgba(0,200,83,0.1)' : 'var(--bg-tertiary)',
      border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-lg)', cursor: 'pointer',
      color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
      fontSize: 'var(--text-xs)', fontWeight: isActive ? 'var(--font-bold)' : 'var(--font-medium)',
    }}>{icon}{label}</button>
  );
}

function EventsTab({ events, currentMinute: _currentMinute, isPlaying }: { events: typeof MATCH_EVENTS; currentMinute: number; isPlaying: boolean }) {
  if (events.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-tertiary)' }}>
        <div style={{ fontSize: '40px', marginBottom: 'var(--space-4)' }}>{isPlaying ? '⏳' : '▶️'}</div>
        <p>{isPlaying ? 'Esperando eventos...' : 'Pulsa play para iniciar el partido'}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      {events.map((event, index) => (
        <div key={index} style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
          background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-3)',
          animation: 'slideIn 0.3s ease',
          borderLeft: event.type === 'goal' ? '3px solid var(--color-primary)' : 
                     event.type === 'red' ? '3px solid var(--color-error)' : undefined,
        }}>
          <div style={{
            minWidth: 40, textAlign: 'center', fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)', color: 'var(--text-secondary)',
          }}>{event.minute}'</div>
          <div style={{ fontSize: '20px' }}>{event.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              {event.type === 'goal' ? `¡Gol de ${event.player}!` :
               event.type === 'yellow' ? `Tarjeta amarilla - ${event.player}` :
               event.type === 'red' ? `Tarjeta roja - ${event.player}` :
               `Sustitución - Entra: ${event.playerIn}, Sale: ${event.playerOut}`}
            </div>
            {event.score && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 'var(--font-bold)' }}>Marcador: {event.score}</div>}
          </div>
          <div style={{ fontSize: '20px' }}>{event.team === 'home' ? '🇲🇽' : '🇿🇦'}</div>
        </div>
      )).reverse()}
    </div>
  );
}

function StatsTab({ currentMinute }: { currentMinute: number }) {
  // Simular estadísticas que cambian con el tiempo
  const stats = {
    possession: { home: Math.min(65, 45 + Math.floor(currentMinute / 5)), away: 0 },
    shots: { home: Math.floor(currentMinute / 10) + 2, away: Math.floor(currentMinute / 15) },
    corners: { home: Math.floor(currentMinute / 20), away: Math.floor(currentMinute / 25) },
    fouls: { home: Math.floor(currentMinute / 12), away: Math.floor(currentMinute / 10) },
    passes: { home: Math.floor(currentMinute * 8), away: Math.floor(currentMinute * 6) },
    saves: { home: Math.floor(currentMinute / 18), away: Math.floor(currentMinute / 8) },
  };
  stats.possession.away = 100 - stats.possession.home;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <StatRow label="Posesión" home={stats.possession.home} away={stats.possession.away} isPercent />
      <StatRow label="Tiros" home={stats.shots.home} away={stats.shots.away} max={15} />
      <StatRow label="Córners" home={stats.corners.home} away={stats.corners.away} max={8} />
      <StatRow label="Faltas" home={stats.fouls.home} away={stats.fouls.away} max={12} />
      <StatRow label="Pases" home={stats.passes.home} away={stats.passes.away} max={800} />
      <StatRow label="Paradas" home={stats.saves.home} away={stats.saves.away} max={8} />
    </div>
  );
}

function StatRow({ label, home, away, isPercent, max }: { label: string; home: number; away: number; isPercent?: boolean; max?: number }) {
  const homeDisplay = isPercent ? `${home}%` : home;
  const awayDisplay = isPercent ? `${away}%` : away;
  const homePct = max ? (home / max) * 50 : home;
  const awayPct = max ? (away / max) * 50 : away;
  
  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
        <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>{homeDisplay}</span>
        <span>{label}</span>
        <span style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>{awayDisplay}</span>
      </div>
      <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-full)', overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: `${homePct}%`, height: '100%', background: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: `${awayPct}%`, height: '100%', background: 'var(--color-warning)', borderRadius: 'var(--radius-full)' }} />
      </div>
    </div>
  );
}

function LineupsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {/* México */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-primary)' }}>
          <span style={{ fontSize: '24px' }}>🇲🇽</span>
          <div>
            <div style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>{MATCH_DATA.home.name}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{LINEUPS.home.formation} · DT: {LINEUPS.home.coach}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {LINEUPS.home.players.filter(p => p.starter).map(player => (
            <div key={player.num} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ minWidth: 28, textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)' }}>{player.num}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', flex: 1 }}>{player.name}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', padding: '2px 8px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>{player.pos}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px dashed var(--border-primary)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>Suplentes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {LINEUPS.home.players.filter(p => !p.starter).map(player => (
              <span key={player.num} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', padding: '4px 8px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                {player.num} {player.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sudáfrica */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-primary)' }}>
          <span style={{ fontSize: '24px' }}>🇿🇦</span>
          <div>
            <div style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>{MATCH_DATA.away.name}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{LINEUPS.away.formation} · DT: {LINEUPS.away.coach}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {LINEUPS.away.players.filter(p => p.starter).map(player => (
            <div key={player.num} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ minWidth: 28, textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-warning)' }}>{player.num}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', flex: 1 }}>{player.name}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', padding: '2px 8px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>{player.pos}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px dashed var(--border-primary)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>Suplentes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {LINEUPS.away.players.filter(p => !p.starter).map(player => (
              <span key={player.num} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', padding: '4px 8px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                {player.num} {player.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomNavItem({ icon, label, isActive = false, onClick }: { icon: React.ReactNode; label: string; isActive?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      background: 'transparent', border: 'none', padding: 'var(--space-2)', cursor: 'pointer',
      color: isActive ? 'var(--color-primary)' : 'var(--text-tertiary)',
    }}>
      {icon}
      <span style={{ fontSize: '10px', fontWeight: isActive ? 'var(--font-bold)' : 'var(--font-medium)' }}>{label}</span>
    </button>
  );
}
