/**
 * INTEGRATION GUIDE
 * 
 * Step-by-step instructions for adding SmokeAnimation to DripTown
 */

// ============================================================================
// OPTION 1: React Component Integration (Recommended for DripTown)
// ============================================================================

/*
1. Import the component:

   import { SmokeContainer, useSmoke } from '@/app/components/SmokeAnimationComponent';
   import { SMOKE_PRESETS } from '@/app/utils/SmokeAnimationExamples';

2. Wrap your content:

   export function Hero() {
     return (
       <SmokeContainer 
         className="h-screen bg-gradient-to-b from-black to-gray-900"
         config={SMOKE_PRESETS.medium}
       >
         <div className="flex items-center justify-center h-full">
           <h1 className="text-6xl font-bold text-white">DripTown</h1>
         </div>
       </SmokeContainer>
     );
   }

3. Or use the hook for more control:

   export function HomePage() {
     const { smokeRef, updateConfig } = useSmoke('#hero-container', {
       particleCount: 150,
       opacity: 0.3,
     });

     return (
       <div id="hero-container" className="h-screen">
         <button onClick={() => updateConfig({ opacity: 0.5 })}>
           Increase Opacity
         </button>
       </div>
     );
   }
*/

// ============================================================================
// OPTION 2: Integration with Home.tsx
// ============================================================================

/*
Add to your Home.tsx:

import { SmokeContainer } from '../components/SmokeAnimationComponent';
import { SMOKE_PRESETS } from '../utils/SmokeAnimationExamples';

export function Home() {
  return (
    <>
      <Navigation />
      
      <SmokeContainer 
        className="h-screen flex items-center justify-center"
        config={SMOKE_PRESETS.medium}
      >
        <div className="text-center text-white z-20">
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-screen object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </SmokeContainer>

      {/* Rest of your home content */}
      
      <Footer />
    </>
  );
}
*/

// ============================================================================
// OPTION 3: Integration with CategoryPage.tsx
// ============================================================================

/*
Add to CategoryPage.tsx:

import { useSmoke } from '../components/SmokeAnimationComponent';
import { SMOKE_PRESETS } from '../utils/SmokeAnimationExamples';

export default function CategoryPage() {
  // ... existing code ...
  
  const { smokeRef } = useSmoke('#categoryPageContainer', {
    particleCount: 100,
    opacity: 0.2,
    sensitivity: 0.4,
  });

  return (
    <div id="categoryPageContainer" className="min-h-screen bg-black relative">
      {/* Existing content */}
    </div>
  );
}
*/

// ============================================================================
// OPTION 4: Full Page Integration with Multiple Layers
// ============================================================================

/*
For a dramatic effect with multiple smoke layers:

import { SmokeContainer } from '../components/SmokeAnimationComponent';
import { SMOKE_PRESETS } from '../utils/SmokeAnimationExamples';

export function AdvancedHero() {
  return (
    <div className="relative">
      {/* Background smoke layer - dark */}
      <div className="absolute inset-0">
        <SmokeContainer 
          className="h-screen"
          config={SMOKE_PRESETS.dark}
        />
      </div>

      {/* Main content layer */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold">Welcome</h1>
        </div>
      </div>

      {/* Foreground smoke layer - light */}
      <div className="absolute inset-0 pointer-events-none">
        <SmokeContainer 
          className="h-screen"
          config={SMOKE_PRESETS.subtle}
        />
      </div>
    </div>
  );
}
*/

// ============================================================================
// OPTION 5: Device-Specific Configuration
// ============================================================================

/*
import { useEffect, useState } from 'react';
import { SmokeContainer } from '../components/SmokeAnimationComponent';

export function ResponsiveSmoke() {
  const [config, setConfig] = useState(SMOKE_PRESETS.medium);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      setConfig(SMOKE_PRESETS.subtle);  // Light effect on mobile
    } else {
      setConfig(SMOKE_PRESETS.medium);  // Medium on desktop
    }

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setConfig(newIsMobile ? SMOKE_PRESETS.subtle : SMOKE_PRESETS.medium);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SmokeContainer 
      className="h-screen"
      config={config}
    >
      {/* Content */}
    </SmokeContainer>
  );
}
*/

// ============================================================================
// FILE STRUCTURE
// ============================================================================

/*
src/
├── app/
│   ├── components/
│   │   └── SmokeAnimationComponent.tsx     ← React wrapper components
│   ├── utils/
│   │   ├── SmokeAnimation.ts               ← Core animation engine
│   │   ├── SmokeAnimationExamples.ts       ← Configuration presets
│   │   ├── SMOKE_ANIMATION_README.md       ← Full documentation
│   │   └── SMOKE_INTEGRATION_GUIDE.ts      ← This file
│   └── pages/
│       ├── Home.tsx                        ← Can use SmokeContainer
│       ├── CategoryPage.tsx                ← Can use useSmoke hook
│       └── ...

Key Files:
- SmokeAnimation.ts         : Core animation logic (no React dependency)
- SmokeAnimationComponent.tsx: React component wrappers
- SmokeAnimationExamples.ts : Configuration presets
*/

// ============================================================================
// MIGRATION FROM EXISTING CODE
// ============================================================================

/*
Before (without smoke):
  <section className="h-screen bg-black flex items-center">
    <h1>Welcome</h1>
  </section>

After (with smoke):
  <SmokeContainer className="bg-black flex items-center" config={SMOKE_PRESETS.medium}>
    <h1>Welcome</h1>
  </SmokeContainer>
*/

// ============================================================================
// COMMON CUSTOMIZATIONS
// ============================================================================

/*
1. Light smoke effect:
   config={SMOKE_PRESETS.subtle}

2. Dramatic effect:
   config={SMOKE_PRESETS.dramatic}

3. Dark atmospheric:
   config={SMOKE_PRESETS.dark}

4. Custom settings:
   config={{
     particleCount: 200,
     opacity: 0.35,
     sensitivity: 0.6,
     windStrength: 0.25,
   }}

5. Mobile-optimized:
   config={{
     particleCount: 50,
     opacity: 0.15,
     sensitivity: 0.3,
   }}
*/

// ============================================================================
// PERFORMANCE TIPS
// ============================================================================

/*
1. Start with SMOKE_PRESETS.subtle on mobile
2. Increase particleCount on high-performance devices
3. Use sensitivity: 0.3-0.5 for smooth motion
4. Test on actual devices (especially older phones)
5. Check FPS using Chrome DevTools Performance tab

FPS Targets:
- Desktop: 60 FPS (smooth)
- Mobile: 30-50 FPS (acceptable)

If FPS is low:
- Reduce particleCount
- Reduce opacity
- Use SMOKE_PRESETS.subtle
*/

// ============================================================================
// TROUBLESHOOTING
// ============================================================================

/*
Issue: Smoke not visible
Fix: 
  - Increase opacity (0.5 instead of 0.3)
  - Change blendMode to 'screen'
  - Increase particleCount to 200+

Issue: Poor performance on mobile
Fix:
  - Use SMOKE_PRESETS.subtle
  - Set particleCount to 50-75
  - Reduce sensitivity to 0.3

Issue: Smoke not responding to scroll
Fix:
  - Check container position is 'relative'
  - Increase sensitivity to 0.7-1.0
  - Verify window is scrollable

Issue: Memory leaks in React
Fix:
  - Always return cleanup function from useEffect
  - Call smoke.destroy() on unmount
  - Use the provided SmokeContainer (handles cleanup)
*/

// ============================================================================
// ADVANCED USAGE
// ============================================================================

/*
Real-time config updates:

export function ConfigurableSmoke() {
  const containerRef = useRef(null);
  const [opacity, setOpacity] = useState(0.3);

  const { smokeRef } = useSmoke('#container', { opacity });

  const handleOpacityChange = (e) => {
    setOpacity(parseFloat(e.target.value));
    smokeRef.current?.updateConfig({ opacity: parseFloat(e.target.value) });
  };

  return (
    <>
      <input type="range" value={opacity} onChange={handleOpacityChange} />
      <div id="container" className="h-screen" />
    </>
  );
}

Add particles dynamically:

smokeRef.current?.addParticles(50);  // Add 50 particles

Check animation status:

if (smokeRef.current?.isAnimating()) {
  // Animation is active
}

Get particle count:

const count = smokeRef.current?.getParticleCount();
*/

// ============================================================================
// TESTING
// ============================================================================

/*
1. Test scroll interaction:
   - Scroll down → smoke should flow upward
   - Scroll up → smoke should flow downward
   - Fast scroll → stronger response
   - Slow scroll → gentle response

2. Test inertia:
   - Scroll and release
   - Smoke should continue briefly after scroll stops

3. Performance:
   - Open DevTools Performance tab
   - Record while scrolling
   - Target: 60 FPS desktop, 30+ FPS mobile

4. Mobile:
   - Test on actual mobile devices
   - Check for smooth scroll behavior
   - Verify touch handling
*/

// ============================================================================
// ADDITIONAL RESOURCES
// ============================================================================

/*
1. Full Documentation:
   - See SMOKE_ANIMATION_README.md

2. Configuration Presets:
   - See SmokeAnimationExamples.ts

3. Component Examples:
   - See SmokeAnimationComponent.tsx

4. Core Implementation:
   - See SmokeAnimation.ts (well-commented)
*/

export {};
