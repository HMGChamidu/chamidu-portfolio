
'use client';

import { useEffect, useRef } from 'react';

type SnowParticle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  sway: number;
  phase: number;
  opacity: number;
};

export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    // Respect users who prefer reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let width = 0;
    let height = 0;
    let particles: SnowParticle[] = [];
    let animationId = 0;
    let lastTime = 0;

    const createParticle = (): SnowParticle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.9 + Math.random() * 1.4,
      speed: 0.25 + Math.random() * 0.65,
      wind: (Math.random() - 0.5) * 0.25,
      sway: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.28 + Math.random() * 0.42,
    });

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particleCount = Math.min(
        88,
        Math.max(28, Math.round((width * height) / 19000))
      );

      particles = Array.from(
        { length: particleCount },
        createParticle
      );
    };

    const animate = (time: number) => {
      const delta = lastTime
        ? Math.min((time - lastTime) / 16.67, 2)
        : 1;

      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.y += particle.speed * delta;

        particle.x += (
          particle.wind +
          Math.sin(time * 0.0005 + particle.phase) * particle.sway
        ) * delta;

        // Reset particles when they leave the screen.
        if (particle.y > height + 5) {
          particle.y = -5;
          particle.x = Math.random() * width;
        }

        if (particle.x > width + 5) particle.x = -5;
        if (particle.x < -5) particle.x = width + 5;

        // Cool white and icy-blue particles.
        ctx.beginPath();

        ctx.fillStyle =
          particle.radius > 1.1
            ? `rgba(125, 211, 252, ${particle.opacity})`
            : `rgba(235, 244, 255, ${particle.opacity})`;

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas, {
      passive: true,
    });

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="snowfall-canvas"
      aria-hidden="true"
    />
  );
}
