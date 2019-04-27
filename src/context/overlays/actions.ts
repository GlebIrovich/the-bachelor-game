import { ActionProps } from '../../models';
import { OverlayActionType, OverlayContextAction as OverlayAction, OverlayKey } from '../../models/overlays';

export const hideOverlay = (): OverlayAction => ({
  type: OverlayActionType.HIDE,
  payload: undefined,
});

export const showOverlay = (
  overlay: OverlayKey,
  props?: ActionProps
): OverlayAction => ({
  type: OverlayActionType.SHOW,
  payload: overlay,
  props,
});
