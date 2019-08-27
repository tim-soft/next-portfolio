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
      clientSide: false,
      datConfig: defaultConfig
    };
  }

  componentDidMount = () => this.setState({ clientSide: true });

  handleDatUpdate = datConfig => this.setState({ datConfig });

  render() {
    const { datConfig, clientSide } = this.state;

    return (
      <>
        {/* FPS Counter */}
        <PerformanceStats />
        {/* Config GUI */}
        <DatUI datConfig={datConfig} handleDatUpdate={this.handleDatUpdate} />
        {/* Particle Canvas */}
        {clientSide && <ParticleField config={datConfig} />}

        {/* Repo tag */}
        <RepoTag />
      </>
    );
  }
}
