/**
 * Generates a vertex shader for a particle system
 *
 * This shader uses the position of particles to determine their color
 * and change them as they move
 */
export const getVertexShader = () => `
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
`;

// "Cuts" a circle out of the default square shape
// by setting the "leftovers" as transparent
const circleParticleShape = `
float r = 0.0, delta = 0.0, alpha = 1.0;
vec2 cxy = 2.0 * gl_PointCoord - 1.0;
r = dot(cxy, cxy);
if (r > 1.0) {
    discard;
}
`;

/**
 * Applies a shape to each particle
 *
 * @param {String} particleShape Either 'circle' or 'square'
 */
export const getFragmentShader = ({ particleShape }) => `
// Color from uniforms arg
uniform vec3 color;

// Color calculated from vertex shader, based on particle position
varying vec3 vColor;

void main() {
  ${particleShape === 'circle' ? circleParticleShape : ''}
  gl_FragColor = vec4( vColor, 1.0 );
}
`;
