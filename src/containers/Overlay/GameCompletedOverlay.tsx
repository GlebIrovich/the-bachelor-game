import { Button } from '@material-ui/core';
import React from 'react';

import Overlay from '.';
import { hideOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import OverlayWidget from './OverlayWidget';

const GameCompletedOverlay = () => {
  const [_state, dispatch] = useOverlayContext();
  return (
    <Overlay>
      <OverlayWidget
        title="Победа!"
        message="Ура! Мы это сделали!"
        actions={
          <Button
            onClick={() => dispatch(hideOverlay())}
            variant="contained"
            color="primary"
          >
            Готово
          </Button>
        }
      />
    </Overlay>
  )
}

export default GameCompletedOverlay
