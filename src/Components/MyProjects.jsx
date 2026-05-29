import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import projects from '../Data/projects';
import SectionHeader from './SectionHeader';
import SectionReveal from './SectionReveal';

const caseStudies = [
  {
    projectName: 'Clip Mind',
    label: 'AI Video Intelligence Case Study',
    problem:
      'Long videos and meetings hide decisions, follow-ups, and context inside unstructured transcripts.',
    solution:
      'Built an ingestion pipeline for YouTube/local media, Whisper/Sarvam transcription, LLM summarization, and ChromaDB-backed transcript chat.',
    impact:
      'Turns long-form media into concise summaries, action items, key decisions, open questions, and searchable knowledge.',
    stack: ['Whisper', 'Mistral API', 'Sarvam STT', 'ChromaDB', 'Streamlit', 'FFmpeg']
  },
  {
    projectName: 'DocuSPARK',
    label: 'Semantic PDF Assistant Case Study',
    problem:
      'PDF-heavy workflows make it slow to locate relevant evidence and ask follow-up questions across dense documents.',
    solution:
      'Designed a React/FastAPI RAG system with PDF extraction, chunking, embeddings, ChromaDB retrieval, and Gemini-grounded answers.',
    impact:
      'Creates a cleaner document Q&A workflow with source-aware retrieval and a foundation for multi-PDF research features.',
    stack: ['React', 'TypeScript', 'FastAPI', 'LangChain', 'Gemini API', 'ChromaDB']
  }
];

const CaseStudyCard = ({ study, index }) => (
  <SectionReveal delay={index * 0.05}>
    <article className="h-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
        {study.label}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">{study.projectName}</h3>

      <div className="mt-5 grid gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Problem
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{study.problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Solution
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{study.solution}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Impact
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{study.impact}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-5">
        {study.stack.map((item) => (
          <span
            key={item}
            className="rounded-md border border-white/[0.08] px-2 py-0.5 text-xs text-slate-500"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  </SectionReveal>
);

const ProjectDetail = ({ project, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[960] flex items-end justify-center bg-slate-950/85 p-4 sm:items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onMouseDown={onClose}
  >
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.2 }}
      className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/10 bg-slate-950 shadow-xl"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="relative border-b border-white/[0.06]">
        <img src={project.img} alt="" className="h-40 w-full object-cover sm:h-48" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg border border-white/10 bg-slate-950/90 px-3 py-1.5 text-xs font-medium text-slate-200"
        >
          Close
        </button>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-start gap-3">
          {project.logo && (
            <img
              src={project.logo}
              alt=""
              className="h-10 w-10 rounded-lg border border-white/10 object-contain p-1"
            />
          )}
          <div>
            <p className="text-xs text-slate-500">
              {project.category} · {project.date}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-white">{project.name}</h3>
            <p className="mt-0.5 text-sm text-slate-500">{project.status}</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-300">{project.description}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          <span className="font-medium text-slate-300">Impact. </span>
          {project.impact}
        </p>

        <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-5">
          {project.features?.map((feature) => (
            <li key={feature} className="text-sm leading-relaxed text-slate-400">
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech?.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/[0.08] px-2 py-0.5 text-xs text-slate-500"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            GitHub
          </a>
          {project.live_link ? (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  </motion.div>
);

const ProjectCard = ({ project, onOpen }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
      <img src={project.img} alt="" className="h-full w-full object-cover" />
      {project.logo && (
        <img
          src={project.logo}
          alt=""
          className="absolute bottom-3 left-3 h-8 w-8 rounded-md border border-white/10 bg-slate-950 object-contain p-0.5"
        />
      )}
    </div>
    <div className="flex flex-1 flex-col p-5">
      <p className="text-xs text-slate-500">{project.category}</p>
      <h3 className="mt-1 text-base font-semibold text-white">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3">
        {project.description}
      </p>
      <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-4">
        <button type="button" onClick={onOpen} className="btn-ghost flex-1 py-2 text-xs">
          Overview
        </button>
        <a
          href={project.github_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary py-2 text-xs"
        >
          GitHub
        </a>
      </div>
    </div>
  </article>
);

const MyProjects = () => {
  const [active, setActive] = useState(null);
  const featured = projects[0];

  return (
    <section id="projects" className="relative px-4 py-24 text-white md:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Projects"
          title="Systems built for real constraints."
          description="Representative work in RAG, video intelligence, and security — with repositories linked for technical review."
        />

        <SectionReveal className="mb-8">
          <article className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
            <div className="grid md:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden border-b border-white/[0.06] md:border-b-0 md:border-r">
                <img src={featured.img} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-7">
                <p className="text-xs text-slate-500">Featured · {featured.date}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{featured.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {featured.description}
                </p>
                <p className="mt-3 text-sm text-slate-500">{featured.impact}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {featured.tech.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/[0.08] px-2 py-0.5 text-xs text-slate-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActive(featured)}
                    className="btn-ghost py-2 text-xs"
                  >
                    Overview
                  </button>
                  <a
                    href={featured.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-2 text-xs"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </article>
        </SectionReveal>

        <div className="mb-8 grid gap-5 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.projectName} study={study} index={index} />
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.slice(1).map((project, index) => (
            <SectionReveal key={project.name} delay={index * 0.04}>
              <ProjectCard project={project} onOpen={() => setActive(project)} />
            </SectionReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectDetail project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default MyProjects;
