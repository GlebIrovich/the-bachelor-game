import { ActionProps, GenericAction } from './common';

export enum EffectType {
  EXPLOSION = 'explosion',
}

export interface EffectsContextState {
  effect?: EffectType;
  props?: ActionProps;
}

export enum EffectsActionType {
  SHOW = 'show',
  HIDE = 'hide',
}

export type EffectsContextAction = GenericAction<
  EffectsActionType,
  EffectType | undefined
>;
