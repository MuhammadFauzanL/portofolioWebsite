'use client';

import React from 'react';

export function CoffeeMug() {
    return (
        <group position={[-1.1, 0.28, 0.3]}>
            {/* Cup body */}
            <mesh castShadow>
                <cylinderGeometry args={[0.04, 0.035, 0.1, 12]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
            </mesh>

            {/* Coffee inside */}
            <mesh position={[0, 0.04, 0]}>
                <cylinderGeometry args={[0.035, 0.035, 0.01, 12]} />
                <meshStandardMaterial color="#3e2723" roughness={0.4} />
            </mesh>

            {/* Handle */}
            <mesh position={[0.055, 0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.025, 0.006, 6, 12, Math.PI]} />
                <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
            </mesh>
        </group>
    );
}
