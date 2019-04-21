import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import PlayerInfo from '../../containers/PlayerInfo';
import SkillsContainer from '../../containers/SkillsContainer';
import { showOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { OverlayKey, User } from '../../models';
import { ReactComponent as CharAvatar } from './avatars/dummy.svg';

const StyledAvatar = styled(Avatar)`
  background-color: transparent !important;
  width: 4em !important;
  height: 4em !important;
  cursor: pointer;
`;

const StyledCard = styled(Paper)`
  max-width: 30em;
  padding: 0 1em;
  min-height: 5.5em;
  margin: 1.5em auto;
`;

interface Props {
  user: User;
}

const CharacterCard: FC<Props> = ({user}) => {
  const [, dispatch] = useOverlayContext();
  return (
    <StyledCard>
      <Grid container wrap="nowrap" spacing={16} alignContent="center">
        <Grid item>
          <StyledAvatar
            onClick={() => dispatch(showOverlay(OverlayKey.CHARACTER_DESCRIPTION, {character: user.character}))}
          >
            <CharAvatar />
          </StyledAvatar>
        </Grid>
        <Grid item xs={8} zeroMinWidth>
          
          <PlayerInfo username={user.username} character={user.character!} />
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
