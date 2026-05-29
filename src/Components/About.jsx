import { motion } from 'framer-motion';
import { profile } from '../Data/profile';
import SectionHeader from './SectionHeader';
import SectionReveal from './SectionReveal';

const About = () => (
  <section id="about" className="relative px-4 py-24 text-white md:px-6">
    <div className="mx-auto max-w-3xl">
      <SectionHeader
        eyebrow="About"
        title="Pre-Final Year CS undergraduate building production-minded AI systems."
        description="MAIT CSE undergraduate with 9.1 CGPA and GATE 2026 qualification. I work on retrieval pipelines, applied ML, and secure architecture with clear metrics and maintainable code."
      />

      <SectionReveal>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8"
        >
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-semibold text-cyan-100">
              GATE 2026 Qualified
            </span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300">
              {profile.title}
            </span>
          </div>

          <p className="mt-5 text-base leading-[1.75] text-slate-300">{profile.summary}</p>

          <div className="section-divider my-8" />

          <h3 className="text-sm font-medium text-white">Selected outcomes</h3>
          <ul className="mt-4 space-y-3">
            {profile.highlights.map((highlight) => (
              <li
                key={highlight}
                className="relative pl-4 text-sm leading-relaxed text-slate-400 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-slate-500"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </motion.div>
      </SectionReveal>
    </div>
  </section>
);

export default About;
