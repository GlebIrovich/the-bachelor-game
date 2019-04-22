import React from 'react';

import { Game } from '../../models';
import BarStepsWidget from '../BarStepsWidget';
import Map from '../Map';

interface Props {
  disableTabSwipe: (disable: boolean) => void;
  game: Game;
  isCreator: boolean;
}

const BarPage = ({disableTabSwipe, game, isCreator}: Props) => {
  return (
    <React.Fragment>
      <Map disableTabSwipe={disableTabSwipe} bars={game.bars}/>
      <BarStepsWidget bars={game.bars} gameId={game.id} isCreator={isCreator}/>
    </React.Fragment>
  );
}

export default BarPage;
