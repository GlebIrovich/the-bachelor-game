import './App.css';

import React, { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Confetti from './components/Confetti';
import { BASE_URL } from './config';
import GameCompletedOverlay from './containers/Overlay/GameCompletedOverlay';
import JoinGameOverlay from './containers/Overlay/JoinGameOverlay';
import LoginOverlay from './containers/Overlay/LoginOverlay';
import SelectCharacterOverlay from './containers/Overlay/SelectCharacterOverlay';
import Routes from './containers/Routes';
import { useOverlayContext } from './context/OverlaysContext';
import { OverlayKey } from './models/overlays';

interface OverlayMapping {
  [overlayKey: string]: ComponentType<any>;
}

const overlayMap: OverlayMapping = {
  [OverlayKey.GAME_COMPLETED]: GameCompletedOverlay,
  [OverlayKey.JOIN_GAME]: JoinGameOverlay,
  [OverlayKey.SELECT_CHARACTER]: SelectCharacterOverlay,
  [OverlayKey.LOGIN]: LoginOverlay,
}

const App = () => {
  const [{overlay}] = useOverlayContext()
  const OverlayComponent = overlay && overlayMap[overlay];
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes />
      {
        OverlayComponent && <OverlayComponent />
      }
      {
        overlay === OverlayKey.GAME_COMPLETED ? <Confetti /> : undefined
      }
    </BrowserRouter>
  )
}

export default App;
