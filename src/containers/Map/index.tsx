import React, { Component, FC, useEffect, useState } from 'react';
import ReactMapGL, { GeolocateControl, ViewState } from 'react-map-gl';
import styled from 'styled-components';

import { REACT_APP_MAP_BOX_TOKEN } from '../../config';
import { DEFAULT_MAP_HEIGHT_PX } from '../../constants/styles';
import { useWindowSize } from '../../helpers/useWindowSize';

const StyledGeolocationControls = styled(GeolocateControl)`
  background-color: transparent !important;
  box-shadow: none !important;
  > button {
    background-color: transparent !important;
  }
`;

const initialLocation: ViewState = {
  latitude: 55.751244,
  longitude: 37.618423,
  zoom: 10
};

interface Props {
  disableTabSwipe: (disable: boolean) => void;
}

interface StyledProps {
  width: number;
}

const StyledMapContainer = styled.div`
  width: ${({width}: StyledProps) => width}px;
`;

const Map: FC<Props> = ({disableTabSwipe}) => {
  const [viewport, handleViewportChange] = useState<ViewState>(initialLocation)
  const [componentWidth, setWidth] = React.useState(useWindowSize().width);
  useEffect(() => {
    window.addEventListener('resize', () => {console.log('resize', useWindowSize().width); setWidth(useWindowSize().width)})
})

  return (
    <StyledMapContainer width={componentWidth}>
      <ReactMapGL
        width={componentWidth}
        height={DEFAULT_MAP_HEIGHT_PX}
        {...viewport}
        onTouchStart={() => disableTabSwipe(true)}
        onTouchEnd={() => disableTabSwipe(false)}
        mapboxApiAccessToken={REACT_APP_MAP_BOX_TOKEN}
        onViewportChange={(viewport) => handleViewportChange(viewport)}
      >
        <StyledGeolocationControls
          key="geolocation"
          onViewportChange={(viewport) => handleViewportChange(viewport)}
          positionOptions={{enableHighAccuracy: false}}
          trackUserLocation
        />
      </ReactMapGL>
    </StyledMapContainer>
  );
}

export default Map;