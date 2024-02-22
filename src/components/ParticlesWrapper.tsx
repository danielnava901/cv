import React, {useCallback} from 'react';

import Particles from "react-tsparticles";
import {Container, Engine} from "tsparticles-engine";
import {loadSlim} from "tsparticles-slim";

export const ParticlesWrapper = ({id, conf}) => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
    }, []);

    return <Particles
        id={id}
        init={particlesInit}
        loaded={particlesLoaded}
        options={conf}
    />
}