import { profile } from '../Data/profile';
import projects from '../Data/projects';
import portrait from '../assets/photo_2026-05-21_10-10-20.jpg';

const metrics = [
  ['9.1', 'CGPA'],
  ['60%', 'anomaly reduction (DRDO)'],
  ['25%', 'spam detection lift'],
  ['Top 700', 'Agentic AI hackathon']
];

const PdfSectionTitle = ({ eyebrow, title, description }) => (
  <header className="pdf-section-header">
    {eyebrow && <p className="pdf-eyebrow">{eyebrow}</p>}
    <h2 className="pdf-h2">{title}</h2>
    {description && <p className="pdf-lead">{description}</p>}
  </header>
);

const PdfProjectCard = ({ project, compact = false }) => (
  <article className={`pdf-project-card ${compact ? 'pdf-project-card--compact' : ''}`}>
    <div className="pdf-project-media">
      <img src={project.img} alt="" className="pdf-project-thumb" />
      {project.logo && <img src={project.logo} alt="" className="pdf-project-logo" />}
    </div>
    <div className="pdf-project-body">
      <p className="pdf-meta">
        {project.category} · {project.date}
      </p>
      <h3 className="pdf-h3">{project.name}</h3>
      <p className="pdf-body">{project.description}</p>
      <p className="pdf-impact">
        <span className="pdf-impact-label">Impact. </span>
        {project.impact}
      </p>
      {!compact && (
        <ul className="pdf-list">
          {(project.features || []).slice(0, 2).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
      <div className="pdf-tags">
        {(project.tech || []).slice(0, compact ? 5 : 7).map((t) => (
          <span key={t} className="pdf-tag">
            {t}
          </span>
        ))}
      </div>
      {project.github_link && <p className="pdf-link">{project.github_link}</p>}
    </div>
  </article>
);

const PdfExperienceRow = ({ item, index }) => {
  const year = (item.period.match(/\d{4}/) || [item.period])[0];
  const isLeft = index % 2 === 0;

  return (
    <div className="pdf-exp-row">
      <div className="pdf-exp-col pdf-exp-col--left">
        {isLeft ? <PdfExperienceCard item={item} align="left" /> : null}
      </div>
      <div className="pdf-exp-col pdf-exp-col--center">
        <span className="pdf-exp-year">{year}</span>
        <span className="pdf-exp-node" />
        <span
          className={`pdf-exp-branch ${isLeft ? 'pdf-exp-branch--left' : 'pdf-exp-branch--right'}`}
          aria-hidden
        />
      </div>
      <div className="pdf-exp-col pdf-exp-col--right">
        {!isLeft ? <PdfExperienceCard item={item} align="right" /> : null}
      </div>
    </div>
  );
};

const PdfExperienceCard = ({ item, align }) => (
  <article className={`pdf-exp-card pdf-exp-card--${align}`}>
    <div className={`pdf-exp-head ${align === 'right' ? 'pdf-exp-head--reverse' : ''}`}>
      {item.logo && <img src={item.logo} alt="" className="pdf-exp-logo"  />}
      <div>
        <p className="pdf-meta">{item.period}</p>
        <h3 className="pdf-h3 pdf-h3--sm">{item.role}</h3>
        <p className="pdf-meta">
          {item.company} · {item.location}
        </p>
      </div>
    </div>
    <ul className="pdf-list pdf-list--compact">
      {item.highlights.map((h) => (
        <li key={h}>{h}</li>
      ))}
    </ul>
  </article>
);

const PortfolioPdfDocument = () => (
  <div id="portfolio-pdf-export" className="pdf-export-root" aria-hidden="true">
    {/* Page 1 — Hero & About */}
    <section className="pdf-export-page" data-pdf-page="1">
      <div className="pdf-page-inner">
        <div className="pdf-header-bar">
          <div className="pdf-brand">
            <span className="pdf-monogram">SK</span>
            <div>
              <h1 className="pdf-name">{profile.name}</h1>
              <p className="pdf-title">{profile.title}</p>
            </div>
          </div>
          <div className="pdf-contact-chips">
            <span>{profile.email}</span>
            <span>{profile.phone}</span>
            <span>{profile.location}</span>
          </div>
        </div>

        <div className="pdf-hero-grid">
          <div className="pdf-portrait-wrap">
            <img src={portrait} alt={profile.name} className="pdf-portrait"  />
            <div className="pdf-portrait-caption">
              <p className="pdf-caption-name">{profile.name}</p>
              <p className="pdf-caption-role">AI Engineer Portfolio · 2026</p>
            </div>
          </div>
          <div className="pdf-hero-copy">
            <p className="pdf-eyebrow">Portfolio · 2026</p>
            <h2 className="pdf-hero-headline">
              AI and security engineering for production systems.
            </h2>
            <p className="pdf-lead">{profile.tagline}</p>
            <p className="pdf-meta">{profile.title}</p>
            <div className="pdf-metrics">
              {metrics.map(([value, label]) => (
                <div key={label} className="pdf-metric">
                  <p className="pdf-metric-value">{value}</p>
                  <p className="pdf-metric-label">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pdf-divider" />

        <div className="pdf-about-panel">
          <h2 className="pdf-h2">About</h2>
          <p className="pdf-lead pdf-lead--tight">{profile.summary}</p>
          <h3 className="pdf-h3 pdf-h3--sm pdf-about-sub">Selected outcomes</h3>
          <ul className="pdf-list pdf-list--about">
            {profile.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <footer className="pdf-page-footer">
          <span>{profile.name}</span>
          <span>Page 1</span>
          <span>{profile.linkedin.replace('https://', '')}</span>
        </footer>
      </div>
    </section>

    {/* Page 2 — Skills */}
    <section className="pdf-export-page" data-pdf-page="2">
      <div className="pdf-page-inner">
        <PdfSectionTitle
          eyebrow="Skills"
          title="Technical scope."
          description="AI/ML, RAG, security, and full-stack delivery."
        />

        <div className="pdf-skills-grid">
          {profile.skillGroups.map((group) => (
            <article key={group.title} className="pdf-skill-card">
              <h3 className="pdf-h3 pdf-h3--sm">{group.title}</h3>
              <div className="pdf-tags">
                {group.skills.map((skill) => (
                  <span key={skill} className="pdf-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="pdf-two-col">
          <div className="pdf-panel">
            <h3 className="pdf-h3 pdf-h3--sm">Certifications</h3>
            <ul className="pdf-list pdf-list--compact">
              {profile.certifications.map((c) => (
                <li key={c.title || c}>
                  {typeof c === 'string' ? c : `${c.title} - ${c.issuer}`}
                </li>
              ))}
            </ul>
          </div>
          <div className="pdf-panel">
            <h3 className="pdf-h3 pdf-h3--sm">Signals & achievements</h3>
            <ul className="pdf-list pdf-list--compact">
              {profile.achievements.map((a) => (
                <li key={a.title || a}>
                  {typeof a === 'string' ? a : `${a.title} - ${a.detail}`}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pdf-panel pdf-education">
          <h3 className="pdf-h3 pdf-h3--sm">Education</h3>
          {profile.education.map((edu) => (
            <div key={edu.school} className="pdf-edu-row">
              <p className="pdf-edu-school">{edu.school}</p>
              <p className="pdf-body">{edu.degree}</p>
              <p className="pdf-meta">
                {edu.period || edu.location} · {edu.details}
              </p>
            </div>
          ))}
        </div>

        <footer className="pdf-page-footer">
          <span>{profile.name}</span>
          <span>Page 2 · Skills</span>
          <span>{profile.github.replace('https://', '')}</span>
        </footer>
      </div>
    </section>

    {/* Page 3 — Projects (1–2) */}
    <section className="pdf-export-page" data-pdf-page="3">
      <div className="pdf-page-inner">
        <PdfSectionTitle
          eyebrow="Projects"
          title="Systems built for real constraints."
          description="Representative repositories for technical review."
        />
        <div className="pdf-projects-stack">
          {projects.slice(0, 2).map((p) => (
            <PdfProjectCard key={p.name} project={p} />
          ))}
        </div>
        <footer className="pdf-page-footer">
          <span>{profile.name}</span>
          <span>Page 3 · Projects</span>
          <span>{profile.email}</span>
        </footer>
      </div>
    </section>

    {/* Page 4 — Projects (3–5) */}
    <section className="pdf-export-page" data-pdf-page="4">
      <div className="pdf-page-inner">
        <PdfSectionTitle eyebrow="Projects" title="Continued." />
        <div className="pdf-projects-stack pdf-projects-stack--dense">
          {projects.slice(2).map((p) => (
            <PdfProjectCard key={p.name} project={p} compact />
          ))}
        </div>
        <footer className="pdf-page-footer">
          <span>{profile.name}</span>
          <span>Page 4 · Projects</span>
          <span>{profile.email}</span>
        </footer>
      </div>
    </section>

    {/* Page 5 — Experience tree timeline */}
    <section className="pdf-export-page" data-pdf-page="5">
      <div className="pdf-page-inner">
        <PdfSectionTitle
          eyebrow="Experience"
          title="Roles across defense, infrastructure, and community."
          description="One timeline — roles branch left and right by period."
        />

        <div className="pdf-exp-timeline">
          <span className="pdf-exp-spine" aria-hidden />
          {profile.experience.map((item, index) => (
            <PdfExperienceRow key={item.company} item={item} index={index} />
          ))}
        </div>

        <footer className="pdf-page-footer">
          <span>{profile.name}</span>
          <span>Page 5 · Experience</span>
          <span>{profile.email}</span>
        </footer>
      </div>
    </section>

    {/* Page 6 — Contact */}
    <section className="pdf-export-page" data-pdf-page="6">
      <div className="pdf-page-inner pdf-page-inner--contact">
        <PdfSectionTitle
          eyebrow="Contact"
          title="Get in touch."
          description="Open to AI engineering, full-stack, and security roles."
        />

        <div className="pdf-contact-grid">
          <div className="pdf-contact-card">
            <p className="pdf-eyebrow">Email</p>
            <p className="pdf-contact-value">{profile.email}</p>
          </div>
          <div className="pdf-contact-card">
            <p className="pdf-eyebrow">Phone</p>
            <p className="pdf-contact-value">{profile.phone}</p>
          </div>
          <div className="pdf-contact-card">
            <p className="pdf-eyebrow">Location</p>
            <p className="pdf-contact-value">{profile.location}</p>
          </div>
          <div className="pdf-contact-card pdf-contact-card--wide">
            <p className="pdf-eyebrow">LinkedIn</p>
            <p className="pdf-contact-value pdf-link">{profile.linkedin}</p>
          </div>
          <div className="pdf-contact-card pdf-contact-card--wide">
            <p className="pdf-eyebrow">GitHub</p>
            <p className="pdf-contact-value pdf-link">{profile.github}</p>
          </div>
        </div>

        <div className="pdf-closing">
          <p className="pdf-closing-name">{profile.name}</p>
          <p className="pdf-closing-title">{profile.title}</p>
          <p className="pdf-body">
            Portfolio export · {new Date().getFullYear()} · Generated from skmportfolio
          </p>
        </div>

        <footer className="pdf-page-footer">
          <span>{profile.name}</span>
          <span>Page 6 · Contact</span>
          <span>{profile.email}</span>
        </footer>
      </div>
    </section>
  </div>
);

export default PortfolioPdfDocument;
