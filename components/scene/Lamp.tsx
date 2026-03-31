'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LampProps {
    isOn: boolean;
    onToggle?: () => void;
}

export function Lamp({ isOn, onToggle }: LampProps) {
    const lightRef = useRef<THREE.PointLight>(null);
    const bulbRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((_, delta) => {
        if (lightRef.current) {
            const target = isOn ? 0.8 : 0;
            lightRef.current.intensity = THREE.MathUtils.lerp(
                lightRef.current.intensity,
                target,
                delta * 2
            );
        }
        // Smooth bulb emissive transition
        if (bulbRef.current) {
            const mat = bulbRef.current.material as THREE.MeshStandardMaterial;
            const targetIntensity = isOn ? 3 : 0;
            mat.emissiveIntensity = THREE.MathUtils.lerp(
                mat.emissiveIntensity,
                targetIntensity,
                delta * 3
            );
        }
    });

    return (
        <group position={[-1.4, 0.28, -0.5]}>
            {/* Base - clickable to toggle */}
            <mesh
                position={[0, 0.02, 0]}
                castShadow
                onPointerDown={(e) => {
                    e.stopPropagation();
                    onToggle?.();
                }}
                onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
            >
                <cylinderGeometry args={[0.1, 0.12, 0.04, 12]} />
                <meshStandardMaterial
                    color={hovered ? '#3a3a3a' : '#2c2c2c'}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Toggle indicator on base */}
            <mesh position={[0.08, 0.045, 0.08]}>
                <sphereGeometry args={[0.008, 8, 8]} />
                <meshStandardMaterial
                    color={isOn ? '#ffcc80' : '#555'}
                    emissive={isOn ? '#ffcc80' : '#000'}
                    emissiveIntensity={isOn ? 2 : 0}
                />
            </mesh>

            {/* Pole */}
            <mesh position={[0, 0.22, 0]} castShadow>
                <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
                <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Arm */}
            <mesh position={[0.08, 0.4, 0]} rotation={[0, 0, -0.4]} castShadow>
                <cylinderGeometry args={[0.01, 0.01, 0.25, 8]} />
                <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Shade */}
            <mesh
                position={[0.15, 0.48, 0]}
                castShadow
                onPointerDown={(e) => {
                    e.stopPropagation();
                    onToggle?.();
                }}
                onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
            >
                <coneGeometry args={[0.1, 0.12, 12, 1, true]} />
                <meshStandardMaterial
                    color="#e8dcc8"
                    roughness={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Bulb */}
            <mesh ref={bulbRef} position={[0.15, 0.44, 0]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial
                    color="#fff"
                    emissive={isOn ? '#ffcc80' : '#000'}
                    emissiveIntensity={isOn ? 3 : 0}
                />
            </mesh>

            {/* Light */}
            <pointLight
                ref={lightRef}
                position={[0.15, 0.44, 0]}
                color="#ffcc80"
                intensity={0}
                distance={3}
                decay={2}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
            />
        </group>
    );
}
