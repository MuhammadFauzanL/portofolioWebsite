'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData, type Section } from '@/lib/data';

interface PlantProps {
    activeSection: Section;
    onActivate: () => void;
}

export function Plant({ activeSection, onActivate }: PlantProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const isActive = activeSection === 'skills';

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Subtle sway
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;

            // Growth animation when active
            const targetScale = isActive ? 1.08 : 1.0;
            const s = groupRef.current.scale.x;
            const newScale = THREE.MathUtils.lerp(s, targetScale, delta * 3);
            groupRef.current.scale.set(newScale, newScale, newScale);
        }
    });

    const { skills } = portfolioData;
    const skillGroups = [
        { label: 'Data Analysis', items: skills.frontend, color: '#64b5f6' },
        { label: 'Machine Learning', items: skills.backend, color: '#81c784' },
        { label: 'Tools', items: skills.tools, color: '#ffb74d' },
    ];

    return (
        <group
            ref={groupRef}
            position={[1.4, 0.28, -0.4]}
            onPointerDown={(e) => {
                e.stopPropagation();
                onActivate();
            }}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        >
            {/* Pot */}
            <mesh position={[0, 0.06, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.06, 0.12, 8]} />
                <meshStandardMaterial color="#d4a574" roughness={0.7} />
            </mesh>
            {/* Pot rim */}
            <mesh position={[0, 0.12, 0]}>
                <cylinderGeometry args={[0.085, 0.08, 0.02, 8]} />
                <meshStandardMaterial color="#c4956a" roughness={0.6} />
            </mesh>
            {/* Soil */}
            <mesh position={[0, 0.11, 0]}>
                <cylinderGeometry args={[0.07, 0.07, 0.02, 8]} />
                <meshStandardMaterial color="#3e2723" roughness={0.9} />
            </mesh>
            {/* Main stem */}
            <mesh position={[0, 0.22, 0]} castShadow>
                <cylinderGeometry args={[0.008, 0.006, 0.2, 6]} />
                <meshStandardMaterial color="#4a7c4a" roughness={0.7} />
            </mesh>

            {/* Leaves */}
            {[
                { pos: [0.04, 0.28, 0], rot: [0, 0, -0.5], scale: [1, 1, 1] },
                { pos: [-0.04, 0.26, 0.02], rot: [0.2, 0.5, 0.4], scale: [0.9, 0.9, 0.9] },
                { pos: [0.02, 0.3, -0.03], rot: [-0.2, -0.3, -0.3], scale: [0.85, 0.85, 0.85] },
                { pos: [-0.03, 0.32, 0], rot: [0.1, 0.8, 0.6], scale: [0.7, 0.7, 0.7] },
                { pos: [0.03, 0.34, 0.02], rot: [-0.3, -0.5, -0.4], scale: [0.75, 0.75, 0.75] },
            ].map((leaf, i) => (
                <mesh
                    key={i}
                    position={leaf.pos as [number, number, number]}
                    rotation={leaf.rot as [number, number, number]}
                    scale={leaf.scale as [number, number, number]}
                    castShadow
                >
                    <sphereGeometry args={[0.04, 6, 4]} />
                    <meshStandardMaterial
                        color={hovered || isActive ? '#81c784' : '#66bb6a'}
                        roughness={0.6}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}

            {/* 🌿 SKILLS — floating labels near plant when active */}
            {isActive && (
                <Html
                    position={[0, 0.25, 0.15]}
                    distanceFactor={0.7}
                    zIndexRange={[200, 0]}
                    center
                    style={{ pointerEvents: 'auto' }}
                >
                    <div style={{
                        width: '420px',
                        maxHeight: '340px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        animation: 'fadeIn 0.5s ease forwards',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeLegibility',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(102,187,106,0.3) transparent',
                        paddingRight: '4px',
                    }}>
                        <div style={{
                            fontSize: '10px',
                            color: '#66bb6a',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            marginBottom: '10px',
                            fontWeight: 600,
                            textAlign: 'center',
                        }}>
                            🌿 Skills &amp; Growth · {skills.yearsExperience}+ years
                        </div>

                        {/* Skill groups */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {skillGroups.map((group, gi) => (
                                <div key={gi} style={{
                                    flex: '1 1 120px',
                                    background: 'rgba(10,10,30,0.9)',
                                    border: `1px solid ${group.color}33`,
                                    borderRadius: '6px',
                                    padding: '10px 10px',
                                    backdropFilter: 'blur(8px)',
                                }}>
                                    <div style={{
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        color: group.color,
                                        marginBottom: '6px',
                                        textAlign: 'center',
                                    }}>
                                        {group.label}
                                    </div>
                                    {group.items.map((skill, si) => (
                                        <div key={si} style={{ marginBottom: '4px' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: '9px',
                                                color: '#ccc',
                                                marginBottom: '2px',
                                            }}>
                                                <span>{skill.name}</span>
                                                <span style={{ color: group.color }}>{skill.level}%</span>
                                            </div>
                                            <div style={{
                                                height: '3px',
                                                background: 'rgba(255,255,255,0.08)',
                                                borderRadius: '2px',
                                                overflow: 'hidden',
                                            }}>
                                                <div style={{
                                                    height: '100%',
                                                    width: `${skill.level}%`,
                                                    background: `linear-gradient(90deg, ${group.color}88, ${group.color})`,
                                                    borderRadius: '2px',
                                                    transition: 'width 0.6s ease',
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Soft skills */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px',
                            justifyContent: 'center',
                            marginTop: '10px',
                        }}>
                            {skills.soft.map((s, i) => (
                                <span key={i} style={{
                                    fontSize: '9px',
                                    padding: '3px 8px',
                                    background: 'rgba(102,187,106,0.1)',
                                    border: '1px solid rgba(102,187,106,0.2)',
                                    borderRadius: '8px',
                                    color: '#81c784',
                                }}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}
