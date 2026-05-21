import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import profile from '../Data/profile';
import SectionHeader from './SectionHeader';

const initialForm = { name: '', email: '', message: '' };

const ContactMe = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const sendWithEmailJs = async () => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) return false;

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: profile.email
        }
      })
    });

    if (!response.ok) throw new Error('EmailJS request failed');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setToast('');

    try {
      const sent = await sendWithEmailJs();
      if (sent) {
        setToast('Message sent successfully.');
        setForm(initialForm);
      } else {
        const subject = encodeURIComponent(`Portfolio query from ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setToast('Email client opened. Add EmailJS env keys for direct in-site sending.');
      }
    } catch {
      setToast('Could not send directly. Opening email client instead.');
      const subject = encodeURIComponent(`Portfolio query from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="px-4 py-24 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build the next AI system."
          description="For internships, AI engineering roles, cybersecurity collaborations, or product ideas, send a message directly from here."
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] card p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Contact</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">Open to opportunities</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">For AI engineering, frontend systems, or full-stack roles — send a brief note and I’ll reply with a focused portfolio summary.</p>

            <div className="mt-6 grid gap-3">
              {[
                ['Email', profile.email, `mailto:${profile.email}`],
                ['LinkedIn', 'LinkedIn', profile.linkedin],
                ['GitHub', 'GitHub', profile.github]
              ].map(([label, text, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl card p-4 transition"
                >
                  <span>
                    <span className="block text-sm font-semibold text-white">{label}</span>
                    <span className="block text-xs text-slate-400">{text}</span>
                  </span>
                  <span className="text-sm text-cyan-300">Open</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-[2rem] card p-5 md:p-7"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                Name
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-accent"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-accent"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm text-slate-300">
              Message
              <textarea
                required
                name="message"
                value={form.message}
                onChange={updateField}
                rows={7}
                className="resize-none rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-accent"
                placeholder="Tell me about the role, project, or opportunity..."
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full btn-accent px-6 py-3 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send message'}
            </button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[980] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-sm text-white soft-shadow"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactMe;
