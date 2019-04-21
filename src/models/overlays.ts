import { GenericAction } from './common';

export enum OverlayKey {
  GAME_COMPLETED = 'gameCompleted',
  JOIN_GAME = 'gameJoin',
  SELECT_CHARACTER = 'selectCharacter',
  LOGIN = 'login',
  SIGN_UP = 'signUp',
}

export interface OverlayContextState {
  overlay?: OverlayKey;
}

export enum OverlayActionType {
  SHOW = 'show',
  HIDE = 'hide'
}

export type Action = GenericAction<OverlayActionType, OverlayKey | undefined>;