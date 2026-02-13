import { MATCHES } from '../../data/matches';
import { getFlagImage } from '../../utils/helpers';
import { Header } from '../home/Header';
import './Matches.css';

interface MatchesProps {
  onNavigate: (view: string) => void;
  points: number;
}

export const Matches = ({ onNavigate, points }: MatchesProps) => {
  // Calcular estadísticas
  const totalMatches = MATCHES.length;
  const liveMatches = MATCHES.filter(m => m.live).length;
  const groupStageMatches = MATCHES.filter(m => m.g).length;

  return (
    <div className="matches-container">
      {/* Header Principal */}
      <Header points={points} />

      {/* Header Visual */}
      <div className="matches-hero">
        {/* Background Glows */}
        <div className="matches-hero-glow" />

        {/* Back Button flotante en esquina izquierda */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="matches-back-button"
        >
          <div className="matches-back-button-circle">
            <span className="text-2xl">←</span>
          </div>
          <span className="hidden md:block text-xs font-bold tracking-widest uppercase">Volver</span>
        </button>

        <div className="max-w-7xl mx-auto relative">
          {/* Centered Hero Content */}
          <div className="matches-hero-content">
            {/* Main Icon (Visual Anchor) */}
            <div className="matches-icon-container">
              <div className="matches-icon-glow" />
              <div className="matches-icon-box">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#00E676] fill-none stroke-current stroke-2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
            </div>

            <div className="matches-title-section">
              <h1 className="matches-main-title">
                Partidos
              </h1>
              <div className="matches-badges">
                <span className="matches-badge matches-badge-gray">
                  Mundial 2026
                </span>
                <span className="matches-badge matches-badge-green">
                  {totalMatches} Encuentros
                </span>
                {liveMatches > 0 && (
                  <span className="matches-badge matches-badge-green">
                    {liveMatches} En Vivo
                  </span>
                )}
              </div>
            </div>

            {/* Visual Stats Bar */}
            <div className="matches-stats-bar">
              <div className="matches-stats-container">
                <div className="matches-stat">
                  <div className="matches-stat-value matches-stat-value-green">{totalMatches}</div>
                  <div className="matches-stat-label">Total Partidos</div>
                </div>
                <div className="matches-stat-divider" />
                <div className="matches-stat">
                  <div className="matches-stat-value matches-stat-value-white">{groupStageMatches}</div>
                  <div className="matches-stat-label">Fase Grupos</div>
                </div>
                <div className="matches-stat-divider" />
                <div className="matches-stat">
                  <div className="matches-stat-value matches-stat-value-white">16</div>
                  <div className="matches-stat-label">Sedes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="matches-content">
        <div className="matches-list">
          {MATCHES.map((match) => (
            <div key={match.id} className="match-card">
              {/* Fecha y ubicación header */}
              <div className="match-card-header">
                <div className="match-card-header-content">
                  <span className="match-date">{match.date}</span>
                  <span className="match-city">{match.city}</span>
                </div>
              </div>

              {/* Match info */}
              <div className="match-card-body">
                <div className="match-teams">
                  {/* Equipo local */}
                  <div className="match-team">
                    <img
                      src={getFlagImage(match.h, 60)}
                      alt={match.h}
                      className="match-flag"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                    <span className="match-team-name">{match.h}</span>
                  </div>

                  {/* Score/Time */}
                  <div className="match-score-container">
                    {match.live ? (
                      <>
                        <div className="match-score">
                          {match.hS || 0} - {match.aS || 0}
                        </div>
                        <div className="match-live-badge">
                          <span className="match-live-dot"></span>
                          <span className="match-live-text">EN VIVO {match.min}</span>
                        </div>
                      </>
                    ) : (
                      <div className="match-time">{match.time}</div>
                    )}
                  </div>

                  {/* Equipo visitante */}
                  <div className="match-team match-team-away">
                    <span className="match-team-name">{match.a}</span>
                    <img
                      src={getFlagImage(match.a, 60)}
                      alt={match.a}
                      className="match-flag"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
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
