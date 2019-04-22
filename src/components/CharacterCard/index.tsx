import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import { SkillOverlayProps } from '../../containers/Overlay/SkillOverlay';
import PlayerInfo from '../../containers/PlayerInfo';
import SkillsContainer from '../../containers/SkillsContainer';
import { showOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { ActiveUser, OverlayKey, SkillType } from '../../models';
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
  user: ActiveUser;
  isCreator: boolean;
  isCharacterOwner: boolean;
}

const CharacterCard: FC<Props> = ({user, isCreator, isCharacterOwner}) => {
  const [, dispatch] = useOverlayContext();
  function onSkillClick(skillType: SkillType) {
    const overlayProps: SkillOverlayProps = {
      character: user.character,
      currentUserId: user.id,
      skillType,
      skillStatus: user[skillType],
      isCreator,
      isCharacterOwner,
    }
    dispatch(showOverlay(OverlayKey.SKILL_DESCRIPTION, overlayProps))
  }
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
          <SkillsContainer user={user} onSkillClick={onSkillClick}/>
        </Grid>
        <Grid item zeroMinWidth>
          <Typography align="right">{user.score}</Typography>
        </Grid>
      </Grid>
    </StyledCard>
  )
}

export default CharacterCard
