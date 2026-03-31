'use client';

import React from 'react';
import { useBattery } from '@/hooks/useBattery';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';

interface MonitorTopBarProps {
    onClose: () => void;
}

export function MonitorTopBar({ onClose }: MonitorTopBarProps) {
    const battery = useBattery();
    const time = useTimeOfDay();

    const batteryPercent = battery.supported ? Math.round(battery.level * 100) : 100;
    const isLow = battery.level <= 0.2;
    const barColor = isLow ? '#ef5350' : battery.charging ? '#81c784' : '#81c784';

    return (
        <div className="monitor-topbar">
            <div className="topbar-dots">
                <div className="topbar-dot red" onClick={onClose} />
                <div className="topbar-dot yellow" />
                <div className="topbar-dot green" />
            </div>

            <div style={{ fontSize: '0.7rem', color: 'rgba(200,200,220,0.5)', letterSpacing: '0.1em' }}>
                portfolio.workspace
            </div>

            <div className="topbar-info">
                {/* Charging Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {/* Battery icon */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            width: '22px',
                            height: '11px',
                            border: `1.5px solid ${battery.charging ? '#81c784' : 'rgba(200,200,220,0.4)'}`,
                            borderRadius: '2px',
                            padding: '1px',
                            position: 'relative',
                            transition: 'border-color 0.3s ease',
                        }}>
                            <div style={{
                                width: `${batteryPercent}%`,
                                height: '100%',
                                background: battery.charging
                                    ? 'linear-gradient(90deg, #66bb6a, #81c784)'
                                    : isLow
                                        ? '#ef5350'
                                        : 'linear-gradient(90deg, #64b5f6, #81c784)',
                                borderRadius: '1px',
                                transition: 'width 0.5s ease',
                            }} />
                            {/* Lightning bolt overlay when charging */}
                            {battery.charging && (
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    animation: 'chargingPulse 1.5s ease-in-out infinite',
                                }}>
                                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                                        <path d="M5 0L1 5.5H3.5L3 10L7 4.5H4.5L5 0Z" fill="rgba(255,255,255,0.9)" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        {/* Battery cap */}
                        <div style={{
                            width: '2px',
                            height: '5px',
                            background: battery.charging ? '#81c784' : 'rgba(200,200,220,0.4)',
                            borderRadius: '0 1px 1px 0',
                            marginLeft: '0.5px',
                            transition: 'background 0.3s ease',
                        }} />
                    </div>

                    {/* Charging icon */}
                    {battery.charging && (
                        <span style={{
                            fontSize: '0.65rem',
                            color: '#81c784',
                            animation: 'chargingBolt 2s ease-in-out infinite',
                            display: 'inline-flex',
                        }}>
                            ⚡
                        </span>
                    )}

                    {/* Battery percentage */}
                    <span style={{
                        fontSize: '0.65rem',
                        color: isLow ? '#ef5350' : battery.charging ? '#81c784' : 'rgba(200,200,220,0.7)',
                        fontWeight: battery.charging ? 600 : 400,
                        fontFamily: 'var(--font-mono)',
                        minWidth: '28px',
                        transition: 'color 0.3s ease',
                    }}>
                        {battery.supported ? `${batteryPercent}%` : ''}
                    </span>
                </div>

                {/* Clock */}
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                    {time.timeString}
                </span>
            </div>
        </div>
    );
}
