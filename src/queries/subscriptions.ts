import { gql, OperationVariables } from 'apollo-boost';

import { GameId, Player } from '../models';

export interface SubscribeToPlayersVariables extends OperationVariables {
  gameId: GameId;
}

export interface SubscribeToPlayersData {
  players: Player[];
}

export const PLAYERS_SUBSCRIPTION = gql`
  subscription onPlayersChanged($gameId: uuid!) {
    players(where: {game_id: {_eq: $gameId}}) {
      user_id
      artefact
      attack
      defence
      game_id
      score
      user {
        character
        email
        id
        username
        active_game
      }
    }
  }
`;

export const GAME_SUBSCRIPTION = gql`
  subscription onGameChange($gameId: uuid!){
    games(where: {id: {_eq: $gameId}}) {
      bars(order_by: {order: asc}) {
        address
        id
        latitude
        longitude
        order
        status
        title
      }
      creator
      id
      modified
      title
    }
  }
`;