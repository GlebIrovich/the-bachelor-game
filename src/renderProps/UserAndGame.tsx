import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import PageLayout from '../components/PageLayout';
import { convertActiveUser } from '../helpers/convertActiveUser';
import { ActiveUser, Game, UserId } from '../models';
import {
  GET_ACTIVE_USERS,
  GET_GAME_BY_ID,
  GetActiveUsersData,
  GetActiveUsersQueryVariables,
  GetGameByIdQueryVariables,
  PLAYERS_SUBSCRIPTION,
} from '../queries';
import { getUser } from '../services';

export interface Params {
  currentUserId: UserId;
  users: ActiveUser[];
  game: Game;
  subscribeToPlayers: any;
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
class UsersQuery extends Query<GetActiveUsersData, GetActiveUsersQueryVariables>{}

export default class UserAndGame extends Component<Props> {

  render() {
    const user = getUser()!;
    return (
      <PageLayout>
        <GameQuery query={GET_GAME_BY_ID} variables={{gameId: user.active_game}}>
          {
            ({data: gameData, loading}) => !loading && gameData ? (
              <UsersQuery query={GET_ACTIVE_USERS} variables={{gameId: gameData.games[0].id }} >
                {
                  ({data: usersData, loading: usersLoading, subscribeToMore}) => {
                    if (!usersLoading && usersData) {
                      return this.props.children({
                        currentUserId: user.id,
                        users: convertActiveUser(usersData.players),
                        game: gameData.games[0],
                        subscribeToPlayers: () => subscribeToMore({
                          document: PLAYERS_SUBSCRIPTION,
                          variables: {gameId: gameData.games[0].id },
                          updateQuery: (prev, {subscriptionData: {data}}) => {
                            return data || prev;
                          },
                        }),
                      })
                    }
                    return <StyledLoadingContainer><CircularProgress/></StyledLoadingContainer>;
                  }
                }
              </UsersQuery>
            ) : <StyledLoadingContainer><CircularProgress/></StyledLoadingContainer>
          }
        </GameQuery>
      </PageLayout>
    )
  }
}
