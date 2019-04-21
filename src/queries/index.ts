import gql from 'graphql-tag';
import { OperationVariables } from 'react-apollo';

import { GameId, UserId } from '../models';

export interface GetUserByEmailQueryVariables extends OperationVariables {
  email: string,
}

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!){
    users(where: {email: {_eq: $email}}) {
      id
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

`

export interface LoginQueryVariables extends OperationVariables {
  email: string,
  password: string;
}

export const LOGIN = gql`
  query loginUser($email: String!, $password: String!){
    users(where: {_and: {email: {_eq: $email}, password: {_eq: $password}}}) {
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
  query getGame($title: String!){
    games(where: {title: {_eq: $title}}) {
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

export const GET_GAME_BY_ID = gql`
  query getGameById($gameId: uuid!){
    games(where: {id: {_eq: $gameId}}) {
      creator
      id
      modified
      title
    }
  }
`;

export interface GetUserQueryVariables extends OperationVariables {
  userId: UserId,
}

export const GET_USER = gql`
  query getUser($userId: uuid!){
    users(where: {id: {_eq: $userId}}) {
      active_game
      character
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

export const GET_ACTIVE_USERS = gql`
  query getUser($gameId: uuid!){
    users(where: {active_game: {_eq: $gameId}}) {
      active_game
      character
      email
      id
      username
    }
  }
`;

export interface SetActiveGameQueryVariables extends OperationVariables {
  userId: string,
  gameId: string;
}

export const SET_ACTIVE_GAME = gql`
  mutation setActiveGame($userId: uuid!, $gameId: uuid!){
    update_users(_set: {active_game: $gameId}, where: {id: {_eq: $userId}}) {
      returning {
        active_game
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







export const VALIDATE_EMAIL = gql`
  query validateEmail($userId: ID!){
    users(where: {id: {_eq: $userId}}) {
      id
      name
    }
  }
`;