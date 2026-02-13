import { useState } from 'react';
import { Header } from '../home/Header';
import './Micro.css';

interface MicroProps {
  onNavigate: (view: string) => void;
  points: number;
}

interface Answer {
  [key: string]: boolean | null;
}

interface Question {
  category: string;
  icon: string;
  text: string;
  points: number;
}

interface Match {
  id: string;
  team1: string;
  team2: string;
  score: string;
  time: string;
  questions: Question[];
}

const matches: Match[] = [
  {
    id: '1',
    team1: 'Argentina',
    team2: 'Brasil',
    score: '2-1',
    time: '67\'',
    questions: [
      { category: 'TIEMPO', icon: 'clock', text: '¿Gol antes del minuto 70?', points: 25 },
      { category: 'DISCIPLINA', icon: 'alert', text: '¿Tarjeta amarilla en los próximos 10 minutos?', points: 30 },
      { category: 'EVENTO', icon: 'target', text: '¿Corner en el segundo tiempo?', points: 20 },
      { category: 'ESPECIAL', icon: 'zap', text: '¿Brasil empata el partido?', points: 70 },
      { category: 'GOLES', icon: 'star', text: '¿Más de 3.5 goles totales?', points: 40 },
      { category: 'TIEMPO', icon: 'clock', text: '¿Gol en tiempo añadido?', points: 50 },
      { category: 'DISCIPLINA', icon: 'alert', text: '¿Expulsión antes del final?', points: 60 },
      { category: 'EVENTO', icon: 'target', text: '¿Cambio en los próximos 5 minutos?', points: 15 },
    ]
  },
  {
    id: '2',
    team1: 'España',
    team2: 'Alemania',
    score: '0-0',
    time: '23\'',
    questions: [
      { category: 'TIEMPO', icon: 'clock', text: '¿Gol antes del minuto 30?', points: 35 },
      { category: 'DISCIPLINA', icon: 'alert', text: '¿Tarjeta amarilla antes del descanso?', points: 25 },
      { category: 'EVENTO', icon: 'target', text: '¿Tiro al poste o travesaño?', points: 55 },
      { category: 'ESPECIAL', icon: 'zap', text: '¿El primer gol será de España?', points: 45 },
      { category: 'GOLES', icon: 'star', text: '¿Más de 1.5 goles en el partido?', points: 30 },
      { category: 'TIEMPO', icon: 'clock', text: '¿Gol antes del descanso?', points: 40 },
      { category: 'DISCIPLINA', icon: 'alert', text: '¿Más de 3 tarjetas amarillas?', points: 35 },
      { category: 'EVENTO', icon: 'target', text: '¿Parada espectacular del portero?', points: 50 },
    ]
  },
  {
    id: '3',
    team1: 'Francia',
    team2: 'Inglaterra',
    score: '1-2',
    time: '81\'',
    questions: [
      { category: 'TIEMPO', icon: 'clock', text: '¿Gol en los últimos 10 minutos?', points: 60 },
      { category: 'DISCIPLINA', icon: 'alert', text: '¿Tarjeta roja en el partido?', points: 70 },
      { category: 'EVENTO', icon: 'target', text: '¿Francia remonta el partido?', points: 80 },
      { category: 'ESPECIAL', icon: 'zap', text: '¿Habrá tiempo añadido mayor a 5 minutos?', points: 40 },
      { category: 'GOLES', icon: 'star', text: '¿Más de 3.5 goles totales?', points: 50 },
      { category: 'TIEMPO', icon: 'clock', text: '¿Gol de penalti?', points: 55 },
      { category: 'DISCIPLINA', icon: 'alert', text: '¿VAR en los últimos minutos?', points: 45 },
      { category: 'EVENTO', icon: 'target', text: '¿Celebración polémica?', points: 35 },
    ]
  },
  {
    id: '4',
    team1: 'Portugal',
    team2: 'Uruguay',
    score: '3-1',
    time: '90+2\'',
    questions: [
      { category: 'TIEMPO', icon: 'clock', text: '¿Gol en tiempo de descuento?', points: 65 },
      { category: 'DISCIPLINA', icon: 'alert', text: '¿Tarjeta en tiempo añadido?', points: 40 },
      { category: 'EVENTO', icon: 'target', text: '¿Uruguay descuenta antes del final?', points: 75 },
      { category: 'ESPECIAL', icon: 'zap', text: '¿Portugal anota el cuarto?', points: 55 },
      { category: 'GOLES', icon: 'star', text: '¿Más de 4.5 goles totales?', points: 60 },
      { category: 'TIEMPO', icon: 'clock', text: '¿El partido termina 3-1?', points: 30 },
      { category: 'DISCIPLINA', icon: 'alert', text: '¿Amonestación por pérdida de tiempo?', points: 35 },
      { category: 'EVENTO', icon: 'target', text: '¿Sustitución de urgencia?', points: 45 },
    ]
  },
];

export const Micro = ({ onNavigate, points }: MicroProps) => {
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0].id);
  const [answers, setAnswers] = useState<Answer>({});

  const selectedMatch = matches.find(m => m.id === selectedMatchId) || matches[0];

  const handleAnswer = (questionIndex: number, value: boolean) => {
    const key = `${selectedMatchId}-${questionIndex}`;
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const answeredCount = Object.keys(answers)
    .filter(key => key.startsWith(selectedMatchId) && answers[key] !== null)
    .length;

  const handleMatchChange = (matchId: string) => {
    setSelectedMatchId(matchId);
  };

  return (
    <div className="micro-container">
      <Header points={points} />
      <div className="micro-header">
        <button
          onClick={() => onNavigate('dashboard')}
          className="micro-back-button"
        >
          ← Volver al inicio
        </button>
      </div>

      <div className="micro-title-wrapper">
        <div className="micro-icon"></div>
        <h1 className="micro-title">Micro-Predicciones</h1>
      </div>

      <div className="micro-content">
        {/* Selector de Partido */}
        <div className="micro-match-selector">
          <select
            value={selectedMatchId}
            onChange={(e) => handleMatchChange(e.target.value)}
            className="micro-match-select"
          >
            {matches.map(match => (
              <option key={match.id} value={match.id}>
                {match.team1} {match.score} {match.team2} - {match.time}
              </option>
            ))}
          </select>
        </div>

        {/* Tarjeta del partido seleccionado */}
        <div className="micro-match-card">
          <div className="micro-match-info">
            <div className="micro-live-dot"></div>
            <span className="micro-match-text">
              {selectedMatch.team1} {selectedMatch.score} {selectedMatch.team2}
            </span>
          </div>
          <span className="micro-match-time">{selectedMatch.time}</span>
        </div>

        <p className="micro-answered-text">{answeredCount}/{selectedMatch.questions.length} respondidas</p>

        {/* Preguntas dinámicas */}
        {selectedMatch.questions.map((question, index) => {
          const answerKey = `${selectedMatchId}-${index}`;
          const getIcon = () => {
            switch (question.icon) {
              case 'clock':
                return (
                  <svg className="micro-category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                );
              case 'alert':
                return (
                  <svg className="micro-category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                );
              case 'target':
                return (
                  <svg className="micro-category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                );
              case 'zap':
                return (
                  <svg className="micro-category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                );
              case 'star':
                return (
                  <svg className="micro-category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                );
              default:
                return null;
            }
          };

          return (
            <div key={index} className="micro-question-card">
              <div className="micro-question-header">
                <div className="micro-category">
                  {getIcon()}
                  {question.category}
                </div>
                <span className="micro-points">+{question.points}pts</span>
              </div>
              <div className="micro-question-text">{question.text}</div>
              <div className="micro-buttons">
                <button
                  className={`micro-button ${answers[answerKey] === true ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index, true)}
                >
                  Sí
                </button>
                <button
                  className={`micro-button ${answers[answerKey] === false ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index, false)}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
