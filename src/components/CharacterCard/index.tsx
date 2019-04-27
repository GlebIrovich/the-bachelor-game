import { Avatar, Grid, Paper } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import { ISABELLINE } from '../../constants';
import { SkillOverlayProps } from '../../containers/Overlay/SkillOverlay';
import PlayerInfo from '../../containers/PlayerInfo';
import SkillsContainer from '../../containers/SkillsContainer';
import { showOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { ActiveUser, OverlayKey, SkillType, CharacterType } from '../../models';
import ScoreWidget from '../ScoreWidget';

import { ReactComponent as Barbarian } from './avatars/barbarian.svg';
import { ReactComponent as Bard } from './avatars/bard.svg';
import { ReactComponent as Gunslinger } from './avatars/gunslinger.svg';
import { ReactComponent as Monk } from './avatars/monk.svg';
import { ReactComponent as Paladin } from './avatars/paladin.svg';
import { ReactComponent as Thief } from './avatars/thief.svg';
import { ReactComponent as Wizard } from './avatars/wizard.svg';

const characterAvatarMap = {
  [CharacterType.BARBARIAN]: Barbarian,
  [CharacterType.BARD]: Bard,
  [CharacterType.GUNSLINGER]: Gunslinger,
  [CharacterType.MONK]: Monk,
  [CharacterType.PALADIN]: Paladin,
  [CharacterType.THIEF]: Thief,
  [CharacterType.WIZARD]: Wizard,
}

const svgIconStyle = {
  width: '3.6em',
  marginTop: '0.6em',
}

const StyledAvatar = styled(Avatar)`
  background-color: transparent !important;
  width: 4em !important;
  height: 4em !important;
  cursor: pointer;
  transition: all 300ms;
  &:hover {
    filter: brightness(105%);
  }
`;

const StyledCard = styled(Paper)`
  max-width: 30em;
  padding: 0 1em;
  min-height: 5.5em;
  margin: 1.5em auto;
  border-top-left-radius: 20px !important;
  border-bottom-left-radius: 50px !important;
  background-color: ${ISABELLINE} !important;
`;

interface Props {
  user: ActiveUser;
  isCreator: boolean;
  isCharacterOwner: boolean;
}

const CharacterCard: FC<Props> = ({ user, isCreator, isCharacterOwner }) => {
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

  const CharacterAvatar = characterAvatarMap[user.character];
  return (
    <StyledCard>
      <Grid container wrap="nowrap" spacing={16} alignContent="center" justify="space-between" alignItems="center">
        <Grid item>
          <StyledAvatar
            onClick={() => dispatch(showOverlay(OverlayKey.CHARACTER_DESCRIPTION, { character: user.character }))}
          >
            <CharacterAvatar style={svgIconStyle}/>
          </StyledAvatar>
        </Grid>
        <Grid item xs={8} zeroMinWidth>
          <PlayerInfo username={user.username} character={user.character!} />
          <SkillsContainer user={user} onSkillClick={onSkillClick} />
        </Grid>
        <Grid item xs={3}>
          <ScoreWidget userId={user.id} score={user.score} isCreator={isCreator} isCharacterOwner={isCharacterOwner} />
        </Grid>
      </Grid>
    </StyledCard>
  )
}

export default CharacterCard
