import { Grid, SvgIcon } from '@material-ui/core';
import React, { FC } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import { UserId } from '../../models';
import { UPDATE_PLAYER_SCORE, UpdatePlayerScoreMutationVariables } from '../../queries';
import DownIcon from './icons/DownIcon';
import UpIcon from './icons/UpIcon';

const StyledScore = styled.span`
  font-size: 3.3em;
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



const ScoreWidget: FC<Props> = ({score, userId, isCharacterOwner, isCreator}) => {
  const setScore = useMutation<any, UpdatePlayerScoreMutationVariables>(UPDATE_PLAYER_SCORE)
  return (
    <StyledGridColumn container direction="column" alignItems="center" justify="space-between">
      {
        (isCreator || isCharacterOwner)
          && <StyledSvgIcon onClick={() => setScore({variables: {userId, score: score + 1}})}><UpIcon /></StyledSvgIcon>
      }
      <StyledScore>{score}</StyledScore>
      {
        (isCreator || isCharacterOwner)
          && <StyledSvgIcon onClick={() => setScore({variables: {userId, score: score - 1}})}><DownIcon /></StyledSvgIcon>
      }
    </StyledGridColumn>
  )
}

export default ScoreWidget
