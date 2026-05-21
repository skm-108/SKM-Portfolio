import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../Data/profile';
import { projects } from '../Data/projects';
import RobotMascot from './RobotMascot';

const cannedPrompts = ['Best project?', 'Why hire Shivam?', 'AI skills?', 'Contact info'];

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Ask me about Shivam’s AI projects, skills, experience, resume, or contact details.'
    }
  ]);
  const [input, setInput] = useState('');

  const knowledge = useMemo(
    () => ({
      projects: projects.map((project) => `${project.name}: ${project.description}`).join('\n'),
      skills: profile.skillGroups
        .map((group) => `${group.title}: ${group.skills.join(', ')}`)
        .join('\n'),
      experience: profile.experience
        .map((item) => `${item.role} at ${item.company}: ${item.highlights.join(' ')}`)
        .join('\n')
    }),
    []
  );

  const answer = (question) => {
    const text = question.toLowerCase();
    if (text.includes('project') || text.includes('best')) {
      return `The strongest public projects are DocuSPARK and Clip Mind. DocuSPARK shows full-stack RAG with React, FastAPI, LangChain, Gemini, and ChromaDB. Clip Mind shows video intelligence with transcription, summarization, decisions, action items, and transcript RAG.`;
    }
    if (text.includes('skill') || text.includes('stack')) {
      return `Core stack: ${profile.skillGroups.map((group) => `${group.title}: ${group.skills.slice(0, 4).join(', ')}`).join(' | ')}.`;
    }
    if (text.includes('experience') || text.includes('drdo') || text.includes('iwai')) {
      return `Experience highlights: DRDO cybersecurity and ML internship with a 60% anomalous-email reduction and 25% spam accuracy lift; IWAI cybersecurity work on Random Forest anomaly detection for APT and zero-day workflows.`;
    }
    if (text.includes('contact') || text.includes('email') || text.includes('linkedin')) {
      return `Email: ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}.`;
    }
    if (text.includes('portfolio pdf') || text.includes('download pdf')) {
      return 'Use Download Portfolio PDF in the hero, navbar, or resume section — it exports the full site as Shivam_Kumar_Mishra_Portfolio.pdf.';
    }
    if (text.includes('resume') || text.includes('pdf')) {
      return `Download the full portfolio PDF from the hero or resume section, or open the static resume at ${profile.resume}.`;
    }
    return `From the portfolio knowledge base: ${profile.summary} Key project knowledge includes ${knowledge.projects.split('\n').slice(0, 2).join(' ')}`;
  };

  const callProxy = async (question) => {
    try {
      const resp = await fetch(
        `${import.meta.env.DEV ? 'http://localhost:8787' : ''}/api/assistant`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: question })
        }
      );
      if (!resp.ok) throw new Error('proxy-error');
      const data = await resp.json();
      return data.reply || null;
    } catch {
      return null;
    }
  };

  const sendMessage = async (value = input) => {
    const question = value.trim();
    if (!question) return;
    setMessages((items) => [...items, { role: 'user', text: question }]);
    setInput('');
    setMessages((items) => [...items, { role: 'assistant', text: 'Thinking…' }]);
    const reply = await callProxy(question);
    setMessages((items) => {
      const next = items.slice(0, -1);
      return [...next, { role: 'assistant', text: reply || answer(question) }];
    });
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="pulse-ring fixed bottom-5 right-5 z-[920] flex items-center gap-2 rounded-full border border-cyan-400/25 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_48px_rgba(34,211,238,0.15)] backdrop-blur-md"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Open AI assistant"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20">
          <RobotMascot size="sm" />
        </span>
        <span className="hidden sm:inline">Ask AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-4 z-[930] flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl panel-surface"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/15 to-indigo-500/15">
                  <RobotMascot size="sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Portfolio AI</p>
                  <p className="text-xs text-slate-400">Grounded on this site’s data</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-2xl border p-3 text-sm leading-6 ${
                    message.role === 'assistant'
                      ? 'border-cyan-400/10 bg-slate-950/60 text-slate-100'
                      : 'ml-6 border-white/10 bg-white/[0.04] text-white'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/[0.06] p-3">
              {cannedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-400/25 hover:bg-cyan-400/5 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex gap-2 border-t border-white/[0.06] p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, skills, impact…"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/35"
              />
              <button type="submit" className="btn-primary shrink-0 px-4 py-2.5">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
