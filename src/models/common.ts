import { Dispatch } from 'react';

export interface OverlayProps {
  [key: string]: any;
}

export interface GenericAction<T, P> {
  type: T;
  payload: P;
  props?: OverlayProps,
}

export type GenericReducer<T, P> = [T, Dispatch<P>]

export enum JustifyContent {
  FLEX_END = 'flex-end',
  SPACE_BETWEEN = 'space-between',
}