import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/FaceRounded';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { Component, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';

import UserAndGame, { Params } from '../../renderProps/UserAndGame';
import BarPage from '../BarPage';
import Characters from '../Characters';
import { TabContainer } from './TabContainer';

const StyledBottomNavigation = styled(BottomNavigation)`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

interface State {
  tabIndex: number;
  swipeDisabled: boolean;
}

class GameScreen extends Component<{}, State> {

  public state: State = {
    tabIndex: 1,
    swipeDisabled: false,
  }

  public render() {
    const {swipeDisabled, tabIndex} = this.state;
    return (
      <UserAndGame>
        {
          (params: Params) => (
            <React.Fragment>
              <SwipeableViews
                disabled={swipeDisabled}
                index={tabIndex}
                onChangeIndex={this.handleTabIndexChange}
              >
                <BarPage disableTabSwipe={this.disableTabSwipe}/>
                <TabContainer tabCount={3}>
                  <Characters {...params} />
                </TabContainer>
                <TabContainer tabCount={3}>Item Three</TabContainer>
              </SwipeableViews>
              <StyledBottomNavigation
                value={tabIndex}
                onChange={(event, value) => this.handleTabIndexChange(value)}
                showLabels
              >
                <BottomNavigationAction label="Карта" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="Герои" icon={<FaceIcon /> } />
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        
              </StyledBottomNavigation>
            </React.Fragment>
          )
        }
      </UserAndGame>
    )
  }

  private handleTabIndexChange = (tabIndex: number) => {
    this.setState({tabIndex})
  }

  private disableTabSwipe = (disabled: boolean) => {
    this.setState({swipeDisabled: disabled})
  }
}

export default GameScreen
