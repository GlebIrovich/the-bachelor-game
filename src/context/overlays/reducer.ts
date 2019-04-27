import { OverlayActionType, OverlayContextAction, OverlayContextState } from '../../models';

export const reducer = (
  state: OverlayContextState,
  action: OverlayContextAction
): OverlayContextState => {
  switch (action.type) {
    case OverlayActionType.SHOW:
      return {
        ...state,
        overlay: action.payload,
        props: action.props,
      };

    case OverlayActionType.HIDE:
      return {
        ...state,
        overlay: undefined,
        props: undefined,
      };

    default:
      return state;
  }
};
