'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightingProps {
    isDay: boolean;
}

export function Lighting({ isDay }: LightingProps) {
    const directionalRef = useRef<THREE.DirectionalLight>(null);
    const ambientRef = useRef<THREE.AmbientLight>(null);

    useFrame((_, delta) => {
        if (directionalRef.current) {
            const ti = isDay ? 1.0 : 0.45;
            const tc = isDay ? new THREE.Color('#fff5ee') : new THREE.Color('#6a5f8b');
            directionalRef.current.intensity = THREE.MathUtils.lerp(directionalRef.current.intensity, ti, delta * 1.5);
            directionalRef.current.color.lerp(tc, delta * 1.5);
        }
        if (ambientRef.current) {
            const ti = isDay ? 0.5 : 0.35;
            ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, ti, delta * 1.5);
        }
    });

    return (
        <>
            {/* Main directional (sunlight from left window) */}
            <directionalLight
                ref={directionalRef}
                position={[-4, 4, 2]}
                intensity={isDay ? 1.0 : 0.45}
                color={isDay ? '#fff5ee' : '#6a5f8b'}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={15}
                shadow-camera-left={-5}
                shadow-camera-right={5}
                shadow-camera-top={5}
                shadow-camera-bottom={-5}
                shadow-bias={-0.001}
            />

            {/* Ambient — keeps scene readable */}
            <ambientLight
                ref={ambientRef}
                intensity={isDay ? 0.5 : 0.35}
                color={isDay ? '#f5f0e8' : '#3a2f50'}
            />

            {/* Fill from right */}
            <directionalLight
                position={[3, 2, 1]}
                intensity={isDay ? 0.3 : 0.15}
                color={isDay ? '#f0e8d8' : '#3a2f4a'}
            />

            {/* Soft overhead */}
            <pointLight
                position={[0, 3, 0]}
                intensity={isDay ? 0.35 : 0.25}
                color="#f5f0e8"
                distance={8}
                decay={2}
            />
        </>
    );
}
