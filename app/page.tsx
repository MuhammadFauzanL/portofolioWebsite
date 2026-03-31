'use client';

import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WorkspaceScene } from '@/components/scene/WorkspaceScene';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { NavigationHints } from '@/components/ui/NavigationHints';
import { MobileFallback } from '@/components/ui/MobileFallback';
import { DebugOverlay } from '@/components/ui/DebugOverlay';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { Section } from '@/lib/data';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('default');
  const isMobile = useIsMobile();
  const time = useTimeOfDay();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleSectionChange = useCallback((section: Section) => {
    setActiveSection((prev) => (prev === section ? 'default' : section));
  }, []);

  const handleNavigate = useCallback((section: Section) => {
    setActiveSection(section);
  }, []);

  if (isMobile) {
    return <MobileFallback />;
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className="desktop-3d" style={{
        position: 'fixed',
        inset: 0,
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 1s ease',
      }}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            position: [0, 1.15, 1.8],
            fov: 50,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = 2;
            gl.toneMapping = 4;
            gl.toneMappingExposure = 1.0;
          }}
        >
          <Suspense fallback={null}>
            <WorkspaceScene
              isDay={time.isDay}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation bar */}
      {!isLoading && (
        <NavigationHints
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      )}

      {/* Debug overlay (dev only) */}
      <DebugOverlay activeSection={activeSection} isDay={time.isDay} />

      {/* Hint text */}
      {!isLoading && activeSection === 'default' && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          textAlign: 'center',
          animation: 'fadeIn 1s ease forwards',
          animationDelay: '1s',
          opacity: 0,
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: 'rgba(200,200,220,0.4)',
            letterSpacing: '0.15em',
          }}>
            Click on objects to explore · {time.isDay ? '☀️ Day Mode' : '🌙 Evening Mode'}
          </p>
        </div>
      )}
    </>
  );
}
