'use client';

import { useState, useEffect, useRef } from 'react';

export interface TimeOfDay {
    hour: number;
    minutes: number;
    seconds: number;
    isDay: boolean;
    timeString: string;
    timeStringWithSeconds: string;
    dateString: string;
}

export function useTimeOfDay(): TimeOfDay {
    const [time, setTime] = useState<TimeOfDay>(() => {
        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        return {
            hour,
            minutes,
            seconds,
            isDay: hour >= 6 && hour < 18,
            timeString: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
            timeStringWithSeconds: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
            dateString: now.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            }),
        };
    });

    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        const update = () => {
            if (!mountedRef.current) return;
            const now = new Date();
            const hour = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            setTime({
                hour,
                minutes,
                seconds,
                isDay: hour >= 6 && hour < 18,
                timeString: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
                timeStringWithSeconds: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
                dateString: now.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                }),
            });
        };

        update();
        // Update every second for real-time clock display
        const interval = setInterval(update, 1000);

        return () => {
            mountedRef.current = false;
            clearInterval(interval);
        };
    }, []);

    return time;
}
