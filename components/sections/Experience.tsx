"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { jobs, ui, type Job } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TabId = "achievements" | "duties" | "stack";

function JobCard({ job }: { job: Job }) {
  const { t } = useLang();
  const [tab, setTab] = useState<TabId>("achievements");

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "achievements", label: t(ui.experience.achievements), count: job.achievements.length },
    { id: "duties", label: t(ui.experience.duties), count: job.duties.length },
    { id: "stack", label: t(ui.experience.stack), count: job.stack.length },
  ];

  return (
    <article className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      {/* Dates first: the reader wants the timeline before the story. */}
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <p className="t-mono text-acid">{t(job.period)}</p>
          <p className="t-mono mt-1 text-muted">{t(job.duration)}</p>
          <p className="t-mono mt-4 text-line-strong">{t(job.place)}</p>
        </div>
      </div>

      <div className="lg:col-span-9">
        <h3 className="t-heading text-[clamp(1.4rem,2.6vw,2.1rem)] text-text">{t(job.company)}</h3>
        <p className="mt-2 text-base text-muted">
          {t(job.position)}
          {job.companyNote ? <span className="text-line-strong"> · {t(job.companyNote)}</span> : null}
        </p>

        {(job.tags?.length || job.site) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {job.tags?.map((tag) => (
              <span
                key={tag.en}
                className="rounded-full border border-acid/30 bg-acid/5 px-3 py-1 t-mono text-acid"
              >
                {t(tag)}
              </span>
            ))}
            {job.site ? (
              <a
                href={job.site.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border hair px-3 py-1 t-mono text-muted transition-colors hover:border-acid hover:text-acid"
              >
                {job.site.label} ↗
              </a>
            ) : null}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-1 border-b hair pb-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              aria-pressed={tab === item.id}
              className={`relative rounded-full px-3.5 py-1.5 t-mono transition-colors ${
                tab === item.id ? "text-ink" : "text-muted hover:text-text"
              }`}
            >
              {tab === item.id && (
                <motion.span
                  layoutId={`tab-${job.id}`}
                  className="absolute inset-0 rounded-full bg-acid"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">
                {item.label}
                <span className={tab === item.id ? "text-ink/55" : "text-line-strong"}>
                  {" "}
                  {item.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === "stack" ? (
                <ul className="flex flex-wrap gap-2">
                  {job.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded border hair bg-panel px-3 py-1.5 font-mono text-xs text-text"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-4">
                  {(tab === "achievements" ? job.achievements : job.duties).map((line) => (
                    <li key={line.en} className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-[0.7rem] h-px w-5 shrink-0 bg-line-strong"
                      />
                      <span className="max-w-[68ch] text-[0.975rem] leading-relaxed text-muted">
                        {t(line)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

export function Experience() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <section id="experience" className="shell scroll-mt-24 py-24 sm:py-32">
      <SectionHeading eyebrow={t(ui.experience.eyebrow)} meta="2022 — 2026">
        {t(ui.experience.heading)}
      </SectionHeading>

      <div ref={ref} className="relative">
        {/* The line fills as you read down the timeline. */}
        <div aria-hidden className="absolute left-0 top-0 hidden h-full w-px bg-line lg:block">
          <motion.div className="h-full w-px origin-top bg-acid" style={{ scaleY }} />
        </div>

        <div className="space-y-20 lg:space-y-28 lg:pl-10">
          {jobs.map((job) => (
            <Reveal key={job.id}>
              <JobCard job={job} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
