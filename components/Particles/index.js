import React from 'react';
import { Canvas } from 'react-three-fiber/dist';
import DatGui, { DatBoolean, DatNumber } from 'react-dat-gui';
import DatContainer from './DatContainer';
import ParticleCube from './ParticleCube';

export default class Particles extends React.Component {
  constructor() {
    super();
    this.state = {
      clientLoaded: false,
      datConfig: {
        showParticles: true,
        showLines: true,
        minDistance: 150,
        limitConnections: true,
        maxConnections: 20,
        particleCount: 100
      }
    };
  }

  componentDidMount() {
    this.setState({ clientLoaded: true });
  }

  handleDatUpdate = datConfig => this.setState({ datConfig });

  render() {
    const { clientLoaded, datConfig } = this.state;
    if (!clientLoaded) return null;

    return (
      <>
        <DatContainer>
          <DatGui data={datConfig} onUpdate={this.handleDatUpdate}>
            <DatBoolean path="showParticles" label="Show Particles" />
            <DatBoolean path="showLines" label="Show Lines" />
            <DatNumber
              path="minDistance"
              label="Min Distance"
              min={10}
              max={300}
              step={1}
            />
            <DatBoolean path="limitConnections" label="Limit Connections" />
            <DatNumber
              path="maxConnections"
              label="Max Connections"
              min={0}
              max={30}
              step={1}
            />
            <DatNumber
              path="particleCount"
              label="Particle Count"
              min={0}
              max={1000}
              step={1}
            />
          </DatGui>
        </DatContainer>
        <Canvas>
          <ParticleCube {...datConfig} />
        </Canvas>
      </>
    );
  }
}
