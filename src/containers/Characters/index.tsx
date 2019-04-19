import React from 'react';

import CharacterCard from '../../components/CharacterCard';
import { CharacterType } from '../../models';

const Characters = () => {
  return (
    <div>
      <CharacterCard character={ CharacterType.PALADIN } playerName="Vova" />
    </div>
  )
}

export default Characters
