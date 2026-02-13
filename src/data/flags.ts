import type { FlagMap } from '../types/index.ts';

export const FLAG_MAP: FlagMap = {
  'México': 'mx',
  'Sudáfrica': 'za',
  'Corea del Sur': 'kr',
  'Brasil': 'br',
  'Marruecos': 'ma',
  'EE.UU.': 'us',
  'Paraguay': 'py',
  'Canadá': 'ca',
  'España': 'es',
  'Cabo Verde': 'cv',
  'Argentina': 'ar',
  'Argelia': 'dz',
  'Inglaterra': 'gb-eng',
  'Croacia': 'hr',
  'Francia': 'fr',
  'Senegal': 'sn',
  'Alemania': 'de',
  'Curazao': 'cw',
  'Colombia': 'co',
  'Portugal': 'pt',
  'Japón': 'jp',
  'Uruguay': 'uy',
  'Bélgica': 'be',
  'Países Bajos': 'nl',
  'Italia': 'it',
};

export const getFlagUrl = (code: string, _size: number = 40): string => {
  // Usar flagcdn con tamaño fijo para evitar problemas
  return `https://flagcdn.com/w80/${code}.png`;
};

export const getFlagByCountry = (country: string, size: number = 40): string => {
  const code = FLAG_MAP[country];
  if (!code) return '';
  return getFlagUrl(code, size);
};
