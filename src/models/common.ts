import { Dispatch } from 'react';

export interface GenericAction<T, P> {
  type: T;
  payload: P;
}

export type GenericReducer<T, P> = [T, Dispatch<P>]