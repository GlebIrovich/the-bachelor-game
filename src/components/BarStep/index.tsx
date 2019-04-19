import { Button, StepContent, StepLabel, Typography } from '@material-ui/core';
import React, { FC } from 'react';

interface Props {
  title: string;
  content: string;
  handleBack: () => void;
  handleNext: () => void;
}

const BarStep: FC<Props> = ({title, content, handleBack, handleNext}) => {
  return (
    <React.Fragment>
      <StepLabel>{title}</StepLabel>
      <StepContent>
        <Typography>{content}</Typography>
        <div>
          <div>
            <Button
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Done
            </Button>
          </div>
        </div>
      </StepContent>
    </React.Fragment>
  )
}

export default BarStep
