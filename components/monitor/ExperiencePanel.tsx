'use client';

import React from 'react';
import { portfolioData } from '@/lib/data';

interface ExperiencePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ExperiencePanel({ isOpen, onClose }: ExperiencePanelProps) {
    const { experience } = portfolioData;

    return (
        <div className={`panel-slide ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>✕</button>

            <p className="section-subtitle" style={{ marginTop: '16px' }}>Journey</p>
            <h2 className="section-title">Experience</h2>

            <div className="timeline" style={{ marginTop: '24px' }}>
                {experience.map((exp, i) => (
                    <div
                        key={i}
                        className="timeline-item"
                        style={{
                            animation: `slideUp 0.5s ease forwards`,
                            animationDelay: `${i * 0.2}s`,
                            opacity: 0,
                        }}
                    >
                        <span className="timeline-year">{exp.year}</span>
                        <h4 className="timeline-role">{exp.role}</h4>
                        <p className="timeline-company">{exp.company}</p>
                        <p className="timeline-achievement">{exp.achievement}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
