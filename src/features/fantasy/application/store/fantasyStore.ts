// ============================================
// STORE ZUSTAND - FANTASY MUNDIAL 2026
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  FantasyState,
  FantasySquad,
  SquadPlayer,
  Player,
  Prediction,
  Chip,
  LeagueStanding,
  FantasyView,
  Formation,
  Nation,
  Matchday,
} from '../../domain/types';
import { ChipType, PlayerPosition } from '../../domain/types';
import { GAME_RULES, canAddPlayer, validateSquad } from '../../domain/rules';

// --- Estado Inicial ---

const createInitialChips = (): Chip[] => [
  { type: ChipType.WILDCARD, name: 'Comodín Total', description: 'Reconstruye TODA tu selección', icon: '🃏', usesRemaining: 1, totalUses: 1, isActive: false },
  { type: ChipType.TRIPLE_CAPTAIN, name: 'Triple Capitán', description: 'Capitán ×3 puntos', icon: '👑', usesRemaining: 1, totalUses: 1, isActive: false },
  { type: ChipType.BENCH_BOOST, name: 'Banca Completa', description: 'Suplentes suman puntos', icon: '🪑', usesRemaining: 1, totalUses: 1, isActive: false },
  { type: ChipType.FREE_HIT, name: 'Golpe Libre', description: 'Cambios ilimitados 1 jornada', icon: '⚡', usesRemaining: 1, totalUses: 1, isActive: false },
  { type: ChipType.REVELATION, name: 'Revelación', description: 'Sub-23 ×2 puntos', icon: '🔮', usesRemaining: 3, totalUses: 3, isActive: false },
];

const createInitialSquad = (): FantasySquad => ({
  players: [],
  formation: '4-3-3',
});

const initialState: Omit<FantasyState, 'nations' | 'players' | 'matchdays'> = {
  mySquad: createInitialSquad(),
  myPredictions: {},
  myChips: createInitialChips(),
  myScore: {
    totalPoints: 0,
    matchdayPoints: {},
    overallRank: 0,
    previousRank: 0,
    streak: 0,
  },
  leagueStandings: [],
  myDuels: [],
  currentMatchday: 1,
  selectedView: 'dashboard',
};

// --- Actions ---

interface FantasyActions {
  // Navigation
  setView: (view: FantasyView) => void;
  
  // Squad Management
  addPlayer: (player: Player) => { success: boolean; message?: string };
  removePlayer: (playerId: string) => void;
  setStarters: (playerIds: string[]) => void;
  setCaptain: (playerId: string) => void;
  setViceCaptain: (playerId: string) => void;
  setFormation: (formation: Formation) => void;
  validateMySquad: () => { valid: boolean; errors: string[] };
  
  // Predictions
  setPrediction: (matchId: string, prediction: Omit<Prediction, 'points' | 'result'>) => void;
  removePrediction: (matchId: string) => void;
  
  // Chips
  activateChip: (chipType: ChipType) => void;
  deactivateChip: (chipType: ChipType) => void;
  
  // Data Loading (se cargarán de API/mock)
  loadNations: (nations: Nation[]) => void;
  loadPlayers: (players: Player[]) => void;
  loadMatchdays: (matchdays: Matchday[]) => void;
  loadStandings: (standings: LeagueStanding[]) => void;
}

export type FantasyStore = FantasyState & FantasyActions;

// --- Store Creation ---

export const useFantasyStore = create<FantasyStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      nations: [],
      players: [],
      matchdays: [],
      
      // Navigation
      setView: (view) => set({ selectedView: view }),
      
      // Squad Management
      addPlayer: (player) => {
        const { mySquad } = get();
        const result = canAddPlayer(mySquad.players, { ...player, isStarter: false, isCaptain: false, isViceCaptain: false, matchPoints: {} });
        
        if (!result.allowed) {
          return { success: false, message: result.reason };
        }
        
        const newPlayer: SquadPlayer = {
          ...player,
          isStarter: mySquad.players.filter(p => p.isStarter).length < GAME_RULES.STARTERS_COUNT,
          isCaptain: false,
          isViceCaptain: false,
          matchPoints: {},
        };
        
        set({
          mySquad: {
            ...mySquad,
            players: [...mySquad.players, newPlayer],
          },
        });
        
        return { success: true };
      },
      
      removePlayer: (playerId) => {
        const { mySquad } = get();
        set({
          mySquad: {
            ...mySquad,
            players: mySquad.players.filter(p => p.id !== playerId),
          },
        });
      },
      
      setStarters: (playerIds) => {
        const { mySquad } = get();
        set({
          mySquad: {
            ...mySquad,
            players: mySquad.players.map(p => ({
              ...p,
              isStarter: playerIds.includes(p.id),
            })),
          },
        });
      },
      
      setCaptain: (playerId) => {
        const { mySquad } = get();
        set({
          mySquad: {
            ...mySquad,
            players: mySquad.players.map(p => ({
              ...p,
              isCaptain: p.id === playerId,
            })),
          },
        });
      },
      
      setViceCaptain: (playerId) => {
        const { mySquad } = get();
        set({
          mySquad: {
            ...mySquad,
            players: mySquad.players.map(p => ({
              ...p,
              isViceCaptain: p.id === playerId,
            })),
          },
        });
      },
      
      setFormation: (formation) => {
        set({
          mySquad: {
            ...get().mySquad,
            formation,
          },
        });
      },
      
      validateMySquad: () => {
        const errors = validateSquad(get().mySquad.players);
        return {
          valid: errors.length === 0,
          errors: errors.map(e => e.message),
        };
      },
      
      // Predictions
      setPrediction: (matchId, predictionData) => {
        set({
          myPredictions: {
            ...get().myPredictions,
            [matchId]: {
              ...predictionData,
              points: 0, // Se calculará después
            },
          },
        });
      },
      
      removePrediction: (matchId) => {
        const { [matchId]: _, ...rest } = get().myPredictions;
        set({ myPredictions: rest });
      },
      
      // Chips
      activateChip: (chipType) => {
        set({
          myChips: get().myChips.map(chip =>
            chip.type === chipType
              ? { ...chip, isActive: true }
              : chip
          ),
        });
      },
      
      deactivateChip: (chipType) => {
        set({
          myChips: get().myChips.map(chip =>
            chip.type === chipType
              ? { ...chip, isActive: false }
              : chip
          ),
        });
      },
      
      // Data Loading
      loadNations: (nations) => set({ nations }),
      loadPlayers: (players) => set({ players }),
      loadMatchdays: (matchdays) => set({ matchdays }),
      loadStandings: (standings) => set({ leagueStandings: standings }),
    }),
    {
      name: 'fantasy-storage',
      partialize: (state) => ({
        mySquad: state.mySquad,
        myPredictions: state.myPredictions,
        myChips: state.myChips,
        myScore: state.myScore,
        currentMatchday: state.currentMatchday,
      }),
    }
  )
);

// --- Selectors ---

export const selectMyStarters = (state: FantasyStore) => 
  state.mySquad.players.filter(p => p.isStarter);

export const selectMyBench = (state: FantasyStore) => 
  state.mySquad.players.filter(p => !p.isStarter);

export const selectCaptain = (state: FantasyStore) => 
  state.mySquad.players.find(p => p.isCaptain);

export const selectViceCaptain = (state: FantasyStore) => 
  state.mySquad.players.find(p => p.isViceCaptain);

export const selectActiveChips = (state: FantasyStore) => 
  state.myChips.filter(c => c.isActive);

export const selectMyStanding = (state: FantasyStore) =>
  state.leagueStandings.find(s => s.isMe);

export const selectPlayersByNation = (state: FantasyStore, nationId: string) =>
  state.players.filter(p => p.nationId === nationId);

export const selectPlayersByPosition = (state: FantasyStore, position: PlayerPosition) =>
  state.players.filter(p => p.position === position);
