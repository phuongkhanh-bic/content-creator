import { useEffect, useState, useCallback } from "react";
import { isPlatform } from "@ionic/react";

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceType: DeviceType;
    isMobilePlatform: boolean;
    width: number;
}

const BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
} as const;

export function useDevice(): DeviceInfo {
    const getDeviceInfo = useCallback((): Omit<DeviceInfo, 'isMobilePlatform'> => {
        if (typeof window === "undefined") {
            return {
                isMobile: false,
                isTablet: false,
                isDesktop: true,
                deviceType: 'desktop',
                width: 0,
            };
        }

        const width = window.innerWidth;
        const isMobile = width <= BREAKPOINTS.mobile;
        const isTablet = width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet;
        const isDesktop = width > BREAKPOINTS.tablet;

        return {
            isMobile,
            isTablet,
            isDesktop,
            deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
            width,
        };
    }, []);

    const [deviceInfo, setDeviceInfo] = useState(getDeviceInfo());

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        function handleResize() {
            // Clear the previous timeout
            clearTimeout(timeoutId);
            
            // Set a new timeout
            timeoutId = setTimeout(() => {
                setDeviceInfo(getDeviceInfo());
            }, 150); // 150ms debounce
        }
        
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, [getDeviceInfo]);

    return {
        ...deviceInfo,
        isMobilePlatform: isPlatform("mobile"),
    };
}
