'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/lib/data';

type Tab = 'overview' | 'education' | 'certifications' | 'community';

export function AboutSection() {
    const { about } = portfolioData;
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    const tabs: { id: Tab; label: string; icon: string }[] = [
        { id: 'overview', label: 'Overview', icon: '👤' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'certifications', label: 'Certs & Courses', icon: '📜' },
        { id: 'community', label: 'Community', icon: '🤝' },
    ];

    return (
        <div style={{ animation: 'fadeIn 0.6s ease forwards' }}>
            <p className="section-subtitle">Welcome</p>
            <h2 className="section-title">{about.name}</h2>

            {/* Tab Nav */}
            <div style={{
                display: 'flex',
                gap: '6px',
                marginTop: '16px',
                marginBottom: '20px',
                flexWrap: 'wrap',
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '5px 12px',
                            borderRadius: '20px',
                            border: activeTab === tab.id
                                ? '1px solid rgba(100,181,246,0.5)'
                                : '1px solid rgba(100,181,246,0.15)',
                            background: activeTab === tab.id
                                ? 'rgba(100,181,246,0.15)'
                                : 'transparent',
                            color: activeTab === tab.id ? '#64b5f6' : 'rgba(200,200,220,0.5)',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontFamily: 'inherit',
                        }}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* ── OVERVIEW ── */}
            {activeTab === 'overview' && (
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Avatar */}
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
                        <p style={{ color: '#64b5f6', fontSize: '0.85rem', fontWeight: 500, marginBottom: '8px' }}>
                            {about.title}
                        </p>
                        <p style={{ color: 'rgba(200,200,220,0.7)', fontSize: '0.82rem', lineHeight: '1.6', marginBottom: '16px' }}>
                            {about.bio}
                        </p>

                        {/* Languages */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                            {about.languages.map((lang, i) => (
                                <span key={i} style={{
                                    padding: '4px 12px',
                                    background: 'rgba(129,199,132,0.08)',
                                    border: '1px solid rgba(129,199,132,0.2)',
                                    borderRadius: '20px',
                                    fontSize: '0.7rem',
                                    color: '#81c784',
                                }}>
                                    🌐 {lang.language} — {lang.level}
                                </span>
                            ))}
                        </div>

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
                        <a href="https://drive.google.com/file/d/1ZjYPaSfE4xhc0P1ljnGnHAoq6S5BlhNs/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-download">
                            📄 Download CV
                        </a>
                    </div>
                </div>
            )}

            {/* ── EDUCATION ── */}
            {activeTab === 'education' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {about.education.map((edu, i) => (
                        <div key={i} style={{
                            padding: '16px 20px',
                            background: 'rgba(100,181,246,0.05)',
                            border: '1px solid rgba(100,181,246,0.15)',
                            borderRadius: '12px',
                            animation: `slideUp 0.4s ease forwards`,
                            animationDelay: `${i * 0.12}s`,
                            opacity: 0,
                        }}>
                            <span style={{ fontSize: '0.65rem', color: '#64b5f6', fontWeight: 600, letterSpacing: '0.05em' }}>
                                {edu.period}
                            </span>
                            <h4 style={{ color: '#e0e0e0', fontSize: '0.9rem', margin: '4px 0 2px' }}>{edu.degree}</h4>
                            <p style={{ color: 'rgba(200,200,220,0.6)', fontSize: '0.78rem' }}>{edu.institution}</p>
                            <p style={{ color: 'rgba(200,200,220,0.4)', fontSize: '0.72rem', marginTop: '4px' }}>{edu.detail}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* ── CERTIFICATIONS & COURSES ── */}
            {activeTab === 'certifications' && (
                <div>
                    {/* Cert badges */}
                    <h3 style={{ fontSize: '0.75rem', color: 'rgba(200,200,220,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
                        Certifications
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                        {about.certifications.map((cert, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                background: 'linear-gradient(135deg, rgba(255,183,77,0.08), rgba(100,181,246,0.05))',
                                border: '1px solid rgba(255,183,77,0.2)',
                                borderRadius: '10px',
                            }}>
                                <span style={{ fontSize: '1.4rem' }}>🏅</span>
                                <div>
                                    <p style={{ color: '#ffb74d', fontSize: '0.85rem', fontWeight: 600 }}>{cert.title}</p>
                                    <p style={{ color: 'rgba(200,200,220,0.5)', fontSize: '0.72rem' }}>{cert.issuer} · {cert.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Courses */}
                    <h3 style={{ fontSize: '0.75rem', color: 'rgba(200,200,220,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
                        Courses
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {about.courses.map((course, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '9px 14px',
                                background: 'rgba(100,181,246,0.04)',
                                border: '1px solid rgba(100,181,246,0.1)',
                                borderRadius: '8px',
                                gap: '8px',
                                flexWrap: 'wrap',
                                animation: `fadeIn 0.35s ease forwards`,
                                animationDelay: `${i * 0.06}s`,
                                opacity: 0,
                            }}>
                                <div>
                                    <p style={{ color: '#e0e0e0', fontSize: '0.78rem' }}>{course.title}</p>
                                    <p style={{ color: 'rgba(200,200,220,0.4)', fontSize: '0.65rem' }}>{course.issuer}</p>
                                </div>
                                <span style={{
                                    fontSize: '0.62rem',
                                    color: '#64b5f6',
                                    whiteSpace: 'nowrap',
                                    background: 'rgba(100,181,246,0.1)',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                }}>
                                    {course.period}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── COMMUNITY ── */}
            {activeTab === 'community' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {about.community.map((c, i) => (
                        <div key={i} style={{
                            padding: '14px 18px',
                            background: 'rgba(129,199,132,0.05)',
                            border: '1px solid rgba(129,199,132,0.15)',
                            borderRadius: '12px',
                            animation: `slideUp 0.4s ease forwards`,
                            animationDelay: `${i * 0.15}s`,
                            opacity: 0,
                        }}>
                            <span style={{ fontSize: '0.65rem', color: '#81c784', letterSpacing: '0.05em' }}>{c.period}</span>
                            <h4 style={{ color: '#e0e0e0', fontSize: '0.9rem', margin: '4px 0 2px' }}>{c.name}</h4>
                            <p style={{ color: 'rgba(200,200,220,0.5)', fontSize: '0.75rem' }}>
                                {c.role} · {c.location}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
