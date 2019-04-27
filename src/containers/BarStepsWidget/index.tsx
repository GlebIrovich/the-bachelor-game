import { Button, Grid, Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { ViewState } from 'react-map-gl';
import styled from 'styled-components';

import { EGG_SHELL } from '../../constants';
import { DEFAULT_MAP_HEIGHT_PX, FOOTER_HEIGHT_PX, HEADER_HEIGHT_PX } from '../../constants/styles';
import { showOverlay } from '../../context/overlays/actions';
import { useOverlayContext } from '../../context/overlays/OverlaysContext';
import { useWindowSize } from '../../helpers/useWindowSize';
import { GameId, Level, LevelStatus } from '../../models';
import { OverlayKey } from '../../models/overlays';
import {
  RESET_BAR_STATUS,
  RESET_SKILLS_STATUS,
  ResetSkillsStatusMutationVariables,
  UPDATE_BAR_STATUS,
  UpdateBarStatusMutationVariables,
} from '../../queries';

interface StyledContainerProps {
  height?: number;
}

const CONTAINER_MARGIN_TOP = '1em';

const StepContainer = styled.div`
  overflow: auto;
  height: calc(${({ height }: StyledContainerProps) => height}px - 2em);
  padding: 0 2em;
  margin-top: ${CONTAINER_MARGIN_TOP};
`;

const StyledStepper = styled(Stepper)`
  background-color: transparent !important;
`;

const StyledButton = styled(Button)`
  margin-top: 0.5em !important;
`;

const StyledBarAddress = styled(Typography)`
  margin-bottom: 1.5em !important;
  margin-top: 1.5em !important;
  color: ${EGG_SHELL} !important;
`;

const StyledStepLabel = styled.span`
  color: ${EGG_SHELL} !important;
  font-family: 'Ruslan Display', cursive !important;
  font-size: 1.4em;
`;

const calculateContainerHeight = () => {
  return useWindowSize().height - DEFAULT_MAP_HEIGHT_PX - HEADER_HEIGHT_PX - FOOTER_HEIGHT_PX;
};

interface Props {
  bars: Level[];
  isCreator: boolean;
  gameId: GameId;
  goToViewport: (viewport: ViewState) => void;
}

const BarStepsWidget: FC<Props> = ({ bars, isCreator, gameId, goToViewport }) => {
  const [containerHeight, setHeight] = React.useState(calculateContainerHeight());
  const resetBarStatus = useMutation(RESET_BAR_STATUS);
  const updateBarStatus = useMutation<{}, UpdateBarStatusMutationVariables>(UPDATE_BAR_STATUS);
  const resetSkillsStatus = useMutation<{}, ResetSkillsStatusMutationVariables>(RESET_SKILLS_STATUS);

  const updateBar = (barId: string) => {
    resetBarStatus().then(() => {
      updateBarStatus({ variables: { barId } });
      resetSkillsStatus({ variables: { gameId } });
    });
  };
  const [, dispatch] = useOverlayContext();
  useEffect(() => {
    window.addEventListener('resize', () => setHeight(calculateContainerHeight()));
  });

  function handleWin() {
    return dispatch(showOverlay(OverlayKey.GAME_COMPLETED));
  }

  const activeBar = bars.find((bar) => bar.status === LevelStatus.ACTIVE);
  const activeBarIndex = activeBar ? bars.indexOf(activeBar) : 0;

  return (
    <StepContainer height={containerHeight}>
      <StyledStepper activeStep={activeBarIndex} orientation="vertical">
        {bars.map(({ title, id, address, latitude, longitude }, index) => (
          <Step key={id}>
            <StepLabel>
              <StyledStepLabel onClick={() => goToViewport({ latitude, longitude } as ViewState)}>
                {title}
              </StyledStepLabel>
            </StepLabel>
            <StepContent>
              <StyledBarAddress onClick={() => goToViewport({ latitude, longitude } as ViewState)}>
                {address}
              </StyledBarAddress>
              <Grid container justify="space-between" direction="column">
                {isCreator && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={index === bars.length - 1 ? handleWin : () => updateBar(bars[index + 1].id)}
                  >
                    {index === bars.length - 1 ? 'Все!' : 'Дальше!'}
                  </Button>
                )}
                {index > 0 && isCreator && (
                  <StyledButton
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={index > 0 ? () => updateBar(bars[index - 1].id) : undefined}
                  >
                    Назад
                  </StyledButton>
                )}
              </Grid>
            </StepContent>
          </Step>
        ))}
      </StyledStepper>
    </StepContainer>
  );
};

export default BarStepsWidget;
