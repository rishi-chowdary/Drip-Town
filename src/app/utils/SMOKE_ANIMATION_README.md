# SmokeAnimation - Reusable Smoke Effect Module

A high-performance, scroll-reactive smoke animation system built with Canvas 2D. Creates realistic, organic smoke effects that respond to scroll direction, scroll velocity, and user interactions.

## Features

✨ **Core Features**
- Realistic particle-based smoke rendering with soft gradients
- Scroll-driven animation (up/down detection with velocity)
- Smooth motion with inertia and momentum
- Multi-layer parallax effect for depth
- Perlin-like noise for organic turbulence
- 60 FPS performance optimization

🎨 **Visual Effects**
- Customizable smoke color and opacity
- Multiple blend modes (lighten, screen, multiply, etc.)
- Soft-edge radial gradients for realistic particles
- Motion blur through canvas fade technique
- Layered rendering for depth perception

⚡ **Performance**
- Optimized Canvas 2D rendering
- Delta time-based animation for Frame-rate independence
- Efficient noise caching system
- Memory management with particle pooling
- Mobile-friendly with configurable particle counts

🎮 **Interaction**
- Real-time scroll velocity detection
- Smooth inertia-based momentum
- Optional mouse movement interaction
- Dynamic configuration updates
- Easy enable/disable

## Installation

### For React Projects

```bash
# Copy the SmokeAnimation.ts file to your utils folder
cp src/app/utils/SmokeAnimation.ts your-project/src/utils/
```

### For Vanilla JavaScript

```html
<script type="module">
  import { SmokeAnimation } from './SmokeAnimation.js';
  // Use as shown in examples
</script>
```

## Quick Start

### React Component Example

```tsx
import { useEffect, useRef } from 'react';
import { SmokeAnimation } from '../utils/SmokeAnimation';

export function HeroWithSmoke() {
  const containerRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<SmokeAnimation | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    smokeRef.current = new SmokeAnimation('#smoke-container', {
      particleCount: 150,
      opacity: 0.3,
      sensitivity: 0.5,
    });

    smokeRef.current.start();

    return () => {
      smokeRef.current?.destroy();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="smoke-container"
      className="relative w-full h-screen bg-black"
    >
      {/* Your content here */}
    </div>
  );
}
```

### Vanilla JavaScript

```html
<div id="smoke-container" style="width: 100%; height: 100vh; background: black;"></div>

<script type="module">
  import { SmokeAnimation } from './SmokeAnimation.js';

  const smoke = new SmokeAnimation('#smoke-container', {
    particleCount: 150,
    smokeColor: '#ffffff',
    opacity: 0.3,
  });

  smoke.start();
</script>
```

## Configuration Options

```typescript
interface SmokeConfig {
  // Particle System
  particleCount?: number;              // (default: 150) Number of smoke particles
  particleSizeRange?: [number, number]; // (default: [10, 60]) Min/max particle size

  // Visual Appearance
  smokeColor?: string;                 // (default: '#ffffff') Smoke color (hex/rgb/rgba)
  opacity?: number;                    // (default: 0.3) Particle opacity (0-1)
  blendMode?: GlobalCompositeOperation; // (default: 'lighten') Canvas blend mode

  // Physics & Motion
  sensitivity?: number;                // (default: 0.5) Scroll reactivity (0-1)
  inertia?: number;                    // (default: 0.95) Momentum (0-1)
  windStrength?: number;               // (default: 0.2) Turbulence strength (0-1)
  turbulenceScale?: number;            // (default: 0.015) Noise pattern scale
}
```

## Configuration Guide

### Particle Count
```typescript
const smoke = new SmokeAnimation('#container', {
  particleCount: 100,  // Mobile optimization
  // VS
  particleCount: 250,  // Desktop high-quality
});
```

### Sensitivity (Scroll Reactivity)
```typescript
// Subtle reaction
{ sensitivity: 0.2 }   // Gentle smoke movement

// Medium reaction
{ sensitivity: 0.5 }   // Standard responsiveness

// Dramatic reaction
{ sensitivity: 1.0 }   // Very reactive to scroll
```

### Blend Modes
```typescript
{ blendMode: 'lighten' }      // Brightens background
{ blendMode: 'screen' }       // Intense glow effect
{ blendMode: 'multiply' }     // Dark realistic smoke
{ blendMode: 'overlay' }      // Mixed overlay effect
```

### Wind Strength (Turbulence)
```typescript
{ windStrength: 0.1 }   // Calm, organized flow
{ windStrength: 0.3 }   // Natural turbulence
{ windStrength: 0.6 }   // Chaotic, turbulent
```

## Presets

Pre-configured settings for common use cases:

```typescript
import { SMOKE_PRESETS } from '../utils/SmokeAnimationExamples';

// Subtle background effect
const smoke = new SmokeAnimation('#container', SMOKE_PRESETS.subtle);

// Medium intensity
const smoke = new SmokeAnimation('#container', SMOKE_PRESETS.medium);

// Dramatic foreground effect
const smoke = new SmokeAnimation('#container', SMOKE_PRESETS.dramatic);

// Dark atmospheric smoke
const smoke = new SmokeAnimation('#container', SMOKE_PRESETS.dark);

// Glowing ethereal effect
const smoke = new SmokeAnimation('#container', SMOKE_PRESETS.glow);
```

## API Reference

### Methods

#### `start()`
Start the animation loop.
```typescript
smoke.start();
```

#### `stop()`
Stop the animation loop without destroying.
```typescript
smoke.stop();
```

#### `destroy()`
Clean up all resources and remove canvas.
```typescript
smoke.destroy();
```

#### `updateConfig(config: Partial<SmokeConfig>)`
Update configuration dynamically.
```typescript
smoke.updateConfig({
  opacity: 0.5,
  sensitivity: 0.8,
});
```

#### `getConfig()`
Get current configuration.
```typescript
const config = smoke.getConfig();
```

#### `addParticles(count: number)`
Add particles to the system.
```typescript
smoke.addParticles(50);  // Add 50 particles
```

#### `getParticleCount()`
Get total particle count.
```typescript
const count = smoke.getParticleCount();
```

#### `isAnimating()`
Check if animation is running.
```typescript
if (smoke.isAnimating()) {
  // Animation is active
}
```

## Use Cases

### 1. Hero Section Background
```tsx
<section className="hero relative w-full h-screen">
  <div id="hero-smoke" className="absolute inset-0"></div>
  <div className="relative z-10">
    {/* Hero content */}
  </div>
</section>
```

### 2. Category Page Enhancement
```tsx
// Add to CategoryPage.tsx
useEffect(() => {
  const smoke = new SmokeAnimation('#categoryContainer', {
    particleCount: 120,
    opacity: 0.2,
    sensitivity: 0.4,
  });
  
  smoke.start();
  return () => smoke.destroy();
}, []);
```

### 3. Multiple Layers
```typescript
// Bottom layer - dark smoke
const darkSmoke = new SmokeAnimation('#layer1', SMOKE_PRESETS.dark);

// Top layer - light smoke
const lightSmoke = new SmokeAnimation('#layer2', SMOKE_PRESETS.subtle);

darkSmoke.start();
lightSmoke.start();
```

### 4. Device-Aware Configuration
```typescript
const isMobile = /mobile/i.test(navigator.userAgent);
const config = isMobile ? 
  SMOKE_PRESETS.subtle : 
  SMOKE_PRESETS.medium;

const smoke = new SmokeAnimation('#container', config);
```

### 5. Interactive Controls
```typescript
document.getElementById('intensity-slider').addEventListener('change', (e) => {
  const sensitivity = parseFloat(e.target.value);
  smoke.updateConfig({ sensitivity });
});
```

## Performance Optimization

### Mobile Optimization
```typescript
const smoke = new SmokeAnimation('#container', {
  particleCount: 50,        // Reduced particles
  turbulenceScale: 0.02,    // Simpler noise
  windStrength: 0.1,        // Less turbulence
  sensitivity: 0.3,         // Less responsive
});
```

### Desktop High-Quality
```typescript
const smoke = new SmokeAnimation('#container', {
  particleCount: 250,
  turbulenceScale: 0.012,
  windStrength: 0.3,
  sensitivity: 0.7,
});
```

### Memory Management
- Automatic noise cache cleanup (keeps last 5000 values)
- Particle pool reuse (no garbage collection during animation)
- Canvas size synced with container resize
- Efficient delta-time based updates

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Android Chrome 90+)

Canvas 2D is widely supported. Performance varies by device.

## Troubleshooting

### Smoke Not Visible
```typescript
// Increase opacity
smoke.updateConfig({ opacity: 0.5 });

// Change blend mode
smoke.updateConfig({ blendMode: 'screen' });

// Increase particle count
smoke.updateConfig({ particleCount: 250 });
```

### Performance Issues on Mobile
```typescript
// Reduce particles
smoke.updateConfig({ particleCount: 50 });

// Simplify noise
smoke.updateConfig({ turbulenceScale: 0.02 });
```

### Smoke Not Reacting to Scroll
```typescript
// Increase sensitivity
smoke.updateConfig({ sensitivity: 1.0 });

// Check container position styling
container.style.position = 'relative';
```

### Memory Leaks
```typescript
// Always clean up on unmount
useEffect(() => {
  const smoke = new SmokeAnimation(...);
  smoke.start();
  
  return () => {
    smoke.destroy(); // Essential for cleanup
  };
}, []);
```

## Advanced Features

### Custom Noise Pattern
The module uses Perlin-like noise for organic particle movement. Adjust `turbulenceScale` for different pattern wavelengths:
- Higher values = smaller patterns (more detailed)
- Lower values = larger patterns (more flowing)

### Inertia & Momentum
The `inertia` parameter controls how long smoke continues after scroll stops:
- Higher values = longer continuation
- Lower values = snap to stop

### Parallax Layers
Particles automatically organize into 3 layers with different depths, creating visual parallax naturally.

## Future Enhancements

- [ ] Three.js WebGL version for higher performance
- [ ] GPU particle system with compute shaders
- [ ] Advanced physics (gravity, collision detection)
- [ ] Audio-reactive smoke
- [ ] Smoke trails/motion paths
- [ ] Export as web component

## License

This module is provided as-is for integration into the DripTown project.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review configuration examples
3. Verify container element positioning
4. Check browser console for errors

---

**Created**: March 2026  
**Status**: Production Ready  
**Performance Target**: 60 FPS on desktop, 30+ FPS on mobile
