import React, { FC } from 'react';

import CharacterCard from '../../components/CharacterCard';
import { ActiveUser, Game, UserId } from '../../models';

interface Props {
  users: ActiveUser[];
  game: Game;
  currentUserId: UserId;
  isCreator: boolean;
}

const Characters: FC<Props> = ({users, game, isCreator, currentUserId}) => {
  return (
    <div>
      {users.map(user => <CharacterCard key={user.id} user={user} isCreator={isCreator} isCharacterOwner={user.id === currentUserId} />)}
    </div>
  )
}

export default Characters
