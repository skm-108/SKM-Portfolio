import { motion } from 'framer-motion';
import { profile } from '../Data/profile';
import cssLogo from '../assets/css.png';
import githubLogo from '../assets/github.png';
import htmlLogo from '../assets/html.png';
import jsLogo from '../assets/javascript.png';
import mongoLogo from '../assets/mongo.png';
import nodeLogo from '../assets/node.png';
import reactLogo from '../assets/react.png';
import tailwindLogo from '../assets/tailwind.png';
import SectionHeader from './SectionHeader';

const logoBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skillGroups = [
  {
    icon: 'AI',
    title: 'AI & ML',
    description: 'Modeling, retrieval, agents, embeddings, and applied intelligence workflows.',
    skills: [
      { name: 'Python', logo: `${logoBase}/python/python-original.svg` },
      { name: 'PyTorch', logo: `${logoBase}/pytorch/pytorch-original.svg` },
      { name: 'TensorFlow', logo: `${logoBase}/tensorflow/tensorflow-original.svg` },
      { name: 'Scikit-learn', logo: `${logoBase}/scikitlearn/scikitlearn-original.svg` },
      { name: 'LangChain', fallback: 'LC' },
      { name: 'RAG', fallback: 'RAG' },
      { name: 'Hugging Face', fallback: 'HF' },
      { name: 'FAISS', fallback: 'FS' },
      { name: 'ChromaDB', fallback: 'DB' },
      { name: 'Ollama', fallback: 'OL' }
    ]
  },
  {
    icon: 'BE',
    title: 'Backend Engineering',
    description: 'APIs, data services, server logic, and scalable application foundations.',
    skills: [
      { name: 'Node.js', logo: nodeLogo },
      { name: 'Express', logo: `${logoBase}/express/express-original.svg`, darkLogo: true },
      { name: 'FastAPI', logo: `${logoBase}/fastapi/fastapi-original.svg` },
      { name: 'Django', logo: `${logoBase}/django/django-plain.svg` },
      { name: 'MongoDB', logo: mongoLogo },
      { name: 'PostgreSQL', logo: `${logoBase}/postgresql/postgresql-original.svg` },
      { name: 'REST APIs', fallback: 'API' },
      { name: 'Firebase', logo: `${logoBase}/firebase/firebase-original.svg` }
    ]
  },
  {
    icon: 'FE',
    title: 'Frontend Development',
    description: 'Interfaces, dashboards, product flows, and polished user experiences.',
    skills: [
      { name: 'React', logo: reactLogo },
      { name: 'TypeScript', logo: `${logoBase}/typescript/typescript-original.svg` },
      { name: 'JavaScript', logo: jsLogo },
      { name: 'Tailwind CSS', logo: tailwindLogo },
      { name: 'HTML5', logo: htmlLogo },
      { name: 'CSS3', logo: cssLogo },
      { name: 'Flutter', logo: `${logoBase}/flutter/flutter-original.svg` },
      { name: 'Dart', logo: `${logoBase}/dart/dart-original.svg` }
    ]
  },
  {
    icon: 'DC',
    title: 'DevOps & Cloud',
    description: 'Deployment, version control, runtime environments, and cloud-ready delivery.',
    skills: [
      { name: 'Git', logo: `${logoBase}/git/git-original.svg` },
      { name: 'GitHub', logo: githubLogo },
      { name: 'Linux', logo: `${logoBase}/linux/linux-original.svg` },
      { name: 'Docker', logo: `${logoBase}/docker/docker-original.svg` },
      { name: 'Vercel', logo: `${logoBase}/vercel/vercel-original.svg`, darkLogo: true },
      { name: 'Postman', logo: `${logoBase}/postman/postman-original.svg` },
      { name: 'NPM', logo: `${logoBase}/npm/npm-original-wordmark.svg` },
      { name: 'Vite', logo: `${logoBase}/vitejs/vitejs-original.svg` }
    ]
  },
  {
    icon: 'SC',
    title: 'Cybersecurity & Data Systems',
    description: 'Security analysis, anomaly detection, VAPT, and data-driven defense workflows.',
    skills: [
      { name: 'Cybersecurity', fallback: 'SEC' },
      { name: 'VAPT', fallback: 'VA' },
      { name: 'Cryptography', fallback: 'CR' },
      { name: 'Anomaly Detection', fallback: 'AD' },
      { name: 'Network Analysis', fallback: 'NTA' },
      { name: 'System Logs', fallback: 'LOG' },
      { name: 'C++', logo: `${logoBase}/cplusplus/cplusplus-original.svg` },
      { name: 'Java', logo: `${logoBase}/java/java-original.svg` }
    ]
  }
];

const SkillLogo = ({ skill }) => {
  if (skill.logo) {
    return (
      <img
        src={skill.logo}
        alt=""
        className={`h-8 w-8 object-contain ${skill.darkLogo ? 'invert' : ''}`}
        loading="lazy"
      />
    );
  }

  return (
    <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.08] text-[0.62rem] font-bold text-cyan-100">
      {skill.fallback}
    </span>
  );
};

const SkillsSection = () => (
  <section id="skills" className="px-4 py-24 text-white md:px-6">
    <div className="mx-auto max-w-6xl">
      <SectionHeader
        eyebrow="Skills"
        title="Technical skills."
        description="Grouped by the way I actually build: AI systems, backend services, frontend products, deployment workflows, and secure data systems."
      />

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.08] text-sm font-bold text-cyan-100">
                {group.icon}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-400">
                  {group.description}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {group.skills.map((skill) => (
                <div
                  key={`${group.title}-${skill.name}`}
                  className="flex min-w-0 items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2.5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.08]">
                    <SkillLogo skill={skill} />
                  </span>
                  <span className="min-w-0 text-sm font-medium leading-snug text-slate-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.035] p-5 md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Credentials
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Key achievements and certifications.
            </h3>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-slate-400">
            Recruiter-facing proof points across competitive exams, AI, full-stack engineering,
            research exposure, and national-level recognition.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-white/[0.08] bg-slate-950/40 p-5"
          >
            <h4 className="text-base font-semibold text-white">Certifications</h4>
            <div className="mt-4 grid gap-3">
              {profile.certifications.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.issuer}</p>
                  {item.credentialUrl ? (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost mt-3 py-2 text-xs"
                    >
                      View Credential
                    </a>
                  ) : (
                    <span className="mt-3 inline-flex rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-medium text-slate-500">
                      Add credential link
                    </span>
                  )}
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-white/[0.08] bg-slate-950/40 p-5"
          >
            <h4 className="text-base font-semibold text-white">Key Achievements</h4>
            <div className="mt-4 grid gap-3">
              {profile.achievements.map((item, index) => (
                <article
                  key={item.title || item}
                  className={`rounded-xl border p-4 ${
                    index === 0
                      ? 'border-cyan-300/25 bg-cyan-300/[0.08]'
                      : 'border-white/[0.08] bg-white/[0.025]'
                  }`}
                >
                  <p className="text-sm font-semibold text-white">
                    {typeof item === 'string' ? item : item.title}
                  </p>
                  {typeof item === 'string' ? null : (
                    <>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.detail}</p>
                      {item.postUrl ? (
                        <a
                          href={item.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost mt-3 py-2 text-xs"
                        >
                          View Post
                        </a>
                      ) : null}
                    </>
                  )}
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  </section>
);

export default SkillsSection;
