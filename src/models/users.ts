import { CharacterType } from './characters';
import { GameId } from './games';

export type UserId = string;

export interface User {
  id: UserId,
  username: string,
  email: string,
  active_game?: GameId 
  character?: CharacterType;
}