import ParticleField from 'react-particles-webgl';
import styled from 'styled-components';

const DefaultConfig = {
    particles: {
        count: 250,
        maxSize: 75,
    },
};

const ParticlesJSConfig = {
    showCube: false,
    dimension: '2D',
    velocity: 2,
    boundaryType: 'bounce',
    antialias: false,
    direction: {
        xMin: -1,
        xMax: 1,
        yMin: -1,
        yMax: 1,
        zMin: -1,
        zMax: 1,
    },
    lines: {
        colorMode: 'rainbow',
        color: '#351CCB',
        transparency: 0.9,
        limitConnections: true,
        maxConnections: 20,
        minDistance: 110,
        visible: true,
    },
    particles: {
        colorMode: 'rainbow',
        color: '#3FB568',
        transparency: 0.9,
        shape: 'circle',
        boundingBox: 'canvas',
        count: 150,
        minSize: 20,
        maxSize: 50,
        visible: true,
    },
    cameraControls: {
        enabled: false,
        enableDamping: true,
        dampingFactor: 0.2,
        enableZoom: true,
        autoRotate: false,
        autoRotateSpeed: 0.3,
        resetCameraFlag: true,
    },
};

const SnowfallConfig = {
    showCube: false,
    dimension: '3D',
    velocity: 2,
    boundaryType: 'passthru',
    antialias: false,
    direction: {
        xMin: -0.6,
        xMax: 0.3,
        yMin: -1,
        yMax: -0.6,
        zMin: -0.6,
        zMax: 0.3,
    },
    lines: {
        colorMode: 'rainbow',
        color: '#351CCB',
        transparency: 0.9,
        limitConnections: true,
        maxConnections: 20,
        minDistance: 150,
        visible: false,
    },
    particles: {
        colorMode: 'solid',
        color: '#ffffff',
        transparency: 0.9,
        shape: 'circle',
        boundingBox: 'canvas',
        count: 1000,
        minSize: 1,
        maxSize: 25,
        visible: true,
    },
    cameraControls: {
        enabled: true,
        enableDamping: true,
        dampingFactor: 0.2,
        enableZoom: true,
        autoRotate: false,
        autoRotateSpeed: 0.3,
        resetCameraFlag: true,
    },
};

const ParticleContainer = styled.div`
    margin: 2em 0;
    height: 550px;
    border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
    border-width: 1px;
    border-style: solid;
`;

export const DefaultParticles = () => (
    <ParticleContainer>
        <ParticleField config={DefaultConfig} />
    </ParticleContainer>
);

export const ParticlesJSClone = () => (
    <ParticleContainer>
        <ParticleField config={ParticlesJSConfig} />
    </ParticleContainer>
);

export const SnowfallParticles = () => (
    <ParticleContainer>
        <ParticleField config={SnowfallConfig} />
    </ParticleContainer>
);
