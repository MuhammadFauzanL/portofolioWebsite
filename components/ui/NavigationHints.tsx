'use client';

import React from 'react';
import type { Section } from '@/lib/data';

interface NavigationHintsProps {
    activeSection: Section;
    onNavigate: (section: Section) => void;
}

const navItems: { id: Section; icon: string; label: string }[] = [
    { id: 'about', icon: '💻', label: 'Monitor' },
    { id: 'projects', icon: '📁', label: 'Folder' },
    { id: 'skills', icon: '🌿', label: 'Plant' },
    { id: 'experience', icon: '📌', label: 'Board' },
    { id: 'contact', icon: '📝', label: 'Note' },
];

export function NavigationHints({ activeSection, onNavigate }: NavigationHintsProps) {
    return (
        <div className="nav-hints">
            <button
                className={`nav-hint ${activeSection === 'default' ? 'active' : ''}`}
                onClick={() => onNavigate('default')}
            >
                <span className="nav-icon">🏠</span>
                <span>Home</span>
            </button>

            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-hint ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
}
