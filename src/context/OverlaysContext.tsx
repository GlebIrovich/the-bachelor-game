import React, { createContext, FC, useContext, useReducer } from 'react';

import { GenericReducer } from '../models/common';
import { Action as OverlayAction, OverlayContextState } from '../models/overlays';
import { reducer } from './reducer';

const initialState: OverlayContextState = {}

type OverlayHook = GenericReducer<OverlayContextState, OverlayAction>

export const OverlayContext = createContext<any>({});

export const OverlayProvider: FC = ({children}) => (
  <OverlayContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </OverlayContext.Provider>
)

export const useOverlayContext = () => useContext<OverlayHook>(OverlayContext);
