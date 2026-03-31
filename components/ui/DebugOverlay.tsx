'use client';

import React from 'react';
import type { Section } from '@/lib/data';

interface DebugOverlayProps {
    activeSection: Section;
    isDay: boolean;
}

export function DebugOverlay({ activeSection, isDay }: DebugOverlayProps) {
    if (process.env.NODE_ENV !== 'development') return null;

    return (
        <div style={{
            position: 'fixed',
            top: 8,
            left: 8,
            zIndex: 200,
            padding: '8px 14px',
            background: 'rgba(0,0,0,0.85)',
            border: '1px solid rgba(100,181,246,0.3)',
            borderRadius: 6,
            fontSize: '0.7rem',
            fontFamily: 'monospace',
            color: '#81c784',
            pointerEvents: 'none',
            lineHeight: 1.8,
        }}>
            <div>section: <span style={{ color: '#64b5f6' }}>{activeSection}</span></div>
            <div>lighting: <span style={{ color: '#64b5f6' }}>{isDay ? 'day' : 'night'}</span></div>
        </div>
    );
}
