"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cases, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { BeforeAfter } from "@/components/charts/BeforeAfter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Cases() {
  const { t } = useLang();
  const [activeId, setActiveId] = useState(cases[0].id);
  const active = cases.find((item) => item.id === activeId) ?? cases[0];

  const blocks = [
    { label: t(ui.cases.problem), text: t(active.problem), tone: "text-muted" },
    { label: t(ui.cases.action), text: t(active.action), tone: "text-text" },
    { label: t(ui.cases.result), text: t(active.result), tone: "text-acid" },
  ];

  return (
    <section id="cases" className="shell scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow={t(ui.cases.eyebrow)}
        meta={`${cases.length} ${t({ ru: "задач", en: "cases" })}`}
      >
        {t(ui.cases.heading)}
      </SectionHeading>

      {/* Picker: each case is named by the change it made. */}
      <Reveal>
        <div className="mb-10">
          <div className="flex flex-wrap gap-2">
            {cases.map((item) => {
              const on = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={on}
                  className={`relative rounded-full border px-4 py-2 text-left text-sm transition-colors ${
                    on
                      ? "border-acid text-acid"
                      : "hair text-muted hover:border-line-strong hover:text-text"
                  }`}
                >
                  {t(item.title)}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 lg:grid-cols-12 lg:gap-14"
        >
          <div className="lg:col-span-7">
            <p className="t-mono mb-4 text-line-strong">{t(active.at)}</p>
            <h3 className="t-heading mb-8 text-[clamp(1.5rem,3vw,2.4rem)]">{t(active.title)}</h3>

            <div className="space-y-7">
              {blocks.map((block) => (
                <div key={block.label} className="border-l hair pl-5">
                  <p className="t-mono mb-2 text-muted">{block.label}</p>
                  <p className={`max-w-[62ch] leading-relaxed ${block.tone}`}>{block.text}</p>
                </div>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {active.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded border hair bg-panel px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <BeforeAfter chart={active.chart} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
