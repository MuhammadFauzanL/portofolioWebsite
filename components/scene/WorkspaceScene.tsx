'use client';

import React, { useState, useCallback } from 'react';
import { Desk } from './Desk';
import { Monitor } from './Monitor';
import { Plant } from './Plant';
import { Lamp } from './Lamp';
import { Folder } from './Folder';
import { CorkBoard } from './CorkBoard';
import { StickyNote } from './StickyNote';
import { Keyboard } from './Keyboard';
import { Mouse } from './Mouse';
import { CoffeeMug } from './CoffeeMug';
import { Room } from './Room';
import { Lighting } from './Lighting';
import { CameraController } from './CameraController';
import type { Section } from '@/lib/data';

interface WorkspaceSceneProps {
    isDay: boolean;
    activeSection: Section;
    onSectionChange: (section: Section) => void;
}

export function WorkspaceScene({
    isDay,
    activeSection,
    onSectionChange,
}: WorkspaceSceneProps) {
    // Manual light control: null = auto (follows day/night), true = forced on, false = forced off
    const [lightManual, setLightManual] = useState<boolean | null>(null);
    // Typed text from keyboard
    const [typedText, setTypedText] = useState('');

    const isLampOn = lightManual !== null ? lightManual : !isDay;

    const handleLampToggle = useCallback(() => {
        setLightManual((prev) => {
            if (prev === null) return isDay ? true : false; // toggle opposite of auto
            return !prev;
        });
    }, [isDay]);

    const handleKeyPress = useCallback((key: string) => {
        if (key === 'Backspace') {
            setTypedText((prev) => prev.slice(0, -1));
        } else if (key === 'Enter') {
            setTypedText((prev) => prev + '\n');
        } else if (key === 'Space') {
            setTypedText((prev) => prev + ' ');
        } else if (key.length === 1) {
            setTypedText((prev) => prev + key);
        }
    }, []);

    return (
        <>
            <CameraController activeSection={activeSection} />
            <Lighting isDay={isDay} />
            <Room isDay={isDay} />

            <group>
                <Desk />
                {/* 💻 Laptop = About ONLY */}
                <Monitor
                    activeSection={activeSection}
                    onSectionChange={onSectionChange}
                    isScreenOn={activeSection !== 'default' || true}
                    typedText={typedText}
                />
                {/* 📁 Folder = Projects (floating cards above desk) */}
                <Folder
                    activeSection={activeSection}
                    onActivate={() => onSectionChange('projects')}
                />
                {/* 🌿 Plant = Skills (floating labels near plant) */}
                <Plant
                    activeSection={activeSection}
                    onActivate={() => onSectionChange('skills')}
                />
                {/* 📌 Cork Board = Experience (pinned notes on board) */}
                <CorkBoard
                    activeSection={activeSection}
                    onActivate={() => onSectionChange('experience')}
                />
                {/* 📝 Sticky Note = Contact */}
                <StickyNote
                    activeSection={activeSection}
                    onActivate={() => onSectionChange('contact')}
                />
                <Lamp isOn={isLampOn} onToggle={handleLampToggle} />
                <Keyboard onKeyPress={handleKeyPress} />
                <Mouse />
                <CoffeeMug />
            </group>
        </>
    );
}
