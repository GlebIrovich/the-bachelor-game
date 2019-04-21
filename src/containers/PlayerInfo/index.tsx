import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import { characterTitleMap, CharacterType } from '../../models';

const StyledContainer = styled(Grid)`
`;

const StyledUsername = styled(Typography)`
  width: 7em;
  font-size: 1.2em !important;
  font-weight: 600 !important;
`;

interface Props {
  username: string;
  character: CharacterType;
}

const PlayerInfo: FC<Props> = ({username, character}) => {
  return (
    <StyledContainer container>
      <StyledUsername>{username}</StyledUsername>
      <Typography>{characterTitleMap[character]}</Typography>
    </StyledContainer>
  )
}

export default PlayerInfo
