// ============================================
// REGLAS DE NEGOCIO - FANTASY MUNDIAL 2026
// ============================================

import type { Formation, SquadPlayer } from './types';
import { PlayerPosition, FORMATION_SLOTS, ChipType, PredictionResult } from './types';

// --- Constantes del Juego ---

export { FORMATION_SLOTS };

export const GAME_RULES = {
  // Squad
  SQUAD_SIZE: 15,
  STARTERS_COUNT: 11,
  BENCH_COUNT: 4,
  
  // Restricciones de selecciones
  MAX_PLAYERS_PER_NATION: 2,
  NATIONS_WITH_DOUBLE: 3, // máximo 3 selecciones pueden tener 2 jugadores
  MIN_NATIONS_REPRESENTED: 11, // mínimo de selecciones diferentes
  
  // Puntuación jugadores
  POINTS_GOAL_GK: 10,
  POINTS_GOAL_DEF: 8,
  POINTS_GOAL_MID: 6,
  POINTS_GOAL_FWD: 5,
  POINTS_ASSIST: 3,
  POINTS_CLEAN_SHEET_GK: 5,
  POINTS_CLEAN_SHEET_DEF: 4,
  POINTS_CLEAN_SHEET_MID: 1,
  POINTS_SAVES_3PLUS: 2,
  POINTS_PENALTY_SAVE: 5,
  POINTS_PENALTY_MISS: -2,
  POINTS_YELLOW_CARD: -1,
  POINTS_RED_CARD: -3,
  POINTS_OWN_GOAL: -2,
  POINTS_STARTING_XI: 2,
  POINTS_SUB_60MIN: 1,
  
  // Multiplicadores
  CAPTAIN_MULTIPLIER: 2,
  TRIPLE_CAPTAIN_MULTIPLIER: 3,
  
  // Puntuación predicciones
  PREDICTION_EXACT_POINTS: 15,
  PREDICTION_WINNER_POINTS: 5,
  PREDICTION_FORMATION_BONUS: 5,
  PREDICTION_PLAYER_BONUS: 2, // por jugador acertado en XI
  
  // Comodines
  CHIPS: {
    [ChipType.WILDCARD]: { name: 'Comodín Total', uses: 1, description: 'Reconstruye TODA tu selección una vez' },
    [ChipType.TRIPLE_CAPTAIN]: { name: 'Triple Capitán', uses: 1, description: 'Tu capitán multiplica ×3' },
    [ChipType.BENCH_BOOST]: { name: 'Banca Completa', uses: 1, description: 'Suplentes también suman puntos' },
    [ChipType.FREE_HIT]: { name: 'Golpe Libre', uses: 1, description: 'Cambios ilimitados por 1 jornada' },
    [ChipType.REVELATION]: { name: 'Jugador Revelación', uses: 3, description: 'Sub-23 ×2 si marca/asiste' },
  },
} as const;

// --- Validaciones de Squad ---

export interface SquadValidationError {
  code: string;
  message: string;
  field?: string;
}

export function validateSquad(squad: SquadPlayer[]): SquadValidationError[] {
  const errors: SquadValidationError[] = [];
  
  // Tamaño del equipo
  if (squad.length !== GAME_RULES.SQUAD_SIZE) {
    errors.push({
      code: 'INVALID_SIZE',
      message: `El equipo debe tener exactamente ${GAME_RULES.SQUAD_SIZE} jugadores`,
    });
  }
  
  // Contar por posición
  const positionCount = {
    [PlayerPosition.GK]: 0,
    [PlayerPosition.DEF]: 0,
    [PlayerPosition.MID]: 0,
    [PlayerPosition.FWD]: 0,
  };
  
  for (const player of squad) {
    positionCount[player.position]++;
  }
  
  // Mínimos por posición
  if (positionCount[PlayerPosition.GK] < 2) {
    errors.push({
      code: 'INSUFFICIENT_GK',
      message: 'Mínimo 2 porteros requeridos',
      field: 'GK',
    });
  }
  if (positionCount[PlayerPosition.DEF] < 4) {
    errors.push({
      code: 'INSUFFICIENT_DEF',
      message: 'Mínimo 4 defensas requeridos',
      field: 'DEF',
    });
  }
  if (positionCount[PlayerPosition.MID] < 4) {
    errors.push({
      code: 'INSUFFICIENT_MID',
      message: 'Mínimo 4 mediocentros requeridos',
      field: 'MID',
    });
  }
  if (positionCount[PlayerPosition.FWD] < 2) {
    errors.push({
      code: 'INSUFFICIENT_FWD',
      message: 'Mínimo 2 delanteros requeridos',
      field: 'FWD',
    });
  }
  
  // Restricción de selecciones
  const nationCount: Record<string, number> = {};
  let nationsWithTwo = 0;
  
  for (const player of squad) {
    nationCount[player.nationId] = (nationCount[player.nationId] || 0) + 1;
  }
  
  for (const [nationId, count] of Object.entries(nationCount)) {
    if (count > GAME_RULES.MAX_PLAYERS_PER_NATION) {
      errors.push({
        code: 'TOO_MANY_FROM_NATION',
        message: `Máximo ${GAME_RULES.MAX_PLAYERS_PER_NATION} jugadores por selección`,
        field: nationId,
      });
    }
    if (count === GAME_RULES.MAX_PLAYERS_PER_NATION) {
      nationsWithTwo++;
    }
  }
  
  if (nationsWithTwo > GAME_RULES.NATIONS_WITH_DOUBLE) {
    errors.push({
      code: 'TOO_MANY_DOUBLE_NATIONS',
      message: `Solo puedes tener 2 jugadores de ${GAME_RULES.NATIONS_WITH_DOUBLE} selecciones como máximo`,
    });
  }
  
  const uniqueNations = Object.keys(nationCount).length;
  if (uniqueNations < GAME_RULES.MIN_NATIONS_REPRESENTED) {
    errors.push({
      code: 'INSUFFICIENT_NATIONS',
      message: `Debes representar al menos ${GAME_RULES.MIN_NATIONS_REPRESENTED} selecciones diferentes`,
    });
  }
  
  // Validar capitán y vice
  const captains = squad.filter(p => p.isCaptain);
  const viceCaptains = squad.filter(p => p.isViceCaptain);
  
  if (captains.length !== 1) {
    errors.push({
      code: 'INVALID_CAPTAIN',
      message: 'Debes elegir exactamente 1 capitán',
    });
  }
  if (viceCaptains.length !== 1) {
    errors.push({
      code: 'INVALID_VICE',
      message: 'Debes elegir exactamente 1 vicecapitán',
    });
  }
  if (captains[0]?.id === viceCaptains[0]?.id) {
    errors.push({
      code: 'SAME_CAPTAIN_VICE',
      message: 'El capitán y vicecapitán deben ser diferentes',
    });
  }
  
  return errors;
}

export function isSquadValid(squad: SquadPlayer[]): boolean {
  return validateSquad(squad).length === 0;
}

// --- Validación de Formación ---

export function validateFormation(formation: Formation, starters: SquadPlayer[]): boolean {
  const slots = FORMATION_SLOTS[formation];
  const actual = {
    [PlayerPosition.GK]: starters.filter(p => p.position === PlayerPosition.GK).length,
    [PlayerPosition.DEF]: starters.filter(p => p.position === PlayerPosition.DEF).length,
    [PlayerPosition.MID]: starters.filter(p => p.position === PlayerPosition.MID).length,
    [PlayerPosition.FWD]: starters.filter(p => p.position === PlayerPosition.FWD).length,
  };
  
  return (
    actual[PlayerPosition.GK] === slots[PlayerPosition.GK] &&
    actual[PlayerPosition.DEF] === slots[PlayerPosition.DEF] &&
    actual[PlayerPosition.MID] === slots[PlayerPosition.MID] &&
    actual[PlayerPosition.FWD] === slots[PlayerPosition.FWD]
  );
}

// --- Cálculo de Puntuación ---

export function calculatePlayerPoints(
  player: SquadPlayer,
  isCaptain: boolean,
  isTripleCaptainActive: boolean
): number {
  let points = player.points;
  
  if (isCaptain) {
    const multiplier = isTripleCaptainActive 
      ? GAME_RULES.TRIPLE_CAPTAIN_MULTIPLIER 
      : GAME_RULES.CAPTAIN_MULTIPLIER;
    points *= multiplier;
  }
  
  return points;
}

export function calculatePredictionPoints(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number
): { points: number; result: PredictionResult } {
  // Resultado exacto
  if (predictedHome === actualHome && predictedAway === actualAway) {
    return { 
      points: GAME_RULES.PREDICTION_EXACT_POINTS, 
      result: PredictionResult.EXACT 
    };
  }
  
  // Acierta ganador o empate
  const predictedDiff = predictedHome - predictedAway;
  const actualDiff = actualHome - actualAway;
  
  if ((predictedDiff > 0 && actualDiff > 0) || 
      (predictedDiff < 0 && actualDiff < 0) || 
      (predictedDiff === 0 && actualDiff === 0)) {
    return { 
      points: GAME_RULES.PREDICTION_WINNER_POINTS, 
      result: PredictionResult.WINNER 
    };
  }
  
  // Fallo
  return { points: 0, result: PredictionResult.WRONG };
}

// --- Utilidades ---

export function formatPoints(points: number): string {
  if (points > 0) return `+${points}`;
  return `${points}`;
}

export function getPositionLabel(position: PlayerPosition): string {
  const labels = {
    [PlayerPosition.GK]: 'POR',
    [PlayerPosition.DEF]: 'DEF',
    [PlayerPosition.MID]: 'MED',
    [PlayerPosition.FWD]: 'DEL',
  };
  return labels[position];
}

export function getFormationOptions(): Formation[] {
  return Object.keys(FORMATION_SLOTS) as Formation[];
}

export function canAddPlayer(
  squad: SquadPlayer[],
  newPlayer: SquadPlayer
): { allowed: boolean; reason?: string } {
  // Ya está en el equipo
  if (squad.some(p => p.id === newPlayer.id)) {
    return { allowed: false, reason: 'Este jugador ya está en tu equipo' };
  }
  
  // Equipo completo
  if (squad.length >= GAME_RULES.SQUAD_SIZE) {
    return { allowed: false, reason: 'Tu equipo está completo (15 jugadores)' };
  }
  
  // Contar cuántos jugadores hay de cada selección
  const nationCount: Record<string, number> = {};
  for (const player of squad) {
    nationCount[player.nationId] = (nationCount[player.nationId] || 0) + 1;
  }
  
  // Verificar si ya tenemos 3 selecciones con 2 jugadores
  const nationsWithTwo = Object.values(nationCount).filter(c => c === 2).length;
  const currentPlayerNationCount = nationCount[newPlayer.nationId] || 0;
  
  // Si esta selección ya tiene 1 jugador y ya hay 3 selecciones con 2 jugadores, no permitir
  if (currentPlayerNationCount === 1 && nationsWithTwo >= GAME_RULES.NATIONS_WITH_DOUBLE) {
    return { 
      allowed: false, 
      reason: `Ya tienes 2 jugadores de ${GAME_RULES.NATIONS_WITH_DOUBLE} selecciones. No puedes tener 2 de más selecciones.` 
    };
  }
  
  // Restricción de selección (máximo 2 por selección)
  if (currentPlayerNationCount >= GAME_RULES.MAX_PLAYERS_PER_NATION) {
    return { allowed: false, reason: `Máximo ${GAME_RULES.MAX_PLAYERS_PER_NATION} jugadores de la misma selección` };
  }
  
  return { allowed: true };
}
