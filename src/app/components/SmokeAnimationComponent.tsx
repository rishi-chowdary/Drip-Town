/**
 * SmokeAnimationComponent.tsx
 * 
 * Reusable React component for adding smoke effects to any section
 * 
 * Usage:
 * <SmokeContainer config={{ opacity: 0.3, sensitivity: 0.5 }}>
 *   <YourContent />
 * </SmokeContainer>
 */

import { useEffect, useRef, ReactNode } from 'react';
import { SmokeAnimation } from '../utils/SmokeAnimation';

interface SmokeContainerProps {
  children: ReactNode;
  className?: string;
  config?: Parameters<typeof SmokeAnimation['prototype']['updateConfig']>[0];
  onSmokeReady?: (smoke: SmokeAnimation) => void;
}

/**
 * SmokeContainer Component
 * 
 * Wraps content with a smoke animation background
 * Handles initialization, cleanup, and configuration
 */
export function SmokeContainer({
  children,
  className = '',
  config = {},
  onSmokeReady,
}: SmokeContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<SmokeAnimation | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Initialize smoke animation
      smokeRef.current = new SmokeAnimation(containerRef.current, config as any);
      smokeRef.current.start();

      // Callback for external handlers
      if (onSmokeReady) {
        onSmokeReady(smokeRef.current);
      }

      // Handle cleanup
      return () => {
        if (smokeRef.current) {
          smokeRef.current.destroy();
          smokeRef.current = null;
        }
      };
    } catch (error) {
      console.error('Failed to initialize SmokeAnimation:', error);
    }
  }, [config, onSmokeReady]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ position: 'relative' }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/**
 * Hook for direct SmokeAnimation usage in functional components
 * 
 * Usage:
 * const { smokeRef } = useSmoke('#container', { opacity: 0.3 });
 */
export function useSmoke(
  containerSelector: string | null,
  config?: Parameters<typeof SmokeAnimation['prototype']['updateConfig']>[0]
) {
  const smokeRef = useRef<SmokeAnimation | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!containerSelector || isInitializedRef.current) return;

    try {
      smokeRef.current = new SmokeAnimation(containerSelector, config as any);
      smokeRef.current.start();
      isInitializedRef.current = true;

      return () => {
        if (smokeRef.current) {
          smokeRef.current.destroy();
          smokeRef.current = null;
          isInitializedRef.current = false;
        }
      };
    } catch (error) {
      console.error('Failed to initialize SmokeAnimation:', error);
    }
  }, [containerSelector, config]);

  return {
    smokeRef,
    isInitialized: isInitializedRef.current,
    updateConfig: (newConfig: any) => {
      if (smokeRef.current) {
        smokeRef.current.updateConfig(newConfig);
      }
    },
    addParticles: (count: number) => {
      if (smokeRef.current) {
        smokeRef.current.addParticles(count);
      }
    },
  };
}

/**
 * Example: Hero Section with Smoke
 */
export function HeroWithSmoke() {
  return (
    <SmokeContainer
      className="h-screen flex items-center justify-center bg-black"
      config={{
        particleCount: 150,
        opacity: 0.3,
        sensitivity: 0.5,
      }}
    >
      <div className="text-center text-white z-20">
        <h1 className="text-6xl font-bold mb-4">Welcome to DripTown</h1>
        <p className="text-2xl text-white/80">
          Premium Streetwear with Scroll-Reactive Smoke
        </p>
      </div>
    </SmokeContainer>
  );
}

/**
 * Example: Category Page with Smoke
 */
export function CategoryPageWithSmoke({ children }: { children: ReactNode }) {
  return (
    <SmokeContainer
      className="min-h-screen bg-black"
      config={{
        particleCount: 120,
        opacity: 0.2,
        sensitivity: 0.4,
        windStrength: 0.15,
      }}
    >
      {children}
    </SmokeContainer>
  );
}

/**
 * Example: Interactive Smoke Controller
 * 
 * Allows real-time configuration adjustments
 */
export function InteractiveSmokeController() {
  const containerRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<SmokeAnimation | null>(null);
  const [opacity, setOpacity] = React.useState(0.3);
  const [sensitivity, setSensitivity] = React.useState(0.5);
  const [particleCount, setParticleCount] = React.useState(150);

  useEffect(() => {
    if (containerRef.current) {
      smokeRef.current = new SmokeAnimation(containerRef.current, {
        particleCount,
        opacity,
        sensitivity,
      });
      smokeRef.current.start();
    }

    return () => {
      smokeRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (smokeRef.current) {
      smokeRef.current.updateConfig({ opacity, sensitivity });
    }
  }, [opacity, sensitivity]);

  const handleParticleCountChange = (newCount: number) => {
    setParticleCount(newCount);
    if (smokeRef.current) {
      const currentCount = smokeRef.current.getParticleCount();
      if (newCount > currentCount) {
        smokeRef.current.addParticles(newCount - currentCount);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Smoke Container */}
      <div
        ref={containerRef}
        className="relative w-full h-96 bg-black rounded-lg overflow-hidden mb-6"
      />

      {/* Controls */}
      <div className="space-y-4 text-white">
        <div>
          <label className="block text-sm mb-2">
            Opacity: {opacity.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Sensitivity: {sensitivity.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={sensitivity}
            onChange={(e) => setSensitivity(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Particles: {particleCount}
          </label>
          <input
            type="range"
            min="50"
            max="300"
            step="10"
            value={particleCount}
            onChange={(e) => handleParticleCountChange(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Example: Preset Selector
 * 
 * Quick selection between different smoke styles
 */
export function SmokePresetSelector() {
  const containerRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<SmokeAnimation | null>(null);
  const [preset, setPreset] = React.useState<'subtle' | 'medium' | 'dramatic'>('medium');

  const presets = {
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
  };

  useEffect(() => {
    if (containerRef.current) {
      smokeRef.current = new SmokeAnimation(
        containerRef.current,
        presets[preset] as any
      );
      smokeRef.current.start();
    }

    return () => {
      smokeRef.current?.destroy();
    };
  }, []);

  const handlePresetChange = (newPreset: typeof preset) => {
    setPreset(newPreset);
    if (smokeRef.current) {
      smokeRef.current.updateConfig(presets[newPreset] as any);
    }
  };

  return (
    <div className="w-full">
      {/* Smoke Container */}
      <div
        ref={containerRef}
        className="relative w-full h-96 bg-black rounded-lg mb-6"
      />

      {/* Preset Buttons */}
      <div className="flex gap-4">
        {(Object.keys(presets) as Array<keyof typeof presets>).map((key) => (
          <button
            key={key}
            onClick={() => handlePresetChange(key)}
            className={`px-4 py-2 rounded capitalize transition-all ${
              preset === key
                ? 'bg-white text-black'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
