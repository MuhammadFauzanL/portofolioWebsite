'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { cameraPositions, type Section } from '@/lib/data';

interface CameraControllerProps {
    activeSection: Section;
}

export function CameraController({ activeSection }: CameraControllerProps) {
    const currentTarget = useRef(new THREE.Vector3(0, 0.7, -0.3));
    const targetPos = useRef(new THREE.Vector3(0, 1.15, 1.8));
    const targetLookAt = useRef(new THREE.Vector3(0, 0.7, -0.3));

    useFrame((state, delta) => {
        const config = cameraPositions[activeSection];
        targetPos.current.set(...config.position);
        targetLookAt.current.set(...config.target);

        // Smooth lerp — gives 0.8–1.2s transition feel
        const speed = 2.0 * delta;
        state.camera.position.lerp(targetPos.current, speed);
        currentTarget.current.lerp(targetLookAt.current, speed);

        // Subtle breathing motion (seated POV feel)
        const t = state.clock.elapsedTime;
        const breathX = Math.sin(t * 0.3) * 0.002;
        const breathY = Math.sin(t * 0.5) * 0.0015;

        state.camera.position.x += breathX;
        state.camera.position.y += breathY;

        state.camera.lookAt(currentTarget.current);
    });

    return null;
}
