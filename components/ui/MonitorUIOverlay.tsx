'use client';

import React from 'react';
import { MonitorTopBar } from '../monitor/MonitorTopBar';
import { AboutSection } from '../monitor/AboutSection';

interface MonitorUIOverlayProps {
    isActive: boolean;
    onClose: () => void;
}

export function MonitorUIOverlay({ isActive, onClose }: MonitorUIOverlayProps) {
    return (
        <div className={`monitor-overlay ${isActive ? 'active' : ''}`}>
            <div
                className="monitor-screen"
                style={{
                    top: '12%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '55%',
                    maxWidth: '700px',
                    height: '62%',
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? 'visible' : 'hidden',
                    transition: 'opacity 0.4s ease, visibility 0.4s ease',
                }}
            >
                <MonitorTopBar onClose={onClose} />
                <div className="monitor-content">
                    <AboutSection />
                </div>
            </div>
        </div>
    );
}
