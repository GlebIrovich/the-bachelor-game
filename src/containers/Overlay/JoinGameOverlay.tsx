import { Button, CircularProgress, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import Overlay from '.';
import { LOADING_ICON_SIZE } from '../../constants/styles';
import { hideOverlay } from '../../context';
import { useOverlayContext } from '../../context/overlays/OverlaysContext';
import { characterList, characterTitleMap, CharacterType, Game } from '../../models';
import {
  GET_GAME,
  GetGameQueryVariables,
  SET_ACTIVE_GAME,
  SetActiveGameData,
  SetActiveGameQueryVariables,
} from '../../queries';
import { getUser, setUser } from '../../services';
import { gamePath } from '../Routes/paths';
import OverlayWidget from './OverlayWidget';

enum InputField {
  TITLE = 'title',
}

const StyledProgress = styled(CircularProgress)`
  margin-right: 0.5em !important;
`;

const StyledSelect = styled(Select)`
  margin-top: 0.5em;
`;

const JoinGameOverlay: FC<RouteComponentProps> = ({ history }) => {
  const [, dispatch] = useOverlayContext();
  const [values, titleChange] = useState({ [InputField.TITLE]: '' });
  const [character, selectCharacter] = useState<CharacterType | undefined>();

  const handleTitleChange = (field: InputField) => (event: ChangeEvent<HTMLInputElement>) => {
    titleChange({
      ...values,
      [field]: event.currentTarget.value.toLocaleLowerCase(),
    });
  };

  function handleCharacterSelect(event: ChangeEvent<HTMLSelectElement>) {
    selectCharacter(event.target.value as any);
  }

  const { data, error, loading } = useQuery<{ games: Game[] }, GetGameQueryVariables>(GET_GAME, {
    variables: { title: values[InputField.TITLE] },
  });
  const setActiveGame = useMutation<SetActiveGameData, SetActiveGameQueryVariables>(SET_ACTIVE_GAME);

  function isButtonDisabled() {
    if (data && data.games.length === 1 && character) return false;
    return true;
  }
  const user = getUser();
  function handleJoin() {
    if (data && data.games.length === 1 && user && character) {
      setActiveGame({
        variables: { userId: user.id, gameId: data.games[0].id, character },
      }).then(({ data: mutationData }: { data: SetActiveGameData }) => {
        if (mutationData && mutationData.update_users && mutationData.update_users.returning) {
          setUser({
            ...user,
            active_game: mutationData.update_users.returning[0].active_game,
          });

          history.push(gamePath(data.games[0].title));
          dispatch(hideOverlay());
        }
      });
    }
  }

  return (
    <Overlay>
      <OverlayWidget
        title="Поиск игры"
        actions={
          <Button
            onClick={handleJoin}
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || !!error || isButtonDisabled()}
          >
            {loading && <StyledProgress size={LOADING_ICON_SIZE} />}
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
            <InputLabel htmlFor="class-select">Класс</InputLabel>
            <StyledSelect
              fullWidth
              value={character || ''}
              onChange={handleCharacterSelect}
              inputProps={{
                name: 'class',
                id: 'class-select',
              }}
            >
              {!loading &&
                data &&
                characterList.map((char) => (
                  <MenuItem value={char} key={char}>
                    {characterTitleMap[char]}
                  </MenuItem>
                ))}
            </StyledSelect>
          </form>
        }
      />
    </Overlay>
  );
};

export default withRouter(JoinGameOverlay);
