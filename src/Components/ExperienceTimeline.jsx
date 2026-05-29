import { motion } from 'framer-motion';
import { profile } from '../Data/profile';
import SectionHeader from './SectionHeader';
import SectionReveal from './SectionReveal';

const parseYear = (period) => {
  const match = period.match(/\d{4}/);
  return match ? match[0] : period;
};

const ExperienceCard = ({ item, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.055] to-white/[0.015] p-5 shadow-[0_18px_60px_rgba(2,6,23,0.28)] md:p-6"
  >
    <div className="flex items-start gap-4">
      {item.logo && (
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-cyan-300/15 bg-white/[0.06] p-2 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
          <img src={item.logo} alt="" className="max-h-16 max-w-16 object-contain" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-cyan-100">
          {item.period}
        </p>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-white">{item.role}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {item.company}
          <span className="text-slate-600"> &bull; </span>
          {item.location}
        </p>
      </div>
    </div>

    <ul className="mt-5 space-y-3 border-t border-white/[0.07] pt-5 text-sm leading-relaxed text-slate-300">
      {item.highlights.map((highlight) => (
        <li
          key={highlight}
          className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan-300/70"
        >
          {highlight}
        </li>
      ))}
    </ul>

    {item.certificateUrl || item.postUrl ? (
      <div className="mt-5 flex flex-wrap gap-2">
        {item.certificateUrl ? (
          <a
            href={item.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2 text-xs"
          >
            View Certificate
          </a>
        ) : null}
        {item.postUrl ? (
          <a
            href={item.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost py-2 text-xs"
          >
            View LinkedIn Post
          </a>
        ) : null}
      </div>
    ) : null}
  </motion.article>
);

const TimelineNode = ({ year }) => (
  <div className="relative z-10 flex flex-col items-center">
    <span className="mb-2 rounded-full border border-white/[0.08] bg-slate-950 px-2 py-1 font-mono text-[0.68rem] text-cyan-100">
      {year}
    </span>
    <span className="h-4 w-4 rounded-full border border-cyan-200/45 bg-slate-950 ring-4 ring-cyan-300/10" />
  </div>
);

const ExperienceRow = ({ item, index }) => {
  const isLeft = index % 2 === 0;
  const year = parseYear(item.period);

  return (
    <div className="relative">
      <div className="flex gap-4 md:hidden">
        <div className="flex w-10 shrink-0 justify-center pt-1">
          <TimelineNode year={year} />
        </div>
        <div className="relative min-w-0 flex-1 pb-10">
          <span className="absolute -left-4 top-4 h-px w-3 bg-cyan-300/18" aria-hidden />
          <ExperienceCard item={item} align="left" index={index} />
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] md:items-start md:gap-x-10">
        <div className="flex pt-2 justify-end">
          {isLeft ? (
            <ExperienceCard item={item} index={index} />
          ) : (
            <span className="block w-full max-w-lg" aria-hidden />
          )}
        </div>

        <div className="relative flex justify-center pt-2">
          <TimelineNode year={year} />
          <span
            className={`absolute top-[1.8rem] h-px bg-cyan-300/18 ${
              isLeft ? 'right-full mr-2 w-12' : 'left-full ml-2 w-12'
            }`}
            aria-hidden
          />
        </div>

        <div className="flex pt-2 justify-start">
          {!isLeft ? (
            <ExperienceCard item={item} index={index} />
          ) : (
            <span className="block w-full max-w-lg" aria-hidden />
          )}
        </div>
      </div>
    </div>
  );
};

const ExperienceTimeline = () => (
  <section id="experience" className="relative px-4 py-24 text-white md:px-6">
    <div className="mx-auto max-w-6xl">
      <SectionHeader
        eyebrow="Experience"
        title="Roles across defense, infrastructure, and community."
        description="Internships and analyst work where ML, security, and mentorship shipped with accountable outcomes."
      />

      <SectionReveal>
        <div className="relative mx-auto max-w-5xl">
          <div
            className="pointer-events-none absolute left-1/2 top-4 bottom-4 hidden w-px -translate-x-1/2 bg-cyan-300/12 md:block"
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
