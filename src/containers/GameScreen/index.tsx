import { BottomNavigation, BottomNavigationAction, CircularProgress } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/FaceRounded';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { Component, useState } from 'react';
import { Query } from 'react-apollo';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';

import PageLayout from '../../components/PageLayout';
import { Game, User } from '../../models';
import { GET_ACTIVE_USERS, GetActiveUsersQueryVariables } from '../../queries';
import { getUser } from '../../services';
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
  user?: User;
  users?: User[];
  game?: Game; 
}

const StyledLoadingContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 1.5em auto;
`;

class UsersQuery extends Query<{users: User[]}, GetActiveUsersQueryVariables>{}

class GameScreen extends Component<{}, State> {

  public state: State = {
    tabIndex: 1,
    swipeDisabled: false,
  }

  public componentDidMount() {
    this.setState({user: getUser()!});
  }

  public render() {
    const {swipeDisabled, tabIndex, user, game} = this.state;
    return (
      <PageLayout>
        <SwipeableViews
          disabled={swipeDisabled}
          index={tabIndex}
          onChangeIndex={this.handleTabIndexChange}
        >
          <BarPage disableTabSwipe={this.disableTabSwipe}/>
          <TabContainer tabCount={3}>
            {
             user && (
              <UsersQuery query={GET_ACTIVE_USERS} variables={{gameId: user.active_game!}}>
                {
                  ({loading, error, data}) => loading
                    ? <StyledLoadingContainer><CircularProgress/></StyledLoadingContainer>
                    : data && <Characters users={data.users} />
                    
                } 
              </UsersQuery>
              )
            }
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
      </PageLayout>
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
