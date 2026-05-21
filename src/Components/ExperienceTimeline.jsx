import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../Data/profile';
import SectionHeader from './SectionHeader';
import SectionReveal from './SectionReveal';

const parseYear = (period) => {
  const match = period.match(/\d{4}/);
  return match ? match[0] : period;
};

const ExperienceCard = ({ item, align = 'left', index }) => (
  <motion.article
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className={`max-w-md rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 ${
      align === 'right' ? 'md:text-right' : ''
    }`}
  >
    <div className={`flex items-start gap-3 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
      {item.logo && (
        <img
          src={item.logo}
          alt=""
          className="h-10 w-10 shrink-0 rounded-lg border border-white/10 bg-slate-950 object-contain p-1"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{item.period}</p>
        <h3 className="mt-1 text-base font-semibold leading-snug text-white">{item.role}</h3>
        <p className="mt-1 text-sm text-slate-400">
          {item.company}
          <span className="text-slate-600"> · </span>
          {item.location}
        </p>
      </div>
    </div>
    <ul
      className={`mt-4 space-y-2 text-sm leading-relaxed text-slate-300 ${
        align === 'right' ? 'md:text-right' : ''
      }`}
    >
      {item.highlights.map((highlight) => (
        <li
          key={highlight}
          className={align === 'right' ? 'md:ml-auto md:max-w-[95%]' : ''}
        >
          {highlight}
        </li>
      ))}
    </ul>
  </motion.article>
);

const TimelineNode = ({ year }) => (
  <div className="relative z-10 flex flex-col items-center">
    <span className="mb-2 font-mono text-[0.65rem] text-slate-500">{year}</span>
    <span className="h-2.5 w-2.5 rounded-full border border-white/25 bg-slate-950 ring-2 ring-white/10" />
  </div>
);

const ExperienceRow = ({ item, index }) => {
  const isLeft = index % 2 === 0;
  const year = parseYear(item.period);

  return (
    <div className="relative">
      {/* Mobile: single rail + card */}
      <div className="flex gap-4 md:hidden">
        <div className="flex w-9 shrink-0 justify-center pt-1">
          <TimelineNode year={year} />
        </div>
        <div className="relative min-w-0 flex-1 pb-10">
          <span
            className="absolute -left-4 top-3 h-px w-3 bg-white/15"
            aria-hidden
          />
          <ExperienceCard item={item} align="left" index={index} />
        </div>
      </div>

      {/* Desktop: alternating left / right — fixed column order (no CSS order swap) */}
      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] md:items-start md:gap-x-10">
        <div className={`flex pt-2 ${isLeft ? 'justify-end' : 'justify-end'}`}>
          {isLeft ? (
            <ExperienceCard item={item} align="left" index={index} />
          ) : (
            <span className="block w-full max-w-md" aria-hidden />
          )}
        </div>

        <div className="relative flex justify-center pt-2">
          <TimelineNode year={year} />
          <span
            className={`absolute top-[1.35rem] h-px bg-white/12 ${
              isLeft
                ? 'right-full mr-2 w-10'
                : 'left-full ml-2 w-10'
            }`}
            aria-hidden
          />
        </div>

        <div className={`flex pt-2 ${!isLeft ? 'justify-start' : 'justify-start'}`}>
          {!isLeft ? (
            <ExperienceCard item={item} align="right" index={index} />
          ) : (
            <span className="block w-full max-w-md" aria-hidden />
          )}
        </div>
      </div>
    </div>
  );
};

const ExperienceTimeline = () => (
  <section id="experience" className="relative px-4 py-24 text-white md:px-6">
    <div className="mx-auto max-w-5xl">
      <SectionHeader
        eyebrow="Experience"
        title="Roles across defense, infrastructure, and community."
        description="Internships and analyst work where ML, security, and mentorship shipped with accountable outcomes."
      />

      <SectionReveal>
        <div className="relative mx-auto max-w-4xl">
          {/* One continuous spine — desktop only */}
          <div
            className="pointer-events-none absolute left-1/2 top-4 bottom-4 hidden w-px -translate-x-1/2 bg-white/10 md:block"
            aria-hidden
          />

          <div className="relative space-y-2 md:space-y-0">
            {profile.experience.map((item, index) => (
              <ExperienceRow
                key={`${item.company}-${item.period}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </SectionReveal>
    </div>
  </section>
);

export default ExperienceTimeline;
