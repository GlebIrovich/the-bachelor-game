import React, { createContext, FC, useContext, useReducer } from 'react';

import { EffectsContextAction, EffectsContextState, GenericReducer } from '../../models';
import { reducer } from './reducer';

const initialState: EffectsContextState = {};

type EffectsHook = GenericReducer<EffectsContextState, EffectsContextAction>;

export const EffectsContext = createContext<any>({});

export const EffectsProvider: FC = ({ children }) => (
  <EffectsContext.Provider
    value={useReducer(reducer, initialState)}
    key="effects"
  >
    {children}
  </EffectsContext.Provider>
);

export const useEffectsContext = () => useContext<EffectsHook>(EffectsContext);
