/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useRender, useThree } from 'react-three-fiber';
import OrbitControls from 'three-orbitcontrols';

const r = 700;
const rHalf = r / 2;

const animate = ({
  minDistance,
  limitConnections,
  maxConnections,
  particleCount,
  lineMeshGeometry,
  pointCloudGeometry,
  particlesData,
  particlePositions,
  linePositions,
  lineColors
}) => {
  let vertexpos = 0;
  let colorpos = 0;
  let numConnected = 0;
  for (let i = 0; i < particleCount; i += 1)
    particlesData[i].numConnections = 0;
  for (let i = 0; i < particleCount; i += 1) {
    // get the particle
    const particleData = particlesData[i];
    particlePositions[i * 3] += particleData.velocity.x;
    particlePositions[i * 3 + 1] += particleData.velocity.y;
    particlePositions[i * 3 + 2] += particleData.velocity.z;
    if (
      particlePositions[i * 3 + 1] < -rHalf ||
      particlePositions[i * 3 + 1] > rHalf
    )
      particleData.velocity.y = -particleData.velocity.y;
    if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
      particleData.velocity.x = -particleData.velocity.x;
    if (
      particlePositions[i * 3 + 2] < -rHalf ||
      particlePositions[i * 3 + 2] > rHalf
    )
      particleData.velocity.z = -particleData.velocity.z;
    if (limitConnections && particleData.numConnections >= maxConnections)
      continue;
    // Check collision
    for (let j = i + 1; j < particleCount; j += 1) {
      const particleDataB = particlesData[j];
      if (limitConnections && particleDataB.numConnections >= maxConnections)
        continue;
      const dx = particlePositions[i * 3] - particlePositions[j * 3];
      const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
      const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < minDistance) {
        particleData.numConnections += 1;
        particleDataB.numConnections += 1;
        let alpha = 1.0 - dist / minDistance;
        if (alpha < 0.17) alpha = 0.17;
        linePositions[vertexpos++] = particlePositions[i * 3];
        linePositions[vertexpos++] = particlePositions[i * 3 + 1];
        linePositions[vertexpos++] = particlePositions[i * 3 + 2];
        linePositions[vertexpos++] = particlePositions[j * 3];
        linePositions[vertexpos++] = particlePositions[j * 3 + 1];
        linePositions[vertexpos++] = particlePositions[j * 3 + 2];
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        numConnected += 1;
      }
    }
  }

  lineMeshGeometry.setDrawRange(0, numConnected * 2);
  lineMeshGeometry.attributes.position.needsUpdate = true;
  lineMeshGeometry.attributes.color.needsUpdate = true;
  pointCloudGeometry.attributes.position.needsUpdate = true;
};

const ParticleCube = ({
  showParticles,
  showLines,
  minDistance,
  limitConnections,
  maxConnections,
  particleCount,
  minParticleSize,
  maxParticleSize
}) => {
  const animation = useRef(0);
  const group = useRef();

  const { gl, canvas, camera } = useThree();
  // Scale rendering automatically to window DPI
  // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio
  gl.setPixelRatio(window.devicePixelRatio);

  // Setup camera
  const [controls] = useMemo(() => {
    camera.fov = 45;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 1;
    camera.far = 4000;
    camera.position.z = 1750;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.enableZoom = true;

    return [controls];
  }, []);

  // Compute lines between points
  const [
    lineMeshGeometry,
    lineMeshMaterial,
    linePositions,
    lineColors
  ] = useMemo(() => {
    // Line material
    const lineMeshMaterial = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors,
      blending: THREE.AdditiveBlending,
      transparent: true,
      visible: showLines
    });

    // Line mesh geometry
    const lineMeshGeometry = new THREE.BufferGeometry();
    const segments = particleCount * particleCount;
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
  }, [showLines]);

  // Compute point cloud
  const [
    pointCloudGeometry,
    pointMaterial,
    particlesData,
    particlePositions
  ] = useMemo(() => {
    // Add particles to geometry
    // Maintain two arrays
    // particlePositions contains random x,y,z coords for each particle
    // particlesData contains a random x,y,z velocity vector for each particle
    const pointCloudGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particlesData = [];

    for (let i = 0; i < particleCount; i += 1) {
      const x = Math.random() * r - r / 2;
      const y = Math.random() * r - r / 2;
      const z = Math.random() * r - r / 2;
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Choose size of each particle
      particleSizes[i] =
        Math.random() * (maxParticleSize - minParticleSize) + minParticleSize;

      particlesData.push({
        velocity: new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        ),
        numConnections: 0
      });
    }

    pointCloudGeometry.setDrawRange(0, particleCount);
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
      uniforms: {
        color: { value: new THREE.Color(Math.random() * 0xffffff) }
      },
      vertexShader: `
        // Size attribute for particle geometry
        attribute float size;

        // Calculate color based on particle position
        varying vec3 vColor;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = size * ( 300.0 / -mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;

          vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
          vColor = normalize( abs( worldPosition.xyz ) );
        }
      `,
      fragmentShader: `
        // Color from uniforms arg
        uniform vec3 color;

        // Color calculated from vertex shader, based on particle position
        varying vec3 vColor;

        void main() {
          gl_FragColor = vec4( vColor, 1.0 );
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      visible: showParticles
    });

    return [
      pointCloudGeometry,
      pointMaterial,
      particlesData,
      particlePositions
    ];
  }, [particleCount, showParticles, minParticleSize, maxParticleSize]);

  const animationState = {
    minDistance,
    limitConnections,
    maxConnections,
    particleCount,
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
    // Spins the cube slowly
    const time = Date.now() * 0.001;
    group.current.rotation.y = time * 0.1;

    // Enables damping of OrbitControls
    requestAnimationFrame(() => controls.update());
    // Animate current state of particles
    requestAnimationFrame(() => animate(animation.current));
  });

  return (
    <scene>
      <group ref={group}>
        {/* Bounding box that particles exist inside of */}
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
        {/* Lines connecting particles */}
        <lineSegments geometry={lineMeshGeometry} material={lineMeshMaterial} />
        {/* Particles */}
        <points geometry={pointCloudGeometry} material={pointMaterial} />
      </group>
    </scene>
  );
};

ParticleCube.propTypes = {
  showParticles: PropTypes.bool.isRequired,
  showLines: PropTypes.bool.isRequired,
  minDistance: PropTypes.number.isRequired,
  limitConnections: PropTypes.bool.isRequired,
  maxConnections: PropTypes.number.isRequired,
  particleCount: PropTypes.number.isRequired,
  minParticleSize: PropTypes.number.isRequired,
  maxParticleSize: PropTypes.number.isRequired
};

export default ParticleCube;
