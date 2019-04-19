import { Action as OverlayAction, OverlayActionType, OverlayKey } from '../models/overlays';

export const hideOverlay = (): OverlayAction => ({
  type: OverlayActionType.HIDE,
  payload: undefined,
})

export const showOverlay = (overlay: OverlayKey): OverlayAction => ({
  type: OverlayActionType.SHOW,
  payload: overlay,
})