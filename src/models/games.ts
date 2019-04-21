export type GameId = string;

export interface Game {
  id: GameId;
  title: string;
  created: number; 
  game_data: GameData;
}

export enum SkillStatus {
  USED = 'used',
  READY = 'ready',
}

export enum SkillType {
  ATTACK = 'attack',
  DEFENCE = 'defence',
  ARTEFACT = 'artefact',
}

export interface Player {
  score: number;
  attackSkill: SkillStatus;
  defenceSkill: SkillStatus;
  artefactSkill: SkillStatus;
}

export interface Level {
  title: string;
  address: string;
  id: string;
}

export interface GameData {
  levels: Level[];
  activeLevel: string; // Level Id;
}