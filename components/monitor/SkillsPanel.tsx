'use client';

import React from 'react';
import { portfolioData } from '@/lib/data';

interface SkillsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SkillsPanel({ isOpen, onClose }: SkillsPanelProps) {
    const { skills } = portfolioData;

    return (
        <div className={`panel-slide ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>✕</button>

            <p className="section-subtitle" style={{ marginTop: '16px' }}>Expertise</p>
            <h2 className="section-title">Skills & Tools</h2>

            {/* Years badge */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(100,181,246,0.1)',
                border: '1px solid rgba(100,181,246,0.2)',
                borderRadius: '20px',
                marginBottom: '24px',
            }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#64b5f6' }}>
                    {skills.yearsExperience}+
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(200,200,220,0.6)' }}>
                    Years of Experience
                </span>
            </div>

            {/* Technical Skills */}
            <h3 style={{
                fontSize: '0.8rem',
                color: 'rgba(200,200,220,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '16px',
            }}>
                Technical Skills
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                {[...skills.frontend, ...skills.backend, ...skills.tools].map((skill, i) => (
                    <div
                        key={i}
                        style={{
                            animation: `fadeIn 0.4s ease forwards`,
                            animationDelay: `${i * 0.08}s`,
                            opacity: 0,
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '4px',
                        }}>
                            <span style={{ fontSize: '0.8rem', color: '#e0e0e0' }}>{skill.name}</span>
                            <span style={{ fontSize: '0.7rem', color: '#64b5f6' }}>{skill.level}%</span>
                        </div>
                        <div className="skill-bar-container">
                            <div
                                className="skill-bar"
                                style={{
                                    width: isOpen ? `${skill.level}%` : '0%',
                                    transitionDelay: `${i * 0.1}s`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Radial Progress for overall */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                marginBottom: '32px',
                flexWrap: 'wrap',
            }}>
                {[
                    { label: 'Web Development', value: 85 },
                    { label: 'Mobile Dev', value: 67 },
                    { label: 'Data & AI', value: 77 },
                ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div className="radial-progress">
                            <svg width="64" height="64" viewBox="0 0 64 64">
                                <circle
                                    cx="32" cy="32" r="28"
                                    fill="none"
                                    stroke="rgba(100,181,246,0.1)"
                                    strokeWidth="4"
                                />
                                <circle
                                    cx="32" cy="32" r="28"
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray={`${isOpen ? (item.value / 100) * 175.9 : 0} 175.9`}
                                    style={{ transition: `stroke-dasharray 1s ease ${i * 0.2}s` }}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#64b5f6" />
                                        <stop offset="100%" stopColor="#81c784" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="progress-text">{item.value}%</div>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'rgba(200,200,220,0.5)', marginTop: '6px' }}>
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Soft Skills */}
            <h3 style={{
                fontSize: '0.8rem',
                color: 'rgba(200,200,220,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '12px',
            }}>
                Soft Skills
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.soft.map((s, i) => (
                    <span
                        key={i}
                        style={{
                            padding: '6px 14px',
                            background: 'rgba(129,199,132,0.1)',
                            border: '1px solid rgba(129,199,132,0.2)',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            color: '#81c784',
                            animation: `fadeIn 0.4s ease forwards`,
                            animationDelay: `${i * 0.1}s`,
                            opacity: 0,
                        }}
                    >
                        {s}
                    </span>
                ))}
            </div>
        </div>
    );
}
