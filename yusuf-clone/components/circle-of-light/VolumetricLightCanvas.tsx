'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface VolumetricLightCanvasProps {
  origin: Point | null; // Dynamic active bean center location (x, y)
  targetArea: { x: number; y: number; width: number; height: number } | null;
  isActive: boolean;
  accentColor?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function VolumetricLightCanvas({
  origin,
  targetArea,
  isActive,
  accentColor = '#e8d8a0'
}: VolumetricLightCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth origin Lerp interpolation for 800ms cinematic beam movement
  const currentOriginRef = useRef<Point>({ x: 0, y: 0 });
  const targetOriginRef = useRef<Point>({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (origin) {
      if (currentOriginRef.current.x === 0 && currentOriginRef.current.y === 0) {
        currentOriginRef.current = { ...origin };
      }
      targetOriginRef.current = { ...origin };
    }
  }, [origin]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize light scattering dust particles
    if (particlesRef.current.length === 0) {
      const pCount = 50;
      const newParticles: Particle[] = [];
      for (let i = 0; i < pCount; i++) {
        newParticles.push({
          x: Math.random(),
          y: Math.random(),
          radius: Math.random() * 1.8 + 0.5,
          speedY: Math.random() * 0.0016 + 0.0006,
          speedX: (Math.random() - 0.5) * 0.0006,
          alpha: Math.random() * 0.7 + 0.2,
          maxAlpha: Math.random() * 0.6 + 0.4,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      particlesRef.current = newParticles;
    }

    let startTime = performance.now();

    const render = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Smooth Lerp factor = 0.08 for smooth beam transition
      const lerpFactor = 0.08;
      currentOriginRef.current.x += (targetOriginRef.current.x - currentOriginRef.current.x) * lerpFactor;
      currentOriginRef.current.y += (targetOriginRef.current.y - currentOriginRef.current.y) * lerpFactor;

      const beanCenterX = currentOriginRef.current.x;
      const beanCenterY = currentOriginRef.current.y;

      if (isActive && beanCenterX > 0 && targetArea) {
        const targetCenterX = targetArea.x + targetArea.width / 2;
        const targetTopY = targetArea.y;

        // Refined orb radius (34px)
        const orbRadius = 34;
        const beamTopY = beanCenterY + orbRadius * 0.75;
        const topBeamWidth = 48; // Sleek beam top width
        const bottomBeamWidth = targetArea.width || Math.min(width * 0.72, 650); // Matches top width of card

        const topLeftX = beanCenterX - topBeamWidth / 2;
        const topRightX = beanCenterX + topBeamWidth / 2;
        const bottomLeftX = targetCenterX - bottomBeamWidth / 2;
        const bottomRightX = targetCenterX + bottomBeamWidth / 2;

        // 1. Outer Soft Ambient Light Bloom
        const gradOuter = ctx.createLinearGradient(beanCenterX, beamTopY, targetCenterX, targetTopY + 60);
        gradOuter.addColorStop(0, 'rgba(240, 252, 245, 0.38)');
        gradOuter.addColorStop(0.3, 'rgba(215, 240, 225, 0.2)');
        gradOuter.addColorStop(0.7, 'rgba(185, 220, 200, 0.07)');
        gradOuter.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(topLeftX - 8, beamTopY);
        ctx.lineTo(topRightX + 8, beamTopY);
        ctx.lineTo(bottomRightX + 18, targetTopY + 60);
        ctx.lineTo(bottomLeftX - 18, targetTopY + 60);
        ctx.closePath();
        ctx.fillStyle = gradOuter;
        ctx.fill();
        ctx.restore();

        // 2. Core Solid Volumetric Light Pillar
        const gradCore = ctx.createLinearGradient(beanCenterX, beamTopY, targetCenterX, targetTopY + 20);
        gradCore.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
        gradCore.addColorStop(0.2, 'rgba(235, 248, 240, 0.45)');
        gradCore.addColorStop(0.6, 'rgba(205, 235, 220, 0.2)');
        gradCore.addColorStop(1, 'rgba(175, 215, 195, 0.02)');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(topLeftX, beamTopY);
        ctx.lineTo(topRightX, beamTopY);
        ctx.lineTo(bottomRightX, targetTopY + 20);
        ctx.lineTo(bottomLeftX, targetTopY + 20);
        ctx.closePath();
        ctx.fillStyle = gradCore;
        ctx.fill();

        // Crisp beam side border stroke
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();

        // 3. Fine Vertical Light Ray Streaks
        const rayCount = 5;
        const timeOffset = (now - startTime) * 0.001;
        ctx.save();
        for (let i = 0; i < rayCount; i++) {
          const ratio = i / (rayCount - 1);
          const topX = topLeftX + ratio * topBeamWidth;
          const bottomX = bottomLeftX + ratio * bottomBeamWidth;
          const rayAlpha = Math.sin(timeOffset * 1.5 + i * 1.2) * 0.04 + 0.07;

          const rayGrad = ctx.createLinearGradient(topX, beamTopY, bottomX, targetTopY + 40);
          rayGrad.addColorStop(0, `rgba(255, 255, 255, ${rayAlpha * 2.2})`);
          rayGrad.addColorStop(0.6, `rgba(220, 245, 230, ${rayAlpha})`);
          rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.moveTo(topX - 4, beamTopY);
          ctx.lineTo(topX + 4, beamTopY);
          ctx.lineTo(bottomX + 7, targetTopY + 40);
          ctx.lineTo(bottomX - 7, targetTopY + 40);
          ctx.closePath();
          ctx.fillStyle = rayGrad;
          ctx.fill();
        }
        ctx.restore();

        // 4. Illumination Base Bar at Card Header
        const basePoolY = targetTopY + 10;
        const poolGrad = ctx.createRadialGradient(
          targetCenterX, basePoolY, 10,
          targetCenterX, basePoolY, bottomBeamWidth * 0.5
        );
        poolGrad.addColorStop(0, 'rgba(255, 255, 255, 0.52)');
        poolGrad.addColorStop(0.4, 'rgba(215, 242, 228, 0.22)');
        poolGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(targetCenterX, basePoolY, bottomBeamWidth * 0.5, 32, 0, 0, Math.PI * 2);
        ctx.fillStyle = poolGrad;
        ctx.fill();
        ctx.restore();

        // 5. Floating Particle Dust Motes
        ctx.save();
        particlesRef.current.forEach((p) => {
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

          const currentY = beamTopY + p.y * (targetTopY + 20 - beamTopY);
          const t = p.y;
          const minXAtY = topLeftX + (bottomLeftX - topLeftX) * t;
          const maxXAtY = topRightX + (bottomRightX - topRightX) * t;
          const currentX = minXAtY + p.x * (maxXAtY - minXAtY);

          const currentAlpha = Math.max(
            0,
            (Math.sin(p.pulsePhase) * 0.3 + 0.7) * p.maxAlpha * (1 - Math.pow(p.y - 0.5, 2) * 3)
          );

          ctx.beginPath();
          ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250, 255, 250, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(220, 245, 230, 0.8)';
          ctx.shadowBlur = 5;
          ctx.fill();
        });
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, accentColor, targetArea]);

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
      }}
    />
  );
}
