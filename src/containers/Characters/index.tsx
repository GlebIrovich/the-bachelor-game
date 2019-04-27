import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import CharacterCard from '../../components/CharacterCard';
import { FOOTER_HEIGHT_PX, HEADER_HEIGHT_PX } from '../../constants';
import { useEffectsContext } from '../../context/specialEffects';
import { useWindowSize } from '../../helpers/useWindowSize';
import { ActiveUser, Game, UserId } from '../../models';
import { EffectType } from '../../models/effects';
import ExplodeEffect from '../Explosions';

interface Props {
  users: ActiveUser[];
  game: Game;
  currentUserId: UserId;
  isCreator: boolean;
}

const PADDING = 24;

const calculateContainerHeight = () => {
  return (
    useWindowSize().height - HEADER_HEIGHT_PX - FOOTER_HEIGHT_PX - PADDING * 2
  );
};

interface StyledProps {
  height: number;
}

const CharactersContainer = styled.div`
  height: ${({ height }: StyledProps) => height}px;
  overflow: auto;
  font-size: 0.875rem;
  padding-top: ${PADDING}px;
  padding-left: ${PADDING}px;
  padding-right: ${PADDING}px;
`;

const Characters: FC<Props> = ({ users, game, isCreator, currentUserId }) => {
  const [containerHeight, setHeight] = React.useState(
    calculateContainerHeight()
  );
  const [{ effect }] = useEffectsContext();
  useEffect(() => {
    window.addEventListener('resize', () =>
      setHeight(calculateContainerHeight())
    );
  });
  return (
    <React.Fragment>
      {effect === EffectType.EXPLOSION && <ExplodeEffect />}
      <CharactersContainer height={containerHeight}>
        {users.map((user) => (
          <CharacterCard
            key={user.id}
            user={user}
            isCreator={isCreator}
            isCharacterOwner={user.id === currentUserId}
          />
        ))}
      </CharactersContainer>
    </React.Fragment>
  );
};

export default Characters;
