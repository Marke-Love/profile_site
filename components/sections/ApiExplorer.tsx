"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  cases, contacts, jobs, languages, metrics, person, stack, ui, type Lang,
} from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Endpoint = { path: string; ms: number; build: (lang: Lang) => unknown };

const endpoints: Endpoint[] = [
  {
    path: "/about",
    ms: 18,
    build: (l) => ({
      name: person.full[l],
      role: person.role[l],
      grade: person.grade[l],
      experience: person.tenure[l],
      location: person.city[l],
      status: person.status[l],
      languages: languages.map((x) => `${x.name[l]} — ${x.level[l]}`),
    }),
  },
  {
    path: "/experience",
    ms: 34,
    build: (l) =>
      jobs.map((job) => ({
        company: job.company[l],
        position: job.position[l],
        period: job.period[l],
        duration: job.duration[l],
        highlights: job.achievements.length,
        stack: job.stack,
      })),
  },
  {
    path: "/impact",
    ms: 11,
    build: (l) =>
      metrics.map((m) => ({
        metric: m.label[l],
        ...(m.from !== undefined ? { before: m.from } : {}),
        value: `${m.prefix ?? ""}${m.to}${m.suffix[l]}`,
      })),
  },
  {
    path: "/cases",
    ms: 27,
    build: (l) =>
      cases.map((c) => ({
        title: c.title[l],
        at: c.at[l],
        unit: c.chart.unit[l],
        before: c.chart.before,
        after: c.chart.after,
      })),
  },
  {
    path: "/stack",
    ms: 9,
    build: (l) =>
      Object.fromEntries(stack.map((g) => [g.label[l], g.items.map((i) => i.name)])),
  },
  {
    path: "/contact",
    ms: 14,
    build: () => ({
      phone: contacts.phone.value,
      email: contacts.email.value,
      telegram: contacts.telegram.value,
      github: contacts.github.href,
    }),
  },
];

/** Minimal JSON colouring: keys quiet, strings bright, numbers amber. */
function highlight(line: string) {
  const parts: { text: string; className: string }[] = [];
  const pattern = /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(\b-?\d+(?:\.\d+)?\b)|(true|false|null)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line))) {
    if (match.index > last) parts.push({ text: line.slice(last, match.index), className: "text-line-strong" });
    if (match[1]) parts.push({ text: match[1], className: "text-muted" });
    else if (match[2]) parts.push({ text: match[2], className: "text-text" });
    else if (match[3]) parts.push({ text: match[3], className: "text-amber" });
    else parts.push({ text: match[4], className: "text-acid" });
    last = match.index + match[0].length;
  }
  if (last < line.length) parts.push({ text: line.slice(last), className: "text-line-strong" });
  return parts;
}

export function ApiExplorer() {
  const { t, lang } = useLang();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(endpoints[0].path);
  const [pending, setPending] = useState(false);

  const endpoint = endpoints.find((e) => e.path === active) ?? endpoints[0];

  // The pending flash starts from the click, not from an effect.
  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => setPending(false), 420);
    return () => window.clearTimeout(timer);
  }, [pending]);

  const select = (path: string) => {
    setActive(path);
    if (!reduced) setPending(true);
  };

  const lines = useMemo(
    () => JSON.stringify(endpoint.build(lang), null, 2).split("\n"),
    [endpoint, lang],
  );

  return (
    <section id="api" className="scroll-mt-24 border-y hair bg-panel/30 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading eyebrow={t(ui.api.eyebrow)} meta={`${endpoints.length} endpoints`}>
          {t(ui.api.heading)}
        </SectionHeading>

        <Reveal>
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="t-mono mb-4 text-muted">{t(ui.api.hint)}</p>
              <ul className="space-y-1.5">
                {endpoints.map((item) => {
                  const on = item.path === active;
                  return (
                    <li key={item.path}>
                      <button
                        type="button"
                        onClick={() => select(item.path)}
                        aria-pressed={on}
                        className={`flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left font-mono text-sm transition-colors ${
                          on
                            ? "border-acid/50 bg-acid/5 text-acid"
                            : "hair bg-panel/50 text-muted hover:border-line-strong hover:text-text"
                        }`}
                      >
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider ${
                            on ? "bg-acid text-ink" : "bg-panel-2 text-line-strong"
                          }`}
                        >
                          GET
                        </span>
                        {item.path}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-lg border hair bg-ink">
                <div className="flex items-center justify-between gap-4 border-b hair bg-panel/60 px-4 py-2.5">
                  <span className="font-mono text-xs text-muted">
                    GET <span className="text-text">{endpoint.path}</span>
                  </span>
                  <span className="flex items-center gap-3 font-mono text-xs">
                    {pending ? (
                      <span className="text-muted">{t(ui.api.sending)}…</span>
                    ) : (
                      <>
                        <span className="text-acid">200 OK</span>
                        <span className="text-line-strong">{endpoint.ms} ms</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="max-h-[22rem] overflow-auto p-4">
                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={`${endpoint.path}-${lang}-${pending}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-mono text-[12.5px] leading-relaxed"
                    >
                      {pending
                        ? null
                        : lines.map((line, index) => (
                            <motion.div
                              key={`${index}-${line}`}
                              initial={reduced ? false : { opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.25,
                                delay: reduced ? 0 : Math.min(index * 0.012, 0.5),
                              }}
                            >
                              {highlight(line).map((part, partIndex) => (
                                <span key={partIndex} className={part.className}>
                                  {part.text}
                                </span>
                              ))}
                              {line === "" ? " " : null}
                            </motion.div>
                          ))}
                    </motion.pre>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
