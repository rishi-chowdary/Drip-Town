/**
 * SmokeAnimation Integration Examples
 * 
 * This file demonstrates how to use the SmokeAnimation module
 * in various scenarios within your DripTown website
 */

import { SmokeAnimation } from './SmokeAnimation';

/**
 * Example 1: Basic Smoke Background
 * 
 * Usage in a React component:
 * ```tsx
 * import { useEffect, useRef } from 'react';
 * import { SmokeAnimation } from '../utils/SmokeAnimation';
 * 
 * export function HeroWithSmoke() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const smokeRef = useRef<SmokeAnimation | null>(null);
 * 
 *   useEffect(() => {
 *     if (!containerRef.current) return;
 * 
 *     // Initialize smoke animation
 *     smokeRef.current = new SmokeAnimation(containerRef.current, {
 *       particleCount: 150,
 *       smokeColor: '#ffffff',
 *       opacity: 0.3,
 *       blendMode: 'lighten',
 *       sensitivity: 0.5,
 *     });
 * 
 *     smokeRef.current.start();
 * 
 *     return () => {
 *       smokeRef.current?.destroy();
 *     };
 *   }, []);
 * 
 *   return (
 *     <div ref={containerRef} className="hero-section w-full h-screen">
 *       {/* Your hero content here */}
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * Example 2: Smoke for CategoryPage Background
 * 
 * Add to your CategoryPage.tsx:
 * ```tsx
 * import { SmokeAnimation } from '../utils/SmokeAnimation';
 * 
 * useEffect(() => {
 *   const smoke = new SmokeAnimation('#categoryContainer', {
 *     particleCount: 100,
 *     opacity: 0.2,
 *     sensitivity: 0.4,
 *     windStrength: 0.15,
 *   });
 *   
 *   smoke.start();
 *   
 *   return () => smoke.destroy();
 * }, []);
 * ```
 */

/**
 * Example 3: Vanilla JavaScript Implementation
 * 
 * In your HTML:
 * ```html
 * <div id="smokeContainer" style="width: 100%; height: 100vh; position: relative;">
 *   <!-- Your content here -->
 * </div>
 * 
 * <script type="module">
 *   import { SmokeAnimation } from './SmokeAnimation.ts';
 * 
 *   const smoke = new SmokeAnimation('#smokeContainer', {
 *     particleCount: 200,
 *     smokeColor: '#ffffff',
 *     opacity: 0.25,
 *     sensitivity: 0.6,
 *   });
 * 
 *   smoke.start();
 * </script>
 * ```
 */

/**
 * Example 4: Dynamic Configuration Updates
 * 
 * Change smoke properties on the fly:
 * ```tsx
 * // Make smoke more visible
 * smokeRef.current?.updateConfig({
 *   opacity: 0.5,
 *   particleCount: 250,
 * });
 * 
 * // Make it more sensitive to scrolling
 * smokeRef.current?.updateConfig({
 *   sensitivity: 1.0,
 * });
 * ```
 */

/**
 * Example 5: Multiple Smoke Layers
 * 
 * Stack multiple smoke animations with different colors:
 * ```tsx
 * const whiteSmoke = new SmokeAnimation('#container1', {
 *   smokeColor: '#ffffff',
 *   opacity: 0.2,
 * });
 * 
 * const darkSmoke = new SmokeAnimation('#container2', {
 *   smokeColor: '#666666',
 *   opacity: 0.15,
 *   blendMode: 'multiply',
 * });
 * 
 * whiteSmoke.start();
 * darkSmoke.start();
 * ```
 */

/**
 * Example 6: Performance-Optimized Mobile Version
 * 
 * Detect device and reduce complexity:
 * ```tsx
 * const particleCount = /mobile/i.test(navigator.userAgent) ? 50 : 150;
 * 
 * const smoke = new SmokeAnimation('#container', {
 *   particleCount,
 *   sensitivity: /mobile/i.test(navigator.userAgent) ? 0.3 : 0.5,
 *   windStrength: /mobile/i.test(navigator.userAgent) ? 0.1 : 0.2,
 * });
 * ```
 */

/**
 * Configuration Guide:
 * 
 * particleCount: number (default: 150)
 *   - Number of smoke particles
 *   - Higher = more detailed but slower
 *   - Mobile: 50-100, Desktop: 150-300
 * 
 * smokeColor: string (default: '#ffffff')
 *   - Smoke color (any CSS color)
 *   - Hex: '#ffffff', or 'rgba(255, 255, 255, 0.8)'
 * 
 * opacity: number (default: 0.3)
 *   - Base opacity of smoke particles (0-1)
 *   - 0 = invisible, 1 = fully opaque
 * 
 * blendMode: string (default: 'lighten')
 *   - Canvas blend mode
 *   - Options: 'lighten', 'screen', 'lighter', 'color-dodge', 'overlay'
 * 
 * sensitivity: number (default: 0.5)
 *   - How reactive smoke is to scroll
 *   - 0 = no reaction, 1 = very reactive
 * 
 * inertia: number (default: 0.95)
 *   - Momentum after scroll stops (0-1)
 *   - Higher = longer continuation of movement
 * 
 * windStrength: number (default: 0.2)
 *   - Strength of wind/turbulence effect (0-1)
 *   - Higher = more chaotic movement
 * 
 * turbulenceScale: number (default: 0.015)
 *   - Scale of noise/turbulence pattern
 *   - Affects wavelength of particle movement
 * 
 * particleSizeRange: [min, max] (default: [10, 60])
 *   - Min and max pixel size of particles
 *   - Larger range = more varied particle sizes
 */

// Export examples for testing
export const SMOKE_PRESETS = {
  subtle: {
    particleCount: 100,
    opacity: 0.15,
    sensitivity: 0.3,
    windStrength: 0.1,
  },
  medium: {
    particleCount: 150,
    opacity: 0.25,
    sensitivity: 0.5,
    windStrength: 0.2,
  },
  dramatic: {
    particleCount: 250,
    opacity: 0.4,
    sensitivity: 0.8,
    windStrength: 0.35,
  },
  dark: {
    particleCount: 150,
    smokeColor: '#333333',
    opacity: 0.25,
    blendMode: 'multiply',
    sensitivity: 0.5,
  },
  glow: {
    particleCount: 200,
    smokeColor: '#ffff99',
    opacity: 0.2,
    blendMode: 'screen',
    sensitivity: 0.6,
  },
};
