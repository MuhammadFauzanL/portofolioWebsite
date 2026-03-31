'use client';

import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const steps = [
            { target: 30, delay: 200 },
            { target: 55, delay: 600 },
            { target: 75, delay: 1000 },
            { target: 90, delay: 1400 },
            { target: 100, delay: 1800 },
        ];

        steps.forEach(({ target, delay }) => {
            setTimeout(() => setProgress(target), delay);
        });

        setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 800);
        }, 2400);
    }, [onComplete]);

    return (
        <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
            <div style={{
                marginBottom: '40px',
                textAlign: 'center',
            }}>
                <div style={{
                    fontSize: '2rem',
                    marginBottom: '8px',
                    opacity: 0.8,
                }}>
                    🏠
                </div>
            </div>

            <span className="loading-text">Preparing workspace…</span>

            <div className="loading-bar-container">
                <div
                    className="loading-bar"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p style={{
                marginTop: '20px',
                fontSize: '0.7rem',
                color: 'rgba(200,200,220,0.3)',
                letterSpacing: '0.1em',
            }}>
                {progress < 50 ? 'Loading assets...' :
                    progress < 80 ? 'Setting up workspace...' :
                        'Almost ready...'}
            </p>
        </div>
    );
}
