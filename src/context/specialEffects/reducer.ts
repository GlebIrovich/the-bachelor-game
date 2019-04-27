import { EffectsActionType, EffectsContextAction, EffectsContextState } from '../../models/effects';

export const reducer = (
  state: EffectsContextState,
  action: EffectsContextAction
): EffectsContextState => {
  switch (action.type) {
    case EffectsActionType.SHOW:
      return {
        ...state,
        effect: action.payload,
        props: action.props,
      };

    case EffectsActionType.HIDE:
      return {
        ...state,
        effect: undefined,
        props: undefined,
      };

    default:
      return state;
  }
};
