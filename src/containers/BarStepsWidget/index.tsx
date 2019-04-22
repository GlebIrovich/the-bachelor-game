import { Button, Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import { DEFAULT_MAP_HEIGHT_PX, FOOTER_HEIGHT_PX, HEADER_HEIGHT_PX } from '../../constants/styles';
import { showOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
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

interface Props {
  bars: Level[];
  isCreator: boolean;
  gameId: GameId;
}

const BarStepsWidget: FC<Props> = ({bars, isCreator, gameId}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [containerHeight, setHeight] = React.useState(calculateContainerHeight());
  const resetBarStatus = useMutation(RESET_BAR_STATUS);
  const updateBarStatus = useMutation<{}, UpdateBarStatusMutationVariables>(UPDATE_BAR_STATUS);
  const resetSkillsStatus = useMutation<{}, ResetSkillsStatusMutationVariables>(RESET_SKILLS_STATUS);

  const updateBar = (barId: string) => {
    resetBarStatus()
      .then(data =>  {
        updateBarStatus({variables: {barId}})
        resetSkillsStatus({variables: {gameId}});
      })
  }
  const [, dispatch] = useOverlayContext()
  useEffect(() => {
    window.addEventListener('resize', () => setHeight(calculateContainerHeight()))
  })

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleWin() {
    return dispatch(showOverlay(OverlayKey.GAME_COMPLETED))
  }

  const activeBar = bars.find(bar => bar.status === LevelStatus.ACTIVE);
  const activeBarIndex = activeBar ? bars.indexOf(activeBar) : 0;

  return (
    <StepContainer height={containerHeight}>
      <Stepper activeStep={activeBarIndex} orientation="vertical">
        {
          bars.map(({title, id, address}, index) => (
            <Step key={id}>
              <StepLabel>{title}</StepLabel>
                <StepContent>
                  <StyledBarAddress>{address}</StyledBarAddress>
                  {
                    index > 0 && isCreator && (
                      <Button onClick={index > 0 ? () => updateBar(bars[index - 1].id) : undefined}>
                        Назад
                      </Button>
                    )
                  }
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={index === bars.length - 1 ? handleWin : () => updateBar(bars[index + 1].id)}
                  >
                    {index === bars.length - 1 ? 'Все!' : 'Дальше!'}
                  </Button>
                </StepContent>
              </Step>
            ))
        }
      </Stepper>
    </StepContainer>
  );
}

export default BarStepsWidget;
