import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import SkillIcon from '../../components/SkillIcon';
import { Player } from '../../models';

const StyledContainer = styled(Grid)`
  margin-top: 1em;
`;

interface Props {
  gameData: Player;
}

const SkillsContainer: FC<Props> = ({gameData}) => {
  return (
    <StyledContainer container>
      <SkillIcon skillStatus={gameData.attackSkill}>
        A
      </SkillIcon>
      <SkillIcon skillStatus={gameData.defenceSkill}>
        B
      </SkillIcon>
      <SkillIcon skillStatus={gameData.artefactSkill}>
        C
      </SkillIcon>
    </StyledContainer>
  )
}

export default SkillsContainer
