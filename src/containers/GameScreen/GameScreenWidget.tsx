import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/FaceRounded';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';

import { EGG_SHELL } from '../../constants';
import { Params } from '../../renderProps/UserAndGame';
import BarPage from '../BarPage';
import Characters from '../Characters';

const StyledBottomNavigation = styled(BottomNavigation)`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: ${EGG_SHELL} !important;
`;

interface Props extends Params {
  tabIndex: number;
  swipeDisabled: boolean;
  disableTabSwipe: (disabled: boolean) => void;
  handleTabIndexChange: (tabIndex: number) => void;
}

class GameScreenWidget extends Component<Props, {}> {
  public componentDidMount() {
    this.props.subscribeToPlayers();
    this.props.subscribeToGame();
  }

  public render() {
    const {
      swipeDisabled,
      tabIndex,
      subscribeToPlayers,
      disableTabSwipe,
      handleTabIndexChange,
      ...rest
    } = this.props;
    const isCreator = rest.game.creator === rest.currentUserId;
    return (
      <React.Fragment>
        <SwipeableViews
          disabled={swipeDisabled}
          index={tabIndex}
          onChangeIndex={handleTabIndexChange}
        >
          <BarPage
            disableTabSwipe={disableTabSwipe}
            game={rest.game}
            isCreator={rest.game.creator === rest.currentUserId}
          />
          <Characters {...rest} isCreator={isCreator} />
        </SwipeableViews>
        <StyledBottomNavigation
          value={tabIndex}
          onChange={(event, value) => handleTabIndexChange(value)}
          showLabels
        >
          <BottomNavigationAction label="Карта" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Герои" icon={<FaceIcon />} />
        </StyledBottomNavigation>
      </React.Fragment>
    );
  }
}

export default GameScreenWidget;
