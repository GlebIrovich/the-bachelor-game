import './App.css';

import React, { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Confetti from './components/Confetti';
import { BASE_URL } from './config';
import CharacterDescriptionOverlay from './containers/Overlay/CharacterDescriptionOverlay';
import GameCompletedOverlay from './containers/Overlay/GameCompletedOverlay';
import JoinGameOverlay from './containers/Overlay/JoinGameOverlay';
import LoginOverlay from './containers/Overlay/LoginOverlay';
import SelectCharacterOverlay from './containers/Overlay/SelectCharacterOverlay';
import SignUpOverlay from './containers/Overlay/SignUpOverlay';
import SkillOverlay from './containers/Overlay/SkillOverlay';
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
  [OverlayKey.SIGN_UP]: SignUpOverlay,
  [OverlayKey.CHARACTER_DESCRIPTION]: CharacterDescriptionOverlay,
  [OverlayKey.SKILL_DESCRIPTION]: SkillOverlay,
}

const App = () => {
  const [{overlay, props}] = useOverlayContext()
  const OverlayComponent = overlay && overlayMap[overlay];
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes />
      {
        OverlayComponent && <OverlayComponent {...props}/>
      }
      {
        overlay === OverlayKey.GAME_COMPLETED ? <Confetti /> : undefined
      }
    </BrowserRouter>
  )
}

export default App;
