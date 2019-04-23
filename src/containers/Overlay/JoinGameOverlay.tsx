import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import Overlay from '.';
import { LOADING_ICON_SIZE } from '../../constants/styles';
import { showOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { Game, OverlayKey } from '../../models';
import {
  GET_GAME,
  GetGameQueryVariables,
  SET_ACTIVE_GAME,
  SetActiveGameData,
  SetActiveGameQueryVariables,
} from '../../queries';
import { getUser, setUser } from '../../services';
import OverlayWidget from './OverlayWidget';

enum InputField {
  TITLE = 'title',
}

const StyledProgress = styled(CircularProgress)`
  margin-right: 0.5em !important;
`;

const JoinGameOverlay: FC<RouteComponentProps> = ({history}) => {
  const [, dispatch] = useOverlayContext();
  const [values, titleChange] = useState({[InputField.TITLE]: ''})
  const handleTitleChange = (field: InputField) => (event: ChangeEvent<HTMLInputElement>) => {
    titleChange({...values, [InputField.TITLE]: event.currentTarget.value.toLocaleLowerCase()})
  }

  const {data, error, loading} = useQuery<{games: Game[]}, GetGameQueryVariables>(GET_GAME, {variables: {title: values[InputField.TITLE]}})
  const setActiveGame = useMutation<SetActiveGameData, SetActiveGameQueryVariables>(SET_ACTIVE_GAME);

  function isButtonDisabled() {
    if (data && data.games.length === 1) return false;
    return true;
  }
  const user = getUser();
  function handleJoin() {
    
    if (data && data.games.length === 1 && user) {
      
      setActiveGame({variables: {userId: user.id, gameId: data.games[0].id}})
        .then(({data: mutationData}: {data: SetActiveGameData}) => {
          if(mutationData
              && mutationData.update_users
              && mutationData.update_users.returning) {
            setUser({...user, active_game: mutationData.update_users.returning[0].active_game});

            dispatch(showOverlay(OverlayKey.SELECT_CHARACTER));
          }
        })
    }
  }
  
  return (
    <Overlay>
      <OverlayWidget
        title="Поиск игры"
        actions={
          <Button
            onClick={handleJoin}
            color="primary"
            disabled={loading || !!error || isButtonDisabled()}
          >
            {loading && <StyledProgress size={LOADING_ICON_SIZE}/>}
            Присоединиться
          </Button>
        }
        content={
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Название игры"
              error={!!error}
              value={values[InputField.TITLE]}
              onChange={handleTitleChange(InputField.TITLE)}
              margin="normal"
            />
          </form>
        }
      />
    </Overlay>
  )
}

export default withRouter(JoinGameOverlay)