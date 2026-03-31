'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData, type Section } from '@/lib/data';

interface StickyNoteProps {
    activeSection: Section;
    onActivate: () => void;
}

export function StickyNote({ activeSection, onActivate }: StickyNoteProps) {
    const noteRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const isActive = activeSection === 'contact';

    useFrame((_, delta) => {
        if (noteRef.current) {
            // When active: note lifts up closer to camera (pick up animation)
            const targetY = isActive ? 0.15 : hovered ? 0.02 : 0;
            const targetRotX = isActive ? -0.3 : 0;
            noteRef.current.position.y = THREE.MathUtils.lerp(noteRef.current.position.y, targetY, delta * 4);
            noteRef.current.rotation.x = THREE.MathUtils.lerp(noteRef.current.rotation.x, targetRotX, delta * 4);
        }
    });

    const { contact } = portfolioData;

    return (
        <group
            position={[-0.7, 0.29, 0.4]}
            rotation={[0, 0.15, 0]}
            onPointerDown={(e) => {
                e.stopPropagation();
                onActivate();
            }}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        >
            <group ref={noteRef}>
                {/* Note body */}
                <mesh castShadow>
                    <boxGeometry args={[0.14, 0.002, 0.14]} />
                    <meshStandardMaterial
                        color={hovered || isActive ? '#fffde7' : '#fff9c4'}
                        roughness={0.8}
                    />
                </mesh>

                {/* Curl */}
                <mesh position={[0.06, 0.005, 0.065]} rotation={[0.2, 0, 0.1]}>
                    <boxGeometry args={[0.03, 0.001, 0.02]} />
                    <meshStandardMaterial color="#fff3a0" roughness={0.8} side={THREE.DoubleSide} />
                </mesh>

                {/* Written lines (decorative) */}
                {[-0.03, -0.01, 0.01, 0.03].map((z, i) => (
                    <mesh key={i} position={[0, 0.003, z]}>
                        <boxGeometry args={[0.09, 0.0005, 0.002]} />
                        <meshStandardMaterial color="#888" roughness={0.9} />
                    </mesh>
                ))}

                {/* 📝 CONTACT — appears on the note when active */}
                {isActive && (
                    <Html
                        position={[0, 0.08, 0]}
                        distanceFactor={0.7}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <div style={{
                            width: '220px',
                            fontFamily: "'Georgia', serif",
                            background: '#fff9c4',
                            borderRadius: '4px',
                            padding: '18px 16px',
                            boxShadow: '2px 4px 12px rgba(0,0,0,0.15)',
                            animation: 'fadeIn 0.5s ease forwards',
                            transform: 'rotate(-1deg)',
                        }}>
                            <div style={{
                                fontSize: '13px',
                                fontWeight: 700,
                                color: '#2c2c2c',
                                marginBottom: '12px',
                                textAlign: 'center',
                                borderBottom: '1px solid rgba(0,0,0,0.1)',
                                paddingBottom: '8px',
                            }}>
                                ✉️ Get in Touch
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}>
                                <div style={{ fontSize: '10px', color: '#444', lineHeight: '1.5' }}>
                                    <span style={{ fontWeight: 600, color: '#333' }}>Email:</span><br />
                                    <a href={`mailto:${contact.email}`} style={{
                                        color: '#1565c0',
                                        textDecoration: 'none',
                                    }}>
                                        {contact.email}
                                    </a>
                                </div>

                                <div style={{ fontSize: '10px', color: '#444', lineHeight: '1.5' }}>
                                    <span style={{ fontWeight: 600, color: '#333' }}>GitHub:</span><br />
                                    <a href={contact.github} target="_blank" rel="noopener noreferrer" style={{
                                        color: '#1565c0',
                                        textDecoration: 'none',
                                    }}>
                                        github.com/fauzanlubada
                                    </a>
                                </div>

                                <div style={{ fontSize: '10px', color: '#444', lineHeight: '1.5' }}>
                                    <span style={{ fontWeight: 600, color: '#333' }}>LinkedIn:</span><br />
                                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{
                                        color: '#1565c0',
                                        textDecoration: 'none',
                                    }}>
                                        linkedin.com/in/fauzanlubada
                                    </a>
                                </div>
                            </div>

                            <div style={{
                                marginTop: '12px',
                                fontSize: '8.5px',
                                color: '#888',
                                textAlign: 'center',
                                fontStyle: 'italic',
                                lineHeight: '1.4',
                            }}>
                                {contact.message}
                            </div>
                        </div>
                    </Html>
                )}
            </group>
        </group>
    );
}
