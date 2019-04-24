import { Grid, SvgIcon } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import { UserId } from '../../models';
import { UPDATE_PLAYER_SCORE, UpdatePlayerScoreMutationVariables } from '../../queries';
import DownIcon from './icons/DownIcon';
import UpIcon from './icons/UpIcon';

const StyledScore = styled.span`
  font-size: 2em;
  font-weight: 600;
`;

const StyledGridColumn = styled(Grid)`
  line-height: initial !important;
`;

const StyledSvgIcon = styled(SvgIcon)`
  cursor: pointer;
`;

interface Props {
  score: number;
  userId: UserId;
  isCreator: boolean;
  isCharacterOwner: boolean;
}



function ScoreWidget({score, userId, isCharacterOwner, isCreator}: Props) {
  const mutateScore = useMutation<any, UpdatePlayerScoreMutationVariables>(UPDATE_PLAYER_SCORE);
  const [localScore, setScore] = useState(score);

  function updateScore() {
    const updatedScore = localScore + 1;
    setScore(updatedScore);
    mutateScore({variables: {userId, score: updatedScore}});
  }

  return (
    <StyledGridColumn container direction="column" alignItems="center" justify="space-between">
      {
        (isCreator || isCharacterOwner)
          && <StyledSvgIcon onClick={updateScore}><UpIcon /></StyledSvgIcon>
      }
      <StyledScore>{localScore}</StyledScore>
      {
        (isCreator || isCharacterOwner)
          && <StyledSvgIcon onClick={updateScore}><DownIcon /></StyledSvgIcon>
      }
    </StyledGridColumn>
  )
}

export default ScoreWidget
