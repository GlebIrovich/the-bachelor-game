import { Grid } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import SkillIcon from '../../components/SkillIcon';

const StyledContainer = styled(Grid)`
  margin-top: 1em;
`;

const SkillsContainer = () => {
  return (
    <StyledContainer container>
      <SkillIcon>
        A
      </SkillIcon>
      <SkillIcon>
        B
      </SkillIcon>
      <SkillIcon>
        C
      </SkillIcon>
    </StyledContainer>
  )
}

export default SkillsContainer
