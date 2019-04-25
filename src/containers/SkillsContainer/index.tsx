import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import SkillIcon from '../../components/SkillIcon';
import { ActiveUser, SkillType } from '../../models';
import artefactIcon from './icons/crown.svg';
import defenceIcon from './icons/shield.svg';
import attackIcon from './icons/swords.svg';

const StyledContainer = styled(Grid)`
  margin-top: 1em;
`;

const StyledSvgIcon = styled.img`
  width: 1.1em !important;
`;

interface Props {
  user: ActiveUser;
  onSkillClick: (skillType: SkillType) => void;
}

const SkillsContainer: FC<Props> = ({ user, onSkillClick }) => {
  return (
    <StyledContainer container>
      <SkillIcon onClick={() => onSkillClick(SkillType.ATTACK)} skillStatus={user.attack}>
        <StyledSvgIcon src={attackIcon} />
      </SkillIcon>
      <SkillIcon onClick={() => onSkillClick(SkillType.DEFENCE)} skillStatus={user.defence}>
        <StyledSvgIcon src={defenceIcon} />
      </SkillIcon>
      <SkillIcon onClick={() => onSkillClick(SkillType.ARTEFACT)} skillStatus={user.artefact}>
        <StyledSvgIcon src={artefactIcon} />
      </SkillIcon>
    </StyledContainer>
  )
}

export default SkillsContainer
