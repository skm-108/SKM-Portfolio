import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../Data/profile';
import portrait from '../assets/photo_2026-05-21_10-10-20.jpg';
import PortfolioPdfButton from './PortfolioPdfButton';
import SectionReveal from './SectionReveal';

const metrics = [
  ['9.1', 'CGPA'],
  ['60%', 'anomaly reduction (DRDO)'],
  ['25%', 'spam detection lift'],
  ['Top 700', 'Agentic AI hackathon']
];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-screen items-center px-4 pb-16 pt-24 md:px-6 md:pt-28">
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <SectionReveal>
          <p className="mb-3 text-sm text-slate-500">{profile.name}</p>
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-5xl"
          >
            AI and security engineering for production systems.
          </motion.h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400">
            {profile.tagline}
          </p>
          <p className="mt-2 text-sm text-slate-500">{profile.title}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            <a href="#projects" className="btn-primary">
              View projects
            </a>
            <PortfolioPdfButton className="btn-ghost" />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              GitHub
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {metrics.map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
              >
                <p className="text-base font-semibold text-white">{value}</p>
                <p className="mt-0.5 text-[0.65rem] leading-snug text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08} className="mx-auto w-full max-w-sm lg:max-w-none">
          <motion.div
            className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-1"
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={portrait}
              alt={profile.name}
              className="aspect-[4/5] w-full rounded-[0.65rem] object-cover"
            />
            <div className="flex items-center justify-between px-3 py-2.5 text-xs">
              <span className="font-medium text-slate-300">{profile.location}</span>
              <span className="text-slate-500">Open to roles</span>
            </div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default Hero;
