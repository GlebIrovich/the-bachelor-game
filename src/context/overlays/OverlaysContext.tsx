import React, { createContext, FC, useContext, useReducer } from 'react';

import { GenericReducer, OverlayContextAction, OverlayContextState } from '../../models';
import { reducer } from './reducer';

const initialState: OverlayContextState = {};

type OverlayHook = GenericReducer<OverlayContextState, OverlayContextAction>;

export const OverlayContext = createContext<any>({});

export const OverlayProvider: FC = ({ children }) => (
  <OverlayContext.Provider
    value={useReducer(reducer, initialState)}
    key="overlay"
  >
    {children}
  </OverlayContext.Provider>
);

export const useOverlayContext = () => useContext<OverlayHook>(OverlayContext);
