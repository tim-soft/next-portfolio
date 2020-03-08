import React, { useState } from 'react';
import ParticleField, { defaultConfig } from 'react-particles-webgl';
import { DatUI, PerformanceStats, RepoTag } from './components';

/**
 * A demo showcasing react-particles-webgl
 *
 * Includes a config panel and performance monitor
 */
const ParticlesDemo = () => {
    const [datConfig, setDatConfig] = useState(defaultConfig);

    return (
        <>
            {/* FPS Counter */}
            <PerformanceStats />
            {/* Config GUI */}
            <DatUI datConfig={datConfig} handleDatUpdate={setDatConfig} />
            {/* Particle Canvas */}
            <ParticleField config={datConfig} />
            {/* Repo tag */}
            <RepoTag />
        </>
    );
};

export default ParticlesDemo;
