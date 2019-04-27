import { ActionProps, GenericAction } from './common';

export enum OverlayKey {
  GAME_COMPLETED = 'gameCompleted',
  JOIN_GAME = 'gameJoin',
  SELECT_CHARACTER = 'selectCharacter',
  LOGIN = 'login',
  SIGN_UP = 'signUp',
  CHARACTER_DESCRIPTION = 'characterDescription',
  SKILL_DESCRIPTION = 'skillDescription',
}

export interface OverlayContextState {
  overlay?: OverlayKey;
  props?: ActionProps;
}

export enum OverlayActionType {
  SHOW = 'show',
  HIDE = 'hide',
}

export type OverlayContextAction = GenericAction<
  OverlayActionType,
  OverlayKey | undefined
>;
