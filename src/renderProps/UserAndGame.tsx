import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import PageLayout from '../components/PageLayout';
import { Game, User, UserId } from '../models';
import { GET_ACTIVE_USERS, GET_GAME_BY_ID, GetActiveUsersQueryVariables, GetGameByIdQueryVariables } from '../queries';
import { getUser } from '../services';

export interface Params {
  currentUserId: UserId;
  users: User[];
  game: Game;
}

const StyledLoadingContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 1.5em auto;
`;

interface Props {
  children: (props: Params) => React.ReactNode;
}

class GameQuery extends Query<{games: [Game]}, GetGameByIdQueryVariables>{}
class UsersQuery extends Query<{users: User[]}, GetActiveUsersQueryVariables>{}

export default class UserAndGame extends Component<Props> {

  render() {
    const user = getUser()!;
    return (
      <GameQuery query={GET_GAME_BY_ID} variables={{gameId: user.active_game}}>
        {
          ({data: gameData, loading}) => !loading && gameData ? (
            <UsersQuery query={GET_ACTIVE_USERS} variables={{gameId: gameData.games[0].id }} >
              {
                ({data: usersData, loading: usersLoading}) => !usersLoading && usersData ? (
                  <PageLayout>
                    { 
                      this.props.children({
                        currentUserId: user.id,
                        users: usersData.users,
                        game: gameData.games[0],
                      })
                    }
                  </PageLayout>
                ) : <StyledLoadingContainer><CircularProgress/></StyledLoadingContainer>
              }
            </UsersQuery>
          ) : <StyledLoadingContainer><CircularProgress/></StyledLoadingContainer>
        }
      </GameQuery>
    )
  }
}
