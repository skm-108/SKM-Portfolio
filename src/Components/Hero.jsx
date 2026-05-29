import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../Data/profile';
import portrait from '../assets/photo_2026-05-21_10-10-20.jpg';
import PortfolioPdfButton from './PortfolioPdfButton';
import SectionReveal from './SectionReveal';

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-screen items-center px-4 pb-16 pt-24 md:px-6 md:pt-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
        <SectionReveal>
          <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            AI Engineer &bull; Full-Stack Developer
          </p>
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Building AI Systems That Transform Complex Data Into Actionable Intelligence
          </motion.h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            GATE 2026 qualified Computer Science undergraduate with experience at DRDO and IWAI,
            building AI-powered applications, intelligent automation systems, scalable backend
            infrastructure, and production-ready software.
          </p>

          <p className="mt-5 inline-flex max-w-full rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200">
            Currently Building: AI Agents &bull; RAG Applications &bull; Intelligent Security Systems
          </p>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <a href="#projects" className="btn-primary min-h-11 px-5">
              View Projects
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost min-h-11 px-5"
            >
              Download Resume
            </a>
            <a href="#contact" className="btn-ghost min-h-11 px-5">
              Contact Me
            </a>
            <PortfolioPdfButton className="btn-ghost min-h-11 px-5" label="Download Portfolio PDF" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span>DRDO</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/60" />
            <span>IWAI</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/60" />
            <span>MAIT</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/60" />
            <span>GATE 2026 Qualified</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/60" />
            <span>AI Research</span>
            <span className="h-1 w-1 rounded-full bg-cyan-300/60" />
            <span>Production Systems</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08} className="mx-auto w-full max-w-sm lg:max-w-none">
          <motion.div
            className="overflow-hidden rounded-2xl border border-white/[0.1] bg-slate-950/45 p-1 shadow-[0_24px_90px_rgba(2,6,23,0.45)] backdrop-blur"
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={portrait}
              alt={profile.name}
              className="aspect-[4/5] w-full rounded-[0.85rem] object-cover"
            />
            <div className="space-y-3 px-4 py-4">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-medium text-slate-300">India</span>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-1 font-medium text-emerald-200">
                  Available
                </span>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">AI Engineer</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  GATE 2026 Qualified &bull; LLMs &bull; RAG &bull; Cybersecurity
                </p>
              </div>
              <p className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-sm leading-6 text-slate-300">
                Available for AI Engineering & Software Development Roles
              </p>
            </div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default Hero;
