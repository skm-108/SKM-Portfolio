import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionHeader from './SectionHeader';
import useLinkedInProfile from '../Hooks/useLinkedInProfile';

const LinkedInInsights = () => {
  const { linkedin, status } = useLinkedInProfile();
  const posts = linkedin.featuredPosts || [];
  const proof = linkedin.socialProof || [];

  return (
    <section id="blog" className="px-4 py-24 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Latest thoughts / posts"
          title="A blog section powered by LinkedIn-ready content."
          description="LinkedIn blocks unauthenticated public API access, so this section fetches a local JSON fallback now and can be pointed at a real LinkedIn proxy API later."
        />

        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.aside
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={linkedin.profileImage}
                alt={`${linkedin.name} LinkedIn profile`}
                className="h-20 w-20 rounded-3xl card object-cover"
              />
              <div>
                <p className="text-xl font-semibold text-white">{linkedin.name}</p>
                <p className="mt-1 text-sm text-slate-400">{linkedin.location}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 muted">{linkedin.headline}</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">{linkedin.about}</p>
            <div className="mt-5 inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
              LinkedIn mode: {status === 'live' ? 'live API' : 'manual fallback'}
            </div>

            <a
              href={linkedin.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full btn-accent px-5 py-2.5 text-sm font-semibold"
            >
              Open LinkedIn
            </a>
          </motion.aside>

          <div className="min-w-0">
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4200, disableOnInteraction: false }}
              spaceBetween={18}
              slidesPerView={1}
              breakpoints={{ 860: { slidesPerView: 2 } }}
              className="pb-12"
            >
              {posts.map((post, index) => (
                <SwiperSlide key={post.title} className="h-auto">
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="flex h-full min-h-[310px] flex-col rounded-[1.5rem] card p-5 transition hover:soft-shadow"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs muted">{post.type}</span>
                      <span className="text-xs text-slate-500">{post.date}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold leading-tight text-white">{post.title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{post.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-5 text-sm font-semibold accent hover:text-white">
                      View on LinkedIn
                    </a>
                  </motion.article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] accent">
            Social proof
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {proof.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-sm leading-6 text-slate-200"
              >
                <span className="mb-2 block text-xs accent">0{index + 1}</span>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkedInInsights;
