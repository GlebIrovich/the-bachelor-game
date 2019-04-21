import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { hideOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { JustifyContent } from '../../models';

interface StyledProps {
  justifiedContent: JustifyContent;
}

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
  justify-content: ${({justifiedContent}: StyledProps) => justifiedContent};
  width: 100%;
`;

const StyledCancelButton = styled(Button)`
  margin-right: 1em !important;
  min-width: 6em !important;
`;

interface Props {
  title: string;
  actions: ReactNode;
  secondaryActions?: ReactNode;
  message?: string;
  content?: ReactNode;
  onCancel?: () => void;
  hideCancelAction?: boolean;
}

const OverlayWidget: FC<Props> = ({title, actions, message, content, onCancel, secondaryActions, hideCancelAction}) => {
  const [, dispatch] = useOverlayContext();
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
          {
            !hideCancelAction
            ? (
              <StyledActionContainer justifiedContent={JustifyContent.SPACE_BETWEEN}>
                <StyledCancelButton color="secondary" variant="outlined" onClick={handleCancel}>
                  Отмена
                </StyledCancelButton>
                {actions}
              </StyledActionContainer>
            ) : (
              <StyledActionContainer justifiedContent={JustifyContent.FLEX_END}>
                {actions}
              </StyledActionContainer>
            )
          }
      </Grid>
      { secondaryActions &&
        (
          <Grid container justify="flex-end">
            <StyledActionContainer justifiedContent={JustifyContent.SPACE_BETWEEN}>
              {secondaryActions}
            </StyledActionContainer>
          </Grid> 
      )}
    </StyledOverlay>
  )
}

export default OverlayWidget
