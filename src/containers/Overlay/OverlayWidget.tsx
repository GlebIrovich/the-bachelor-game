import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { hideOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';

const StyledOverlay = styled(Paper)`
  width: 20em;
  padding: 1em;
  margin: 0 auto;
`;

const Title = styled(Typography)`
  font-size: 1.5em !important;
  margin-bottom: 0.5em !important;
`;

const Message = styled(Typography)`
  margin-bottom: 0.5em !important;
`;

const StyledActionContainer = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledCancelButton = styled(Button)`
  margin-right: 1em !important;
  min-width: 6em !important;
`;

interface Props {
  title: string;
  actions: ReactNode;
  message?: string;
  content?: ReactNode;
  onCancel?: () => void;
}

const OverlayWidget: FC<Props> = ({title, actions, message, content, onCancel}) => {
  const [_state, dispatch] = useOverlayContext();
  function handleCancel() {
    if (onCancel) onCancel();
    dispatch(hideOverlay());
  }
  return (
    <StyledOverlay>
      <Grid container>
        <Grid item>
          <Title>{title}</Title>
          { message && <Message>{message}</Message>}
        </Grid>
        <Grid item xs={12}>
          {content}
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <StyledActionContainer>
          <StyledCancelButton color="secondary" variant="outlined" onClick={handleCancel}>
            Отмена
          </StyledCancelButton>
          {actions}
        </StyledActionContainer>
      </Grid>
    </StyledOverlay>
  )
}

export default OverlayWidget
