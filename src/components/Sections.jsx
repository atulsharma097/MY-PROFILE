import { profile } from "../data/content";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

const wrap = "relative px-6 py-24 md:px-12 lg:px-[7.5%]";

export function About() {
  return (
    <section id="about" className={`${wrap} border-t border-white/5`}>
      <p className="mb-3 font-ui text-xs tracking-[0.3em] text-ember">ABOUT ME</p>
      <h2 className="section-title">DESIGN WITH <span className="text-ember">PURPOSE</span></h2>
      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/80">{profile.about}</p>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className={`${wrap} border-t border-white/5`}>
      <p className="mb-3 font-ui text-xs tracking-[0.3em] text-ember">SERVICES</p>
      <h2 className="section-title">WHAT I <span className="text-ember">BUILD</span></h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {profile.services.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-white/20 bg-white/[0.03] p-6 transition hover:border-ember/70 hover:shadow-[0_0_30px_rgba(255,77,13,0.25)]"
          >
            <h3 className="font-['Oswald'] text-base font-semibold text-white">
              {s.title}
            </h3>

            <p className="mt-1 text-[15px] text-neutral-300">{s.tech.join(" · ")}</p>

            <p className="mt-4 text-[15px] text-neutral-100">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className={`${wrap} border-t border-white/5`}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="mb-3 font-ui text-xs tracking-[0.3em] text-ember">SELECTED WORK</p>
          <h2 className="section-title">LATEST <span className="text-ember">PROJECTS</span></h2>
        </div>
        <p className="max-w-md text-sm text-white/60">
          Click any project card to open the live application directly, or inspect the source code.
        </p>
      </div>

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {profile.work.map((item, idx) => {
          const project = typeof item === "string" ? { title: item } : item;
          const href = project.link || project.url || project.github || "#";

          return (
            <article
              key={project.title || idx}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] transition-all duration-300 hover:-translate-y-1.5 hover:border-ember/70 hover:shadow-[0_0_35px_rgba(255,77,13,0.3)]"
            >
              {/* Media Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#150a04]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1f0d04] to-black p-6 text-center">
                    <span className="font-ui text-2xl font-bold tracking-wider text-white/30">
                      {project.title}
                    </span>
                  </div>
                )}

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/25 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-50" />

                {/* Top Floating Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                  {project.category ? (
                    <span className="rounded-full border border-white/15 bg-black/70 px-3 py-1 font-ui text-[11px] font-medium tracking-[0.18em] text-neutral-300 backdrop-blur-md">
                      {project.category.toUpperCase()}
                    </span>
                  ) : <span />}

                  {project.link && (
                    <span className="flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember/15 px-2.5 py-1 font-ui text-[10px] font-semibold tracking-wider text-ember backdrop-blur-md shadow-[0_0_12px_rgba(255,77,13,0.35)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
                      LIVE DEMO
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
                <div>
                  {/* Tech stack badges */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-sans text-[11px] text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-['Oswald'] text-2xl font-bold tracking-wide text-white transition-colors duration-200 group-hover:text-ember">
                    {project.title}
                  </h3>

                  {/* Description */}
                  {project.description && (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>

                {/* Action footer */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-ui text-xs font-semibold tracking-[0.2em] text-ember transition-all duration-200 hover:text-ember-soft hover:underline"
                  >
                    <span>OPEN PROJECT</span>
                    <FiArrowUpRight className="text-base transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 transition-colors duration-200 hover:text-white hover:drop-shadow-[0_0_8px_#ff4d0d]"
                      aria-label={`${project.title} GitHub Source`}
                      title="View GitHub Repository"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiGithub className="text-lg" />
                    </a>
                  )}
                </div>
              </div>

              {/* Main Card Direct Click Overlay */}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0"
                aria-label={`Open ${project.title}`}
                tabIndex={-1}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className={`${wrap} border-t border-white/5 pb-32`}>
      <p className="mb-3 font-ui text-xs tracking-[0.3em] text-ember">CONTACT</p>
      <h2 className="section-title">LET'S BUILD SOMETHING <span className="text-ember">BOLD</span></h2>
      <a
        href={`mailto:${profile.email}`}
        className="mt-8 inline-block rounded-full bg-gradient-to-r from-ember to-ember-soft px-8 py-3 font-ui text-sm font-semibold tracking-[0.15em] shadow-[0_0_25px_rgba(255,77,13,0.55)] transition hover:scale-105"
      >
        {profile.email.toUpperCase()}
      </a>
    </section>
  );
}