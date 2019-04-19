import { Button, Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Confetti from '../../components/Confetti';
import { DEFAULT_MAP_HEIGHT_PX, FOOTER_HEIGHT_PX, HEADER_HEIGHT_PX } from '../../constants/styles';
import { showOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { useWindowSize } from '../../helpers/useWindowSize';
import { OverlayKey } from '../../models/overlays';

function getSteps() {
  return ['Мартинез', 'Гадкий кайот', 'Бар Х'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `Адрес Бара.`;
    case 1:
      return 'Адрес Бара.';
    case 2:
      return `Адрес Бара.`;
    default:
      return 'Неизвестный бар.';
  }
}

interface StyledContainerProps {
  height?: number;
}

const StepContainer = styled.div`
  overflow: auto;
  height: ${({height}: StyledContainerProps) => height}px;
  padding: 0 2em;
  margin-top: 1em;
`;

const StyledBarAddress = styled(Typography)`
  margin-bottom: 1.5em !important;
  margin-top: 1.5em !important;
`

const calculateContainerHeight = () => {
  return useWindowSize().height - DEFAULT_MAP_HEIGHT_PX - HEADER_HEIGHT_PX - FOOTER_HEIGHT_PX;
}

const BarStepsWidget = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [containerHeight, setHeight] = React.useState(calculateContainerHeight());
  const [, dispatch] = useOverlayContext()
  useEffect(() => {
    window.addEventListener('resize', () => setHeight(calculateContainerHeight()))
  })
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleWin() {
    return dispatch(showOverlay(OverlayKey.GAME_COMPLETED))
  }

  return (
    <StepContainer height={containerHeight}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((title, index) => (
          <Step key={title}>
            <StepLabel>{title}</StepLabel>
              <StepContent>
                <StyledBarAddress>{getStepContent(index)}</StyledBarAddress>
                <Button onClick={handleBack}>
                  Назад
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={index === steps.length - 1 ? handleWin : handleNext}
                >
                  {index === steps.length - 1 ? 'Все!' : 'Дальше!'}
                </Button>
              </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <React.Fragment>
          <Confetti />
        </React.Fragment>
      )}
    </StepContainer>
  );
}

export default BarStepsWidget;
