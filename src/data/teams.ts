import type { TeamsData } from '../types/index.ts';

export const TEAMS: TeamsData = {
  "México": {
    c: "mx",
    g: "A",
    rk: 15,
    coach: "Javier Aguirre",
    schema: "5-4-1",
    form: ["W", "W", "D", "L", "W"],
    squad: [
      { id: 1, n: "G. Ochoa", p: "POR", club: "Salernitana", v: 5, s: 72 },
      { id: 2, n: "L. Malagón", p: "POR", club: "América", v: 7, s: 74 },
      { id: 3, n: "J. Gonzalez", p: "POR", club: "Valencia", v: 4, s: 71 },
      { id: 4, n: "J. Sánchez", p: "DEF", club: "Ajax", v: 22, s: 78, h: 1 },
      { id: 5, n: "C. Montes", p: "DEF", club: "Besiktas", v: 14, s: 76 },
      { id: 6, n: "J. Gallardo", p: "DEF", club: "Toluca", v: 8, s: 73 },
      { id: 7, n: "G. Arteaga", p: "DEF", club: "Genk", v: 11, s: 75 },
      { id: 8, n: "J. Vasquez", p: "DEF", club: "Cremonese", v: 10, s: 74 },
      { id: 9, n: "I. Reyes", p: "DEF", club: "Tigres", v: 6, s: 71 },
      { id: 10, n: "E. Álvarez", p: "MED", club: "América", v: 12, s: 76, h: 1 },
      { id: 11, n: "L. Romo", p: "MED", club: "Monterrey", v: 10, s: 74 },
      { id: 12, n: "O. Pineda", p: "MED", club: "AEK Atenas", v: 9, s: 73 },
      { id: 13, n: "C. Rodríguez", p: "MED", club: "Cruz Azul", v: 8, s: 72 },
      { id: 14, n: "R. Sánchez", p: "MED", club: "América", v: 7, s: 71 },
      { id: 15, n: "D. Lainez", p: "MED", club: "Tigres", v: 11, s: 74 },
      { id: 16, n: "A. Vega", p: "MED", club: "Toluca", v: 9, s: 73 },
      { id: 17, n: "S. Giménez", p: "DEL", club: "Feyenoord", v: 30, s: 83, h: 1 },
      { id: 18, n: "H. Lozano", p: "DEL", club: "PSV", v: 18, s: 79, h: 1 },
      { id: 19, n: "J. Vega", p: "DEL", club: "Toluca", v: 12, s: 76 },
      { id: 20, n: "U. Antuna", p: "DEL", club: "Cruz Azul", v: 9, s: 73 },
      { id: 21, n: "R. Puente", p: "DEL", club: "Pumas", v: 6, s: 70 }
    ]
  },
  "Argentina": {
    c: "ar",
    g: "C",
    rk: 2,
    coach: "L. Scaloni",
    schema: "4-3-3",
    form: ["W", "W", "W", "D", "W"],
    squad: [
      { id: 30, n: "E. Martínez", p: "POR", club: "Aston Villa", v: 35, s: 86 },
      { id: 31, n: "F. Armani", p: "POR", club: "River Plate", v: 5, s: 72 },
      { id: 32, n: "N. Molina", p: "DEF", club: "Atlético", v: 28, s: 80 },
      { id: 33, n: "C. Romero", p: "DEF", club: "Tottenham", v: 55, s: 85 },
      { id: 34, n: "L. Martínez Q.", p: "DEF", club: "Inter", v: 52, s: 84 },
      { id: 35, n: "N. Otamendi", p: "DEF", club: "Benfica", v: 8, s: 74 },
      { id: 36, n: "G. Montiel", p: "DEF", club: "Sevilla", v: 15, s: 77 },
      { id: 37, n: "M. Acuña", p: "DEF", club: "Sevilla", v: 12, s: 75 },
      { id: 38, n: "R. De Paul", p: "MED", club: "Atlético", v: 30, s: 82 },
      { id: 39, n: "E. Fernández", p: "MED", club: "Chelsea", v: 75, s: 87, h: 1 },
      { id: 40, n: "A. Mac Allister", p: "MED", club: "Liverpool", v: 70, s: 86, h: 1 },
      { id: 41, n: "L. Paredes", p: "MED", club: "Roma", v: 12, s: 76 },
      { id: 42, n: "G. Lo Celso", p: "MED", club: "Betis", v: 20, s: 79 },
      { id: 43, n: "E. Palacios", p: "MED", club: "Leverkusen", v: 25, s: 78 },
      { id: 44, n: "L. Messi", p: "DEL", club: "Inter Miami", v: 50, s: 90, h: 1 },
      { id: 45, n: "J. Álvarez", p: "DEL", club: "Atlético", v: 80, s: 87, h: 1 },
      { id: 46, n: "L. Martínez", p: "DEL", club: "Inter", v: 85, s: 88 },
      { id: 47, n: "Á. Di María", p: "DEL", club: "Benfica", v: 10, s: 77 },
      { id: 48, n: "N. González", p: "DEL", club: "Juventus", v: 35, s: 81 }
    ]
  },
  "España": {
    c: "es",
    g: "F",
    rk: 1,
    coach: "De la Fuente",
    schema: "4-3-3",
    form: ["W", "W", "W", "W", "D"],
    squad: [
      { id: 50, n: "Unai Simón", p: "POR", club: "Athletic", v: 30, s: 83 },
      { id: 51, n: "D. Raya", p: "POR", club: "Arsenal", v: 28, s: 82 },
      { id: 52, n: "Carvajal", p: "DEF", club: "R. Madrid", v: 40, s: 84 },
      { id: 53, n: "Cucurella", p: "DEF", club: "Chelsea", v: 38, s: 81 },
      { id: 54, n: "R. Le Normand", p: "DEF", club: "Atlético", v: 30, s: 80 },
      { id: 55, n: "Laporte", p: "DEF", club: "Al-Nassr", v: 18, s: 78 },
      { id: 56, n: "Pedri", p: "MED", club: "Barcelona", v: 90, s: 89, h: 1 },
      { id: 57, n: "Rodri", p: "MED", club: "Man City", v: 110, s: 93, h: 1 },
      { id: 58, n: "Gavi", p: "MED", club: "Barcelona", v: 60, s: 84 },
      { id: 59, n: "D. Olmo", p: "MED", club: "Barcelona", v: 55, s: 84 },
      { id: 60, n: "Lamine Yamal", p: "DEL", club: "Barcelona", v: 150, s: 92, h: 1 },
      { id: 61, n: "N. Williams", p: "DEL", club: "Athletic", v: 70, s: 86, h: 1 },
      { id: 62, n: "Morata", p: "DEL", club: "AC Milan", v: 25, s: 79 },
      { id: 63, n: "Oyarzabal", p: "DEL", club: "R. Sociedad", v: 30, s: 80 }
    ]
  },
  "Francia": {
    c: "fr",
    g: "D",
    rk: 3,
    coach: "Deschamps",
    schema: "4-2-3-1",
    form: ["W", "D", "W", "W", "L"],
    squad: [
      { id: 70, n: "Maignan", p: "POR", club: "AC Milan", v: 45, s: 85 },
      { id: 71, n: "Koundé", p: "DEF", club: "Barcelona", v: 55, s: 84 },
      { id: 72, n: "Saliba", p: "DEF", club: "Arsenal", v: 70, s: 86, h: 1 },
      { id: 73, n: "Upamecano", p: "DEF", club: "Bayern", v: 40, s: 82 },
      { id: 74, n: "T. Hernández", p: "DEF", club: "AC Milan", v: 50, s: 83 },
      { id: 75, n: "Tchouaméni", p: "MED", club: "R. Madrid", v: 75, s: 85 },
      { id: 76, n: "Griezmann", p: "MED", club: "Atlético", v: 30, s: 83 },
      { id: 77, n: "Rabiot", p: "MED", club: "Marsella", v: 18, s: 79 },
      { id: 78, n: "Mbappé", p: "DEL", club: "R. Madrid", v: 180, s: 94, h: 1 },
      { id: 79, n: "Dembélé", p: "DEL", club: "PSG", v: 70, s: 85 },
      { id: 80, n: "Thuram", p: "DEL", club: "Inter", v: 65, s: 84 }
    ]
  },
  "Brasil": {
    c: "br",
    g: "E",
    rk: 5,
    coach: "Dorival Jr.",
    schema: "4-2-3-1",
    form: ["W", "L", "W", "D", "W"],
    squad: [
      { id: 90, n: "Alisson", p: "POR", club: "Liverpool", v: 50, s: 87 },
      { id: 91, n: "Marquinhos", p: "DEF", club: "PSG", v: 35, s: 83 },
      { id: 92, n: "G. Magalhães", p: "DEF", club: "Arsenal", v: 55, s: 84, h: 1 },
      { id: 93, n: "Militão", p: "DEF", club: "R. Madrid", v: 45, s: 83 },
      { id: 94, n: "Danilo", p: "DEF", club: "Juventus", v: 12, s: 75 },
      { id: 95, n: "B. Guimarães", p: "MED", club: "Newcastle", v: 70, s: 86, h: 1 },
      { id: 96, n: "Paquetá", p: "MED", club: "West Ham", v: 40, s: 82 },
      { id: 97, n: "Rodrygo", p: "MED", club: "R. Madrid", v: 90, s: 87 },
      { id: 98, n: "Vinicius Jr", p: "DEL", club: "R. Madrid", v: 150, s: 93, h: 1 },
      { id: 99, n: "Endrick", p: "DEL", club: "R. Madrid", v: 60, s: 82, h: 1 },
      { id: 100, n: "Raphinha", p: "DEL", club: "Barcelona", v: 65, s: 85 }
    ]
  },
  "Inglaterra": {
    c: "gb-eng",
    g: "G",
    rk: 4,
    coach: "Tuchel",
    schema: "4-3-3",
    form: ["W", "W", "D", "W", "W"],
    squad: [
      { id: 110, n: "Pickford", p: "POR", club: "Everton", v: 25, s: 80 },
      { id: 111, n: "Stones", p: "DEF", club: "Man City", v: 30, s: 81 },
      { id: 112, n: "Walker", p: "DEF", club: "Man City", v: 20, s: 79 },
      { id: 113, n: "Guehi", p: "DEF", club: "C. Palace", v: 28, s: 80 },
      { id: 114, n: "Rice", p: "MED", club: "Arsenal", v: 100, s: 88, h: 1 },
      { id: 115, n: "Bellingham", p: "MED", club: "R. Madrid", v: 150, s: 92, h: 1 },
      { id: 116, n: "Foden", p: "MED", club: "Man City", v: 110, s: 89 },
      { id: 117, n: "Saka", p: "DEL", club: "Arsenal", v: 120, s: 90, h: 1 },
      { id: 118, n: "Kane", p: "DEL", club: "Bayern", v: 80, s: 88 },
      { id: 119, n: "Palmer", p: "DEL", club: "Chelsea", v: 85, s: 87, h: 1 }
    ]
  },
  "Alemania": {
    c: "de",
    g: "H",
    rk: 8,
    coach: "Nagelsmann",
    schema: "4-2-3-1",
    form: ["W", "D", "W", "W", "D"],
    squad: [
      { id: 120, n: "Neuer", p: "POR", club: "Bayern", v: 20, s: 82 },
      { id: 121, n: "Kimmich", p: "DEF", club: "Barcelona", v: 65, s: 87, h: 1 },
      { id: 122, n: "Rüdiger", p: "DEF", club: "R. Madrid", v: 35, s: 83 },
      { id: 123, n: "Schlotterbeck", p: "DEF", club: "Dortmund", v: 28, s: 80 },
      { id: 124, n: "Musiala", p: "MED", club: "Bayern", v: 120, s: 90, h: 1 },
      { id: 125, n: "Wirtz", p: "MED", club: "Leverkusen", v: 130, s: 91, h: 1 },
      { id: 126, n: "Kroos", p: "MED", club: "Retirado", v: 10, s: 80 },
      { id: 127, n: "Havertz", p: "DEL", club: "Arsenal", v: 55, s: 83 },
      { id: 128, n: "Füllkrug", p: "DEL", club: "West Ham", v: 30, s: 79 },
      { id: 129, n: "Sané", p: "DEL", club: "Bayern", v: 45, s: 83 }
    ]
  },
  "Portugal": {
    c: "pt",
    g: "I",
    rk: 6,
    coach: "R. Martínez",
    schema: "4-3-3",
    form: ["W", "W", "W", "D", "W"],
    squad: [
      { id: 130, n: "D. Costa", p: "POR", club: "Porto", v: 25, s: 81 },
      { id: 131, n: "R. Dias", p: "DEF", club: "Man City", v: 45, s: 83 },
      { id: 132, n: "Cancelo", p: "DEF", club: "Barcelona", v: 35, s: 82 },
      { id: 133, n: "N. Mendes", p: "DEF", club: "PSG", v: 30, s: 80 },
      { id: 134, n: "B. Fernandes", p: "MED", club: "Man Utd", v: 55, s: 85, h: 1 },
      { id: 135, n: "B. Silva", p: "MED", club: "Man City", v: 60, s: 86 },
      { id: 136, n: "Vitinha", p: "MED", club: "PSG", v: 50, s: 84 },
      { id: 137, n: "R. Leão", p: "DEL", club: "AC Milan", v: 80, s: 86, h: 1 },
      { id: 138, n: "Cristiano R.", p: "DEL", club: "Al-Nassr", v: 30, s: 82 },
      { id: 139, n: "Gonçalo Ramos", p: "DEL", club: "PSG", v: 40, s: 81 }
    ]
  },
  "Colombia": {
    c: "co",
    g: "D",
    rk: 12,
    coach: "N. Lorenzo",
    schema: "4-4-2",
    form: ["W", "W", "D", "W", "L"],
    squad: [
      { id: 140, n: "C. Vargas", p: "POR", club: "Atlas", v: 8, s: 74 },
      { id: 141, n: "D. Sánchez", p: "DEF", club: "Tottenham", v: 22, s: 79 },
      { id: 142, n: "Y. Mina", p: "DEF", club: "Cagliari", v: 10, s: 75 },
      { id: 143, n: "J. Arias", p: "MED", club: "Zenit", v: 25, s: 80, h: 1 },
      { id: 144, n: "J. Rodríguez", p: "MED", club: "Rayo", v: 12, s: 78 },
      { id: 145, n: "R. Ríos", p: "MED", club: "Palmeiras", v: 18, s: 77 },
      { id: 146, n: "L. Díaz", p: "DEL", club: "Liverpool", v: 65, s: 86, h: 1 },
      { id: 147, n: "J. Córdoba", p: "DEL", club: "Krasnodar", v: 20, s: 77 },
      { id: 148, n: "L. Sinisterra", p: "DEL", club: "Bournemouth", v: 22, s: 78 }
    ]
  },
  "EE.UU.": {
    c: "us",
    g: "B",
    rk: 11,
    coach: "Pochettino",
    schema: "4-3-3",
    form: ["W", "D", "W", "L", "W"],
    squad: [
      { id: 150, n: "M. Turner", p: "POR", club: "Nottingham", v: 10, s: 75 },
      { id: 151, n: "S. Dest", p: "DEF", club: "PSV", v: 15, s: 77 },
      { id: 152, n: "T. Robinson", p: "DEF", club: "Fulham", v: 20, s: 78 },
      { id: 153, n: "T. Adams", p: "MED", club: "Bournemouth", v: 25, s: 79 },
      { id: 154, n: "McKennie", p: "MED", club: "Juventus", v: 22, s: 78 },
      { id: 155, n: "Musah", p: "MED", club: "AC Milan", v: 20, s: 77 },
      { id: 156, n: "C. Pulisic", p: "DEL", club: "AC Milan", v: 52, s: 84, h: 1 },
      { id: 157, n: "T. Weah", p: "DEL", club: "Juventus", v: 25, s: 78 },
      { id: 158, n: "R. Pepi", p: "DEL", club: "PSV", v: 18, s: 76 }
    ]
  },
  "Japón": {
    c: "jp",
    g: "E",
    rk: 17,
    coach: "Moriyasu",
    schema: "4-2-3-1",
    form: ["W", "W", "W", "W", "D"],
    squad: [
      { id: 160, n: "S. Suzuki", p: "POR", club: "Feyenoord", v: 10, s: 75 },
      { id: 161, n: "T. Tomiyasu", p: "DEF", club: "Arsenal", v: 22, s: 79 },
      { id: 162, n: "K. Itakura", p: "DEF", club: "B. M'gladbach", v: 15, s: 76 },
      { id: 163, n: "W. Endo", p: "MED", club: "Liverpool", v: 18, s: 78 },
      { id: 164, n: "T. Kubo", p: "MED", club: "R. Sociedad", v: 40, s: 82, h: 1 },
      { id: 165, n: "K. Mitoma", p: "MED", club: "Brighton", v: 35, s: 81, h: 1 },
      { id: 166, n: "D. Kamada", p: "DEL", club: "C. Palace", v: 18, s: 77 },
      { id: 167, n: "A. Ueda", p: "DEL", club: "Feyenoord", v: 12, s: 75 }
    ]
  },
  "Uruguay": {
    c: "uy",
    g: "H",
    rk: 9,
    coach: "Bielsa",
    schema: "4-3-3",
    form: ["W", "D", "W", "L", "W"],
    squad: [
      { id: 170, n: "Rochet", p: "POR", club: "Inter", v: 10, s: 75 },
      { id: 171, n: "R. Araújo", p: "DEF", club: "Barcelona", v: 55, s: 84, h: 1 },
      { id: 172, n: "J.M. Giménez", p: "DEF", club: "Atlético", v: 30, s: 81 },
      { id: 173, n: "F. Valverde", p: "MED", club: "R. Madrid", v: 100, s: 89, h: 1 },
      { id: 174, n: "N. De la Cruz", p: "MED", club: "Flamengo", v: 15, s: 77 },
      { id: 175, n: "D. Núñez", p: "DEL", club: "Liverpool", v: 60, s: 84, h: 1 },
      { id: 176, n: "L. Suárez", p: "DEL", club: "Inter Miami", v: 8, s: 76 }
    ]
  }
};

// Función helper para obtener todos los jugadores de todos los equipos
export const getAllPlayers = () => {
  const players: any[] = [];
  Object.entries(TEAMS).forEach(([teamName, team]) => {
    team.squad.forEach(player => {
      players.push({
        ...player,
        nation: teamName,
        flag: team.c
      });
    });
  });
  return players;
};
