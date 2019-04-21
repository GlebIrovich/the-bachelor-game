import Button from '@material-ui/core/Button';
import React, { FC, useEffect } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

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
    <div className="App">
      <p>
          Welcome to Kekopolia!
      </p>
      <GameQuery query={GET_GAME_BY_ID} variables={{gameId: user && user.active_game}}>
        {
          ({data, loading}) => (
            <React.Fragment>
              <StyledButton
                disabled={loading}
                onClick={() => handleJoinGameClick(data && data.games)} variant="outlined" color="primary">Присоединиться</StyledButton>
              <StyledButton onClick={() => dispatch(showOverlay(OverlayKey.LOGIN))} variant="outlined" color="secondary">Новая игра</StyledButton>
            </React.Fragment>
          )
        }
      </GameQuery>
    </div>
  );
}

export default withRouter(Main)
