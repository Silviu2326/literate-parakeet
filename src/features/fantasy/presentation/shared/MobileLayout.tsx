import type { ReactNode } from 'react';
import { Home, Users, Search, Target } from 'lucide-react';
import { useFantasyStore } from '../../application/store/fantasyStore';

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const selectedView = useFantasyStore((state) => state.selectedView);
  const setView = useFantasyStore((state) => state.setView);
  
  // No mostrar navbar en ciertas vistas
  const hideNavbar = selectedView === 'duels' || selectedView === 'user-detail';
  
  const handleNavigation = (view: 'dashboard' | 'squad' | 'players' | 'predictions') => {
    setView(view);
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      paddingBottom: hideNavbar ? 0 : 80,
    }}>
      {children}
      
      {/* NAVEGACIÓN INFERIOR - ORDEN: INICIO, MI EQUIPO, JUGADORES, PREDICCIONES */}
      {!hideNavbar && (
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
          padding: '0 var(--space-4)',
          zIndex: 100,
        }}>
          <NavItem
            icon={<Home size={24} />}
            label="Inicio"
            isActive={selectedView === 'dashboard'}
            onClick={() => handleNavigation('dashboard')}
          />
          <NavItem
            icon={<Users size={24} />}
            label="Mi Equipo"
            isActive={selectedView === 'squad'}
            onClick={() => handleNavigation('squad')}
          />
          <NavItem
            icon={<Search size={24} />}
            label="Jugadores"
            isActive={selectedView === 'players'}
            onClick={() => handleNavigation('players')}
          />
          <NavItem
            icon={<Target size={24} />}
            label="Predicciones"
            isActive={selectedView === 'predictions'}
            onClick={() => handleNavigation('predictions')}
          />
        </nav>
      )}
    </div>
  );
}

interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        background: 'transparent',
        border: 'none',
        padding: 'var(--space-2)',
        cursor: 'pointer',
        color: isActive ? 'var(--color-primary)' : 'var(--text-tertiary)',
        transition: 'color var(--transition-fast)',
      }}
    >
      {icon}
      <span style={{
        fontSize: '11px',
        fontWeight: isActive ? 'var(--font-semibold)' : 'var(--font-medium)',
      }}>
        {label}
      </span>
    </button>
  );
}
