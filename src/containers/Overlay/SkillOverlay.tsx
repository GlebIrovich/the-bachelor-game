import { Button, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Mutation } from 'react-apollo';

import Overlay from '.';
import { hideOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { CharacterType, skillDescriptionMap, SkillStatus, SkillType, skillTypeMap, UserId } from '../../models';
import { UPDATE_SKILL_STATUS, UpdateSkillStatusMutationVariables } from '../../queries';
import OverlayWidget from './OverlayWidget';

export interface SkillOverlayProps {
  character: CharacterType;
  skillType: SkillType;
  skillStatus: SkillStatus;
  currentUserId: UserId;
  isCreator: boolean;
  isCharacterOwner: boolean;
}

class UpdateSkillStatusMutation extends Mutation<any, UpdateSkillStatusMutationVariables>{ }

const SkillOverlay: FC<SkillOverlayProps> = ({ character, skillStatus, skillType, currentUserId, isCreator, isCharacterOwner }) => {
  const [, dispatch] = useOverlayContext();
  const handleButtonClick = (fn: any) => () => {
    fn();
    dispatch(hideOverlay())
  }
  return (
    <Overlay>
      <OverlayWidget
        title={skillTypeMap[skillType]}
        actions={
          <UpdateSkillStatusMutation mutation={UPDATE_SKILL_STATUS(skillType)}>
            {
              (updateSkillStatus) => (
                <React.Fragment>
                  {
                    skillStatus === SkillStatus.READY && isCharacterOwner && (
                      <Button
                        fullWidth
                        onClick={handleButtonClick(() => updateSkillStatus({ variables: { userId: currentUserId, skillStatus: SkillStatus.USED } }))}
                        variant="contained"
                        color="primary"
                      >
                        Использовать
                      </Button>
                    )
                  }
                  {
                    skillStatus === SkillStatus.USED && isCreator && (
                      <Button
                        fullWidth
                        onClick={handleButtonClick(() => updateSkillStatus({ variables: { userId: currentUserId, skillStatus: SkillStatus.READY } }))}
                        variant="outlined"
                        color="primary"
                      >
                        Восстановить
                      </Button>
                    )
                  }
                </React.Fragment>
              )
            }
          </UpdateSkillStatusMutation>
        }
        content={
          <Typography>
            {skillDescriptionMap[character][skillType]}
          </Typography>
        }
      />
    </Overlay>
  )
}

export default SkillOverlay
