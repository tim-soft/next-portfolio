/* eslint-disable no-shadow */
import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useRender, useThree } from 'react-three-fiber';
import OrbitControls from 'three-orbitcontrols';
import {
  getParticleVertexShader,
  getParticleFragmentShader
} from './shaders/ParticleShaders';
import {
  getLineVertexShader,
  getLineFragmentShader
} from './shaders/LineShaders';
import animate from './Animate';

// Cube dimensions
const r = 700;

/**
 * Creates a particle cloud with various config options
 */
const ParticleCube = ({
  particles,
  lines,
  showCube,
  cameraControls,
  dimension
}) => {
  const controlsRef = useRef(0);
  const animation = useRef(0);
  const group = useRef();

  const { gl, canvas, camera, size } = useThree();
  // Scale rendering automatically to window DPI
  // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio
  gl.setPixelRatio(window.devicePixelRatio);

  // Setup camera
  controlsRef.current = useMemo(() => {
    camera.fov = 45;
    camera.aspect = size.width / size.height;
    camera.near = 1;
    camera.far = 4000;

    // Remove event listeners from previous controls if they exist
    // Set initial camera position if controls haven't taken over yet
    if (controlsRef.current) controlsRef.current.dispose();
    else camera.position.set(0, 0, 1750);

    // Setup movement controls for mouse/touch to manipulate camera position
    // https://threejs.org/docs/#examples/controls/OrbitControls
    const controls = new OrbitControls(camera, canvas);

    // Apply given settings to camera controls
    Object.entries(cameraControls).forEach(([key, value]) => {
      controls[key] = value;
    });

    return controls;
  }, [cameraControls]);

  // Compute lines between points
  const [
    lineMeshGeometry,
    lineMeshMaterial,
    linePositions,
    lineColors
  ] = useMemo(() => {
    const { count } = particles;
    const { visible } = lines;

    // Line material
    const lineMeshMaterial = new THREE.ShaderMaterial({
      vertexShader: getLineVertexShader(),
      fragmentShader: getLineFragmentShader(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      visible
    });

    // Line mesh geometry
    const lineMeshGeometry = new THREE.BufferGeometry();
    const segments = count * count;
    const positions = new Float32Array(segments * 3);
    const colors = new Float32Array(segments * 3);

    lineMeshGeometry.addAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3).setDynamic(true)
    );
    lineMeshGeometry.addAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3).setDynamic(true)
    );
    lineMeshGeometry.computeBoundingSphere();
    lineMeshGeometry.setDrawRange(0, 0);

    return [lineMeshGeometry, lineMeshMaterial, positions, colors];
  }, [particles.count, lines.visible]);

  // Compute point cloud
  const [
    pointCloudGeometry,
    pointMaterial,
    particlesData,
    particlePositions,
    bounds
  ] = useMemo(() => {
    const { boundingBox, count, shape, minSize, maxSize, visible } = particles;
    // Add particles to geometry
    // Maintain two arrays
    // particlePositions contains random x,y,z coords for each particle
    // particlesData contains a random x,y,z velocity vector for each particle
    const pointCloudGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(count * 3);
    const particleSizes = new Float32Array(count);
    const particlesData = [];

    let xBounds;
    let yBounds;
    let zBounds;
    if (boundingBox === 'canvas') {
      // Adjust size of particle field contstraints based on
      // whether field is 2D or 3D
      xBounds = dimension === '2D' ? size.width : size.width * 1.5;
      yBounds = dimension === '2D' ? size.height : size.height * 1.5;
      zBounds = dimension === '2D' ? 0 : size.width * 1.5;
    }
    if (boundingBox === 'cube') {
      xBounds = r;
      yBounds = r;
      zBounds = dimension === '2D' ? 0 : r;
    }

    for (let i = 0; i < count; i += 1) {
      // Calculate possible (x, y, z) location of particle
      // within the size of the canvas or cube size
      const x = Math.random() * xBounds - xBounds / 2;
      const y = Math.random() * yBounds - yBounds / 2;
      const z = Math.random() * zBounds - zBounds / 2;
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Choose size of each particle
      particleSizes[i] = Math.random() * (maxSize - minSize) + minSize;

      particlesData.push({
        velocity: new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        ),
        numConnections: 0
      });
    }

    pointCloudGeometry.setDrawRange(0, count);
    pointCloudGeometry.addAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3).setDynamic(true)
    );
    pointCloudGeometry.addAttribute(
      'size',
      new THREE.BufferAttribute(particleSizes, 1).setDynamic(true)
    );

    // Material for particle, use shaders to morph shape and color
    const pointMaterial = new THREE.ShaderMaterial({
      vertexShader: getParticleVertexShader(),
      fragmentShader: getParticleFragmentShader({ particleShape: shape }),
      transparent: true,
      blending: THREE.AdditiveBlending,
      visible
    });

    // The x,y,z bounds of possible particle positions
    // needed for Animate function
    const bounds = {
      xBounds,
      yBounds,
      zBounds
    };

    return [
      pointCloudGeometry,
      pointMaterial,
      particlesData,
      particlePositions,
      bounds
    ];
  }, [
    particles.count,
    particles.minSize,
    particles.maxSize,
    particles.shape,
    particles.visible,
    particles.boundingBox,
    showCube,
    dimension
  ]);

  const animationState = {
    minDistance: lines.minDistance,
    limitConnections: lines.limitConnections,
    maxConnections: lines.maxConnections,
    particleCount: particles.count,
    bounds,
    lineMeshGeometry,
    pointCloudGeometry,
    particlesData,
    particlePositions,
    linePositions,
    lineColors
  };

  animation.current = animationState;

  // Modify via refs
  useRender(() => {
    // Enables damping of OrbitControls
    requestAnimationFrame(() => controlsRef.current.update());
    // Animate current state of particles
    requestAnimationFrame(() => animate(animation.current));
  });

  return (
    <scene>
      <group ref={group}>
        {/* Bounding box that particles exist inside of */}
        {showCube && (
          <boxHelper>
            <mesh name="object">
              <meshBasicMaterial
                name="material"
                color="white"
                blending={THREE.AdditiveBlending}
                wireframe
                transparent
              />
              <boxBufferGeometry name="geometry" args={[r, r, r]} />
            </mesh>
          </boxHelper>
        )}
        {/* Lines connecting particles */}
        {lines.visible && (
          <lineSegments
            geometry={lineMeshGeometry}
            material={lineMeshMaterial}
          />
        )}

        {/* Particles */}
        {particles.visible && (
          <points geometry={pointCloudGeometry} material={pointMaterial} />
        )}
      </group>
    </scene>
  );
};

ParticleCube.propTypes = {
  showCube: PropTypes.bool,
  dimension: PropTypes.oneOf(['2D', '3D']),
  lines: PropTypes.shape({
    maxConnections: PropTypes.number,
    limitConnections: PropTypes.bool,
    minDistance: PropTypes.number,
    visible: PropTypes.bool
  }),
  particles: PropTypes.shape({
    count: PropTypes.number,
    minSize: PropTypes.number,
    maxSize: PropTypes.number,
    boundingBox: PropTypes.oneOf(['canvas', 'cube']),
    shape: PropTypes.oneOf(['circle', 'square']),
    colorMode: PropTypes.oneOf(['rainbow', 'solid']),
    color: PropTypes.string,
    visible: PropTypes.bool
  }),
  cameraControls: PropTypes.shape({
    enabled: PropTypes.bool,
    enableDamping: PropTypes.bool,
    dampingFactor: PropTypes.number,
    enableZoom: PropTypes.bool,
    autoRotate: PropTypes.bool,
    autoRotateSpeed: PropTypes.number
  })
};

ParticleCube.defaultProps = {
  showCube: true,
  dimension: '3D',
  lines: {
    limitConnections: true,
    maxConnections: 20,
    minDistance: 150,
    visible: false
  },
  particles: {
    count: 300,
    color: '#ffffff',
    colorMode: 'rainbow',
    boundingBox: 'canvas',
    minSize: 10,
    maxSize: 75,
    shape: 'square',
    visible: true
  },
  cameraControls: {
    enabled: true,
    enableDamping: true,
    dampingFactor: 0.2,
    enableZoom: true,
    autoRotate: true,
    autoRotateSpeed: 0.5
  }
};

export default ParticleCube;
