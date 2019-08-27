import React from 'react';
import ParticleField, { defaultConfig } from 'react-particles-webgl';
import { DatUI, PerformanceStats, RepoTag } from './components';

/**
 * A demo showcasing react-particles-webgl
 *
 * Includes a config panel and performance monitor
 */
export default class ParticlesDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      datConfig: defaultConfig
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
        <ParticleField config={datConfig} />

        {/* Repo tag */}
        <RepoTag />
      </>
    );
  }
}
