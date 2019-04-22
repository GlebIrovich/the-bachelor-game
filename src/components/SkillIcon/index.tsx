import { Avatar } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';

import { SkillStatus } from '../../models';

interface StyledProps {
  skillstatus: SkillStatus;
}

const StyledSkill = styled(Avatar)`
  background-color: greenyellow !important;
  width: 1.6em !important;
  height: 1.6em !important;
  font-size: 1.6em !important;
  margin-right: 0.5em;
  filter: ${({skillstatus}: StyledProps) => skillstatus === SkillStatus.USED ? 'brightness(80%)' : 'brightness(100%)'};
  cursor: pointer;
`

interface Props {
  skillStatus: SkillStatus;
  onClick: () => void;
}

const SkillIcon: FC<Props> = ({children, skillStatus, onClick}) => {
  return (
    <StyledSkill skillstatus={skillStatus} onClick={onClick}>{children}</StyledSkill>
  )
}

export default SkillIcon
