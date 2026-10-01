'use client';

import React, { useEffect, useRef } from 'react';

interface VolumetricLightCanvasProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  cardRef: React.RefObject<HTMLDivElement | null>;
  constellationRef: React.RefObject<HTMLDivElement | null>;
  activeBrandIndex: number;
  previousBrandIndex: number;
  accentColor?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  maxAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface Geometry {
  width: number;
  height: number;
  dpr: number;
  cardCenter: number;
  cardTop: number;
  cardWidth: number;
  slotCoords: { x: number; y: number }[];
}

function parseHexToRGB(hex: string): { r: number; g: number; b: number } {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((ch) => ch + ch).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return { r: 232, g: 216, b: 160 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export default function VolumetricLightCanvas({
  heroRef,
  cardRef,
  constellationRef,
  activeBrandIndex,
  previousBrandIndex,
  accentColor = '#e8d8a0',
}: VolumetricLightCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cached layout metrics - ZERO getBoundingClientRect calls during animation
  const geometryRef = useRef<Geometry>({
    width: 0,
    height: 0,
    dpr: 1,
    cardCenter: 0,
    cardTop: 0,
    cardWidth: 0,
    slotCoords: [],
  });

  // Animated beam coordinates & color
  const beamRef = useRef({
    currentX: 0,
    currentY: 0,
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
    transitionStartTime: 0,
    transitionDuration: 650,
    isTransitioning: false,
    currentR: 232,
    currentG: 216,
    currentB: 160,
    targetR: 232,
    targetG: 216,
    targetB: 160,
  });

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Fast measurement function called ONLY on mount and resize
  const measureLayout = () => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const heroRect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = heroRect.width;
    const height = heroRect.height;

    // Card dimensions
    let cardCenter = width / 2;
    let cardTop = height * 0.45;
    let cardWidth = Math.min(width * 0.75, 580);

    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      cardCenter = cardRect.left + cardRect.width / 2 - heroRect.left;
      cardTop = cardRect.top - heroRect.top;
      cardWidth = cardRect.width;
    }

    // Constellation slot positions
    let cLeft = 0;
    let cTop = 0;
    let cWidth = width;
    let cHeight = 160;

    if (constellationRef.current) {
      const cRect = constellationRef.current.getBoundingClientRect();
      cLeft = cRect.left - heroRect.left;
      cTop = cRect.top - heroRect.top;
      cWidth = cRect.width;
      cHeight = cRect.height;
    }

    // Percentages matching elevated BeanConstellation.module.css slots
    const SLOTS_PCT = [
      { x: 0.18, y: 0.16 }, // 0: Outer Left
      { x: 0.33, y: 0.44 }, // 1: Inner Left
      { x: 0.50, y: 0.68 }, // 2: Center (Active spotlight apex)
      { x: 0.67, y: 0.44 }, // 3: Inner Right
      { x: 0.82, y: 0.16 }, // 4: Outer Right
    ];

    const slotCoords = SLOTS_PCT.map((p) => ({
      x: cLeft + p.x * cWidth,
      y: cTop + p.y * cHeight,
    }));

    geometryRef.current = {
      width,
      height,
      dpr,
      cardCenter,
      cardTop,
      cardWidth,
      slotCoords,
    };

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
  };

  // Brand index change trigger — sets up smooth mathematical transition in canvas
  useEffect(() => {
    const geom = geometryRef.current;
    if (!geom || geom.slotCoords.length < 5) {
      measureLayout();
    }

    const currentGeom = geometryRef.current;
    const targetPos = currentGeom.slotCoords[2] || {
      x: currentGeom.width / 2,
      y: currentGeom.height * 0.22,
    };

    // Calculate slot the brand came from:
    const fromSlot = ((activeBrandIndex - previousBrandIndex) + 2 + 5) % 5;
    const startPos = fromSlot === 2
      ? targetPos
      : (currentGeom.slotCoords[fromSlot] || targetPos);

    const beam = beamRef.current;
    beam.startX = beam.currentX > 0 ? beam.currentX : startPos.x;
    beam.startY = beam.currentY > 0 ? beam.currentY : startPos.y;
    beam.targetX = targetPos.x;
    beam.targetY = targetPos.y;
    beam.transitionStartTime = performance.now();
    beam.transitionDuration = 650;
    beam.isTransitioning = true;

    const rgb = parseHexToRGB(accentColor || '#e8d8a0');
    beam.targetR = rgb.r;
    beam.targetG = rgb.g;
    beam.targetB = rgb.b;
  }, [activeBrandIndex, previousBrandIndex, accentColor]);

  // Persistent Canvas Rendering Engine - Runs once on mount, NEVER torn down during transitions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    measureLayout();

    // Resize handling using ResizeObserver
    let resizeObserver: ResizeObserver | null = null;
    if (heroRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        measureLayout();
      });
      resizeObserver.observe(heroRef.current);
    }

    const onWindowResize = () => measureLayout();
    window.addEventListener('resize', onWindowResize);

    // Initialize 55 cosmic dust particles for taller volumetric beam
    if (particlesRef.current.length === 0) {
      const pCount = 55;
      const newParticles: Particle[] = [];
      for (let i = 0; i < pCount; i++) {
        newParticles.push({
          x: Math.random(),
          y: Math.random(),
          radius: Math.random() * 1.5 + 0.6,
          speedY: Math.random() * 0.0012 + 0.0005,
          speedX: (Math.random() - 0.5) * 0.0004,
          maxAlpha: Math.random() * 0.5 + 0.35,
          pulseSpeed: Math.random() * 0.025 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = newParticles;
    }

    const startTime = performance.now();

    // ══ MAIN RAF 60/120FPS RENDER LOOP (Zero layout queries, zero state updates) ══
    const render = (now: number) => {
      const geom = geometryRef.current;
      const width = geom.width;
      const height = geom.height;
      const dpr = geom.dpr;

      const ctx = canvas.getContext('2d');
      if (!ctx || width === 0 || height === 0) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // 1. Calculate Beam Origin with Smooth Cubic Easing
      const beam = beamRef.current;
      if (beam.isTransitioning) {
        const elapsed = now - beam.transitionStartTime;
        const t = Math.min(1, elapsed / beam.transitionDuration);
        // Smooth cubic ease-out
        const ease = 1 - Math.pow(1 - t, 3);
        beam.currentX = beam.startX + (beam.targetX - beam.startX) * ease;
        beam.currentY = beam.startY + (beam.targetY - beam.startY) * ease;

        // Smooth color interpolation
        beam.currentR += (beam.targetR - beam.currentR) * 0.08;
        beam.currentG += (beam.targetG - beam.currentG) * 0.08;
        beam.currentB += (beam.targetB - beam.currentB) * 0.08;

        if (t >= 1) {
          beam.isTransitioning = false;
          beam.currentX = beam.targetX;
          beam.currentY = beam.targetY;
        }
      } else if (beam.currentX === 0 && geom.slotCoords[2]) {
        beam.currentX = geom.slotCoords[2].x;
        beam.currentY = geom.slotCoords[2].y;
        beam.targetX = geom.slotCoords[2].x;
        beam.targetY = geom.slotCoords[2].y;
      }

      const cr = Math.round(beam.currentR);
      const cg = Math.round(beam.currentG);
      const cb = Math.round(beam.currentB);

      // Subtle living breath pulse
      const breath = Math.sin((now - startTime) * 0.0016) * 1.5;
      const beanCenterX = beam.currentX;
      const beanCenterY = beam.currentY + breath;

      if (beanCenterX > 0 && geom.cardTop > 0) {
        const targetCenterX = geom.cardCenter || width / 2;
        const targetTopY = geom.cardTop;

        const beamTopY = beanCenterY + 12; // Emerges seamlessly from lower curve of active orb
        const topBeamWidth = 38;
        const bottomBeamWidth = geom.cardWidth || Math.min(width * 0.75, 580);

        const topLeftX = beanCenterX - topBeamWidth / 2;
        const topRightX = beanCenterX + topBeamWidth / 2;
        const bottomLeftX = targetCenterX - bottomBeamWidth / 2;
        const bottomRightX = targetCenterX + bottomBeamWidth / 2;

        // ── 1. Radiant Emitter Glow at Active Orb Base ──
        const sourceGlow = ctx.createRadialGradient(
          beanCenterX, beanCenterY + 16, 0,
          beanCenterX, beanCenterY + 16, 32
        );
        sourceGlow.addColorStop(0, 'rgba(255, 255, 245, 0.88)');
        sourceGlow.addColorStop(0.35, `rgba(${cr}, ${cg}, ${cb}, 0.5)`);
        sourceGlow.addColorStop(0.7, `rgba(${cr}, ${cg}, ${cb}, 0.12)`);
        sourceGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(beanCenterX, beanCenterY + 16, 32, 0, Math.PI * 2);
        ctx.fillStyle = sourceGlow;
        ctx.fill();

        // ── 2. Outer Soft Volumetric Light Cone ──
        const gradOuter = ctx.createLinearGradient(beanCenterX, beamTopY, targetCenterX, targetTopY + 25);
        gradOuter.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.32)`);
        gradOuter.addColorStop(0.3, `rgba(${cr}, ${cg}, ${cb}, 0.16)`);
        gradOuter.addColorStop(0.7, `rgba(${cr}, ${cg}, ${cb}, 0.05)`);
        gradOuter.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.moveTo(topLeftX - 8, beamTopY);
        ctx.lineTo(topRightX + 8, beamTopY);
        ctx.lineTo(bottomRightX + 16, targetTopY + 25);
        ctx.lineTo(bottomLeftX - 16, targetTopY + 25);
        ctx.closePath();
        ctx.fillStyle = gradOuter;
        ctx.fill();

        // ── 3. Core Radiant Solid Light Beam ──
        const gradCore = ctx.createLinearGradient(beanCenterX, beamTopY, targetCenterX, targetTopY + 4);
        gradCore.addColorStop(0, 'rgba(255, 255, 255, 0.82)');
        gradCore.addColorStop(0.18, `rgba(${cr}, ${cg}, ${cb}, 0.42)`);
        gradCore.addColorStop(0.65, `rgba(${cr}, ${cg}, ${cb}, 0.14)`);
        gradCore.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0.02)`);

        ctx.beginPath();
        ctx.moveTo(topLeftX, beamTopY);
        ctx.lineTo(topRightX, beamTopY);
        ctx.lineTo(bottomRightX, targetTopY + 4);
        ctx.lineTo(bottomLeftX, targetTopY + 4);
        ctx.closePath();
        ctx.fillStyle = gradCore;
        ctx.fill();

        // Crisp beam side border strokes
        ctx.strokeStyle = `rgba(255, 255, 255, 0.35)`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // ── 4. Shimmering Light Ray Streaks ──
        const rayCount = 5;
        const timeOffset = (now - startTime) * 0.0014;
        for (let i = 0; i < rayCount; i++) {
          const ratio = i / (rayCount - 1);
          const topX = topLeftX + ratio * topBeamWidth;
          const bottomX = bottomLeftX + ratio * bottomBeamWidth;
          const rayAlpha = Math.sin(timeOffset * 1.6 + i * 1.3) * 0.035 + 0.065;

          const rayGrad = ctx.createLinearGradient(topX, beamTopY, bottomX, targetTopY + 30);
          rayGrad.addColorStop(0, `rgba(255, 255, 255, ${rayAlpha * 2.2})`);
          rayGrad.addColorStop(0.6, `rgba(${cr}, ${cg}, ${cb}, ${rayAlpha})`);
          rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.moveTo(topX - 3, beamTopY);
          ctx.lineTo(topX + 3, beamTopY);
          ctx.lineTo(bottomX + 6, targetTopY + 30);
          ctx.lineTo(bottomX - 6, targetTopY + 30);
          ctx.closePath();
          ctx.fillStyle = rayGrad;
          ctx.fill();
        }

        // ── 5. Illuminated Light Receiver Bar at Card Top ──
        const basePoolY = targetTopY + 8;
        const poolGrad = ctx.createRadialGradient(
          targetCenterX, basePoolY, 10,
          targetCenterX, basePoolY, bottomBeamWidth * 0.5
        );
        poolGrad.addColorStop(0, 'rgba(255, 255, 255, 0.58)');
        poolGrad.addColorStop(0.35, `rgba(${cr}, ${cg}, ${cb}, 0.26)`);
        poolGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.ellipse(targetCenterX, basePoolY, bottomBeamWidth * 0.5, 28, 0, 0, Math.PI * 2);
        ctx.fillStyle = poolGrad;
        ctx.fill();

        // ── 6. High-Performance Dust Particles (Zero shadowBlur) ──
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y += p.speedY;
          p.x += p.speedX;
          p.pulsePhase += p.pulseSpeed;

          if (p.y > 1) {
            p.y = 0;
            p.x = Math.random();
          }
          if (p.x < 0 || p.x > 1) {
            p.x = Math.random();
          }

          const currentY = beamTopY + p.y * (targetTopY + 15 - beamTopY);
          const t = p.y;
          const minXAtY = topLeftX + (bottomLeftX - topLeftX) * t;
          const maxXAtY = topRightX + (bottomRightX - topRightX) * t;
          const currentX = minXAtY + p.x * (maxXAtY - minXAtY);

          const alpha = Math.max(
            0,
            (Math.sin(p.pulsePhase) * 0.35 + 0.65) * p.maxAlpha * (1 - Math.pow(p.y - 0.5, 2) * 3)
          );

          // Fast 2-tier draw: soft outer halo + crisp inner center
          ctx.beginPath();
          ctx.arc(currentX, currentY, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.3})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(currentX, currentY, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.fill();
        }
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', onWindowResize);
    };
  }, []); // Run ONCE on mount! NEVER tear down on index change!

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 4,
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  );
}
