'use client';

import React from 'react';
import { portfolioData } from '@/lib/data';

interface ProjectsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectsPanel({ isOpen, onClose }: ProjectsPanelProps) {
    const { projects } = portfolioData;
    const featured = projects.find(p => p.featured);
    const others = projects.filter(p => !p.featured);

    return (
        <div className={`panel-slide ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>✕</button>

            <p className="section-subtitle" style={{ marginTop: '16px' }}>Portfolio</p>
            <h2 className="section-title">Projects</h2>

            {/* Featured */}
            {featured && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(100,181,246,0.1), rgba(129,199,132,0.05))',
                    border: '1px solid rgba(100,181,246,0.2)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <span style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        fontSize: '0.65rem',
                        padding: '3px 10px',
                        background: 'rgba(100,181,246,0.2)',
                        border: '1px solid rgba(100,181,246,0.3)',
                        borderRadius: '20px',
                        color: '#64b5f6',
                    }}>
                        ★ Featured
                    </span>

                    <h3 style={{ color: '#e0e0e0', fontSize: '1.1rem', marginBottom: '8px' }}>
                        {featured.title}
                    </h3>
                    <p style={{ color: 'rgba(200,200,220,0.6)', fontSize: '0.8rem', lineHeight: '1.5', marginBottom: '12px' }}>
                        {featured.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                        {featured.tech.map((t, i) => (
                            <span key={i} className="tech-tag">{t}</span>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <a href={featured.github} target="_blank" rel="noopener noreferrer" className="link-btn">
                            GitHub →
                        </a>
                        {featured.demo && featured.demo !== '#' && (
                            <a href={featured.demo} target="_blank" rel="noopener noreferrer" className="link-btn">
                                {(featured as { demoLabel?: string }).demoLabel ?? 'Demo'} →
                            </a>
                        )}
                        {(featured as { figma?: string }).figma && (
                            <a href={(featured as { figma?: string }).figma} target="_blank" rel="noopener noreferrer" className="link-btn">
                                Figma UI/UX →
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '12px',
            }}>
                {others.map((project, i) => (
                    <div
                        key={i}
                        className="project-card"
                        style={{
                            animation: `slideUp 0.4s ease forwards`,
                            animationDelay: `${i * 0.1}s`,
                            opacity: 0,
                        }}
                    >
                        <h4 style={{ color: '#e0e0e0', fontSize: '0.9rem', marginBottom: '6px' }}>
                            {project.title}
                        </h4>
                        <p style={{
                            color: 'rgba(200,200,220,0.5)',
                            fontSize: '0.75rem',
                            lineHeight: '1.4',
                            marginBottom: '10px',
                        }}>
                            {project.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '12px' }}>
                            {project.tech.map((t, j) => (
                                <span key={j} className="tech-tag" style={{ fontSize: '0.6rem', padding: '2px 8px' }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>
                                GitHub
                            </a>
                            {project.demo && project.demo !== '#' && (
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-btn" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>
                                    {(project as { demoLabel?: string }).demoLabel ?? 'Demo'}
                                </a>
                            )}
                            {(project as { figma?: string }).figma && (
                                <a href={(project as { figma?: string }).figma} target="_blank" rel="noopener noreferrer" className="link-btn" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>
                                    Figma UI/UX
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
