'use client';

import React from 'react';

interface RoomProps {
    isDay: boolean;
}

export function Room({ isDay }: RoomProps) {
    const wallColor = isDay ? '#f5f0e8' : '#1a1520';
    const floorColor = isDay ? '#d4b896' : '#2a1f18';

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeGeometry args={[12, 12]} />
                <meshStandardMaterial color={floorColor} roughness={0.7} />
            </mesh>

            {/* Back Wall */}
            <mesh position={[0, 2, -1]} receiveShadow>
                <planeGeometry args={[12, 6]} />
                <meshStandardMaterial color={wallColor} roughness={0.8} />
            </mesh>

            {/* Left Wall */}
            <mesh position={[-4, 2, 2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[8, 6]} />
                <meshStandardMaterial color={wallColor} roughness={0.8} />
            </mesh>

            {/* Right Wall */}
            <mesh position={[4, 2, 2]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[8, 6]} />
                <meshStandardMaterial color={wallColor} roughness={0.8} />
            </mesh>

            {/* Window frame on left wall */}
            {isDay && (
                <group position={[-3.98, 1.5, 0]}>
                    {/* Window glass */}
                    <mesh rotation={[0, Math.PI / 2, 0]}>
                        <planeGeometry args={[1.2, 1]} />
                        <meshStandardMaterial
                            color="#87ceeb"
                            transparent
                            opacity={0.3}
                            emissive="#87ceeb"
                            emissiveIntensity={0.2}
                        />
                    </mesh>
                    {/* Window frame */}
                    {[
                        { pos: [0, 0.5, 0], size: [1.3, 0.04] },
                        { pos: [0, -0.5, 0], size: [1.3, 0.04] },
                        { pos: [0, 0, -0.6], size: [0.04, 1.04] },
                        { pos: [0, 0, 0.6], size: [0.04, 1.04] },
                        { pos: [0, 0, 0], size: [0.03, 1.04] },
                    ].map((bar, i) => (
                        <mesh
                            key={i}
                            position={[0.01, bar.pos[1], bar.pos[2]]}
                            rotation={[0, Math.PI / 2, i >= 3 ? 0 : Math.PI / 2]}
                        >
                            <boxGeometry args={[bar.size[0], bar.size[1], 0.03]} />
                            <meshStandardMaterial color="#e8dcc8" roughness={0.4} />
                        </mesh>
                    ))}
                </group>
            )}
        </group>
    );
}
