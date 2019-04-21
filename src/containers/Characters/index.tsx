import React, { FC } from 'react';

import CharacterCard from '../../components/CharacterCard';
import { Game, User, UserId } from '../../models';

interface Props {
  users: User[];
  game: Game;
  currentUserId: UserId;
}

const Characters: FC<Props> = ({users, game}) => {
  function getGameData(userId: UserId) {
    return {}
  }
  return (
    <div>
      {users.map(user => <CharacterCard key={user.id} user={user} gameData={getGameData(user.id) as any} />)}
    </div>
  )
}

export default Characters
