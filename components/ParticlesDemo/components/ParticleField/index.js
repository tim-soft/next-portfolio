import React from 'react';
import { Canvas } from 'react-three-fiber';
import ParticleField from './ParticleField';

/**
 * Wraps a particle field in a Canvas
 */
export default props => (
  <Canvas>
    <ParticleField {...props} />
  </Canvas>
);
