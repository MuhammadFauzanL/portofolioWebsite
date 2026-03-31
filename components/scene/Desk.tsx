'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Desk() {
    return (
        <group position={[0, -0.5, 0]}>
            {/* Desk top */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
                <boxGeometry args={[3.6, 0.06, 1.8]} />
                <meshStandardMaterial
                    color="#a0785a"
                    roughness={0.4}
                    metalness={0.05}
                />
            </mesh>

            {/* Desk edge trim */}
            <mesh position={[0, 0.72, 0.88]} castShadow>
                <boxGeometry args={[3.6, 0.04, 0.04]} />
                <meshStandardMaterial color="#8b6544" roughness={0.3} />
            </mesh>

            {/* Legs */}
            {[
                [-1.65, 0.375, -0.75],
                [1.65, 0.375, -0.75],
                [-1.65, 0.375, 0.75],
                [1.65, 0.375, 0.75],
            ].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]} castShadow>
                    <boxGeometry args={[0.06, 0.75, 0.06]} />
                    <meshStandardMaterial color="#8b6544" roughness={0.3} metalness={0.1} />
                </mesh>
            ))}

            {/* Desk mat */}
            <mesh position={[0, 0.782, 0.1]} receiveShadow>
                <boxGeometry args={[2.4, 0.005, 1.2]} />
                <meshStandardMaterial color="#2c2c2c" roughness={0.8} metalness={0.0} />
            </mesh>

            {/* Drawer handle detail left */}
            <mesh position={[-1.0, 0.6, 0.91]}>
                <boxGeometry args={[0.2, 0.02, 0.02]} />
                <meshStandardMaterial color="#c9a96e" metalness={0.7} roughness={0.2} />
            </mesh>

            {/* Drawer panel left */}
            <mesh position={[-1.0, 0.55, 0.9]}>
                <boxGeometry args={[0.6, 0.35, 0.02]} />
                <meshStandardMaterial color="#96704f" roughness={0.4} />
            </mesh>
        </group>
    );
}
