'use client';

import React from 'react';

export function Mouse() {
    return (
        <group position={[0.55, 0.29, 0.2]} rotation={[0, -0.1, 0]}>
            {/* Mouse body */}
            <mesh castShadow>
                <boxGeometry args={[0.05, 0.02, 0.09]} />
                <meshStandardMaterial color="#2c2c2c" roughness={0.3} metalness={0.3} />
            </mesh>

            {/* Mouse top rounded */}
            <mesh position={[0, 0.012, -0.01]}>
                <sphereGeometry args={[0.028, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#333" roughness={0.3} metalness={0.3} />
            </mesh>

            {/* Scroll wheel */}
            <mesh position={[0, 0.015, -0.015]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.004, 0.004, 0.012, 8]} />
                <meshStandardMaterial color="#555" metalness={0.5} roughness={0.3} />
            </mesh>
        </group>
    );
}
