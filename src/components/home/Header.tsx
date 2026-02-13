import { useState } from 'react';
import { Settings, Star } from 'lucide-react';

interface HeaderProps {
  points: number;
}

export const Header = ({ points }: HeaderProps) => {
  const [language, setLanguage] = useState<'ES' | 'EN'>('ES');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ES' ? 'EN' : 'ES');
  };

  return (
    <div style={{
      background: '#1a1d29',
      padding: 'var(--space-3) var(--space-4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border-primary)',
    }}>
      {/* Logo a la izquierda */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
      }}>
        <div style={{
          width: 40,
          height: 40,
          background: '#00ff94',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}>
          🌐
        </div>
        <span style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-black)',
          color: '#ffffff',
        }}>
          QuinielaMundial
        </span>
      </div>

      {/* Controles a la derecha */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}>
        {/* Selector de idioma */}
        <button
          onClick={toggleLanguage}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#262937',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #2f3242',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#00ff94';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#2f3242';
          }}
        >
          <img
            src={language === 'ES'
              ? 'https://flagcdn.com/w40/es.png'
              : 'https://flagcdn.com/w40/gb.png'
            }
            alt={language === 'ES' ? 'España' : 'United Kingdom'}
            style={{
              width: 20,
              height: 13,
              objectFit: 'cover',
              borderRadius: '2px',
            }}
          />
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            color: '#00ff94',
          }}>{language}</span>
        </button>

        {/* Puntos */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: '#262937',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #2f3242',
        }}>
          <Star size={16} style={{ color: '#00ff94', fill: '#00ff94' }} />
          <span style={{
            fontSize: 'var(--text-md)',
            fontWeight: 'var(--font-black)',
            color: '#00ff94',
          }}>
            {points}
          </span>
        </div>

        {/* Settings */}
        <button
          style={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#262937',
            border: '1px solid #2f3242',
            borderRadius: 'var(--radius-md)',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};
