import { motion } from 'framer-motion';
import { profile } from '../Data/profile';
import PortfolioPdfButton from './PortfolioPdfButton';

const Resume = () => (
  <section id="resume" className="px-4 py-12 text-white md:px-6">
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto flex max-w-5xl flex-col gap-5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] accent">
          Portfolio PDF
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Download the full portfolio as PDF.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          Multi-page export: about, skills, projects, experience, and contact — aligned with this site.
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <PortfolioPdfButton className="btn-accent px-6 py-3" label="Download Portfolio PDF" />
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost px-6 py-3 text-center"
        >
          Resume PDF
        </a>
      </div>
    </motion.div>
  </section>
);

export default Resume;
