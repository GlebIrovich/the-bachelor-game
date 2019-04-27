import React, { ComponentType } from 'react';
import Explosion1 from 'react-explode/Explosion1';
import Explosion10 from 'react-explode/Explosion10';
import Explosion2 from 'react-explode/Explosion2';
import Explosion3 from 'react-explode/Explosion3';
import Explosion4 from 'react-explode/Explosion4';
import Explosion5 from 'react-explode/Explosion5';
import Explosion6 from 'react-explode/Explosion6';
import Explosion7 from 'react-explode/Explosion7';
import Explosion8 from 'react-explode/Explosion8';
import Explosion9 from 'react-explode/Explosion9';
import styled from 'styled-components';

import { hideEffect, useEffectsContext } from '../../context/specialEffects';

const EXPLOSION_SIZE = 450;

const explosionList: Array<ComponentType<any>> = [
  Explosion1,
  Explosion2,
  Explosion3,
  Explosion4,
  Explosion5,
  Explosion6,
  Explosion7,
  Explosion8,
  Explosion9,
  Explosion10,
];

function randomExplosion() {
  return explosionList[Math.floor(Math.random() * explosionList.length)];
}

function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const StyledContainer = styled.div`
  width: 100%;
  text-align: center;
  height: 100%;
  position: absolute;
  z-index: 10000;
`;

const ExplodeEffect = React.memo(() => {
  const [, dispatch] = useEffectsContext();
  const Explosion = randomExplosion();
  return (
    <StyledContainer>
      <Explosion
        size={EXPLOSION_SIZE}
        delay={0.2}
        repeatDelay={0.1}
        repeat={1}
        color={randomColor()}
        onComplete={() => dispatch(hideEffect())}
      />
    </StyledContainer>
  );
});

export default ExplodeEffect;
