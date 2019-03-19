import React from 'react';
import { Canvas } from 'react-three-fiber';
import ParticleField from './ParticleField';

export default class ParticleFieldCanvas extends React.Component {
  constructor() {
    super();
    this.state = {
      clientLoaded: false
    };
  }

  componentDidMount() {
    this.setState({ clientLoaded: true });
  }

  render() {
    const { clientLoaded } = this.state;
    // Don't render the Particle field during a SSR
    if (!clientLoaded) return null;

    return (
      <Canvas>
        <ParticleField {...this.props} />
      </Canvas>
    );
  }
}
