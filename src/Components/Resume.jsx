import { motion } from 'framer-motion';
import { profile } from '../Data/profile';
import PortfolioPdfButton from './PortfolioPdfButton';

const Resume = () => (
  <section id="resume" className="px-4 py-12 text-white md:px-6">
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto grid max-w-5xl gap-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] accent">
          Recruiter Downloads
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Resume and portfolio, ready to share.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          Download the concise resume or export the full portfolio PDF with projects, skills,
          experience, and contact details.
        </p>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-2 md:w-[23rem]">
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary min-h-12 px-5 text-center"
        >
          Download Resume
        </a>
        <PortfolioPdfButton
          className="btn-ghost min-h-12 px-5 text-center"
          label="Download Portfolio PDF"
        />
      </div>
    </motion.div>
  </section>
);

export default Resume;
