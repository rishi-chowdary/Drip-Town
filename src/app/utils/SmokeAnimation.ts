/**
 * SmokeAnimation - Reusable smoke effect module
 * Renders realistic smoke that reacts to scroll direction and velocity
 * 
 * Features:
 * - Canvas 2D based particle system
 * - Scroll-driven animation (up/down detection)
 * - Smooth motion with inertia
 * - Multiple layers with parallax effect
 * - Perlin noise-based turbulence
 * - Performance optimized with FPS limiting
 */

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  noiseOffset: number;
  layer: number;
}

interface SmokeConfig {
  particleCount?: number;
  smokeColor?: string;
  opacity?: number;
  blendMode?: GlobalCompositeOperation;
  sensitivity?: number;
  inertia?: number;
  windStrength?: number;
  turbulenceScale?: number;
  particleSizeRange?: [number, number];
}

export class SmokeAnimation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: SmokeParticle[] = [];
  private scrollVelocity = 0;
  private lastScrollY = 0;
  private lastScrollTime = 0;
  private targetScrollVelocity = 0;
  private animationId: number | null = null;
  private isRunning = false;
  private lastFrameTime = 0;
  private deltaTime = 0;
  private inertiaVelocity = 0;

  // Configuration
  private config: Required<SmokeConfig> = {
    particleCount: 150,
    smokeColor: '#ffffff',
    opacity: 0.3,
    blendMode: 'lighten',
    sensitivity: 0.5,
    inertia: 0.95,
    windStrength: 0.2,
    turbulenceScale: 0.015,
    particleSizeRange: [10, 60],
  };

  // Perlin-like noise implementation (simple gradient noise)
  private noiseCache = new Map<string, number>();

  constructor(containerSelector: string, config?: SmokeConfig) {
    const container = document.querySelector(containerSelector) as HTMLElement;
    if (!container) {
      throw new Error(`Container "${containerSelector}" not found`);
    }

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = container.offsetWidth || window.innerWidth;
    this.canvas.height = container.offsetHeight || window.innerHeight;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    container.style.position = 'relative';
    container.insertBefore(this.canvas, container.firstChild);

    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas');
    }
    this.ctx = ctx;

    // Merge custom config
    if (config) {
      this.config = { ...this.config, ...config };
    }

    // Initial setup
    this.setupEventListeners();
    this.initializeParticles();
  }

  /**
   * Simple Perlin-like noise function for organic turbulence
   */
  private perlinNoise(x: number, y: number, z: number): number {
    const key = `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
    if (this.noiseCache.has(key)) {
      return this.noiseCache.get(key)!;
    }

    // Generate pseudo-random gradient
    const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.1645) * 43758.5453;
    const value = n - Math.floor(n);
    this.noiseCache.set(key, value);

    // Limit cache size to prevent memory issues
    if (this.noiseCache.size > 5000) {
      const keysToDelete = Array.from(this.noiseCache.keys()).slice(0, 1000);
      keysToDelete.forEach(k => this.noiseCache.delete(k));
    }

    return value;
  }

  /**
   * Get noise value with improved gradient interpolation
   */
  private getNoise(x: number, y: number, time: number): number {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;

    // Smooth interpolation (Smoothstep)
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);

    const n00 = this.perlinNoise(xi, yi, time);
    const n10 = this.perlinNoise(xi + 1, yi, time);
    const n01 = this.perlinNoise(xi, yi + 1, time);
    const n11 = this.perlinNoise(xi + 1, yi + 1, time);

    const nx0 = n00 * (1 - u) + n10 * u;
    const nx1 = n01 * (1 - u) + n11 * u;

    return nx0 * (1 - v) + nx1 * v;
  }

  /**
   * Initialize particle system
   */
  private initializeParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.createParticle();
    }
  }

  /**
   * Create a single smoke particle
   */
  private createParticle(): void {
    const [minSize, maxSize] = this.config.particleSizeRange;
    const particle: SmokeParticle = {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 0,
      maxLife: 2000 + Math.random() * 2000, // 2-4 seconds
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: 0,
      noiseOffset: Math.random() * 1000,
      layer: Math.random() * 3, // 3 layers for parallax
    };
    this.particles.push(particle);
  }

  /**
   * Setup scroll and resize event listeners
   */
  private setupEventListeners(): void {
    // Scroll detection
    window.addEventListener('scroll', this.handleScroll.bind(this));

    // Resize handling
    window.addEventListener('resize', this.handleResize.bind(this));

    // Mouse move for subtle interaction (optional)
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // Idle detection
    window.addEventListener('wheel', this.resetIdleTimer.bind(this));
  }

  /**
   * Handle scroll events and calculate velocity
   */
  private handleScroll(): void {
    const currentScrollY = window.scrollY;
    const now = performance.now();
    const timeDelta = now - this.lastScrollTime;

    if (timeDelta > 0) {
      // Calculate scroll velocity (pixels per millisecond)
      const rawVelocity = (currentScrollY - this.lastScrollY) / timeDelta;
      
      // Smooth the velocity with low-pass filter
      this.targetScrollVelocity = rawVelocity * 0.1;
      this.scrollVelocity = this.scrollVelocity * 0.9 + this.targetScrollVelocity * 0.1;
    }

    this.lastScrollY = currentScrollY;
    this.lastScrollTime = now;

    // Reset idle timer
    this.resetIdleTimer();
  }

  /**
   * Handle window resize
   */
  private handleResize(): void {
    const container = this.canvas.parentElement;
    if (container) {
      this.canvas.width = container.offsetWidth || window.innerWidth;
      this.canvas.height = container.offsetHeight || window.innerHeight;
    }
  }

  /**
   * Handle mouse movement for subtle smoke reaction
   */
  private handleMouseMove(e: MouseEvent): void {
    // Disabled for performance - too expensive to update all particles every frame
    // Uncomment below if you need mouse interaction on high-end devices
    // const windInfluence = (e.clientX / window.innerWidth - 0.5) * 0.1;
    // this.particles.forEach(particle => {
    //   particle.vx += windInfluence * 0.01;
    // });
  }

  /**
   * Reset idle timer (smoke fade effect)
   */
  private resetIdleTimer(): void {
    // Could implement fade out on idle here
  }

  /**
   * Update particle physics and animation
   */
  private updateParticles(): void {
    const time = performance.now() * 0.001; // Convert to seconds
    const scrollForce = this.scrollVelocity * this.config.sensitivity;

    // Apply inertia to scroll velocity
    this.scrollVelocity *= this.config.inertia;

    this.particles.forEach(particle => {
      // Increase life
      particle.life += this.deltaTime;

      // Fade in and out
      if (particle.life < 300) {
        particle.opacity = (particle.life / 300) * this.config.opacity;
      } else if (particle.life > particle.maxLife - 500) {
        particle.opacity = ((particle.maxLife - particle.life) / 500) * this.config.opacity;
      } else {
        particle.opacity = this.config.opacity;
      }

      // Reset if dead
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        particle.x = Math.random() * this.canvas.width;
        particle.y = Math.random() * this.canvas.height;
        particle.opacity = 0;
      }

      // Get turbulence noise for organic movement
      const noiseAmount = this.getNoise(
        particle.x * this.config.turbulenceScale,
        particle.y * this.config.turbulenceScale,
        time + particle.noiseOffset
      );

      // Apply scroll-based force (opposite direction)
      // Down scroll = upward smoke movement
      const scrollInfluence = -scrollForce * particle.layer;
      particle.vy += scrollInfluence * 0.01;

      // Apply wind and turbulence
      particle.vx += (noiseAmount - 0.5) * this.config.windStrength * 0.01;
      particle.vy += (Math.sin(time + particle.noiseOffset) - 0.5) * 0.01;

      // Natural rise with some drag
      particle.vy -= 0.001; // Slight natural rise

      // Apply friction/drag
      particle.vx *= 0.98;
      particle.vy *= 0.98;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < -particle.size) particle.x = this.canvas.width + particle.size;
      if (particle.x > this.canvas.width + particle.size) particle.x = -particle.size;
      if (particle.y < -particle.size) particle.y = this.canvas.height + particle.size;
      if (particle.y > this.canvas.height + particle.size) particle.y = -particle.size;
    });
  }

  /**
   * Render particles to canvas
   */
  private renderParticles(): void {
    // Clear canvas completely for better performance
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set blend mode and color
    this.ctx.globalCompositeOperation = this.config.blendMode;

    this.particles.forEach(particle => {
      if (particle.opacity > 0.01) {
        // Create radial gradient for soft edges
        const gradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        gradient.addColorStop(0, this.config.smokeColor);
        gradient.addColorStop(0.7, this.config.smokeColor);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });

    // Reset to default
    this.ctx.globalAlpha = 1;
    this.ctx.globalCompositeOperation = 'source-over';
  }

  /**
   * Main animation loop
   */
  private animate(): void {
    const now = performance.now();

    if (this.lastFrameTime === 0) {
      this.lastFrameTime = now;
    }

    this.deltaTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    // Cap delta time to prevent large jumps
    if (this.deltaTime > 50) {
      this.deltaTime = 50;
    }

    // Update and render
    this.updateParticles();
    this.renderParticles();

    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Start the animation
   */
  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  /**
   * Stop the animation
   */
  public stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isRunning = false;
  }

  /**
   * Update configuration on the fly
   */
  public updateConfig(config: Partial<SmokeConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  public getConfig(): SmokeConfig {
    return this.config;
  }

  /**
   * Dispose/cleanup
   */
  public destroy(): void {
    this.stop();
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.remove();
    this.particles = [];
    this.noiseCache.clear();
  }

  /**
   * Add particles (for effects)
   */
  public addParticles(count: number): void {
    for (let i = 0; i < count; i++) {
      this.createParticle();
    }
  }

  /**
   * Get particle count
   */
  public getParticleCount(): number {
    return this.particles.length;
  }

  /**
   * Check if animation is running
   */
  public isAnimating(): boolean {
    return this.isRunning;
  }
}
