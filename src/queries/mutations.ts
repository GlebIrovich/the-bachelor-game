import gql from 'graphql-tag';
import { OperationVariables } from 'react-apollo';

import { CharacterType, GameId, Player, SkillStatus, SkillType, User, UserId } from '../models';

export interface SetActiveGameQueryVariables extends OperationVariables {
  userId: string;
  gameId: string;
  character: CharacterType;
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
  mutation setActiveGame($userId: uuid!, $gameId: uuid!, $character: String!) {
    update_users(where: { id: { _eq: $userId } }, _set: { active_game: $gameId }) {
      returning {
        active_game
        email
        id
        username
      }
    }
    insert_players(
      objects: { user_id: $userId, game_id: $gameId, character: $character }
      on_conflict: { update_columns: [defence, attack, artefact, score], constraint: players_pkey }
    ) {
      returning {
        user_id
        score
        defence
        attack
        artefact
        character
      }
    }
  }
`;

export interface MutateCharacterData {
  update_players: {
    returning: [Player];
  };
}

export interface SetCharacterMutationVariables extends OperationVariables {
  userId: string;
  character: string;
}

export const SET_CHARACTER = gql`
  mutation setCharacter($userId: uuid!, $character: String!) {
    update_players(where: { user_id: { _eq: $userId } }, _set: { character: $character }) {
      returning {
        user_id
        character
      }
    }
  }
`;

export interface ResetPlayerSkillsMutationVariables extends OperationVariables {
  userId: UserId;
  gameId: GameId;
}

export const RESET_PLAYER_SKILLS = gql`
  mutation resetPlayerSkills($userId: uuid!, $gameId: uuid!) {
    update_players(
      where: { _and: { user_id: { _eq: $userId }, game_id: { _eq: $gameId } } }
      _set: { attack: "ready", defence: "ready", artefact: "ready" }
    ) {
      affected_rows
    }
  }
`;

export interface InsertNewUserMutationVariables extends OperationVariables {
  email: string;
  username: string;
  password: string;
}

export const INSERT_NEW_USER = gql`
  mutation insertNewUser($email: String!, $password: String!, $username: String!) {
    insert_users(objects: { email: $email, password: $password, username: $username }) {
      returning {
        id
        email
        username
      }
    }
  }
`;

export interface UpdateSkillStatusMutationVariables extends OperationVariables {
  userId: UserId;
  skillStatus: SkillStatus;
}

export const UPDATE_SKILL_STATUS = (skill: SkillType) => gql`
  mutation updateSkillStatus($userId: uuid!, $skillStatus: String!) {
    update_players(where: {user_id: {_eq: $userId}}, _set: {${skill}: $skillStatus}) {
      returning {
        user_id
      }
    }
  }
`;

export interface ResetSkillsStatusMutationVariables extends OperationVariables {
  gameId: GameId;
}

export const RESET_SKILLS_STATUS = gql`
  mutation updateSkills($gameId: uuid!) {
    update_players(
      where: { game_id: { _eq: $gameId } }
      _set: { attack: "ready", defence: "ready", artefact: "ready" }
    ) {
      affected_rows
    }
  }
`;

export interface UpdateBarStatusMutationVariables extends OperationVariables {
  barId: UserId;
}

export const UPDATE_BAR_STATUS = gql`
  mutation updateBarStatus($barId: uuid!) {
    update_bars(where: { id: { _eq: $barId } }, _set: { status: "active" }) {
      affected_rows
    }
  }
`;

export const RESET_BAR_STATUS = gql`
  mutation updateBarStatus {
    update_bars(where: {}, _set: { status: "none" }) {
      affected_rows
    }
  }
`;

export interface UpdatePlayerScoreMutationVariables extends OperationVariables {
  userId: UserId;
  score: number;
}

export const UPDATE_PLAYER_SCORE = gql`
  mutation updatePlayerScore($userId: uuid!, $score: Int!) {
    update_players(where: { user_id: { _eq: $userId } }, _set: { score: $score }) {
      affected_rows
    }
  }
`;
