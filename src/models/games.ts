import { UserId } from './users';

export type GameId = string;

export interface Game {
  id: GameId;
  title: string;
  modified: number; 
  game_data: GameData;
  creator: UserId;
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
  game_id: GameId;
  user_id: UserId;
  score: number;
  attack: SkillStatus;
  defence: SkillStatus;
  artefact: SkillStatus;
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