'use client';

import React from 'react';
import { portfolioData } from '@/lib/data';

export function AboutSection() {
    const { about } = portfolioData;

    return (
        <div style={{ animation: 'fadeIn 0.6s ease forwards' }}>
            <p className="section-subtitle">Welcome</p>
            <h2 className="section-title">{about.name}</h2>

            <div style={{
                display: 'flex',
                gap: '24px',
                marginTop: '20px',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            }}>
                {/* Avatar placeholder */}
                <div style={{
                    width: '100px',
                    height: '100px',
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

                <div style={{ flex: 1, minWidth: '200px' }}>
                    <p style={{
                        color: '#64b5f6',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        marginBottom: '8px',
                    }}>
                        {about.title}
                    </p>

                    <p style={{
                        color: 'rgba(200,200,220,0.7)',
                        fontSize: '0.85rem',
                        lineHeight: '1.6',
                        marginBottom: '16px',
                    }}>
                        {about.bio}
                    </p>

                    {/* Core Strengths */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                        {about.strengths.map((s, i) => (
                            <span key={i} className="tech-tag" style={{
                                animationDelay: `${i * 0.1}s`,
                                animation: 'fadeIn 0.4s ease forwards',
                                opacity: 0,
                            }}>
                                {s}
                            </span>
                        ))}
                    </div>

                    {/* Download CV */}
                    <a href="#" className="btn-download">
                        📄 Download CV
                    </a>
                </div>
            </div>
        </div>
    );
}
