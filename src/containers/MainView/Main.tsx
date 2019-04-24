import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { FC, useEffect } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import { IVORY_WHITE, PRIMARY_DARK, WHITE } from '../../constants';
import { showOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { Game, OverlayKey } from '../../models';
import { GET_GAME_BY_ID, GetGameByIdQueryVariables } from '../../queries';
import { getUser } from '../../services';
import { gamePath } from '../Routes/paths';

const StyledButton = styled(Button)`
  display: block !important;
  margin: 1em auto !important;
  min-width: 12em !important;
  border-radius: 0 !important;
`;

const StyledMenuContainer = styled.div`
  border: solid 4px ${WHITE};
  text-transform: uppercase; 
  margin: 10em auto;
  border-radius: 10px;
  width: 18em;
  padding: 0.7em;
`;

const StyledMenuCard = styled(Grid)`
  /* background-color: ${PRIMARY_DARK}; */
  border-radius: 10px;
  height: 100%;
  height: 20em;
  padding: 0.7em;
  text-align: center;
`;

const StyledButtonContainer = styled(Grid)`
`;

const StyledTitle = styled.h1`
  color: ${IVORY_WHITE};
  margin: 0;
  font-size: 3em;
  font-family: 'Amatic SC', cursive;
`;

interface Props {
  loginRequired?: boolean;
}

class GameQuery extends Query<{games: [Game]}, GetGameByIdQueryVariables>{}

const Main: FC<RouteComponentProps & Props> = ({history, loginRequired}) => {
  const [, dispatch] = useOverlayContext()
  const user = getUser();

  useEffect(() => loginRequired ? dispatch(showOverlay(OverlayKey.LOGIN)) : undefined);

  function handleJoinGameClick(games?: [Game]) {
    if (user) {
      if (user.character && games && games.length) {
        history.push(gamePath(games[0].title))
      } else {
        dispatch(showOverlay(OverlayKey.JOIN_GAME))
      }
    } else {
      dispatch(showOverlay(OverlayKey.LOGIN))
    }
  }
  
  return (
    <div>
      <StyledMenuContainer>
        <StyledMenuCard container direction="column" justify="space-between">
          <StyledTitle>
            Приветствую Алко-Герой
          </StyledTitle>
          <StyledButtonContainer item>
            <GameQuery query={GET_GAME_BY_ID} variables={{gameId: user && user.active_game}}>
              {
                ({data, loading}) => (
                  <React.Fragment>
                    <StyledButton
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      onClick={() => handleJoinGameClick(data && data.games)}
                      color="primary"
                    >
                      Присоединиться
                    </StyledButton>
                    <StyledButton
                      fullWidth
                      onClick={() => dispatch(showOverlay(OverlayKey.LOGIN))}
                      variant="contained"
                      color="secondary"
                    >
                      Новая игра
                    </StyledButton>
                  </React.Fragment>
                )
              }
            </GameQuery>
          </StyledButtonContainer>
        </StyledMenuCard>
      </StyledMenuContainer>
    </div>
  );
}

export default withRouter(Main)
