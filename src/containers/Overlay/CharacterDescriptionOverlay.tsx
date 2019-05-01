import { Button, MenuItem, Select, Typography } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import Overlay from '.';
import { hideOverlay } from '../../context/overlays/actions';
import { useOverlayContext } from '../../context/overlays/OverlaysContext';
import { characterDescriptionMap, characterTitleMap, CharacterType, GameId, UserId } from '../../models';
import {
  MutateCharacterData,
  RESET_PLAYER_SKILLS,
  ResetPlayerSkillsMutationVariables,
  SET_CHARACTER,
  SetCharacterMutationVariables,
} from '../../queries';
import OverlayWidget from './OverlayWidget';

interface Props {
  character: CharacterType;
  userId: UserId;
  gameId: GameId;
  isCreator: boolean;
}

const StyledSelect = styled(Select)`
  margin-top: 1em !important;
`;

const CharacterDescriptionOverlay: FC<Props> = ({ character, userId, gameId, isCreator }) => {
  const [_state, dispatch] = useOverlayContext();
  const [updatedCharacter, setCharacter] = useState<CharacterType | undefined>(undefined);
  const mutateCharacter = useMutation<any, SetCharacterMutationVariables>(SET_CHARACTER);
  const resetSkills = useMutation<any, ResetPlayerSkillsMutationVariables>(RESET_PLAYER_SKILLS);
  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    if (event) {
      mutateCharacter({ variables: { userId, character: event.target.value } }).then(({ data }) => {
        if (data) {
          setCharacter((data as MutateCharacterData).update_players.returning[0].character);
          resetSkills({ variables: { userId, gameId } });
        }
      });
    }
  }
  return (
    <Overlay>
      <OverlayWidget
        hideCancelAction
        title={characterTitleMap[character]}
        actions={
          <React.Fragment>
            <Button fullWidth onClick={() => dispatch(hideOverlay())} variant="contained" color="primary">
              Ок
            </Button>
            {isCreator && (
              <StyledSelect
                fullWidth
                value={updatedCharacter || character}
                onChange={handleSelect}
                inputProps={{
                  name: 'Персонаж',
                  id: 'character',
                }}
              >
                {Object.keys(characterTitleMap).map((char) => (
                  <MenuItem key={char} value={char}>
                    {characterTitleMap[char as CharacterType]}
                  </MenuItem>
                ))}
              </StyledSelect>
            )}
          </React.Fragment>
        }
        content={<Typography>{characterDescriptionMap[character]}</Typography>}
      />
    </Overlay>
  );
};

export default CharacterDescriptionOverlay;
