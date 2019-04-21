import gql from 'graphql-tag';
import { OperationVariables } from 'react-apollo';

import { GameData, GameId, Player, User } from '../models';


export interface SetActiveGameQueryVariables extends OperationVariables {
  userId: string,
  gameId: string;
}

export interface SetActiveGameData {
  insert_players: {
    returning: [Player];
  };
  update_users: {
    returning: [User];
  };
}

export const SET_ACTIVE_GAME = gql`
  mutation setActiveGame($userId: uuid!, $gameId: uuid!){
    update_users(where: {id: {_eq: $userId}}, _set: {active_game: $gameId}) {
      returning {
        active_game
        character
        email
        id
        username
      }
    }
    insert_players(objects: {user_id: $userId, game_id: $gameId}, on_conflict: {update_columns: [defence, attack, artefact, score], constraint: players_pkey}) {
      returning {
        user_id
        score
        defence
        attack
        artefact
      }
    }
  }
`;

export interface SetCharacterQueryVariables extends OperationVariables {
  userId: string,
  character: string;
}

export const SET_CHARACTER = gql`
  mutation setActiveGame($userId: uuid!, $character: String!){
    update_users(where: {id: {_eq: $userId}}, _set: {character: $character}){
      returning {
        character
      }
    }
  }
`;

export interface UpdateGameDataMutationVariables extends OperationVariables {
  gameId: GameId;
  gameData: GameData;
}

export const UPDATE_GAME_DATA = gql`
  mutation updateGameData($gameId: uuid!, $gameData: json!){
    update_games(where: {id: {_eq: $gameId}}, _set: {game_data: $gameData}) {
      returning {
        creator
        game_data
        id
        modified
        title
      }
    }
  }
`;

export interface InsertNewUserMutationVariables extends OperationVariables {
  email: string,
  username: string,
  password: string;
}

export const INSERT_NEW_USER = gql`
  mutation insertNewUser($email: String!, $password: String!, $username: String!) {
  insert_users(objects: {email: $email, password: $password, username: $username}) {
    returning {
      id
      email
      username
    }
  }
}
`;