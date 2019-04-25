import { Grid, SvgIcon } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import { UserId } from '../../models';
import { UPDATE_PLAYER_SCORE, UpdatePlayerScoreMutationVariables } from '../../queries';
import DownIcon from './icons/DownIcon';
import UpIcon from './icons/UpIcon';

const StyledScore = styled.span`
  font-size: 1.6em;
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



function ScoreWidget({ score, userId, isCharacterOwner, isCreator }: Props) {
  const [useLocalScore, switchScoreDisplayMode] = useState(false);
  const [timeout, resetTimeOut] = useState();
  const mutateScore = useMutation<any, UpdatePlayerScoreMutationVariables>(UPDATE_PLAYER_SCORE);
  const [localScore, setScore] = useState(score);

  function increment() {
    switchScoreDisplayMode(true);
    const updatedScore = localScore + 1;
    setScore(updatedScore);
    mutateScore({ variables: { userId, score: updatedScore } });
    if (timeout) {
      clearTimeout(timeout);
    }
    resetTimeOut(setTimeout(() => switchScoreDisplayMode(false), 5000))
  }

  function decrement() {
    switchScoreDisplayMode(true);
    const updatedScore = localScore - 1;
    setScore(updatedScore);
    mutateScore({ variables: { userId, score: updatedScore } });
    if (timeout) {
      clearTimeout(timeout);
    }
    resetTimeOut(setTimeout(() => switchScoreDisplayMode(false), 5000))
  }

  return (
    <StyledGridColumn container direction="column" alignItems="center" justify="space-between">
      {
        (isCreator || isCharacterOwner)
        && <StyledSvgIcon onClick={increment}><UpIcon /></StyledSvgIcon>
      }
      <StyledScore>{useLocalScore ? localScore : score}</StyledScore>
      {
        (isCreator || isCharacterOwner)
        && <StyledSvgIcon onClick={decrement}><DownIcon /></StyledSvgIcon>
      }
    </StyledGridColumn>
  )
}

export default ScoreWidget
