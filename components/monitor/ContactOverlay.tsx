'use client';

import React from 'react';
import { portfolioData } from '@/lib/data';

interface ContactOverlayProps {
    isVisible: boolean;
    onClose: () => void;
}

export function ContactOverlay({ isVisible, onClose }: ContactOverlayProps) {
    const { contact } = portfolioData;

    return (
        <div
            className={`contact-note ${isVisible ? 'visible' : ''}`}
            onClick={onClose}
        >
            <div
                className="contact-card"
                onClick={(e) => e.stopPropagation()}
                style={{
                    animation: isVisible ? 'slideUp 0.5s ease forwards' : 'none',
                }}
            >
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '4px',
                    color: '#2c2c2c',
                }}>
                    Let&apos;s Connect ✉️
                </h3>

                <p style={{
                    fontSize: '0.8rem',
                    color: '#666',
                    marginBottom: '24px',
                    lineHeight: '1.5',
                }}>
                    {contact.message}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Email */}
                    <a
                        href={`mailto:${contact.email}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#2c2c2c',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            padding: '10px 14px',
                            background: 'rgba(0,0,0,0.05)',
                            borderRadius: '8px',
                            transition: 'background 0.3s ease',
                        }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>📧</span>
                        {contact.email}
                    </a>

                    {/* GitHub */}
                    <a
                        href={contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#2c2c2c',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            padding: '10px 14px',
                            background: 'rgba(0,0,0,0.05)',
                            borderRadius: '8px',
                            transition: 'background 0.3s ease',
                        }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>🐙</span>
                        GitHub
                    </a>

                    {/* LinkedIn */}
                    <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#2c2c2c',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            padding: '10px 14px',
                            background: 'rgba(0,0,0,0.05)',
                            borderRadius: '8px',
                            transition: 'background 0.3s ease',
                        }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>💼</span>
                        LinkedIn
                    </a>
                </div>

                {/* CTA */}
                <div style={{
                    marginTop: '24px',
                    padding: '12px',
                    background: 'rgba(100,181,246,0.1)',
                    borderRadius: '8px',
                    textAlign: 'center',
                }}>
                    <p style={{ fontSize: '0.75rem', color: '#555', lineHeight: '1.4' }}>
                        Open for internship & collaboration opportunities 🚀
                    </p>
                </div>

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '8px',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.1rem',
                        color: '#999',
                        cursor: 'pointer',
                    }}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
