import { CharacterType } from './characters';
import { UserId } from './users';

export type GameId = string;

export interface Game {
  id: GameId;
  title: string;
  modified: number;
  creator: UserId;
  bars: Level[];
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
  character: CharacterType;
}

export enum LevelStatus {
  NONE = 'none',
  ACTIVE = 'active',
}

export interface Level {
  title: string;
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  order: number;
  status: LevelStatus;
}

export interface GameData {
  levels: Level[];
  activeLevel: string; // Level Id;
}
