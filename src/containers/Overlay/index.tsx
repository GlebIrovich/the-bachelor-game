import React, { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';

import { hideOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';

const overlayWidth = '20em';

const StyledOverlay = styled.div`
  position: absolute;
  top: 20%;
  left: calc((100% - ${overlayWidth}) / 2);
  width: ${overlayWidth};
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  opacity: 0.25;
  height: 100%;
  width: 100%;
  background: black;
`;

const Escape = 'Escape';

const Overlay: FC = ({children}) => {
  const [_state, dispatch] = useOverlayContext()
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === Escape) {
      dispatch(hideOverlay());
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  return (
    <React.Fragment>
      <Background onClick={() => dispatch(hideOverlay())}/>
      <StyledOverlay>
        {children}
      </StyledOverlay>
    </React.Fragment>
  )
}

export default Overlay
