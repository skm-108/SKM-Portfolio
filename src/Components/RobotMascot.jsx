import { motion, useReducedMotion } from 'framer-motion';

const RobotMascot = ({ size = 'md' }) => {
  const prefersReducedMotion = useReducedMotion();
  const dim = size === 'sm' ? 'h-10 w-10' : size === 'lg' ? 'h-36 w-36' : 'h-16 w-16';

  return (
    <motion.div
      className={`relative ${dim}`}
      animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="robotBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="robotGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <rect x="14" y="18" width="36" height="32" rx="10" fill="url(#robotBody)" stroke="rgba(34,211,238,0.25)" strokeWidth="1.2" />
        <rect x="20" y="8" width="24" height="14" rx="6" fill="#0b1220" stroke="rgba(99,102,241,0.35)" strokeWidth="1" />
        <motion.circle
          cx="28"
          cy="15"
          r="3"
          fill="#22d3ee"
          animate={prefersReducedMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
        <motion.circle
          cx="36"
          cy="15"
          r="3"
          fill="#818cf8"
          animate={prefersReducedMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 0.4 }}
        />
        <rect x="10" y="26" width="6" height="14" rx="3" fill="#111827" stroke="rgba(34,211,238,0.2)" />
        <rect x="48" y="26" width="6" height="14" rx="3" fill="#111827" stroke="rgba(34,211,238,0.2)" />
        <rect x="22" y="52" width="8" height="6" rx="2" fill="#1e293b" />
        <rect x="34" y="52" width="8" height="6" rx="2" fill="#1e293b" />
        <motion.rect
          x="24"
          y="30"
          width="16"
          height="6"
          rx="3"
          fill="url(#robotGlow)"
          animate={prefersReducedMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </svg>
      {!prefersReducedMotion && (
        <span className="absolute -inset-2 rounded-2xl bg-cyan-400/10 blur-md" aria-hidden />
      )}
    </motion.div>
  );
};

export default RobotMascot;
