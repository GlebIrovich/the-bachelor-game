import { ActiveUser } from '../models';
import { PlayerRelation } from '../queries';

export const convertActiveUser = (players: PlayerRelation[]): ActiveUser[] => {
  return players.map(({game_id, user: {active_game, character, ...restUser}, user_id, ...player}) => ({...player, ...restUser, character: character!}))
}