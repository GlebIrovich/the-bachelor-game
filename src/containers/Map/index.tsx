import React, { Component, FC, useEffect, useState } from 'react';
import ReactMapGL, { GeolocateControl, ViewportProps, ViewState } from 'react-map-gl';
import styled from 'styled-components';

import { REACT_APP_MAP_BOX_TOKEN } from '../../config';
import { DEFAULT_MAP_HEIGHT_PX } from '../../constants/styles';
import { useWindowSize } from '../../helpers/useWindowSize';
import { Level, LevelStatus } from '../../models';
import BarMarker from './BarMarker';

const StyledGeolocationControls = styled(GeolocateControl)`
  background-color: transparent !important;
  box-shadow: none !important;
  > button {
    background-color: transparent !important;
  }
`;

interface Props {
  disableTabSwipe: (disable: boolean) => void;
  bars: Level[];
  onViewportChange: (viewport: ViewState) => void;
  goToViewport: (viewport: ViewState) => void;
  viewport: Partial<ViewportProps>;
}

interface StyledProps {
  width: number;
}

const StyledMapContainer = styled.div`
  width: ${({ width }: StyledProps) => width}px;
`;

const Map: FC<Props> = ({ disableTabSwipe, bars, onViewportChange, viewport, goToViewport }) => {
  const [componentWidth, setWidth] = React.useState(useWindowSize().width);

  const handleResize = () => setWidth(useWindowSize().width);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <StyledMapContainer width={componentWidth}>
      <ReactMapGL
        width={componentWidth}
        height={DEFAULT_MAP_HEIGHT_PX}
        {...viewport}
        onTouchStart={() => disableTabSwipe(true)}
        onTouchEnd={() => disableTabSwipe(false)}
        mapboxApiAccessToken={REACT_APP_MAP_BOX_TOKEN}
        onViewportChange={onViewportChange}
      >
        <StyledGeolocationControls
          key="geolocation"
          onViewportChange={goToViewport}
          positionOptions={{ enableHighAccuracy: false }}
          trackUserLocation
          showUserLocation
        />
        {bars.map(({ latitude, longitude, id, status }) => (
          <BarMarker key={id} latitude={latitude} longitude={longitude} active={status === LevelStatus.ACTIVE} />
        ))}
      </ReactMapGL>
    </StyledMapContainer>
  );
};

export default Map;
