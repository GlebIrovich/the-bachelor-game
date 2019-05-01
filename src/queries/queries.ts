import gql from 'graphql-tag';
import { OperationVariables } from 'react-apollo';

import { Game, GameId, Player, User, UserId } from '../models';

export interface GetUserByEmailQueryVariables extends OperationVariables {
  email: string;
}

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
    }
  }
`;

export interface LoginQueryVariables extends OperationVariables {
  email: string;
  password: string;
}

export const LOGIN = gql`
  query loginUser($email: String!, $password: String!) {
    users(where: { _and: { email: { _eq: $email }, password: { _eq: $password } } }) {
      username
      id
      email
      active_game
    }
  }
`;

export interface GetGameQueryVariables extends OperationVariables {
  title: string;
}

export const GET_GAME = gql`
  query getGame($title: String!) {
    games(where: { title: { _eq: $title } }) {
      creator
      id
      modified
      title
    }
  }
`;

export interface GetGameByIdQueryVariables extends OperationVariables {
  gameId?: GameId;
}

export interface GetGameByIdData {
  games: [Game];
}

export const GET_GAME_BY_ID = gql`
  query getGameById($gameId: uuid!) {
    games(where: { id: { _eq: $gameId } }) {
      bars(order_by: { order: asc }) {
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

export interface GetUserQueryVariables extends OperationVariables {
  userId: UserId;
}

export const GET_USER = gql`
  query getUser($userId: uuid!) {
    users(where: { id: { _eq: $userId } }) {
      active_game
      email
      id
      modified
      username
    }
  }
`;

export interface GetActiveUsersQueryVariables extends OperationVariables {
  gameId: GameId;
}

export interface PlayerRelation extends Player {
  user: User;
}

export interface GetActiveUsersData {
  players: PlayerRelation[];
}

export const GET_ACTIVE_USERS = gql`
  query getUser($gameId: uuid!) {
    players(where: { game_id: { _eq: $gameId } }, order_by: { score: desc }) {
      user_id
      artefact
      attack
      defence
      game_id
      score
      character
      user {
        email
        id
        username
        active_game
      }
    }
  }
`;
