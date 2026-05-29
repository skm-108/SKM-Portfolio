import { useCallback, useEffect, useState } from 'react';
import About from './Components/About';
import AIAssistant from './Components/AIAssistant';
import BlogSection from './Components/BlogSection';
import CommandMenu from './Components/CommandMenu';
import ContactMe from './Components/ContactMe';
import CursorGlow from './Components/CursorGlow';
import ExperienceTimeline from './Components/ExperienceTimeline';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import MyProjects from './Components/MyProjects';

import Navbar from './Components/Navbar';
import NeuralBackground from './Components/NeuralBackground';
import PortfolioPdfExporter from './Components/PortfolioPdfExporter';
import Resume from './Components/Resume';
import SkillsSection from './Components/SkillsSection';

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const openCommand = useCallback(() => setCommandOpen(true), []);
  const closeCommand = useCallback(() => setCommandOpen(false), []);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <NeuralBackground />
      <CursorGlow />
      <Navbar onCommandOpen={openCommand} />
      <main>
        <Hero />
        <About />
        <ExperienceTimeline />
        <MyProjects />
        <SkillsSection />
        <BlogSection />
        <Resume />
        <ContactMe />
      </main>
      <Footer />
      <AIAssistant />
      <PortfolioPdfExporter />
      <CommandMenu open={commandOpen} onClose={closeCommand} />
    </div>
  );
}

export default App;
