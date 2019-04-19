import { Button, CircularProgress, MenuItem, Select } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import Overlay from '.';
import { hideOverlay } from '../../context/actions';
import { useOverlayContext } from '../../context/OverlaysContext';
import { characterList, characterTitleMap, CharacterType, Game, User } from '../../models';
import {
  GET_AVAILABLE_CHARACTERS,
  GET_GAME_BY_ID,
  GetAvailableCharacterQueryVariables,
  GetGameByIdQueryVariables,
  SET_CHARACTER,
  SetCharacterQueryVariables,
} from '../../queries';
import { getUser, setUser } from '../../services';
import { gamePath } from '../Routes/paths';
import OverlayWidget from './OverlayWidget';

const StyledProgress = styled(CircularProgress)`
  margin-right: 0.5em !important;
`;

const SelectCharacterOverlay: FC<RouteComponentProps> = ({history}) => {
  const [_state, dispatch] = useOverlayContext();
  const [character, selectCharacter] = useState<CharacterType | undefined>();
  const user = getUser()!;

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    selectCharacter(event.target.value as any);
  }

  const {data, error, loading} = useQuery<{users: Array<Pick<User, 'character'>>}, GetAvailableCharacterQueryVariables>(GET_AVAILABLE_CHARACTERS, {variables: {gameId: user.active_game!}})
  const {data: gameData} = useQuery<{games: [Game]}, GetGameByIdQueryVariables>(GET_GAME_BY_ID, {variables: {gameId: user.active_game!}})
  console.log(data, gameData);
  const setCharacter = useMutation<User[], SetCharacterQueryVariables>(SET_CHARACTER)
  function handleCharacterSelect() {
    if (character) {
      setCharacter({variables: {userId: user.id, character}})
        .then(({data}: {data: {update_users: {returning: [User]}}}) => {
          console.log(data, gameData);
          if(data && data.update_users && data.update_users.returning && gameData && gameData.games && gameData.games.length) {
            setUser({...user, character: data.update_users.returning[0].character});
            history.push(gamePath(gameData.games[0].title))
          }
          dispatch(hideOverlay())
        })
    }
  }
  
  return (
    <Overlay>
      <OverlayWidget
        title="Выбор класса"
        message="Выбери класс персонажа"
        actions={
          <Button
            color="primary"
            disabled={loading || !!error || !character}
            onClick={handleCharacterSelect}
          >
            {loading && <StyledProgress size="1em"/>}
            Погнали!
          </Button>
        }
        content={
          <form autoComplete="off">
            <Select
              fullWidth
              value={character || ''}
              onChange={handleChange}
              inputProps={{
                name: 'age',
                id: 'age-simple',
              }}
            >
              <MenuItem value="" key="none">
                <em>None</em>
              </MenuItem>
                {
                  !loading && data && characterList
                    .filter(char => !data.users.map(user => user.character).includes(char))
                    .map((char) => <MenuItem value={char} key={char}>{characterTitleMap[char]}</MenuItem>)
                }
            </Select>
          </form>
        }
      />
    </Overlay>
  )
}

export default withRouter(SelectCharacterOverlay)
