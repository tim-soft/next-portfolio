/**
 * Generates a vertex shader for a connecting line in a particle system
 *
 * This shader uses the position of particles to determine their color
 * and change them as they move
 */
export const getLineVertexShader = () => `
// Amount of transparency for line, calculated in Animate
attribute float color;

// Calculate color based on line position
varying vec3 vColor;
varying float alpha;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vColor = normalize( abs( worldPosition.xyz ) );
  alpha = color;
}
`;

/**
 * Applies a color to a connecting line in a particle system
 */
export const getLineFragmentShader = () => `
// Color calculated from vertex shader, based on line position
varying vec3 vColor;
// Amount of transparency from vertex shader, based on distance between particles
varying float alpha;

void main() {
  gl_FragColor = vec4( vColor, alpha );
}
`;
