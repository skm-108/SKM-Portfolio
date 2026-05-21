import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const STATIC_STARS = Array.from({ length: 48 }, (_, i) => ({
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  size: i % 5 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
  duration: 5 + (i % 7),
  delay: (i % 11) * 0.15,
  driftX: (i % 5) - 2,
  driftY: (i % 4) - 1
}));

const CONSTELLATION_LINES = [
  [8, 12, 18], [22, 28, 35, 41], [55, 62, 68], [72, 78, 85, 91], [15, 48, 72], [35, 58, 82]
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const NeuralBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef(0);
  const cursorRef = useRef({ x: 50, y: 42 });
  const [cursor, setCursor] = useState({ x: 50, y: 42 });

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let rafId = 0;
    const target = { x: 50, y: 42 };
    const current = { x: 50, y: 42 };

    const tickCursor = () => {
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;
      cursorRef.current = { x: current.x, y: current.y };
      setCursor({ x: current.x, y: current.y });
      rafId = window.requestAnimationFrame(tickCursor);
    };

    const handleMove = (event) => {
      target.x = clamp((event.clientX / window.innerWidth) * 100, 0, 100);
      target.y = clamp((event.clientY / window.innerHeight) * 100, 0, 100);
    };

    const handleLeave = () => {
      target.x = 50;
      target.y = 42;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerleave', handleLeave);
    rafId = window.requestAnimationFrame(tickCursor);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 36 : 72;

    const initParticles = () => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.45 + 0.15
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particlesRef.current.length) initParticles();
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const px = (cursorRef.current.x - 50) * 0.35;
      const py = (cursorRef.current.y - 42) * 0.28;

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - width * 0.5 + px * 2;
        const dy = p.y - height * 0.5 + py * 2;
        const dist = Math.hypot(dx, dy);
        const glow = Math.max(0, 1 - dist / (width * 0.55));

        ctx.beginPath();
        ctx.arc(p.x + px * 0.15, p.y + py * 0.12, p.r + glow * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${i % 3 === 0 ? '99,102,241' : '34,211,238'},${p.alpha + glow * 0.25})`;
        ctx.fill();

        const next = particlesRef.current[i + 1];
        if (next && i % 4 === 0) {
          const nx = next.x + px * 0.15;
          const ny = next.y + py * 0.12;
          const lineDist = Math.hypot(nx - p.x, ny - p.y);
          if (lineDist < 120) {
            ctx.strokeStyle = `rgba(34,211,238,${0.04 + glow * 0.06})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x + px * 0.15, p.y + py * 0.12);
            ctx.lineTo(nx, ny);
            ctx.stroke();
          }
        }
      });

    };

    let running = true;
    const loop = () => {
      if (!running) return;
      if (!document.hidden) draw();
      frameRef.current = window.requestAnimationFrame(loop);
    };

    frameRef.current = window.requestAnimationFrame(loop);

    return () => {
      running = false;
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReducedMotion]);

  const nebulaStyle = useMemo(() => {
    const glowX = prefersReducedMotion ? 50 : cursor.x;
    const glowY = prefersReducedMotion ? 36 : cursor.y;
    const haloX = prefersReducedMotion ? 68 : clamp(100 - cursor.x * 0.88, 0, 100);
    const haloY = prefersReducedMotion ? 16 : clamp(100 - cursor.y * 0.72, 0, 100);

    return {
      backgroundImage: `
        radial-gradient(circle at ${glowX}% ${glowY}%, rgba(34, 211, 238, 0.16), transparent 22%),
        radial-gradient(circle at ${haloX}% ${haloY}%, rgba(99, 102, 241, 0.14), transparent 28%),
        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(129, 140, 248, 0.1), transparent 50%),
        radial-gradient(circle at 18% 82%, rgba(14, 165, 233, 0.06), transparent 24%),
        linear-gradient(180deg, #030712 0%, #070b16 48%, #020408 100%)
      `,
      transform: prefersReducedMotion
        ? 'none'
        : `translate3d(${(cursor.x - 50) * 0.22}px, ${(cursor.y - 42) * 0.16}px, 0)`
    };
  }, [cursor.x, cursor.y, prefersReducedMotion]);

  const galaxyRotate = prefersReducedMotion ? 0 : (cursor.x - 50) * 0.04;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030712]">
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'conic-gradient(from 210deg at 50% 40%, transparent 0deg, rgba(99,102,241,0.08) 90deg, transparent 180deg, rgba(34,211,238,0.06) 270deg, transparent 360deg)'
        }}
        animate={prefersReducedMotion ? undefined : { rotate: [galaxyRotate, galaxyRotate + 8, galaxyRotate] }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      />

      <div className="absolute inset-0 -z-20">
        {['#1e3a5f', '#0f2847', '#1a1f4a'].map((color, i) => (
          <motion.div
            key={color}
            aria-hidden
            className="absolute will-change-transform"
            style={{
              left: `${8 + i * 22}%`,
              top: `${4 + i * 16}%`,
              width: `${55 + i * 18}%`,
              height: `${38 + i * 22}%`,
              borderRadius: '40% 60% 50% 50% / 50% 40% 60% 50%',
              mixBlendMode: 'screen',
              filter: 'blur(72px) saturate(130%)',
              background: `radial-gradient(closest-side, ${color} 0%, transparent 48%)`,
              opacity: 0.16
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    rotate: [0, 5, -3, 0],
                    x: [0, -14 + i * 5, 10 - i * 4, 0],
                    y: [0, 8 - i * 2, -6 + i * 2, 0],
                    opacity: [0.1, 0.2, 0.12, 0.16]
                  }
            }
            transition={{ duration: 28 + i * 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div aria-hidden className="absolute inset-0" style={nebulaStyle} />

      {!prefersReducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 opacity-80" aria-hidden />
      )}

      <svg className="absolute inset-0 h-full w-full opacity-[0.14]" aria-hidden>
        {CONSTELLATION_LINES.map((group, gi) => (
          <g key={gi}>
            {group.slice(0, -1).map((from, i) => {
              const to = group[i + 1];
              const x1 = (from * 7.3) % 100;
              const y1 = (from * 4.1 + 12) % 88;
              const x2 = (to * 7.3) % 100;
              const y2 = (to * 4.1 + 12) % 88;
              return (
                <line
                  key={`${from}-${to}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="rgba(34,211,238,0.35)"
                  strokeWidth="0.5"
                />
              );
            })}
          </g>
        ))}
      </svg>

      <div className="absolute inset-0">
        {STATIC_STARS.map((star) => (
          <motion.span
            key={`${star.left}-${star.top}`}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: '0 0 8px rgba(255,255,255,0.4)'
            }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.5 }
                : {
                    opacity: [0.2, 0.9, 0.3],
                    scale: [1, 1.3, 1],
                    x: [0, star.driftX, 0],
                    y: [0, star.driftY, 0]
                  }
            }
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_42%)]" />
      <div className="section-divider absolute bottom-0 left-0 right-0 opacity-40" />
    </div>
  );
};

export default NeuralBackground;
