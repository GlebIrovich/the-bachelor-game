import { OverlayProps } from '../models';
import { Action as OverlayAction, OverlayActionType, OverlayKey } from '../models/overlays';

export const hideOverlay = (): OverlayAction => ({
  type: OverlayActionType.HIDE,
  payload: undefined,
})

export const showOverlay = (overlay: OverlayKey, props?: OverlayProps): OverlayAction => ({
  type: OverlayActionType.SHOW,
  payload: overlay,
  props,
})