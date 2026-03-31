// This component is no longer used. Monitor.tsx now renders About content directly.
// Kept as a placeholder to avoid import errors from any stale references.

'use client';

import React from 'react';
import type { Section } from '@/lib/data';

interface LaptopUIProps {
    activeSection: Section;
    onSectionChange: (section: Section) => void;
}

export function LaptopUI({ activeSection }: LaptopUIProps) {
    return (
        <div style={{
            width: '600px',
            height: '348px',
            background: '#0d1117',
            color: '#e0e0e0',
            fontFamily: "'Inter', system-ui, sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
        }}>
            <span style={{ color: 'rgba(200,200,220,0.3)' }}>
                {activeSection === 'default' ? '🏠 WORKSPACE READY' : `📂 ${activeSection}`}
            </span>
        </div>
    );
}
