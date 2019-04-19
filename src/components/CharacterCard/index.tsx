import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import SkillsContainer from '../../containers/SkillsContainer';
import { characterTitleMap, CharacterType } from '../../models';
import { ReactComponent as CharAvatar } from './avatars/dummy.svg';

const StyledAvatar = styled(Avatar)`
  background-color: transparent !important;
  width: 4em !important;
  height: 4em !important;
`;

const StyledCard = styled(Paper)`
  max-width: 30em;
  padding: 0 1em;
  min-height: 5.5em;
`;

interface Props {
  character: CharacterType;
  playerName: string;
  alt?: string;
}

const CharacterCard: FC<Props> = ({alt, playerName, character}) => {
  return (
    <StyledCard>
      <Grid container wrap="nowrap" spacing={16} alignContent="center">
        <Grid item>
          <StyledAvatar alt={alt || ''}>
            <CharAvatar />
          </StyledAvatar>
        </Grid>
        <Grid item xs={8} zeroMinWidth>
          <Typography>{`${playerName} | ${characterTitleMap[character]}`}</Typography>
          <SkillsContainer />
        </Grid>
        <Grid item zeroMinWidth>
          <Typography align="right">10</Typography>
        </Grid>
      </Grid>
    </StyledCard>
  )
}

export default CharacterCard
