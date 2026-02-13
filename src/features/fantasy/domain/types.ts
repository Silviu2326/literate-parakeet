// ============================================
// TIPOS DEL DOMINIO - FANTASY MUNDIAL 2026
// ============================================

// --- Enums ---

export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';
export const PlayerPosition = {
  GK: 'GK' as const,
  DEF: 'DEF' as const,
  MID: 'MID' as const,
  FWD: 'FWD' as const,
};

export type MatchPhase = 'GROUP' | 'ROUND_16' | 'QUARTER' | 'SEMI' | 'FINAL';
export const MatchPhase = {
  GROUP: 'GROUP' as const,
  ROUND_16: 'ROUND_16' as const,
  QUARTER: 'QUARTER' as const,
  SEMI: 'SEMI' as const,
  FINAL: 'FINAL' as const,
};

export type PredictionResult = 'EXACT' | 'WINNER' | 'WRONG';
export const PredictionResult = {
  EXACT: 'EXACT' as const,
  WINNER: 'WINNER' as const,
  WRONG: 'WRONG' as const,
};

export type ChipType = 'wildcard' | 'triple_captain' | 'bench_boost' | 'free_hit' | 'revelation';
export const ChipType = {
  WILDCARD: 'wildcard' as const,
  TRIPLE_CAPTAIN: 'triple_captain' as const,
  BENCH_BOOST: 'bench_boost' as const,
  FREE_HIT: 'free_hit' as const,
  REVELATION: 'revelation' as const,
};

// --- Entidades Base ---

export interface Nation {
  id: string;
  name: string;
  code: string;      // Código FIFA (ESP, ARG, etc.)
  flag: string;      // URL del flag
  group: string;
  eliminated: boolean;
}

export interface Player {
  id: string;
  name: string;
  nationId: string;
  position: PlayerPosition;
  value: number;     // Valor en millones
  points: number;    // Puntos totales acumulados
  pointsPerMatch: number;
  goals: number;
  assists: number;
  cleanSheets: number;
  isU23: boolean;    // Para chip de revelación
  image?: string;
}

export interface Match {
  id: string;
  homeNationId: string;
  awayNationId: string;
  phase: MatchPhase;
  matchday: number;
  date: Date;
  venue: string;
  homeScore?: number;
  awayScore?: number;
  finished: boolean;
}

export interface Matchday {
  id: number;
  name: string;
  phase: MatchPhase;
  deadline: Date;
  matches: Match[];
  isCurrent: boolean;
  isFinished: boolean;
}

// --- Fantasy Squad ---

export interface SquadPlayer extends Player {
  isStarter: boolean;
  isCaptain: boolean;
  isViceCaptain: boolean;
  matchPoints: Record<number, number>; // puntos por jornada
}

export interface FantasySquad {
  players: SquadPlayer[];
  formation: Formation;
}

export type Formation = '4-3-3' | '4-4-2' | '4-2-3-1' | '3-5-2' | '3-4-3' | '5-3-2' | '5-4-1';

export const FORMATION_SLOTS: Record<Formation, Record<PlayerPosition, number>> = {
  '4-3-3': { GK: 1, DEF: 4, MID: 3, FWD: 3 },
  '4-4-2': { GK: 1, DEF: 4, MID: 4, FWD: 2 },
  '4-2-3-1': { GK: 1, DEF: 4, MID: 5, FWD: 1 },
  '3-5-2': { GK: 1, DEF: 3, MID: 5, FWD: 2 },
  '3-4-3': { GK: 1, DEF: 3, MID: 4, FWD: 3 },
  '5-3-2': { GK: 1, DEF: 5, MID: 3, FWD: 2 },
  '5-4-1': { GK: 1, DEF: 5, MID: 4, FWD: 1 },
};

// --- Predicciones ---

export interface Prediction {
  matchId: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  predictedFormation: Formation;
  predictedXI: string[]; // IDs de jugadores
  points: number;
  result?: PredictionResult;
}

// --- Puntuación ---

export interface ScoreBreakdown {
  matchdayId: number;
  fromPlayers: number;
  fromPredictions: number;
  fromChips: number;
  bonusPoints: number;
  total: number;
}

export interface UserScore {
  totalPoints: number;
  matchdayPoints: Record<number, ScoreBreakdown>;
  overallRank: number;
  previousRank: number;
  streak: number; // racha de jornadas positivas
}

// --- Comodines ---

export interface Chip {
  type: ChipType;
  name: string;
  description: string;
  icon: string;
  usesRemaining: number;
  totalUses: number;
  usedInMatchday?: number;
  isActive: boolean;
}

// --- Duelos ---

export interface Duel {
  id: string;
  challengerId: string;
  opponentId: string;
  matchdayId: number;
  pointsAtStake: number;
  status: 'pending' | 'active' | 'finished';
  winnerId?: string;
  challengerScore: number;
  opponentScore: number;
}

// --- Usuario / Ranking ---

export interface FantasyUser {
  id: string;
  name: string;
  avatar?: string;
  squad: FantasySquad;
  predictions: Record<string, Prediction>; // key: matchId
  chips: Chip[];
  score: UserScore;
  isMe: boolean;
}

export interface LeagueStanding {
  userId: string;
  userName: string;
  avatar?: string;
  position: number;
  previousPosition: number;
  totalPoints: number;
  gapToFirst: number;
  streak: number;
  bestMatchday: number;
  isMe: boolean;
}

// --- Estado Global ---

export interface FantasyState {
  // Datos base
  nations: Nation[];
  players: Player[];
  matchdays: Matchday[];
  
  // Mi estado
  mySquad: FantasySquad;
  myPredictions: Record<string, Prediction>;
  myChips: Chip[];
  myScore: UserScore;
  
  // Ranking
  leagueStandings: LeagueStanding[];
  
  // Duelos
  myDuels: Duel[];
  
  // UI State
  currentMatchday: number;
  selectedView: FantasyView;
}

export type FantasyView = 
  | 'dashboard'
  | 'squad'
  | 'players'
  | 'predictions'
  | 'duels'
  | 'chips'
  | 'ranking'
  | 'user-detail';
