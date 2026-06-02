"use client";

import React, { useEffect, useRef } from "react";

const TARGET_FPS = 90;
const TARGET_FRAME_MS = 1000 / TARGET_FPS;

interface Petal {
  x: number;
  y: number;
  z: number; // depth/parallax scaling: 0.3 (far) to 1.3 (near)
  size: number;
  styleIndex: number;
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayAmplitude: number;
  swayPhase: number;
  
  // Rotation states
  rotation2D: number;
  rotation2DSpeed: number;
  flipX: number;
  flipXSpeed: number;
  flipY: number;
  flipYSpeed: number;
  
  opacity: number;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const offscreenCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, currentX: 0 });

  // Pre-render rose petals onto offscreen canvas buffers for maximum performance
  const initOffscreenCanvases = () => {
    if (offscreenCanvasesRef.current.length > 0) return;

    const stylesCount = 4;
    const size = 64; // Base texture size (half-width/height)
    const canvases: HTMLCanvasElement[] = [];

    for (let i = 0; i < stylesCount; i++) {
      const canvas = document.createElement("canvas");
      canvas.width = size * 2;
      canvas.height = size * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      // Translate to center so drawing coordinates are centered
      ctx.translate(size, size);

      // Pre-render soft drop shadow onto the offscreen canvas
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;

      if (i === 0) {
        // Style 0: Classic Plump Teardrop/Heart Petal
        // Draw Left Half
        const leftGrad = ctx.createLinearGradient(-size * 0.5, -size * 0.5, 0, size * 0.5);
        leftGrad.addColorStop(0, "#cf353b"); // Romantic vibrant rose red
        leftGrad.addColorStop(0.5, "#9e1b21");
        leftGrad.addColorStop(1, "#580c10"); // Deep velvet shadow
        
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.bezierCurveTo(-size * 0.75, -size * 0.75, -size * 0.8, size * 0.35, 0, size * 0.6);
        ctx.closePath();
        ctx.fillStyle = leftGrad;
        ctx.fill();

        // Draw Right Half
        const rightGrad = ctx.createLinearGradient(0, -size * 0.5, size * 0.5, size * 0.5);
        rightGrad.addColorStop(0, "#9e1b21");
        rightGrad.addColorStop(0.5, "#580c10");
        rightGrad.addColorStop(1, "#260204"); // Velvet black shadow
        
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.bezierCurveTo(size * 0.75, -size * 0.75, size * 0.8, size * 0.35, 0, size * 0.6);
        ctx.closePath();
        ctx.fillStyle = rightGrad;
        ctx.fill();

        // Delicate gold highlight edge to resemble premium boutique floral aesthetic
        ctx.shadowColor = "transparent"; // Disable shadow for edge stroke
        ctx.strokeStyle = "rgba(251, 230, 149, 0.15)";
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.bezierCurveTo(-size * 0.75, -size * 0.75, -size * 0.8, size * 0.35, 0, size * 0.6);
        ctx.stroke();

      } else if (i === 1) {
        // Style 1: Curled edge / overlapping fold petal
        // Main darker base
        const baseGrad = ctx.createLinearGradient(-size * 0.5, -size * 0.5, size * 0.5, size * 0.5);
        baseGrad.addColorStop(0, "#7a0c11");
        baseGrad.addColorStop(1, "#2d0406");

        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.bezierCurveTo(-size * 0.6, -size * 0.7, -size * 0.65, size * 0.4, 0, size * 0.6);
        ctx.bezierCurveTo(size * 0.6, size * 0.4, size * 0.6, -size * 0.7, 0, -size * 0.6);
        ctx.closePath();
        ctx.fillStyle = baseGrad;
        ctx.fill();

        // Overlapping delicate fold on right side
        ctx.shadowColor = "transparent";
        const foldGrad = ctx.createLinearGradient(0, -size * 0.5, size * 0.5, size * 0.5);
        foldGrad.addColorStop(0, "#e8454b"); // Rich light reflection
        foldGrad.addColorStop(1, "#8a0c10");

        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.bezierCurveTo(size * 0.45, -size * 0.6, size * 0.5, size * 0.3, 0, size * 0.6);
        ctx.bezierCurveTo(size * 0.25, size * 0.3, size * 0.15, -size * 0.1, 0, -size * 0.6);
        ctx.closePath();
        ctx.fillStyle = foldGrad;
        ctx.fill();

      } else if (i === 2) {
        // Style 2: Sleek Narrow Petal (falling edge-on)
        const leftGrad = ctx.createLinearGradient(-size * 0.3, -size * 0.6, 0, size * 0.6);
        leftGrad.addColorStop(0, "#d32f2f");
        leftGrad.addColorStop(1, "#4e070a");

        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.bezierCurveTo(-size * 0.45, -size * 0.65, -size * 0.35, size * 0.45, 0, size * 0.6);
        ctx.closePath();
        ctx.fillStyle = leftGrad;
        ctx.fill();

        const rightGrad = ctx.createLinearGradient(0, -size * 0.6, size * 0.3, size * 0.6);
        rightGrad.addColorStop(0, "#ab1b20");
        rightGrad.addColorStop(1, "#1c0002");

        ctx.beginPath();
        ctx.moveTo(0, -size * 0.6);
        ctx.bezierCurveTo(size * 0.45, -size * 0.65, size * 0.35, size * 0.45, 0, size * 0.6);
        ctx.closePath();
        ctx.fillStyle = rightGrad;
        ctx.fill();

      } else {
        // Style 3: Round Delicate Bud Petal
        const grad = ctx.createRadialGradient(-size * 0.1, -size * 0.1, 2, 0, 0, size * 0.6);
        grad.addColorStop(0, "#ff5c62"); // Radiant pinkish-red highlight
        grad.addColorStop(0.3, "#cf2d33");
        grad.addColorStop(0.8, "#5c080d");
        grad.addColorStop(1, "#1f0103");

        ctx.beginPath();
        ctx.arc(0, 0, size * 0.52, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Delicate central crease line
        ctx.shadowColor = "transparent";
        ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.52);
        ctx.lineTo(0, size * 0.52);
        ctx.stroke();
      }

      canvases.push(canvas);
    }

    offscreenCanvasesRef.current = canvases;
  };

  // Helper to create a single randomized petal
  const createPetal = (width: number, height: number, startAtTop = false): Petal => {
    const z = 0.35 + Math.random() * 0.95; // Depth factor
    const size = (8 + Math.random() * 12) * (z * 0.8 + 0.2); // Base size scaled by depth
    const styleIndex = Math.floor(Math.random() * 4);

    return {
      x: Math.random() * width,
      y: startAtTop ? -50 - Math.random() * 100 : Math.random() * (height + 100) - 50,
      z,
      size,
      styleIndex,
      speedY: (0.8 + Math.random() * 0.75) * (z * 0.75 + 0.25), // Deeper objects fall slower
      speedX: (Math.random() - 0.5) * 0.3,
      swaySpeed: 0.01 + Math.random() * 0.015,
      swayAmplitude: 0.8 + Math.random() * 1.4,
      swayPhase: Math.random() * Math.PI * 2,
      
      rotation2D: Math.random() * Math.PI * 2,
      rotation2DSpeed: (Math.random() - 0.5) * 0.015,
      flipX: Math.random() * Math.PI * 2,
      flipXSpeed: 0.01 + Math.random() * 0.02,
      flipY: Math.random() * Math.PI * 2,
      flipYSpeed: 0.008 + Math.random() * 0.015,
      
      opacity: 0, // Starts fully faded for seamless spawning
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Initialize offscreen buffer canvases
    initOffscreenCanvases();

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = 1;
    let lastFrameTime = performance.now();

    const getRenderDpr = () => {
      const rawDpr = window.devicePixelRatio || 1;
      const mobileViewport = window.matchMedia("(max-width: 768px)").matches;
      return Math.min(rawDpr, mobileViewport ? 1 : 1.25);
    };

    // Adjust canvas resolution for high-DPI screens
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = getRenderDpr();

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Adjust particle count dynamically based on the viewport area (Density Control)
      const area = width * height;
      const targetCount = Math.min(Math.max(Math.floor(area / 32000), 14), 48);

      // Re-initialize or adjust petals array to maintain density without resets
      const currentCount = petalsRef.current.length;
      if (currentCount < targetCount) {
        for (let i = currentCount; i < targetCount; i++) {
          petalsRef.current.push(createPetal(width, height, true));
        }
      } else if (currentCount > targetCount) {
        petalsRef.current.splice(targetCount);
      }
    };

    // Initialize screen resize
    handleResize();

    // Spawn initial layout of petals across the screen (not just at the top) to prevent reset gaps on load
    const area = width * height;
    const initialCount = Math.min(Math.max(Math.floor(area / 32000), 14), 48);
    petalsRef.current = Array.from({ length: initialCount }, () => createPetal(width, height, false));

    // Handle mouse movement to influence sway
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 60; // Sway push up to 30px left/right
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = (e.touches[0].clientX / width - 0.5) * 60;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Core Animation Frame Loop
    const animate = (time: number) => {
      const frameScale = Math.min((time - lastFrameTime) / TARGET_FRAME_MS, 2);
      lastFrameTime = time;

      // Clear with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save context state, scale by DPI ratio
      ctx.save();
      ctx.scale(dpr, dpr);

      // Smoothly interpolate mouse movement influence
      const mouseEase = 1 - Math.pow(0.95, frameScale);
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * mouseEase;

      const petals = petalsRef.current;
      const offscreenCanvases = offscreenCanvasesRef.current;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // 1. Update Physics
        p.y += p.speedY * frameScale;
        
        // Sway calculation (combination of natural sin-wave breeze & mouse drag)
        p.swayPhase += p.swaySpeed * frameScale;
        const sway = Math.sin(p.swayPhase) * p.swayAmplitude;
        p.x += (p.speedX + (sway + mouseRef.current.currentX * 0.08) * (p.z * 0.7 + 0.3)) * frameScale;

        // Rotation angles
        p.rotation2D += p.rotation2DSpeed * frameScale;
        p.flipX += p.flipXSpeed * frameScale;
        p.flipY += p.flipYSpeed * frameScale;

        // Smoothly fade in when newly spawned
        if (p.opacity < 1) {
          p.opacity += 0.02 * frameScale;
          if (p.opacity > 1) p.opacity = 1;
        }

        // 2. Wrap-around Recycle check (Clean recycle logic)
        // If petal falls past the bottom or drifts too far off sides
        if (p.y > height + 25 || p.x < -40 || p.x > width + 40) {
          petals[i] = createPetal(width, height, true);
          continue;
        }

        // 3. Render Petal using Offscreen Canvas Texture Blitting
        const texture = offscreenCanvases[p.styleIndex];
        if (!texture) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        
        // Apply 2D rotation
        ctx.rotate(p.rotation2D);

        // Simulate 3D rotation / tumbling by scaling local axes via Cosine and Sine
        const scaleX = Math.cos(p.flipX);
        const scaleY = Math.sin(p.flipY) * 0.25 + 0.75; // Clamp Y stretch so it doesn't thin out completely
        ctx.scale(scaleX, scaleY);

        // Apply opacity (deeper background layers are naturally dimmer/softer)
        ctx.globalAlpha = p.opacity * (p.z * 0.5 + 0.5);

        ctx.filter = "none";

        // Draw pre-rendered texture centered
        const renderSize = p.size;
        ctx.drawImage(texture, -renderSize, -renderSize, renderSize * 2, renderSize * 2);

        ctx.restore();
      }

      ctx.restore();
      requestRef.current = requestAnimationFrame(animate);
    };

    // Start loop
    requestRef.current = requestAnimationFrame(animate);

    // Clean up all events and timers
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none w-full h-full select-none"
      style={{
        zIndex: 25,
        backgroundColor: "transparent",
      }}
    />
  );
}
