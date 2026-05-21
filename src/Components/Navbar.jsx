import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../Data/profile';
import PortfolioPdfButton from './PortfolioPdfButton';

const menuLinks = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Skills', link: '#skills' },
  { name: 'Experience', link: '#experience' },
  { name: 'Contact', link: '#contact' }
];

const Navbar = ({ onCommandOpen }) => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed left-0 right-0 top-0 z-[900] border-b transition-all duration-300 ${
        sticky
          ? 'border-white/10 bg-slate-950/80 shadow-[0_8px_32px_rgba(2,6,23,0.45)] backdrop-blur-xl'
          : 'border-transparent bg-slate-950/40 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[4.5rem] md:px-6">
        <a href="#home" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 text-sm font-black text-white">
            SK
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold text-white md:text-base">{profile.name}</span>
            <span className="block text-xs text-slate-500">Portfolio</span>
          </span>
        </a>

        <div className="hidden items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 lg:flex">
          {menuLinks.map((menu) => (
            <a
              key={menu.name}
              href={menu.link}
              className="rounded-full px-3.5 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              {menu.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={onCommandOpen}
            className="btn-ghost gap-2 py-2 text-slate-300"
            aria-label="Open command menu"
          >
            <span className="kbd">{isMac ? '⌘' : 'Ctrl'}</span>
            <span className="kbd">K</span>
          </button>
          <PortfolioPdfButton
            className="btn-ghost hidden py-2 lg:inline-flex"
            label="Download PDF"
            compact
          />
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200 lg:hidden"
          aria-expanded={isOpen}
        >
          Menu
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="grid gap-1">
            {menuLinks.map((menu) => (
              <a
                key={menu.name}
                href={menu.link}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-slate-200 hover:bg-white/[0.06]"
              >
                {menu.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onCommandOpen();
              }}
              className="rounded-lg px-3 py-3 text-left text-cyan-300 hover:bg-white/[0.06]"
            >
              Command palette (⌘K)
            </button>
            <PortfolioPdfButton
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 text-left text-sm font-semibold text-white"
              label="Download Portfolio PDF"
              compact
            />
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
