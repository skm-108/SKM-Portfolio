import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const TRAIL_LENGTH = 6;

const CursorGlow = () => {
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState([]);
  const rafRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let latest = { x: -200, y: -200 };

    const handleMove = (event) => {
      latest = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      setPosition(latest);
      setTrail((items) => {
        const next = [{ x: latest.x, y: latest.y }, ...items];
        return next.slice(0, TRAIL_LENGTH);
      });
      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', handleMove);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={`${point.x}-${point.y}-${index}`}
          className="pointer-events-none fixed left-0 top-0 z-[940] hidden h-2 w-2 rounded-full lg:block"
          style={{
            background: `rgba(34,211,238,${0.22 - index * 0.03})`,
            boxShadow: `0 0 ${12 - index * 2}px rgba(34,211,238,0.25)`
          }}
          animate={{ x: point.x - 4, y: point.y - 4 }}
          transition={{ type: 'spring', damping: 28 + index * 4, stiffness: 280, mass: 0.2 }}
        />
      ))}

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[945] hidden h-56 w-56 rounded-full soft-accent-bg lg:block"
        animate={{ x: position.x - 112, y: position.y - 112 }}
        transition={{ type: 'spring', damping: 34, stiffness: 140, mass: 0.55 }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[955] hidden h-3 w-3 rounded-full bg-cyan-300/90 shadow-[0_0_12px_rgba(34,211,238,0.8)] lg:block"
        animate={{ x: position.x - 6, y: position.y - 6 }}
        transition={{ type: 'spring', damping: 26, stiffness: 420, mass: 0.15 }}
      />
    </>
  );
};

export default CursorGlow;
