import { Avatar } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import { SkillStatus } from '../../models';

interface StyledProps {
  skillStatus: SkillStatus;
}

const StyledSkill = styled(Avatar)`
  background-color: greenyellow !important;
  width: 1.6em !important;
  height: 1.6em !important;
  font-size: 1.6em !important;
  margin-right: 0.5em;
  filter: ${({skillStatus}: StyledProps) => skillStatus === SkillStatus.USED ? 'brightness(60%)' : 'brightness(100%)'};
`

const SkillIcon: FC<StyledProps> = ({children, skillStatus}) => {
  return (
    <StyledSkill skillStatus={skillStatus}>{children}</StyledSkill>
  )
}

export default SkillIcon
