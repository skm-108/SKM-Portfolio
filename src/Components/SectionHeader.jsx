import { motion } from 'framer-motion';

const SectionHeader = ({ eyebrow, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
    className="mx-auto mb-10 max-w-2xl md:mb-12"
  >
    {eyebrow && (
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-slate-500">
        {eyebrow}
      </p>
    )}
    <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeader;
