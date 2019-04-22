import React, { FC } from 'react';
import { Marker } from 'react-map-gl';
import styled from 'styled-components';

import beerIcon from './beer.svg';

interface StyledProps {
  active: boolean;
}

const StyledIcon = styled.img`
  width: ${({active}: StyledProps) => active ? '1.6em' : '1.2em'};
  height: ${({active}: StyledProps) => active ? '1.6em' : '1.2em'};
  filter: ${({active}: StyledProps) => active ? 'none' : 'grayscale(80%)'};
`;

interface Props {
  latitude: number;
  longitude: number;
  active: boolean;
}

const BarMarker: FC<Props> = ({latitude, longitude, active}) => {
  return (
    <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
      <StyledIcon src={beerIcon} active={active}/>
    </Marker>
  )
}

export default BarMarker
