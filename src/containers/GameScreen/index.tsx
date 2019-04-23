import { BottomNavigation } from '@material-ui/core';
import React, { Component, useState } from 'react';
import styled from 'styled-components';

import UserAndGame, { Params } from '../../renderProps/UserAndGame';
import GameScreenWidget from './GameScreenWidget';

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
    return (
      <UserAndGame>
        {
          (params: Params) => (
            <GameScreenWidget
              {...params}
              {...this.state}
              handleTabIndexChange={this.handleTabIndexChange}
              disableTabSwipe={this.disableTabSwipe}
            />
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
