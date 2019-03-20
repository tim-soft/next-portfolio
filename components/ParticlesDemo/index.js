import React from 'react';
import { DatUI, ParticleField, PerformanceStats } from './components';

/**
 * A demo showcasing react-particles-webgl
 *
 * Includes a config panel and performance monitor
 */
export default class ParticlesDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      datConfig: {
        showCube: true,
        dimension: '3D',
        velocity: 2,
        lines: {
          colorMode: 'rainbow',
          color: '#3f51b5',
          transparency: 0.9,
          limitConnections: true,
          maxConnections: 20,
          minDistance: 150,
          visible: true
        },
        particles: {
          colorMode: 'rainbow',
          color: '#3f51b5',
          transparency: 0.9,
          shape: 'square',
          boundingBox: 'canvas',
          count: 500,
          minSize: 10,
          maxSize: 75,
          visible: true
        },
        cameraControls: {
          enabled: true,
          enableDamping: true,
          dampingFactor: 0.2,
          enableZoom: true,
          autoRotate: true,
          autoRotateSpeed: 0.3,
          resetCameraFlag: false
        }
      }
    };
  }

  handleDatUpdate = datConfig => this.setState({ datConfig });

  render() {
    const { datConfig } = this.state;

    return (
      <>
        {/* FPS Counter */}
        <PerformanceStats />
        {/* Config GUI */}
        <DatUI datConfig={datConfig} handleDatUpdate={this.handleDatUpdate} />
        {/* Particle Canvas */}
        <ParticleField {...datConfig} />
      </>
    );
  }
}
