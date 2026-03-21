import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products, getProductsByCategory } from "../data/products";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Premium Liquid Chrome Loading Animation
const LiquidChromeLoading = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [showLogo, setShowLogo] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  
  const categories = ["HEADGEAR", "LIGHTERS", "BELTS", "POCKET WATCHES"];
  const [displayText, setDisplayText] = useState("");
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.2;
        
        const categoryIndex = Math.floor((newProgress / 100) * categories.length);
        if (categoryIndex !== currentCategory && categoryIndex < categories.length) {
          setCurrentCategory(categoryIndex);
          setDisplayText(categories[categoryIndex]);
          setTextVisible(true);
          
          setTimeout(() => {
            setTextVisible(false);
          }, 1500);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setShowLogo(true);
          setTimeout(() => {
            onComplete();
          }, 2000);
          return 100;
        }
        return newProgress;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentCategory, categories.length, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drips: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }> = [];

    const dripCount = categories.length;
    const dripPositions = [0.2, 0.4, 0.6, 0.8];
    
    for (let i = 0; i < dripCount; i++) {
      drips.push({
        x: dripPositions[i] * canvas.width,
        y: -50,
        width: 40 + Math.random() * 20,
        height: 80 + Math.random() * 40,
      });
    }

    let time = 0;
    let animationId: number;

    const drawLiquidDrip = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      dripProgress: number
    ) => {
      if (dripProgress <= 0 || !isFinite(x) || !isFinite(y)) return;
      
      const currentY = y + (height * dripProgress);
      const currentOpacity = Math.min(dripProgress * 1.5, 0.8);
      
      const startX = x - width/2;
      const endX = x + width/2;
      const startY = currentY - height/2;
      const endY = currentY + height/2;
      
      if (!isFinite(startX) || !isFinite(startY) || !isFinite(endX) || !isFinite(endY)) return;
      
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      gradient.addColorStop(0, `rgba(80, 80, 85, ${currentOpacity})`);
      gradient.addColorStop(0.3, `rgba(140, 140, 145, ${currentOpacity})`);
      gradient.addColorStop(0.6, `rgba(200, 200, 205, ${currentOpacity})`);
      gradient.addColorStop(1, `rgba(100, 100, 105, ${currentOpacity})`);
      
      ctx.fillStyle = gradient;
      
      ctx.beginPath();
      ctx.moveTo(x, currentY - height/2);
      ctx.quadraticCurveTo(x + width/3, currentY, x, currentY + height/2);
      ctx.quadraticCurveTo(x - width/3, currentY, x, currentY - height/2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(x - width/6, currentY - height/4);
      ctx.quadraticCurveTo(x, currentY - height/8, x + width/6, currentY - height/4);
      ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.6})`;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;
      
      const grainImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < grainImageData.data.length; i += 4) {
        const grain = Math.random() * 15;
        grainImageData.data[i] += grain;
        grainImageData.data[i+1] += grain;
        grainImageData.data[i+2] += grain;
      }
      ctx.putImageData(grainImageData, 0, 0);
      
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#050505');
      bgGradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const rippleX = mouseRef.current.x * canvas.width;
      const rippleY = mouseRef.current.y * canvas.height;
      if (isFinite(rippleX) && isFinite(rippleY)) {
        const rippleGradient = ctx.createRadialGradient(rippleX, rippleY, 0, rippleX, rippleY, 100);
        rippleGradient.addColorStop(0, 'rgba(150, 150, 160, 0.1)');
        rippleGradient.addColorStop(1, 'rgba(100, 100, 110, 0)');
        ctx.fillStyle = rippleGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      drips.forEach((drip, index) => {
        const dripProgress = Math.min(Math.max((progress - (index * 20)) / 80, 0), 1);
        drawLiquidDrip(ctx, drip.x, drip.y, drip.width, drip.height, dripProgress);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [progress, categories.length]);

  const getCategoryPosition = (index: number) => {
    const positions = [0.2, 0.4, 0.6, 0.8];
    return positions[index] * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 1 }} />
      
      <AnimatePresence>
        {textVisible && displayText && currentCategory >= 0 && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute z-30 text-center"
            style={{
              left: `${getCategoryPosition(currentCategory)}%`,
              top: '55%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-wider text-white/90"
                style={{
                  textShadow: '0 0 30px rgba(150,150,150,0.3)',
                  letterSpacing: '0.2em',
                }}>
              {displayText}
            </h2>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 z-30">
        <div className="relative h-[3px] bg-white/5 rounded-full overflow-hidden backdrop-blur-sm"
             style={{ boxShadow: '0 0 10px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full relative rounded-full"
            style={{
              background: 'linear-gradient(90deg, #6b6b6b, #9a9a9a, #c4c4c4, #9a9a9a, #6b6b6b)',
              backgroundSize: '200% 100%',
              width: `${progress}%`,
            }}
            animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <svg className="absolute -top-2 left-0 w-full h-4" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <motion.path
                d={`M0,4 Q10,0 20,4 T40,4 T60,4 T80,4 T100,4`}
                stroke="url(#waveGradient)"
                strokeWidth="1.5"
                fill="none"
                animate={{
                  d: [
                    `M0,4 Q10,0 20,4 T40,4 T60,4 T80,4 T100,4`,
                    `M0,4 Q10,8 20,4 T40,0 T60,4 T80,8 T100,4`,
                    `M0,4 Q10,0 20,4 T40,4 T60,4 T80,4 T100,4`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12" />
          </motion.div>
        </div>
        
        <motion.p
          className="text-white/40 text-xs text-center mt-3 font-mono tracking-wider"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.floor(progress)}%
        </motion.p>
      </div>
      
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute z-40 text-center"
          >
            <h1 className="text-7xl md:text-8xl font-light tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #9a9a9a 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(255,255,255,0.3)',
                  letterSpacing: '0.1em',
                }}>
              DRIP TOWN
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[1px] w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Premium Atmospheric Smoke Effect with Enhanced Visibility
const AtmosphericSmokeEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const targetVelocityRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  useEffect(() => {
    // Track mouse movement for subtle interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    glRef.current = gl;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Enhanced fragment shader with much more visible smoke
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_scrollVelocity;
      uniform float u_scrollProgress;
      uniform vec2 u_mouse;
      
      // Simplex noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1. + 3.0 * C.xxx;
        i = mod289(i);
        vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      float fbm(vec3 p, int octaves, float persistence, float lacunarity) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for(int i = 0; i < 6; i++) {
          if(i >= octaves) break;
          value += amplitude * snoise(p * frequency);
          amplitude *= persistence;
          frequency *= lacunarity;
        }
        return value * 0.5 + 0.5;
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        
        // Enhanced scroll influence for more visible movement
        float scrollStrength = clamp(abs(u_scrollVelocity) * 1.5, 0.0, 1.0);
        float flowDirection = u_scrollVelocity > 0.0 ? 1.0 : (u_scrollVelocity < 0.0 ? -1.0 : 0.0);
        
        // Stronger scroll influence on smoke flow
        float scrollFlow = u_scrollVelocity * 2.5;
        float flowSpeed = 0.2 + scrollStrength * 0.4;
        
        // Mouse influence for subtle interaction
        vec2 mouseInfluence = (u_mouse - 0.5) * 0.5;
        
        // LAYER 1: Background mist (slow, subtle) - INCREASED INTENSITY
        vec3 pos1 = vec3(
          st.x * 0.6 + mouseInfluence.x * 0.4 + u_time * 0.05,
          st.y * 0.5 + scrollFlow * 0.4 + mouseInfluence.y * 0.3,
          u_time * 0.03
        );
        float smoke1 = fbm(pos1, 4, 0.55, 2.0) * 0.9;
        
        // LAYER 2: Mid-level smoke (medium speed, scroll responsive) - INCREASED
        vec3 pos2 = vec3(
          st.x * 1.2 - u_time * 0.08 + scrollFlow * 0.8 + mouseInfluence.x * 0.5,
          st.y * 1.0 + u_time * 0.06 + scrollFlow * 0.6 + mouseInfluence.y * 0.4,
          u_time * 0.06 + scrollStrength * 0.8
        );
        float smoke2 = fbm(pos2, 4, 0.6, 2.2) * 1.0;
        
        // LAYER 3: Foreground wispy smoke (fast, scroll-reactive) - HEAVY
        vec3 pos3 = vec3(
          st.x * 2.0 + u_time * 0.12 * flowSpeed + scrollFlow * 1.2 * flowDirection,
          st.y * 1.6 + u_time * 0.1 * flowSpeed + scrollFlow * 0.9,
          u_time * 0.09 + scrollStrength * 1.2
        );
        float smoke3 = fbm(pos3, 4, 0.65, 2.4) * 1.1;
        
        // LAYER 4: Turbulence layer (adds organic movement) - ENHANCED
        vec3 pos4 = vec3(
          st.x * 3.0 + u_time * 0.18 * (0.5 + scrollStrength),
          st.y * 2.5 + u_time * 0.15 * (0.5 + scrollStrength),
          u_time * 0.1 + scrollStrength * 2.0
        );
        float smoke4 = fbm(pos4, 3, 0.7, 2.6) * 0.8;
        
        // LAYER 5: Additional drifting smoke - NEW LAYER FOR MORE VOLUME
        vec3 pos5 = vec3(
          st.x * 1.5 + u_time * 0.07 + scrollFlow * 0.5,
          st.y * 2.0 + u_time * 0.08 - scrollFlow * 0.3,
          u_time * 0.05 + scrollStrength * 0.5
        );
        float smoke5 = fbm(pos5, 3, 0.5, 2.0) * 0.7;
        
        // Combine all layers with increased weights for better visibility
        float smoke = (smoke1 * 0.28 + smoke2 * 0.27 + smoke3 * 0.25 + smoke4 * 0.12 + smoke5 * 0.08);
        
        // Boost overall smoke intensity
        smoke = smoke * 1.4;
        
        // Add strong turbulence during scroll for realism
        if(scrollStrength > 0.1) {
          float turbulence = sin(st.x * 12.0 + u_time * 6.0 * scrollStrength) * 
                            cos(st.y * 10.0 - u_time * 5.0 * scrollStrength) * 
                            scrollStrength * 0.35;
          smoke += turbulence;
          
          // Additional swirling effect
          float swirl = sin(st.x * 8.0 - st.y * 8.0 + u_time * 10.0 * scrollStrength) * 0.25;
          smoke += swirl * scrollStrength;
        }
        
        // Create volumetric depth
        float depth = 1.0 - st.y * 0.4;
        float vignette = 1.0 - length(st - 0.5) * 0.3;
        
        // Enhanced dynamic opacity - MUCH HIGHER for better visibility
        float baseOpacity = 0.28; // Increased base opacity
        float scrollOpacity = scrollStrength * 0.35; // Stronger scroll effect
        float topFade = smoothstep(0.0, 0.2, st.y);
        float bottomFade = smoothstep(0.65, 1.0, 1.0 - st.y);
        
        // Add extra opacity at the top for more visible flow
        float topBoost = (1.0 - st.y) * 0.2;
        
        float opacity = (baseOpacity + scrollOpacity + smoke * 0.35 + topBoost) * depth * vignette * topFade * bottomFade;
        opacity = clamp(opacity, 0.12, 0.65); // Higher max opacity
        
        // Scroll edge glow effect - more visible
        float edgeGlow = 0.0;
        if(u_scrollVelocity > 0.2 && st.y < 0.3) {
          edgeGlow = (1.0 - st.y / 0.3) * scrollStrength * 0.4;
        } else if(u_scrollVelocity < -0.2 && st.y > 0.7) {
          edgeGlow = ((st.y - 0.7) / 0.3) * scrollStrength * 0.4;
        }
        
        // Premium smoke color with more contrast
        vec3 smokeColor = vec3(0.96, 0.94, 0.92);
        
        // Add slight variation based on smoke density
        vec3 finalColor = smokeColor * (0.75 + smoke * 0.45);
        
        // Add stronger glow in center during scroll
        if(scrollStrength > 0.15) {
          float glow = (1.0 - length(st - 0.5) * 1.2) * scrollStrength * 0.25;
          finalColor += vec3(0.15, 0.14, 0.12) * glow;
        }
        
        // Add subtle blue-white tint for premium look
        finalColor += vec3(0.05, 0.05, 0.08) * (1.0 - st.y) * 0.3;
        
        // Final alpha with stronger presence
        float finalAlpha = (smoke * 0.9 + 0.2) * opacity + edgeGlow;
        finalAlpha = clamp(finalAlpha, 0.12, 0.7);
        
        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `;

    // Compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) return;
    
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    
    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    programRef.current = program;
    gl.useProgram(program);
    
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const scrollVelocityLocation = gl.getUniformLocation(program, "u_scrollVelocity");
    const scrollProgressLocation = gl.getUniformLocation(program, "u_scrollProgress");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    
    // Track scroll velocity with smooth easing
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;
      
      // Calculate target velocity with higher sensitivity
      targetVelocityRef.current = Math.min(Math.max(deltaY * 0.35, -2.0), 2.0);
      lastScrollYRef.current = currentScrollY;
      
      // Smooth velocity decay
      setTimeout(() => {
        if (Math.abs(targetVelocityRef.current) > 0.02) {
          targetVelocityRef.current *= 0.94;
        } else {
          targetVelocityRef.current = 0;
        }
      }, 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Animation loop with smooth interpolation
    const render = () => {
      if (!gl || !program) return;
      
      // Smooth velocity interpolation
      scrollVelocityRef.current += (targetVelocityRef.current - scrollVelocityRef.current) * 0.15;
      
      timeRef.current += 0.016;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, timeRef.current);
      gl.uniform1f(scrollVelocityLocation, scrollVelocityRef.current);
      gl.uniform1f(scrollProgressLocation, scrollProgress);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
      
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (programRef.current) gl.deleteProgram(programRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ 
        opacity: 1,
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loading on first app load, not on navigation
    return !sessionStorage.getItem("appLoaded");
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mark that app has been loaded
    if (!sessionStorage.getItem("appLoaded")) {
      sessionStorage.setItem("appLoaded", "true");
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    let rafId: number;
    let lastX = 0;
    let lastY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        
        if (Math.abs(x - lastX) > 0.1 || Math.abs(y - lastY) > 0.1) {
          lastX = x;
          lastY = y;
          heroRef.current!.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const featuredProducts = products.slice(0, 8);
  const headgear = getProductsByCategory("headgear");
  const smokn = getProductsByCategory("smokn");
  const socks = getProductsByCategory("socks");

  return (
    <>
      <AnimatePresence>
        {isLoading && <LiquidChromeLoading onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <AtmosphericSmokeEffect />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-start justify-center pt-12 overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{ filter: 'brightness(0.5) contrast(0.9)' }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 pointer-events-none z-15"
            style={{
              background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 60%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 65%)",
              filter: "blur(70px)",
            }}
          />
          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[clamp(3rem,12vw,8rem)] mb-6 relative z-40 font-light tracking-wider bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent roger-dropline">
                DRIPTOWN
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto font-light tracking-wide"
                >
                  Streetwear Accessories That Define Your Drip
                </motion.p>
                <div
                  ref={heroRef}
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12 transition-transform duration-200 ease-out"
                  style={{ willChange: "transform" }}
                >
                  {[
                    products.find((p) => p.category === "headgear"),
                    products.find((p) => p.category === "smokn"),
                    products.find((p) => p.category === "socks"),
                    products.find((p) => p.category === "accessories"),
                    products.find((p) => p.category === "riding"),
                    products.find((p) => p.category === "belts"),
                  ]
                    .filter(Boolean)
                    .map((product, i) => (
                      <motion.div
                        key={product!.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: [0, -8, 0],
                        }}
                        transition={{
                          delay: i * 0.08,
                          duration: 0.6,
                          ease: "easeOut",
                          y: {
                            delay: i * 0.08 + 0.6,
                            duration: 3 + i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        whileHover={{ scale: 1.1, y: -15 }}
                        className="aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-colors duration-300 cursor-pointer backdrop-blur-sm bg-black/20"
                      >
                        <ImageWithFallback
                          src={product!.category === "socks" ? "https://res.cloudinary.com/dyikeuznx/image/upload/v1774041187/cloudinary/socks/muatp4nhaywpgiupev9r.png" : product!.image}
                          alt={product!.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-light text-lg flex items-center gap-2 hover:bg-white/20 transition-all tracking-wide"
                  >
                    Shop Collection
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white/80 font-light text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    Explore Drip
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          >
            <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white/40 rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Featured Products */}
        <motion.section id="products" className="py-24 px-4 sm:px-6 lg:px-8 relative z-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-wide">
                Featured Collection
              </h2>
              <p className="text-white/40 text-lg font-light">Discover our most popular streetwear pieces</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/5 relative z-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Premium Caps</h2>
              <p className="text-white/40 text-lg font-light">Crown your style with luxury headgear</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {headgear.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="py-24 px-4 sm:px-6 lg:px-8 relative z-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Premium Smokn</h2>
              <p className="text-white/40 text-lg font-light">Luxury lighters and smokn accessories</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {smokn.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/5 relative z-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Essential Socks</h2>
              <p className="text-white/40 text-lg font-light">Comfort meets style, one step at a time</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {socks.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        <Footer />
      </div>
    </>
  );
}