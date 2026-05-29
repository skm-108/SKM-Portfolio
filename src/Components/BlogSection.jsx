import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { blogPosts, featuredLinkedInPost } from '../Data/blogPosts';
import SectionHeader from './SectionHeader';

const tagClass =
  'rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[0.68rem] font-medium text-slate-400';

const NativePostModal = ({ post, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[970] flex items-end justify-center bg-slate-950/85 p-4 sm:items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onMouseDown={onClose}
  >
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.2 }}
      className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-xl md:p-8"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            {post.platform}
          </p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{post.title}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200"
        >
          Close
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span key={tag} className={tagClass}>
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-4 border-t border-white/[0.08] pt-6">
        {post.content.map((paragraph) => (
          <p key={paragraph} className="text-base leading-8 text-slate-300">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.article>
  </motion.div>
);

const FeaturedLinkedInCard = () => (
  <motion.article
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.35 }}
    className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5 md:p-6 lg:col-span-2"
  >
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          {featuredLinkedInPost.platform} Featured
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">{featuredLinkedInPost.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          {featuredLinkedInPost.summary}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          {featuredLinkedInPost.note}
        </p>
      </div>
      <a
        href={featuredLinkedInPost.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary shrink-0 px-5 py-3"
      >
        View Featured Post
      </a>
    </div>
  </motion.article>
);

const BlogCard = ({ post, index, onRead }) => {
  const hasExternalLink = post.type === 'external' && post.url;
  const isNative = post.type === 'native';

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
          {post.platform}
        </p>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-medium text-slate-300">
          {post.status}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug text-white">{post.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{post.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
        {post.tags?.map((tag) => (
          <span key={tag} className={tagClass}>
            {tag}
          </span>
        ))}
      </div>

      {isNative ? (
        <button
          type="button"
          onClick={() => onRead(post)}
          className="btn-ghost mt-5 self-start py-2 text-xs"
        >
          Read on Portfolio
        </button>
      ) : hasExternalLink ? (
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mt-5 self-start py-2 text-xs"
        >
          Read External Blog
        </a>
      ) : (
        <span className="mt-5 self-start rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-medium text-slate-500">
          Add blog link in blogPosts.js
        </span>
      )}
    </motion.article>
  );
};

const BlogSection = () => {
  const [activePost, setActivePost] = useState(null);

  return (
    <section id="blog" className="px-4 py-24 text-white md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Blog"
          title="Writing and technical posts."
          description="Add a featured LinkedIn post, link Medium or external blogs, or write native portfolio posts directly from one data file."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <FeaturedLinkedInCard />
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.title}
              post={post}
              index={index + 1}
              onRead={setActivePost}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activePost && <NativePostModal post={activePost} onClose={() => setActivePost(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
