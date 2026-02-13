import { FantasyDashboard } from './pages/Dashboard';
import { SquadPage } from './pages/Squad';
import { PlayersPage } from './pages/Players';
import { DuelsPage } from './pages/Duels';
import { PredictionsPage } from './pages/Predictions';
import { UserProfilePage } from './pages/UserProfile';
import { useFantasyStore } from '../application/store/fantasyStore';

export function FantasyRouter() {
  const selectedView = useFantasyStore((state) => state.selectedView);
  
  console.log('FantasyRouter render:', selectedView);
  
  switch (selectedView) {
    case 'dashboard':
      return <FantasyDashboard />;
    case 'squad':
      return <SquadPage />;
    case 'players':
      return <PlayersPage />;
    case 'predictions':
      return <PredictionsPage />;
    case 'duels':
      return <DuelsPage />;
    case 'user-detail':
      return <UserProfilePage />;
    default:
      return <FantasyDashboard />;
  }
}
