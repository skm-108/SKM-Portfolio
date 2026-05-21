import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../Data/profile';
import SectionHeader from './SectionHeader';

const username = profile.github.split('/').filter(Boolean).pop();

const GitHubActivity = () => {
  const [data, setData] = useState({ user: null, repos: [], loading: true, error: '' });

  useEffect(() => {
    const loadGitHub = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error('GitHub API unavailable');
        }

        const [user, repos] = await Promise.all([userResponse.json(), reposResponse.json()]);
        setData({ user, repos, loading: false, error: '' });
      } catch (error) {
        setData({ user: null, repos: [], loading: false, error: error.message });
      }
    };

    loadGitHub();
  }, []);

  return (
    <section id="github" className="px-4 py-24 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Open source signal"
          title="Live GitHub activity."
          description="Public GitHub data is pulled at runtime, giving recruiters a current view of repositories and profile activity."
        />

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:p-7">
          {data.loading && <p className="text-slate-300">Loading GitHub activity...</p>}
          {data.error && <p className="text-amber-200">GitHub activity could not load right now. The portfolio still links directly to the profile.</p>}
          {data.user && (
            <>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  [data.user.public_repos, 'Public repos'],
                  [data.user.followers, 'Followers'],
                  [data.user.following, 'Following'],
                  [new Date(data.user.created_at).getFullYear(), 'GitHub since']
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                    <p className="text-3xl font-semibold text-white">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-4">
                {data.repos.map((repo, index) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 hover:border-white/40"
                  >
                    <span className="text-xs accent">0{index + 1}</span>
                    <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-white">{repo.name}</h3>
                    <p className="mt-3 text-xs text-slate-400">{repo.language || 'Repository'} | Updated {new Date(repo.updated_at).toLocaleDateString()}</p>
                  </motion.a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
