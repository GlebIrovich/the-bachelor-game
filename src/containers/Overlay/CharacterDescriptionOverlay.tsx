import { Button, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import Overlay from '.';
import { hideOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { characterDescriptionMap, characterTitleMap, CharacterType } from '../../models';
import OverlayWidget from './OverlayWidget';

interface Props {
  character: CharacterType;
}

const CharacterDescriptionOverlay: FC<Props> = ({character}) => {
  const [_state, dispatch] = useOverlayContext();
  return (
    <Overlay>
      <OverlayWidget
        hideCancelAction
        title={characterTitleMap[character]}
        actions={
          <Button
            onClick={() => dispatch(hideOverlay())}
            variant="contained"
            color="primary"
          >
            Ок
          </Button>
        }
        content={
          <Typography>
            {characterDescriptionMap[character]}
          </Typography>
        }
      />
    </Overlay>
  )
}

export default CharacterDescriptionOverlay
