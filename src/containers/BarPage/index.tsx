import React, { useState } from 'react';
import { FlyToInterpolator, ViewportProps, ViewState } from 'react-map-gl';

import { Game, LevelStatus } from '../../models';
import BarStepsWidget from '../BarStepsWidget';
import Map from '../Map';

const initialLocation: ViewState = {
  latitude: 55.751244,
  longitude: 37.618423,
  zoom: 15,
};

interface Props {
  disableTabSwipe: (disable: boolean) => void;
  game: Game;
  isCreator: boolean;
}

const BarPage = ({ disableTabSwipe, game, isCreator }: Props) => {
  const activeBar = game.bars
    .filter((bar) => bar.status === LevelStatus.ACTIVE)
    .map(({ longitude, latitude }) => ({ longitude, latitude }));

  const [viewport, handleViewportChange] = useState<Partial<ViewportProps>>({ ...initialLocation, ...activeBar[0] });

  function goToViewport({ longitude, latitude }: ViewState) {
    handleViewportChange({
      ...viewport,
      longitude,
      latitude,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 1000,
    });
  }

  function onViewportChange(newViewport: ViewState) {
    handleViewportChange({ ...viewport, ...newViewport });
  }

  return (
    <React.Fragment>
      <Map
        viewport={viewport}
        onViewportChange={onViewportChange}
        goToViewport={goToViewport}
        disableTabSwipe={disableTabSwipe}
        bars={game.bars}
      />
      <BarStepsWidget goToViewport={goToViewport} bars={game.bars} gameId={game.id} isCreator={isCreator} />
    </React.Fragment>
  );
};

export default BarPage;
