import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/FaceRounded';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';

import PageLayout from '../../components/PageLayout';
import BarPage from '../BarPage';
import Characters from '../Characters';
import { TabContainer } from './TabContainer';

const StyledBottomNavigation = styled(BottomNavigation)`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const GameScreen = () => {
  const [tabIndex, handleChangeIndex] = useState(0)
  const [disabled, disableTabSwipe] = useState(false);
  return (
    <PageLayout>
      <SwipeableViews
        disabled={disabled}
        index={tabIndex}
        onChangeIndex={(value: number) => handleChangeIndex(value)}
      >
        <BarPage disableTabSwipe={disableTabSwipe}/>
        <TabContainer tabCount={3}>
          <Characters />
        </TabContainer>
        <TabContainer tabCount={3}>Item Three</TabContainer>
      </SwipeableViews>
      <StyledBottomNavigation
        value={tabIndex}
        onChange={(event, value) => handleChangeIndex(value)}
        showLabels
      >
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Nearby" icon={<FaceIcon /> } />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />

      </StyledBottomNavigation>
    </PageLayout>
  )
}

export default GameScreen
