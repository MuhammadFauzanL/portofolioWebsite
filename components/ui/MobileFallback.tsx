'use client';

import React from 'react';
import { portfolioData } from '@/lib/data';

export function MobileFallback() {
    const { about, projects, skills, experience, contact } = portfolioData;

    return (
        <div className="mobile-fallback">
            {/* Hero */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px 24px',
                background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
                position: 'relative',
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👨‍💻</div>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#e0e0e0',
                    marginBottom: '8px',
                }}>
                    {about.name}
                </h1>
                <p style={{ fontSize: '0.9rem', color: '#64b5f6', marginBottom: '20px' }}>
                    {about.title}
                </p>
                <p style={{
                    fontSize: '0.85rem',
                    color: 'rgba(200,200,220,0.6)',
                    maxWidth: '400px',
                    lineHeight: '1.6',
                    marginBottom: '24px',
                }}>
                    {about.bio}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                    {about.strengths.map((s, i) => (
                        <span key={i} className="tech-tag">{s}</span>
                    ))}
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    fontSize: '0.75rem',
                    color: 'rgba(200,200,220,0.3)',
                }}>
                    ↓ Scroll to explore
                </div>
            </section>

            {/* Projects */}
            <section style={{ padding: '60px 24px', background: 'rgba(10,10,30,0.5)' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>📁 Projects</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px', margin: '0 auto' }}>
                    {projects.map((p, i) => (
                        <div key={i} className="project-card">
                            {p.featured && (
                                <span style={{
                                    display: 'inline-block',
                                    fontSize: '0.6rem',
                                    padding: '2px 8px',
                                    background: 'rgba(100,181,246,0.15)',
                                    border: '1px solid rgba(100,181,246,0.3)',
                                    borderRadius: '12px',
                                    color: '#64b5f6',
                                    marginBottom: '8px',
                                }}>★ Featured</span>
                            )}
                            <h3 style={{ fontSize: '1rem', color: '#e0e0e0', marginBottom: '6px' }}>{p.title}</h3>
                            <p style={{ fontSize: '0.8rem', color: 'rgba(200,200,220,0.5)', lineHeight: '1.4', marginBottom: '10px' }}>
                                {p.description}
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                                {p.tech.map((t, j) => (
                                    <span key={j} className="tech-tag" style={{ fontSize: '0.65rem' }}>{t}</span>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-btn" style={{ fontSize: '0.72rem', padding: '5px 12px' }}>
                                    GitHub →
                                </a>
                                {p.demo && p.demo !== '#' && (
                                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="link-btn" style={{ fontSize: '0.72rem', padding: '5px 12px' }}>
                                        {(p as { demoLabel?: string }).demoLabel ?? 'Demo'} →
                                    </a>
                                )}
                                {(p as { figma?: string }).figma && (
                                    <a href={(p as { figma?: string }).figma} target="_blank" rel="noopener noreferrer" className="link-btn" style={{ fontSize: '0.72rem', padding: '5px 12px' }}>
                                        Figma UI/UX →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section style={{ padding: '60px 24px' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>🌿 Skills</h2>
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    {[...skills.frontend, ...skills.backend, ...skills.tools].map((s, i) => (
                        <div key={i} style={{ marginBottom: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '0.8rem', color: '#e0e0e0' }}>{s.name}</span>
                                <span style={{ fontSize: '0.7rem', color: '#64b5f6' }}>{s.level}%</span>
                            </div>
                            <div className="skill-bar-container">
                                <div className="skill-bar" style={{ width: `${s.level}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section style={{ padding: '60px 24px', background: 'rgba(10,10,30,0.5)' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>📌 Experience</h2>
                <div className="timeline" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    {experience.map((exp, i) => (
                        <div key={i} className="timeline-item">
                            <span className="timeline-year">{exp.year}</span>
                            <h4 className="timeline-role">{exp.role}</h4>
                            <p className="timeline-company">{exp.company}</p>
                            <p className="timeline-achievement">{exp.achievement}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section style={{ padding: '60px 24px', textAlign: 'center' }}>
                <h2 className="section-title" style={{ marginBottom: '24px' }}>📝 Contact</h2>
                <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a href={`mailto:${contact.email}`} className="link-btn" style={{ justifyContent: 'center', padding: '12px' }}>
                        📧 {contact.email}
                    </a>
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="link-btn" style={{ justifyContent: 'center', padding: '12px' }}>
                        🐙 GitHub
                    </a>
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-btn" style={{ justifyContent: 'center', padding: '12px' }}>
                        💼 LinkedIn
                    </a>
                </div>
                <p style={{ marginTop: '40px', fontSize: '0.7rem', color: 'rgba(200,200,220,0.3)' }}>
                    © 2025 {about.name}. Built with ❤️
                </p>
            </section>
        </div>
    );
}
