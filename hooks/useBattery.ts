'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface BatteryInfo {
    level: number;
    charging: boolean;
    supported: boolean;
}

export function useBattery(): BatteryInfo {
    const [battery, setBattery] = useState<BatteryInfo>({
        level: 1,
        charging: false,
        supported: false,
    });

    const batteryRef = useRef<any>(null);
    const mountedRef = useRef(true);

    const updateBattery = useCallback((bat: any) => {
        if (!mountedRef.current) return;
        setBattery(prev => {
            const newLevel = bat.level;
            const newCharging = bat.charging;
            // Only update if values actually changed to avoid unnecessary re-renders
            if (prev.level === newLevel && prev.charging === newCharging && prev.supported) {
                return prev;
            }
            return {
                level: newLevel,
                charging: newCharging,
                supported: true,
            };
        });
    }, []);

    useEffect(() => {
        mountedRef.current = true;
        let pollInterval: ReturnType<typeof setInterval> | null = null;

        const handleChange = () => {
            if (batteryRef.current) updateBattery(batteryRef.current);
        };

        // Try the Battery Status API
        if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
            (navigator as any)
                .getBattery()
                .then((bat: any) => {
                    if (!mountedRef.current) return;
                    batteryRef.current = bat;
                    updateBattery(bat);

                    // Listen for all battery events
                    bat.addEventListener('chargingchange', handleChange);
                    bat.addEventListener('levelchange', handleChange);
                    bat.addEventListener('chargingtimechange', handleChange);
                    bat.addEventListener('dischargingtimechange', handleChange);

                    // Poll every 3 seconds as fallback for some Windows devices
                    // that don't reliably fire battery events
                    pollInterval = setInterval(() => {
                        if (mountedRef.current && batteryRef.current) {
                            updateBattery(batteryRef.current);
                        }
                    }, 3000);
                })
                .catch(() => {
                    // Battery API threw — mark as not supported so we show fallback
                    if (mountedRef.current) {
                        setBattery({ level: 1, charging: false, supported: false });
                    }
                });
        }

        return () => {
            mountedRef.current = false;
            if (batteryRef.current) {
                const bat = batteryRef.current;
                bat.removeEventListener('chargingchange', handleChange);
                bat.removeEventListener('levelchange', handleChange);
                bat.removeEventListener('chargingtimechange', handleChange);
                bat.removeEventListener('dischargingtimechange', handleChange);
            }
            if (pollInterval) clearInterval(pollInterval);
        };
    }, [updateBattery]);

    return battery;
}
