import { Action, OverlayActionType, OverlayContextState } from '../models/overlays';

export const reducer = (state: OverlayContextState, action: Action): OverlayContextState => {
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