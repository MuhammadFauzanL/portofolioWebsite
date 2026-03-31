'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KeyboardProps {
    onKeyPress?: (key: string) => void;
}

// Key layout definition
const KEY_ROWS = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ','],
];

const ROW_Z = [0.05, 0.02, -0.01, -0.04];

export function Keyboard({ onKeyPress }: KeyboardProps) {
    const [pressedKey, setPressedKey] = useState<string | null>(null);
    const [hovered, setHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const keyRefs = useRef<Map<string, THREE.Mesh>>(new Map());

    // Animate pressed keys
    useFrame((_, delta) => {
        keyRefs.current.forEach((mesh, key) => {
            const targetY = pressedKey === key ? 0.006 : 0.01;
            mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, delta * 15);
        });
    });

    const handleGlobalKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isActive) return;

        e.preventDefault();
        const key = e.key;

        if (key === 'Backspace') {
            setPressedKey('Backspace');
            onKeyPress?.('Backspace');
        } else if (key === 'Enter') {
            setPressedKey('Enter');
            onKeyPress?.('Enter');
        } else if (key === ' ') {
            setPressedKey('Space');
            onKeyPress?.('Space');
        } else if (key.length === 1) {
            setPressedKey(key.toLowerCase());
            onKeyPress?.(key);
        }

        setTimeout(() => setPressedKey(null), 100);
    }, [isActive, onKeyPress]);

    useEffect(() => {
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [handleGlobalKeyDown]);

    const setKeyRef = useCallback((key: string, mesh: THREE.Mesh | null) => {
        if (mesh) {
            keyRefs.current.set(key, mesh);
        }
    }, []);

    return (
        <group
            position={[0, 0.29, 0.2]}
            onPointerDown={(e) => {
                e.stopPropagation();
                setIsActive(true);
            }}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        >
            {/* Keyboard base */}
            <mesh castShadow>
                <boxGeometry args={[0.45, 0.012, 0.16]} />
                <meshStandardMaterial
                    color={isActive ? '#333333' : '#2c2c2c'}
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            {/* Active indicator LED */}
            <mesh position={[0.2, 0.008, -0.07]}>
                <sphereGeometry args={[0.004, 8, 8]} />
                <meshStandardMaterial
                    color={isActive ? '#81c784' : '#444'}
                    emissive={isActive ? '#81c784' : '#000'}
                    emissiveIntensity={isActive ? 2 : 0}
                />
            </mesh>

            {/* Key rows */}
            {ROW_Z.map((z, row) => (
                <group key={row}>
                    {KEY_ROWS[row].map((keyLabel, col) => {
                        const width = row === 3 && (col === 0 || col === 7) ? 0.04 : 0.025;
                        const xStart = row === 3 ? -0.14 : -0.19;
                        const spacing = row === 3 ? 0.04 : 0.033;
                        const isPressed = pressedKey === keyLabel;
                        return (
                            <mesh
                                key={col}
                                ref={(mesh) => setKeyRef(keyLabel, mesh)}
                                position={[xStart + col * spacing, isPressed ? 0.006 : 0.01, z]}
                                onPointerDown={(e) => {
                                    e.stopPropagation();
                                    setPressedKey(keyLabel);
                                    onKeyPress?.(keyLabel);
                                    setIsActive(true);
                                    setTimeout(() => setPressedKey(null), 100);
                                }}
                            >
                                <boxGeometry args={[width, 0.004, 0.022]} />
                                <meshStandardMaterial
                                    color={isPressed ? '#555' : (hovered ? '#424242' : '#3a3a3a')}
                                    roughness={0.5}
                                    metalness={0.2}
                                />
                            </mesh>
                        );
                    })}
                </group>
            ))}

            {/* Spacebar */}
            <mesh
                ref={(mesh) => setKeyRef('Space', mesh)}
                position={[0, pressedKey === 'Space' ? 0.006 : 0.01, -0.065]}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    setPressedKey('Space');
                    onKeyPress?.('Space');
                    setIsActive(true);
                    setTimeout(() => setPressedKey(null), 100);
                }}
            >
                <boxGeometry args={[0.15, 0.004, 0.022]} />
                <meshStandardMaterial
                    color={pressedKey === 'Space' ? '#555' : '#3a3a3a'}
                    roughness={0.5}
                    metalness={0.2}
                />
            </mesh>

            {/* Instruction text when hovered */}
            {hovered && !isActive && (
                <mesh position={[0, 0.03, 0]}>
                    <planeGeometry args={[0.001, 0.001]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>
            )}
        </group>
    );
}
