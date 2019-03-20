import React from 'react';
import PropTypes from 'prop-types';
import DatGui, {
  DatBoolean,
  DatNumber,
  DatFolder,
  DatSelect,
  DatString,
  DatPresets
} from 'react-dat-gui';
import DatContainer from './DatContainer';

/**
 * A DatGUI for tweaking the ParticleField settings
 *
 * @param {object} datConfig current configuration for particle field
 * @param {function} handleDatUpdate a function for writing the current state of config UI to ParticleField
 */
const DatUI = ({ datConfig, handleDatUpdate }) => (
  <DatContainer>
    <DatGui data={datConfig} onUpdate={handleDatUpdate}>
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
              },
              cameraControls: {
                ...datConfig.cameraControls,
                autoRotate: true,
                resetCameraFlag: false
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
                autoRotate: false,
                resetCameraFlag: true
              }
            },
            Whirlpool: {
              ...datConfig,
              velocity: 10,
              lines: {
                ...datConfig.lines,
                visible: false
              },
              particles: {
                ...datConfig.particles,
                count: 1500,
                maxSize: 140,
                shape: 'circle'
              },
              cameraControls: {
                ...datConfig.cameraControls,
                autoRotate: true,
                autoRotateSpeed: 3,
                resetCameraFlag: false
              }
            }
          }
        ]}
        onUpdate={handleDatUpdate}
      />
      <DatBoolean path="particles.visible" label="Show Particles" />
      <DatBoolean path="lines.visible" label="Show Lines" />
      <DatBoolean path="showCube" label="Show Cube" />
      <DatSelect label="Dimsion" path="dimension" options={['2D', '3D']} />
      <DatNumber path="velocity" label="Velocity" min={0} max={30} step={0.1} />

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
          max={1500}
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
        <DatBoolean path="cameraControls.autoRotate" label="Auto Rotate" />
        <DatNumber
          path="cameraControls.autoRotateSpeed"
          label="Rotate Speed"
          min={0}
          max={10}
          step={0.1}
        />
        <DatBoolean
          path="cameraControls.resetCameraFlag"
          label="Reset Cam Flag"
        />
      </DatFolder>
    </DatGui>
  </DatContainer>
);

DatUI.propTypes = {
  datConfig: PropTypes.object.isRequired,
  handleDatUpdate: PropTypes.func.isRequired
};

export default DatUI;
