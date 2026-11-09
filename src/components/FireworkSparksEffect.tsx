import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  glowColor: string;
  alpha: number;
  life: number;
  maxLife: number;
  gravity: number;
  friction: number;
  flickerSpeed: number;
  length: number;
  history: Array<{ x: number; y: number }>;
  isBurst: boolean;
}

export const FireworkSparksEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const MAX_PARTICLES = 320;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Fire spark color palette: white-hot core, vivid golden yellow, vibrant amber/orange, and ember red
    const fireColors = [
      { core: '#ffffff', glow: '#ffea75' },
      { core: '#fff2a8', glow: '#ffa834' },
      { core: '#ffd23f', glow: '#ff6b35' },
      { core: '#ff9f1c', glow: '#e71d36' },
      { core: '#ffdd53', glow: '#ff5400' },
    ];

    // Spawns firework sparkler burst on click/touch
    const createBurst = (originX: number, originY: number, count = 32) => {
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();

        const angle = Math.random() * Math.PI * 2;
        // Varied speeds for realistic sparkler spray
        const speed = Math.random() * 7 + 2.5;
        const colorObj = fireColors[Math.floor(Math.random() * fireColors.length)];
        const maxLife = Math.floor(Math.random() * 32) + 22;

        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1.2,
          color: colorObj.core,
          glowColor: colorObj.glow,
          alpha: 1,
          life: 0,
          maxLife,
          gravity: 0.12 + Math.random() * 0.08,
          friction: 0.95,
          flickerSpeed: Math.random() * 0.4 + 0.1,
          length: Math.random() * 12 + 6,
          history: [],
          isBurst: true,
        });
      }
    };

    // Spawns fine trail sparks along mouse path
    let lastX = 0;
    let lastY = 0;
    const createTrail = (x: number, y: number) => {
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < 3) return;
      lastX = x;
      lastY = y;

      const count = Math.min(3, Math.floor(dist / 6) + 1);
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.8 + 0.8;
        const colorObj = fireColors[Math.floor(Math.random() * fireColors.length)];
        const maxLife = Math.floor(Math.random() * 18) + 14;

        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: Math.random() * 1.8 + 0.8,
          color: colorObj.core,
          glowColor: colorObj.glow,
          alpha: 0.95,
          life: 0,
          maxLife,
          gravity: 0.06,
          friction: 0.96,
          flickerSpeed: Math.random() * 0.3 + 0.1,
          length: Math.random() * 6 + 3,
          history: [],
          isBurst: false,
        });
      }
    };

    // Global pointer listeners
    const handlePointerMove = (e: PointerEvent) => {
      createTrail(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      createBurst(e.clientX, e.clientY, 36);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        createTrail(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        createBurst(touch.clientX, touch.clientY, 36);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Additive blending for realistic glowing sparks
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // History for trailing spark line
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > 4) {
          p.history.shift();
        }

        // Physics update
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;

        // Occasional tiny spark jitter (like real burning gunpowder)
        p.vx += (Math.random() - 0.5) * 0.4;
        p.vy += (Math.random() - 0.5) * 0.4;

        p.x += p.vx;
        p.y += p.vy;

        // Alpha calculation
        const progress = p.life / p.maxLife;
        p.alpha = Math.max(0, 1 - progress);

        // Flicker effect
        const flicker = Math.sin(p.life * p.flickerSpeed * 10) * 0.2 + 0.8;
        const currentAlpha = Math.min(1, Math.max(0, p.alpha * flicker));

        if (currentAlpha <= 0 || p.life >= p.maxLife) {
          // Micro burst on death for some burst sparks
          if (p.isBurst && Math.random() < 0.15 && particles.length < MAX_PARTICLES) {
            for (let k = 0; k < 2; k++) {
              const a = Math.random() * Math.PI * 2;
              particles.push({
                x: p.x,
                y: p.y,
                vx: Math.cos(a) * 1.5,
                vy: Math.sin(a) * 1.5,
                size: 0.8,
                color: '#ffdd66',
                glowColor: '#ff6600',
                alpha: 0.7,
                life: 0,
                maxLife: 10,
                gravity: 0.08,
                friction: 0.94,
                flickerSpeed: 0.2,
                length: 2,
                history: [],
                isBurst: false,
              });
            }
          }
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = currentAlpha;

        // Draw sparkler streak line
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let h = 1; h < p.history.length; h++) {
            ctx.lineTo(p.history[h].x, p.history[h].y);
          }
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = p.glowColor;
          ctx.lineWidth = p.size * 1.2;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Draw bright spark head
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.glowColor;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Cross starburst flares on bright burst sparks
        if (p.isBurst && p.size > 1.8 && p.life < p.maxLife * 0.6) {
          const flareLen = p.size * 2.8;
          ctx.beginPath();
          ctx.moveTo(p.x - flareLen, p.y);
          ctx.lineTo(p.x + flareLen, p.y);
          ctx.moveTo(p.x, p.y - flareLen);
          ctx.lineTo(p.x, p.y + flareLen);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
};
