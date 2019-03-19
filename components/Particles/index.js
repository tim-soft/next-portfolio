import React from 'react';
import { Canvas } from 'react-three-fiber';
import DatGui, {
  DatBoolean,
  DatNumber,
  DatFolder,
  DatSelect,
  DatString,
  DatPresets
} from 'react-dat-gui';
import { DatContainer, ParticleCube, PerformanceStats } from './components';

export default class Particles extends React.Component {
  constructor() {
    super();
    this.state = {
      clientLoaded: false,
      datConfig: {
        showCube: true,
        dimension: '3D',
        velocity: 2,
        lines: {
          limitConnections: true,
          maxConnections: 20,
          minDistance: 150,
          visible: true
        },
        particles: {
          colorMode: 'rainbow',
          color: '#ffffff',
          shape: 'square',
          boundingBox: 'canvas',
          count: 300,
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
          autoRotateSpeed: 0.3
        }
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
        <PerformanceStats />
        <DatContainer>
          <DatGui data={datConfig} onUpdate={this.handleDatUpdate}>
            <DatPresets
              label="Presets"
              options={[
                {
                  'Oort Cloud Stress Test': {
                    ...datConfig,
                    lines: {
                      ...datConfig.lines,
                      minDistance: 300,
                      visible: true
                    },
                    particles: {
                      ...datConfig.particles,
                      count: 1000,
                      maxSize: 125,
                      shape: 'circle'
                    }
                  },
                  ParticlesJS: {
                    ...datConfig,
                    dimension: '2D',
                    showCube: false,
                    lines: {
                      ...datConfig.lines,
                      minDistance: 110,
                      visible: true
                    },
                    particles: {
                      ...datConfig.particles,
                      count: 300,
                      maxSize: 50,
                      minSize: 20,
                      shape: 'circle',
                      boundingBox: 'canvas',
                      visible: true
                    },
                    cameraControls: {
                      ...datConfig.cameraControls,
                      autoRotate: false
                    }
                  }
                }
              ]}
              onUpdate={this.handleDatUpdate}
            />
            <DatBoolean path="particles.visible" label="Show Particles" />
            <DatBoolean path="lines.visible" label="Show Lines" />
            <DatBoolean path="showCube" label="Show Cube" />
            <DatSelect
              label="Dimsion"
              path="dimension"
              options={['2D', '3D']}
            />
            <DatNumber
              path="velocity"
              label="Velocity"
              min={0}
              max={30}
              step={0.1}
            />

            <DatFolder title="Lines" closed={false}>
              <DatNumber
                path="lines.minDistance"
                label="Min Distance"
                min={10}
                max={1000}
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
            </DatFolder>

            <DatFolder title="Particles" closed={false}>
              <DatSelect
                path="particles.colorMode"
                label="Color Mode"
                options={['rainbow', 'solid']}
              />
              <DatString path="color" label="Solid Color" />
              <DatNumber
                path="particles.count"
                label="Particle Count"
                min={0}
                max={1000}
                step={1}
              />
              <DatNumber
                path="particles.minSize"
                label="Min Size"
                min={0}
                max={400}
                step={1}
              />
              <DatNumber
                path="particles.maxSize"
                label="Max Size"
                min={0}
                max={400}
                step={1}
              />
              <DatSelect
                label="Bounding Box"
                path="particles.boundingBox"
                options={['canvas', 'cube']}
              />
              <DatSelect
                label="Shape"
                path="particles.shape"
                options={['circle', 'square']}
              />
            </DatFolder>

            <DatFolder title="Camera Controls" closed={false}>
              <DatBoolean path="cameraControls.enabled" label="Enable" />
              <DatBoolean path="cameraControls.enableDamping" label="Damping" />
              <DatNumber
                path="cameraControls.dampingFactor"
                label="Damping Factor"
                min={0}
                max={1}
                step={0.05}
              />
              <DatBoolean path="cameraControls.enableZoom" label="Zoom" />
              <DatBoolean
                path="cameraControls.autoRotate"
                label="Auto Rotate"
              />
              <DatNumber
                path="cameraControls.autoRotateSpeed"
                label="Rotate Speed"
                min={0}
                max={10}
                step={0.1}
              />
            </DatFolder>
          </DatGui>
        </DatContainer>
        <Canvas>
          <ParticleCube {...datConfig} />
        </Canvas>
      </>
    );
  }
}
