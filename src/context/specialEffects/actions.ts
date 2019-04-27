import { ActionProps } from '../../models';
import { EffectsActionType, EffectsContextAction, EffectType } from '../../models/effects';

export const hideEffect = (): EffectsContextAction => ({
  type: EffectsActionType.HIDE,
  payload: undefined,
});

export const showEffect = (
  effect: EffectType,
  props?: ActionProps
): EffectsContextAction => ({
  type: EffectsActionType.SHOW,
  payload: effect,
  props,
});
