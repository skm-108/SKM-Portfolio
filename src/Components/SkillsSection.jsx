import { motion } from 'framer-motion';
import { profile } from '../Data/profile';
import SectionHeader from './SectionHeader';

const SkillsSection = () => (
  <section id="skills" className="px-4 py-24 text-white md:px-6">
    <div className="mx-auto max-w-5xl">
      <SectionHeader
        eyebrow="Skills"
        title="Technical scope."
        description="Applied across retrieval systems, ML pipelines, security reviews, and shipped interfaces."
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {profile.skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h3 className="text-sm font-semibold text-white">{group.title}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-white/[0.08] px-2 py-0.5 text-xs text-slate-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
        >
          <h3 className="text-sm font-semibold text-white">Certifications</h3>
          <ul className="mt-3 space-y-2">
            {profile.certifications.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-slate-400">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
        >
          <h3 className="text-sm font-semibold text-white">Recognition</h3>
          <ul className="mt-3 space-y-2">
            {profile.achievements.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-slate-400">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
