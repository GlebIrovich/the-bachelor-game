import React from 'react';
import Confetti from 'react-confetti';
import styled from 'styled-components';

import { useWindowSize } from '../../helpers/useWindowSize';

const StyledConfetti = styled(Confetti)`
  pointer-events: none;
`;

export default () => {
  const { width, height } = useWindowSize()
  return (
    <StyledConfetti
      width={width}
      height={height}
    />
  )
}