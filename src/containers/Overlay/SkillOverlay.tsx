import { Button, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Mutation } from 'react-apollo';

import Overlay from '.';
import { useOverlayContext } from '../../context/OverlaysContext';
import { characterDescriptionMap, CharacterType, SkillStatus, SkillType, skillTypeMap, UserId } from '../../models';
import { UpdateGameDataMutationVariables } from '../../queries';
import OverlayWidget from './OverlayWidget';

interface Props {
  character: CharacterType;
  skillType: SkillType;
  skillStatus: SkillStatus;
  currentUserId: UserId;
}

class GameDataMutation extends Mutation<any, UpdateGameDataMutationVariables>{}

const CharacterDescriptionOverlay: FC<Props> = ({character, skillStatus, skillType, currentUserId}) => {
  const [,dispatch] = useOverlayContext();
  return (
    <Overlay>
      <OverlayWidget
        title={skillTypeMap[skillType]}
        actions={
          <Button
            onClick={() => {}}
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
