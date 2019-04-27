import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import SkillIcon from '../../components/SkillIcon';
import { ActiveUser, SkillType } from '../../models';

import { ReactComponent as Attack } from './icons/swords.svg';
import { ReactComponent as Defence } from './icons/shield.svg';
import { ReactComponent as Artefact } from './icons/crown.svg';

const StyledContainer = styled(Grid)`
  margin-top: 1em;
`;

const svgIconStyle = {
  width: '1.1em',
}

interface Props {
  user: ActiveUser;
  onSkillClick: (skillType: SkillType) => void;
}

const SkillsContainer: FC<Props> = ({ user, onSkillClick }) => {
  return (
    <StyledContainer container>
      <SkillIcon onClick={() => onSkillClick(SkillType.ATTACK)} skillStatus={user.attack}>
        <Attack style={svgIconStyle}/>
      </SkillIcon>
      <SkillIcon onClick={() => onSkillClick(SkillType.DEFENCE)} skillStatus={user.defence}>
        <Defence style={svgIconStyle}/>
      </SkillIcon>
      <SkillIcon onClick={() => onSkillClick(SkillType.ARTEFACT)} skillStatus={user.artefact}>
        <Artefact style={svgIconStyle}/>
      </SkillIcon>
    </StyledContainer>
  )
}

export default SkillsContainer
