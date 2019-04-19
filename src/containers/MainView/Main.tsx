import Button from '@material-ui/core/Button';
import React, { FC, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
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

const Main: FC<RouteComponentProps & Props> = ({history, loginRequired}) => {
  const [, dispatch] = useOverlayContext()
  const user = getUser();
  const {data, error, loading} = useQuery<{games: [Game]}, GetGameByIdQueryVariables>(GET_GAME_BY_ID, {variables: {gameId: user && user.active_game!}})

  useEffect(() => loginRequired ? dispatch(showOverlay(OverlayKey.LOGIN)) : undefined);

  function handleJoinGameClick() {
    if (user) {
      if (user.active_game && user.character && data && data.games) {
        history.push(gamePath(data.games[0].title))
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
      <StyledButton
        disabled={loading}
        onClick={handleJoinGameClick} variant="outlined" color="primary">Присоединиться</StyledButton>
      <StyledButton onClick={() => dispatch(showOverlay(OverlayKey.LOGIN))} variant="outlined" color="secondary">Новая игра</StyledButton>
    </div>
  );
}

export default withRouter(Main)
