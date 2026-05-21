import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../Data/profile';
import { projects } from '../Data/projects';
import { requestPortfolioPdfDownload } from '../utils/generatePortfolioPdf';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else window.location.hash = id;
};

const CommandMenu = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const actions = useMemo(
    () => [
      { label: 'Go to Home', hint: 'Hero & positioning', run: () => scrollTo('home') },
      { label: 'Go to Projects', hint: 'Featured AI systems', run: () => scrollTo('projects') },
      { label: 'Go to Skills', hint: 'AI, RAG, security stack', run: () => scrollTo('skills') },
      { label: 'Go to Experience', hint: 'DRDO, IWAI, GDG', run: () => scrollTo('experience') },
      { label: 'Contact Shivam', hint: profile.email, run: () => scrollTo('contact') },
      {
        label: 'Download Portfolio PDF',
        hint: 'Shivam_Kumar_Mishra_Portfolio.pdf',
        run: () => requestPortfolioPdfDownload()
      },
      {
        label: 'Open Resume PDF',
        hint: 'Static recruiter resume',
        run: () => window.open(profile.resume, '_blank', 'noopener,noreferrer')
      },
      {
        label: 'Open GitHub',
        hint: profile.github,
        run: () => window.open(profile.github, '_blank', 'noopener,noreferrer')
      },
      ...projects.map((project) => ({
        label: project.name,
        hint: `${project.category} · GitHub`,
        run: () => window.open(project.github_link, '_blank', 'noopener,noreferrer')
      }))
    ],
    []
  );

  const filtered = actions.filter((action) =>
    `${action.label} ${action.hint}`.toLowerCase().includes(query.toLowerCase())
  );

  const runAction = useCallback(
    (action) => {
      action.run();
      onClose();
    },
    [onClose]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return undefined;
    }

    const handler = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (event.key === 'Enter' && filtered[activeIndex]) {
        event.preventDefault();
        runAction(filtered[activeIndex]);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose, filtered, activeIndex, runAction]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-start justify-center bg-slate-950/80 px-4 pt-[12vh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(6,10,20,0.96),rgba(3,7,16,0.98))] shadow-[0_40px_120px_rgba(2,6,23,0.75)]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <span className="text-cyan-400/80">⌘</span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search commands, projects, sections..."
                className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-500"
              />
              <span className="kbd hidden sm:inline-flex">esc</span>
            </div>

            <div className="max-h-[min(420px,50vh)] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-slate-500">No matches found.</p>
              )}
              {filtered.map((action, index) => (
                <button
                  key={action.label}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runAction(action)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                    index === activeIndex
                      ? 'bg-cyan-400/10 text-white'
                      : 'text-slate-200 hover:bg-white/[0.05]'
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold">{action.label}</span>
                    <span className="block text-xs text-slate-400">{action.hint}</span>
                  </span>
                  <span className="text-xs text-cyan-300/80">↵</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3 text-[0.68rem] text-slate-500">
              <span>Navigate with ↑ ↓ · Enter to run</span>
              <span className="hidden gap-2 sm:flex">
                <span className="kbd">⌘</span>
                <span className="kbd">K</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
