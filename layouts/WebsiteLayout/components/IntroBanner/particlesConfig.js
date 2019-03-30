export default {
  showCube: false,
  dimension: '3D',
  velocity: 1.1,
  boundaryType: 'passthru',
  direction: {
    xMin: 0,
    xMax: 0.9,
    yMin: -0.05,
    yMax: 0.15,
    zMin: -0.05,
    zMax: 0.05
  },
  lines: {
    colorMode: 'rainbow',
    color: '#351CCB',
    transparency: 0.6,
    limitConnections: true,
    maxConnections: 20,
    minDistance: 150,
    visible: false
  },
  particles: {
    colorMode: 'solid',
    color: '#ffffff',
    transparency: 0.5,
    shape: 'circle',
    boundingBox: 'canvas',
    count: 1500,
    minSize: 3,
    maxSize: 30,
    visible: true
  },
  cameraControls: {
    enabled: true,
    enableDamping: true,
    dampingFactor: 0.15,
    enableZoom: true,
    autoRotate: false,
    autoRotateSpeed: 0.3,
    resetCameraFlag: true
  }
};
