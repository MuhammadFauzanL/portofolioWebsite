'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData, type Section } from '@/lib/data';

interface CorkBoardProps {
    activeSection: Section;
    onActivate: () => void;
}

export function CorkBoard({ activeSection, onActivate }: CorkBoardProps) {
    const [hovered, setHovered] = useState(false);
    const isActive = activeSection === 'experience';
    const { experience } = portfolioData;

    // Pin colors for each note
    const pinColors = ['#e53935', '#fb8c00', '#43a047', '#1e88e5', '#8e24aa'];
    // Note colors for each experience
    const noteColors = ['#fff9c4', '#c8e6c9', '#bbdefb', '#ffccbc', '#e1bee7'];
    // Positions for pinned notes on the board
    const notePositions: [number, number, number][] = [
        [-0.35, 0.15, 0.02],
        [0.0, 0.18, 0.02],
        [0.35, 0.13, 0.02],
        [-0.2, -0.13, 0.02],
        [0.2, -0.15, 0.02],
    ];
    const noteRotations = [0.04, -0.06, 0.03, -0.04, 0.05];

    return (
        <group
            position={[0, 1.65, -0.55]}
            scale={[1.15, 1.15, 1.15]}
            onPointerDown={(e) => {
                e.stopPropagation();
                onActivate();
            }}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        >
            {/* Board frame */}
            <mesh castShadow>
                <boxGeometry args={[1.2, 0.8, 0.04]} />
                <meshStandardMaterial color="#5d4037" roughness={0.6} />
            </mesh>

            {/* Cork surface */}
            <mesh position={[0, 0, 0.022]}>
                <boxGeometry args={[1.1, 0.7, 0.005]} />
                <meshStandardMaterial
                    color={hovered || isActive ? '#d4a574' : '#c4956a'}
                    roughness={0.9}
                />
            </mesh>

            {/* Physical sticky notes on board (always visible) */}
            {!isActive && notePositions.map((pos, i) => (
                <group key={i}>
                    <mesh position={pos} rotation={[0, 0, noteRotations[i]]}>
                        <planeGeometry args={[0.18, 0.16]} />
                        <meshStandardMaterial
                            color={noteColors[i]}
                            roughness={0.8}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    {/* Pin */}
                    <mesh position={[pos[0], pos[1] + 0.08, pos[2] + 0.01]}>
                        <sphereGeometry args={[0.012, 8, 8]} />
                        <meshStandardMaterial color={pinColors[i]} metalness={0.3} roughness={0.4} />
                    </mesh>
                </group>
            ))}

            {/* 📌 EXPERIENCE — readable content when active */}
            {/* Moved forward so it's not occluded by monitor mesh */}
            {isActive && (
                <Html
                    position={[0, 0, 0.1]}
                    distanceFactor={0.7}
                    style={{ pointerEvents: 'auto' }}
                    zIndexRange={[200, 0]}
                >
                    <div style={{
                        width: '580px',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        animation: 'fadeIn 0.5s ease forwards',
                    }}>
                        <div style={{
                            fontSize: '11px',
                            color: '#c4956a',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            marginBottom: '10px',
                            fontWeight: 600,
                            textAlign: 'center',
                        }}>
                            📌 Experience & Certifications
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}>
                            {experience.map((exp, i) => (
                                <div key={i} style={{
                                    width: '105px',
                                    background: noteColors[i % noteColors.length],
                                    borderRadius: '3px',
                                    padding: '10px 8px',
                                    position: 'relative',
                                    transform: `rotate(${(noteRotations[i % noteRotations.length]) * 10}deg)`,
                                    boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
                                    fontFamily: "'Georgia', serif",
                                }}>
                                    {/* Pin dot */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '6px',
                                        right: '8px',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: pinColors[i % pinColors.length],
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                    }} />

                                    <span style={{
                                        fontSize: '8px',
                                        fontWeight: 700,
                                        color: '#5d4037',
                                        display: 'block',
                                        marginBottom: '3px',
                                    }}>
                                        {exp.year}
                                    </span>
                                    <span style={{
                                        fontSize: '9px',
                                        fontWeight: 700,
                                        color: '#2c2c2c',
                                        display: 'block',
                                        marginBottom: '2px',
                                        lineHeight: '1.2',
                                    }}>
                                        {exp.role}
                                    </span>
                                    <span style={{
                                        fontSize: '7.5px',
                                        color: '#666',
                                        display: 'block',
                                        marginBottom: '4px',
                                        fontStyle: 'italic',
                                    }}>
                                        @ {exp.company}
                                    </span>
                                    <p style={{
                                        fontSize: '7.5px',
                                        color: '#444',
                                        lineHeight: '1.3',
                                        margin: 0,
                                    }}>
                                        {exp.achievement}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}
