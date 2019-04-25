import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import PageLayout from '../components/PageLayout';
import { convertActiveUser } from '../helpers/convertActiveUser';
import { ActiveUser, Game, UserId } from '../models';
import {
  GAME_SUBSCRIPTION,
  GET_ACTIVE_USERS,
  GET_GAME_BY_ID,
  GetActiveUsersData,
  GetActiveUsersQueryVariables,
  GetGameByIdData,
  GetGameByIdQueryVariables,
  PLAYERS_SUBSCRIPTION,
} from '../queries';
import { getUser } from '../services';

export interface Params {
  currentUserId: UserId;
  users: ActiveUser[];
  game: Game;
  subscribeToPlayers: any;
  subscribeToGame: any;
}

const StyledLoadingContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 1.5em auto;
`;

interface Props {
  children: (props: Params) => React.ReactNode;
}

class GameQuery extends Query<GetGameByIdData, GetGameByIdQueryVariables>{ }
class UsersQuery extends Query<GetActiveUsersData, GetActiveUsersQueryVariables>{ }

export default class UserAndGame extends Component<Props> {

  render() {
    const user = getUser()!;
    return (
      <GameQuery query={GET_GAME_BY_ID} variables={{ gameId: user.active_game }}>
        {
          ({ data: gameData, loading, subscribeToMore: subscribeToMoreGame }) => !loading && gameData ? (
            <UsersQuery query={GET_ACTIVE_USERS} variables={{ gameId: gameData.games[0].id }} >
              {
                ({ data: usersData, loading: usersLoading, subscribeToMore: subscribeToMorePlayers }) => {
                  if (!usersLoading && usersData) {
                    return (
                      <PageLayout gameName={gameData.games[0].title}>
                        {
                          this.props.children({
                            currentUserId: user.id,
                            users: convertActiveUser(usersData.players),
                            game: gameData.games[0],
                            subscribeToGame: () => subscribeToMoreGame({
                              document: GAME_SUBSCRIPTION,
                              variables: { gameId: gameData.games[0].id },
                              updateQuery: (prev, { subscriptionData: { data } }) => {
                                return data || prev;
                              },
                            }),
                            subscribeToPlayers: () => subscribeToMorePlayers({
                              document: PLAYERS_SUBSCRIPTION,
                              variables: { gameId: gameData.games[0].id },
                              updateQuery: (prev, { subscriptionData: { data } }) => {
                                return data || prev;
                              },
                            })
                          })
                        }
                      </PageLayout>
                    )
                  }
                  return <StyledLoadingContainer><CircularProgress /></StyledLoadingContainer>;
                }
              }
            </UsersQuery>
          ) : <StyledLoadingContainer><CircularProgress /></StyledLoadingContainer>
        }
      </GameQuery>
    )
  }
}
