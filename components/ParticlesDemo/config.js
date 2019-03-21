export default {
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
};