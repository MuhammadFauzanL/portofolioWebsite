'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData, type Section } from '@/lib/data';
import { useBattery } from '@/hooks/useBattery';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';

interface MonitorProps {
    activeSection: Section;
    onSectionChange: (section: Section) => void;
    isScreenOn: boolean;
    typedText?: string;
}

export function Monitor({ activeSection, onSectionChange, isScreenOn, typedText = '' }: MonitorProps) {
    const glowRef = useRef<THREE.PointLight>(null);

    useFrame((_, delta) => {
        if (glowRef.current) {
            const target = isScreenOn ? 0.5 : 0;
            glowRef.current.intensity = THREE.MathUtils.lerp(glowRef.current.intensity, target, delta * 3);
        }
    });

    const { about } = portfolioData;
    const battery = useBattery();
    const time = useTimeOfDay();
    const batteryPercent = Math.round(battery.level * 100);
    const isLow = battery.supported && battery.level <= 0.2;
    const isCharging = battery.supported && battery.charging;

    return (
        <group position={[0, 0.28, -0.35]}>
            {/* Stand base — wider and slimmer */}
            <mesh position={[0, 0, 0.05]} castShadow>
                <boxGeometry args={[0.42, 0.015, 0.22]} />
                <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} />
            </mesh>
            {/* Stand base accent lip */}
            <mesh position={[0, 0.008, 0.05]}>
                <boxGeometry args={[0.44, 0.003, 0.24]} />
                <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Stand pillar */}
            <mesh position={[0, 0.2, 0]} castShadow>
                <boxGeometry args={[0.055, 0.4, 0.055]} />
                <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} />
            </mesh>
            {/* Stand pillar neck (thinner connecting piece) */}
            <mesh position={[0, 0.38, 0]}>
                <boxGeometry args={[0.12, 0.05, 0.04]} />
                <meshStandardMaterial color="#262626" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* === BEZEL / FRAME === */}
            {/* Back shell — curved appearance with slight depth */}
            <mesh position={[0, 0.58, -0.04]} castShadow>
                <boxGeometry args={[1.58, 0.98, 0.025]} />
                <meshStandardMaterial color="#1e1e1e" roughness={0.35} metalness={0.6} />
            </mesh>
            {/* Main bezel body — thick surrounding frame */}
            <mesh position={[0, 0.58, -0.015]} castShadow>
                <boxGeometry args={[1.56, 0.96, 0.04]} />
                <meshStandardMaterial color="#181818" roughness={0.25} metalness={0.65} />
            </mesh>

            {/* Bezel top edge — chamfer highlight */}
            <mesh position={[0, 1.065, 0.008]}>
                <boxGeometry args={[1.56, 0.008, 0.045]} />
                <meshStandardMaterial color="#303030" roughness={0.15} metalness={0.75} />
            </mesh>
            {/* Bezel bottom edge — thicker chin */}
            <mesh position={[0, 0.095, 0.008]}>
                <boxGeometry args={[1.56, 0.008, 0.045]} />
                <meshStandardMaterial color="#303030" roughness={0.15} metalness={0.75} />
            </mesh>
            {/* Bezel left edge */}
            <mesh position={[-0.784, 0.58, 0.008]}>
                <boxGeometry args={[0.008, 0.96, 0.045]} />
                <meshStandardMaterial color="#303030" roughness={0.15} metalness={0.75} />
            </mesh>
            {/* Bezel right edge */}
            <mesh position={[0.784, 0.58, 0.008]}>
                <boxGeometry args={[0.008, 0.96, 0.045]} />
                <meshStandardMaterial color="#303030" roughness={0.15} metalness={0.75} />
            </mesh>

            {/* Inner bezel rim — recessed border around screen area */}
            {/* Top inner rim */}
            <mesh position={[0, 1.0, 0.027]}>
                <boxGeometry args={[1.42, 0.012, 0.012]} />
                <meshStandardMaterial color="#0d0d0d" roughness={0.08} metalness={0.35} />
            </mesh>
            {/* Bottom inner rim */}
            <mesh position={[0, 0.16, 0.027]}>
                <boxGeometry args={[1.42, 0.012, 0.012]} />
                <meshStandardMaterial color="#0d0d0d" roughness={0.08} metalness={0.35} />
            </mesh>
            {/* Left inner rim */}
            <mesh position={[-0.71, 0.58, 0.027]}>
                <boxGeometry args={[0.012, 0.84, 0.012]} />
                <meshStandardMaterial color="#0d0d0d" roughness={0.08} metalness={0.35} />
            </mesh>
            {/* Right inner rim */}
            <mesh position={[0.71, 0.58, 0.027]}>
                <boxGeometry args={[0.012, 0.84, 0.012]} />
                <meshStandardMaterial color="#0d0d0d" roughness={0.08} metalness={0.35} />
            </mesh>

            {/* Screen surface */}
            <mesh
                position={[0, 0.58, 0.032]}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    onSectionChange('about');
                }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = 'default'; }}
            >
                <planeGeometry args={[1.38, 0.8]} />
                <meshStandardMaterial
                    color="#111111"
                    emissive="#111111"
                    emissiveIntensity={isScreenOn ? 0.25 : 0}
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>

            {/* ABOUT ONLY — rendered inside monitor via Html */}
            {isScreenOn && (activeSection === 'about' || activeSection === 'default') && (
                <Html
                    transform
                    occlude
                    position={[0, 0.58, 0.036]}
                    distanceFactor={1.17}
                    style={{
                        pointerEvents: 'auto',
                    }}
                >
                    <div style={{
                        width: '620px',
                        height: '360px',
                        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0d0d20 100%)',
                        borderRadius: '4px',
                        padding: '28px 32px',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        color: '#e0e0e0',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeLegibility',
                        imageRendering: 'auto',
                    }}>
                        {/* Top bar with battery indicator */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '14px',
                            paddingBottom: '8px',
                            borderBottom: '1px solid rgba(100,181,246,0.15)',
                            flexShrink: 0,
                        }}>
                            {/* Left: traffic dots + path */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
                                <span style={{
                                    marginLeft: '8px',
                                    fontSize: '10px',
                                    color: 'rgba(200,200,220,0.4)',
                                    letterSpacing: '0.05em',
                                }}>
                                    ~/portfolio — about.tsx
                                </span>
                            </div>

                            {/* Right: battery + clock */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {/* Battery icon */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        <div style={{
                                            width: '18px',
                                            height: '9px',
                                            border: `1.5px solid ${isCharging ? '#81c784' : isLow ? '#ef5350' : 'rgba(200,200,220,0.35)'}`,
                                            borderRadius: '2px',
                                            padding: '1px',
                                            position: 'relative',
                                            transition: 'border-color 0.3s ease',
                                        }}>
                                            <div style={{
                                                width: `${batteryPercent}%`,
                                                height: '100%',
                                                background: isCharging
                                                    ? 'linear-gradient(90deg, #66bb6a, #81c784)'
                                                    : isLow
                                                        ? '#ef5350'
                                                        : 'linear-gradient(90deg, #64b5f6, #81c784)',
                                                borderRadius: '1px',
                                                transition: 'width 0.5s ease',
                                                animation: isCharging ? 'chargingPulse 1.5s ease-in-out infinite' : 'none',
                                            }} />
                                            {isCharging && (
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <svg width="6" height="8" viewBox="0 0 8 10" fill="none">
                                                        <path d="M5 0L1 5.5H3.5L3 10L7 4.5H4.5L5 0Z" fill="rgba(255,255,255,0.9)" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        {/* Battery cap */}
                                        <div style={{
                                            width: '1.5px',
                                            height: '4px',
                                            background: isCharging ? '#81c784' : isLow ? '#ef5350' : 'rgba(200,200,220,0.35)',
                                            borderRadius: '0 1px 1px 0',
                                            marginLeft: '0.5px',
                                            transition: 'background 0.3s ease',
                                        }} />
                                    </div>
                                    {isCharging && (
                                        <span style={{
                                            fontSize: '8px',
                                            color: '#81c784',
                                            animation: 'chargingBolt 2s ease-in-out infinite',
                                            display: 'inline-flex',
                                        }}>
                                            ⚡
                                        </span>
                                    )}
                                    <span style={{
                                        fontSize: '8px',
                                        color: isLow ? '#ef5350' : isCharging ? '#81c784' : 'rgba(200,200,220,0.5)',
                                        fontWeight: isCharging ? 600 : 400,
                                        fontFamily: "'JetBrains Mono', monospace",
                                        transition: 'color 0.3s ease',
                                    }}>
                                        {battery.supported ? `${batteryPercent}%` : ''}
                                    </span>
                                </div>

                                {/* Separator dot */}
                                <div style={{
                                    width: '2px',
                                    height: '2px',
                                    borderRadius: '50%',
                                    background: 'rgba(200,200,220,0.25)',
                                }} />

                                {/* Real-time clock */}
                                <span style={{
                                    fontSize: '8.5px',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: 'rgba(200,200,220,0.6)',
                                    fontWeight: 500,
                                    letterSpacing: '0.05em',
                                    fontVariantNumeric: 'tabular-nums',
                                }}>
                                    {time.timeStringWithSeconds}
                                </span>
                            </div>
                        </div>

                        {/* Main content area — vertical stack: profile then terminal peeking */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
                            {/* Profile section */}
                            <div style={{ flexShrink: 0 }}>
                                <div style={{ display: 'flex', gap: '14px', marginBottom: '10px' }}>
                                    {/* Avatar — taller and wider */}
                                    <div style={{
                                        width: '85px',
                                        height: '110px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, rgba(100,181,246,0.2), rgba(129,199,132,0.2))',
                                        border: '1px solid rgba(100,181,246,0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem',
                                        flexShrink: 0,
                                    }}>
                                        👨‍💻
                                    </div>

                                    {/* Right side: Name, Role, Description, Skills */}
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                        <h2 style={{
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            margin: '0 0 2px 0',
                                            color: '#f0e6d4',
                                            letterSpacing: '0.02em',
                                            textShadow: '0 0 1px rgba(240,230,212,0.3)',
                                        }}>
                                            {about.name}
                                        </h2>
                                        <p style={{
                                            fontSize: '10px',
                                            color: '#74c0f8',
                                            marginBottom: '4px',
                                            fontWeight: 600,
                                            letterSpacing: '0.01em',
                                        }}>
                                            {about.title}
                                        </p>
                                        <p style={{
                                            fontSize: '9.5px',
                                            color: 'rgba(210,210,225,0.7)',
                                            lineHeight: '1.5',
                                            fontWeight: 400,
                                            letterSpacing: '0.01em',
                                            marginBottom: '6px',
                                        }}>
                                            {about.bio}
                                        </p>
                                        {/* Strengths — on the right side of photo */}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                                            {about.strengths.map((s, i) => (
                                                <span key={i} style={{
                                                    fontSize: '7.5px',
                                                    padding: '2px 7px',
                                                    background: 'rgba(100,181,246,0.12)',
                                                    border: '1px solid rgba(100,181,246,0.2)',
                                                    borderRadius: '10px',
                                                    color: '#74c0f8',
                                                    letterSpacing: '0.02em',
                                                    fontWeight: 500,
                                                }}>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Download CV */}
                                <button
                                    style={{
                                        padding: '5px 14px',
                                        background: 'linear-gradient(135deg, rgba(100,181,246,0.2), rgba(100,181,246,0.1))',
                                        border: '1px solid rgba(100,181,246,0.3)',
                                        borderRadius: '6px',
                                        color: '#74c0f8',
                                        fontSize: '9.5px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        letterSpacing: '0.05em',
                                        marginBottom: '10px',
                                    }}
                                    onPointerDown={(e) => e.stopPropagation()}
                                >
                                    📄 Download CV
                                </button>
                            </div>

                            {/* Terminal — below profile, only top portion visible */}
                            <div style={{
                                flex: 1,
                                minHeight: 0,
                                marginTop: '16px',
                                background: 'rgba(0,0,0,0.45)',
                                borderRadius: '6px 6px 0 0',
                                border: '1px solid rgba(100,181,246,0.1)',
                                borderBottom: 'none',
                                padding: '8px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    marginBottom: '6px',
                                    paddingBottom: '5px',
                                    borderBottom: '1px solid rgba(100,181,246,0.1)',
                                    flexShrink: 0,
                                }}>
                                    <span style={{ fontSize: '8px', color: '#81c784' }}>⌨</span>
                                    <span style={{
                                        fontSize: '8px',
                                        color: 'rgba(200,200,220,0.5)',
                                        letterSpacing: '0.1em',
                                        fontWeight: 500,
                                    }}>
                                        terminal
                                    </span>
                                </div>
                                <div style={{
                                    flex: 1,
                                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                    fontSize: '9.5px',
                                    color: '#81c784',
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-all',
                                    overflow: 'hidden',
                                    WebkitFontSmoothing: 'antialiased',
                                }}>
                                    <span style={{ color: '#64b5f6' }}>$ </span>
                                    {typedText || ''}
                                    <span className="terminal-cursor" style={{
                                        display: 'inline-block',
                                        width: '6px',
                                        height: '12px',
                                        background: '#81c784',
                                        marginLeft: '1px',
                                        verticalAlign: 'text-bottom',
                                        animation: 'blink 1s step-end infinite',
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Html>
            )}

            {/* Screen glow */}
            <pointLight
                ref={glowRef}
                position={[0, 0.58, 0.3]}
                color="#64b5f6"
                intensity={0}
                distance={2}
                decay={2}
            />

            {/* Power LED */}
            <mesh position={[0, 0.11, 0.031]}>
                <circleGeometry args={[0.012, 16]} />
                <meshStandardMaterial
                    color={isScreenOn ? '#64b5f6' : '#333'}
                    emissive={isScreenOn ? '#64b5f6' : '#000'}
                    emissiveIntensity={isScreenOn ? 2 : 0}
                />
            </mesh>

            {/* Brand logo on bottom bezel */}
            <mesh position={[0, 0.125, 0.031]}>
                <planeGeometry args={[0.06, 0.006]} />
                <meshStandardMaterial
                    color="#444"
                    emissive="#333"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Webcam */}
            <mesh position={[0, 1.01, 0.031]}>
                <circleGeometry args={[0.008, 12]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Webcam ring */}
            <mesh position={[0, 1.01, 0.03]}>
                <ringGeometry args={[0.008, 0.012, 16]} />
                <meshStandardMaterial color="#222" metalness={0.6} roughness={0.3} />
            </mesh>
        </group>
    );
}
