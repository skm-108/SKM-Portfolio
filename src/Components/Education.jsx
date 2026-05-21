import { motion } from 'framer-motion';
import { profile } from '../Data/profile';
import SectionHeader from './SectionHeader';

const Education = () => (
  <section id="education" className="px-4 py-24 text-white md:px-6">
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        eyebrow="Academic foundation"
        title="Computer science depth with modern AI coursework."
        description="Formal foundations across machine learning, security, mathematics, quantum computing, and responsible AI."
      />

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          {profile.education.map((edu, index) => (
            <motion.article
              key={edu.school}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <p className="text-sm font-medium accent">{edu.period || edu.location}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{edu.degree}</h3>
              <p className="mt-2 text-sm text-slate-400">{edu.school}</p>
              <p className="mt-3 text-sm text-slate-300">{edu.details}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[1.5rem] card p-5"
        >
          <h3 className="text-xl font-semibold text-white">Relevant coursework</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.coursework.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5 text-sm muted">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Education;
