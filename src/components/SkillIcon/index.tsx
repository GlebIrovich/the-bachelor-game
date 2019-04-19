import { Avatar } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledSkill = styled(Avatar)`
  background-color: greenyellow !important;
  width: 1.6em !important;
  height: 1.6em !important;
  font-size: 1.6em !important;
  margin-right: 0.5em;
`

const SkillIcon: FC = ({children}) => {
  return (
    <StyledSkill>{children}</StyledSkill>
  )
}

export default SkillIcon
