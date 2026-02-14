import { useState, useMemo } from 'react';
import { MATCHES } from '../../data/matches';
import { getFlagImage } from '../../utils/helpers';
import { Header } from '../home/Header';
import { MobileLayout } from '../../features/fantasy/presentation/shared/MobileLayout';
import './Matches.css';

interface MatchesProps {
  onNavigate: (view: string) => void;
  points: number;
}

export const Matches = ({ onNavigate, points }: MatchesProps) => {
  // Estados para filtros
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Extraer valores únicos para los filtros
  const uniqueDates = useMemo(() => {
    const dates = [...new Set(MATCHES.map(m => m.date))];
    return dates.sort();
  }, []);

  const uniqueTeams = useMemo(() => {
    const teams = new Set<string>();
    MATCHES.forEach(m => {
      teams.add(m.h);
      teams.add(m.a);
    });
    return [...teams].sort((a, b) => a.localeCompare(b));
  }, []);

  // Filtrar partidos
  const filteredMatches = useMemo(() => {
    return MATCHES.filter(match => {
      const matchesTeam = selectedTeam ? (match.h === selectedTeam || match.a === selectedTeam) : true;
      const matchesDate = selectedDate ? match.date === selectedDate : true;
      return matchesTeam && matchesDate;
    });
  }, [selectedTeam, selectedDate]);

  // Calcular estadísticas basadas en partidos filtrados
  const totalMatches = filteredMatches.length;
  const liveMatches = filteredMatches.filter(m => m.live).length;
  const groupStageMatches = filteredMatches.filter(m => m.g).length;

  return (
    <MobileLayout onNavigate={onNavigate} currentView="match">
      <div className="matches-container">
        {/* Header Principal */}
        <Header points={points} />

        {/* Header Visual */}
        <div className="matches-hero">
        {/* Banner Image */}
        <div className="matches-banner-container">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&q=80"
            alt="Mundial 2026 Banner"
            className="matches-banner-image"
          />
          <div className="matches-banner-overlay" />
        </div>

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

      {/* Filters */}
      <div className="matches-filters">
        <div className="matches-filters-container">
          <div className="matches-filter-group">
            <label className="matches-filter-label">Selección</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="matches-filter-select"
            >
              <option value="">Todas las selecciones</option>
              {uniqueTeams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
          <div className="matches-filter-group">
            <label className="matches-filter-label">Día</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="matches-filter-select"
            >
              <option value="">Todos los días</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
          {(selectedTeam || selectedDate) && (
            <button
              onClick={() => {
                setSelectedTeam('');
                setSelectedDate('');
              }}
              className="matches-filter-clear"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpiar
            </button>
          )}
        </div>
        {(selectedTeam || selectedDate) && (
          <div className="matches-filter-results">
            Mostrando {filteredMatches.length} de {MATCHES.length} partidos
          </div>
        )}
      </div>

      {/* Content */}
      <div className="matches-content">
        <div className="matches-list">
          {filteredMatches.length === 0 ? (
            <div className="matches-empty">
              <div className="matches-empty-icon">🔍</div>
              <p className="matches-empty-text">No se encontraron partidos con los filtros seleccionados</p>
              <button
                onClick={() => {
                  setSelectedTeam('');
                  setSelectedDate('');
                }}
                className="matches-empty-button"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            filteredMatches.map((match) => (
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
          ))
          )}
        </div>
      </div>
      </div>
    </MobileLayout>
  );
};
