import { profile } from '../Data/profile';

const Footer = () => (
  <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500 md:px-6">
    <p>Copyright (c) {new Date().getFullYear()} {profile.name}. Built for the AI era.</p>
  </footer>
);

export default Footer;
