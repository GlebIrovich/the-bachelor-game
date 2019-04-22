import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import SkillIcon from '../../components/SkillIcon';
import { ActiveUser, SkillType } from '../../models';

const StyledContainer = styled(Grid)`
  margin-top: 1em;
`;

interface Props {
  user: ActiveUser;
  onSkillClick: (skillType: SkillType) => void;
}

const SkillsContainer: FC<Props> = ({user, onSkillClick}) => {
  return (
    <StyledContainer container>
      <SkillIcon onClick={() => onSkillClick(SkillType.ATTACK)} skillStatus={user.attack}>
        A
      </SkillIcon>
      <SkillIcon onClick={() => onSkillClick(SkillType.DEFENCE)} skillStatus={user.defence}>
        B
      </SkillIcon>
      <SkillIcon onClick={() => onSkillClick(SkillType.ARTEFACT)} skillStatus={user.artefact}>
        C
      </SkillIcon>
    </StyledContainer>
  )
}

export default SkillsContainer
