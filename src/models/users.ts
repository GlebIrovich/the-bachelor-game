import { Omit } from 'react-apollo-hooks/lib/utils';

import { CharacterType } from './characters';
import { GameId, Player } from './games';

export type UserId = string;

export interface User {
  id: UserId,
  username: string,
  email: string,
  active_game?: GameId 
  character?: CharacterType;
}

export type ActiveUser = Required<Omit<User, 'active_game'>> & Omit<Player, 'game_id' | 'user_id'>;