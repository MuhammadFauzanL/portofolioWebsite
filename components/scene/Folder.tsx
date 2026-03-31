'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData, type Section } from '@/lib/data';

interface FolderProps {
    activeSection: Section;
    onActivate: () => void;
}

export function Folder({ activeSection, onActivate }: FolderProps) {
    const [hovered, setHovered] = useState(false);
    const coverRef = useRef<THREE.Mesh>(null);
    const isActive = activeSection === 'projects';

    // Animate folder open/close
    useFrame((_, delta) => {
        if (coverRef.current) {
            const targetRot = isActive ? -0.6 : hovered ? -0.15 : 0;
            const targetY = isActive ? 0.04 : hovered ? 0.025 : 0.012;
            coverRef.current.rotation.x = THREE.MathUtils.lerp(coverRef.current.rotation.x, targetRot, delta * 4);
            coverRef.current.position.y = THREE.MathUtils.lerp(coverRef.current.position.y, targetY, delta * 4);
        }
    });

    const { projects } = portfolioData;
    const featured = projects.find(p => p.featured);
    const others = projects.filter(p => !p.featured);

    return (
        <group
            position={[0.9, 0.3, 0.3]}
            rotation={[0, -0.2, 0]}
            onPointerDown={(e) => {
                e.stopPropagation();
                onActivate();
            }}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        >
            {/* Folder bottom */}
            <mesh castShadow>
                <boxGeometry args={[0.28, 0.005, 0.2]} />
                <meshStandardMaterial color={hovered || isActive ? '#90caf9' : '#64b5f6'} roughness={0.6} />
            </mesh>

            {/* Pages inside */}
            {[0.003, 0.006, 0.009].map((y, i) => (
                <mesh key={i} position={[0, y, 0]} castShadow>
                    <boxGeometry args={[0.27, 0.002, 0.19]} />
                    <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
                </mesh>
            ))}

            {/* Folder cover (animated) */}
            <mesh ref={coverRef} position={[0, 0.012, 0]} castShadow>
                <boxGeometry args={[0.28, 0.005, 0.2]} />
                <meshStandardMaterial color={hovered || isActive ? '#90caf9' : '#64b5f6'} roughness={0.6} />
            </mesh>

            {/* Tab */}
            <mesh position={[-0.05, 0.015, -0.1]} castShadow>
                <boxGeometry args={[0.1, 0.005, 0.02]} />
                <meshStandardMaterial color={hovered || isActive ? '#90caf9' : '#64b5f6'} roughness={0.6} />
            </mesh>

            {/* 📁 PROJECTS — floating cards above folder when active */}
            {isActive && (
                <Html
                    position={[0, 0.25, 0]}
                    distanceFactor={0.7}
                    zIndexRange={[200, 0]}
                    center
                    style={{
                        pointerEvents: 'auto',
                    }}
                >
                    <div style={{
                        width: '480px',
                        maxHeight: '340px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        animation: 'fadeIn 0.5s ease forwards',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeLegibility',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(100,181,246,0.3) transparent',
                        paddingRight: '4px',
                    }}>
                        {/* Section label */}
                        <div style={{
                            fontSize: '11px',
                            color: '#64b5f6',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            marginBottom: '10px',
                            fontWeight: 600,
                            textAlign: 'center',
                        }}>
                            📁 Projects
                        </div>

                        {/* Featured project */}
                        {featured && (
                            <div style={{
                                background: 'rgba(10,10,30,0.92)',
                                border: '1px solid rgba(100,181,246,0.25)',
                                borderRadius: '8px',
                                padding: '12px 14px',
                                marginBottom: '10px',
                                backdropFilter: 'blur(10px)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                    <span style={{
                                        fontSize: '9px',
                                        padding: '2px 8px',
                                        background: 'rgba(100,181,246,0.15)',
                                        border: '1px solid rgba(100,181,246,0.3)',
                                        borderRadius: '6px',
                                        color: '#64b5f6',
                                    }}>★ Featured</span>
                                </div>
                                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#e0e0e0', margin: '0 0 4px' }}>
                                    {featured.title}
                                </h3>
                                <p style={{ fontSize: '10px', color: 'rgba(200,200,220,0.6)', lineHeight: '1.45', margin: '0 0 8px' }}>
                                    {featured.description}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                                    {featured.tech.map((t, j) => (
                                        <span key={j} style={{
                                            fontSize: '9px',
                                            padding: '2px 7px',
                                            background: 'rgba(129,199,132,0.12)',
                                            border: '1px solid rgba(129,199,132,0.2)',
                                            borderRadius: '5px',
                                            color: '#81c784',
                                        }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <a href={featured.github} target="_blank" rel="noopener noreferrer" style={{
                                        fontSize: '10px', color: '#64b5f6', textDecoration: 'none',
                                        padding: '4px 10px', border: '1px solid rgba(100,181,246,0.2)', borderRadius: '5px',
                                    }}>
                                        GitHub →
                                    </a>
                                    <a href={featured.demo} target="_blank" rel="noopener noreferrer" style={{
                                        fontSize: '10px', color: '#81c784', textDecoration: 'none',
                                        padding: '4px 10px', border: '1px solid rgba(129,199,132,0.2)', borderRadius: '5px',
                                    }}>
                                        Demo →
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Other projects as smaller cards */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {others.map((p, i) => (
                                <div key={i} style={{
                                    flex: '1 1 130px',
                                    background: 'rgba(10,10,30,0.88)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '6px',
                                    padding: '10px 12px',
                                    backdropFilter: 'blur(8px)',
                                }}>
                                    <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#e0e0e0', margin: '0 0 4px' }}>
                                        {p.title}
                                    </h4>
                                    <p style={{ fontSize: '9.5px', color: 'rgba(200,200,220,0.5)', lineHeight: '1.4', margin: '0 0 8px' }}>
                                        {p.description}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '8px' }}>
                                        {p.tech.slice(0, 3).map((t, j) => (
                                            <span key={j} style={{
                                                fontSize: '8px',
                                                padding: '2px 6px',
                                                background: 'rgba(129,199,132,0.1)',
                                                borderRadius: '4px',
                                                color: '#81c784',
                                            }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
                                        fontSize: '9px', color: '#64b5f6', textDecoration: 'none',
                                    }}>
                                        GitHub →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}
