"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { stack, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stack() {
  const { t } = useLang();
  const [group, setGroup] = useState<string>("all");

  const items = useMemo(
    () =>
      stack
        .filter((g) => group === "all" || g.id === group)
        .flatMap((g) => g.items.map((item) => ({ ...item, groupId: g.id, groupLabel: g.label }))),
    [group],
  );

  const total = stack.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <section id="stack" className="shell scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow={t(ui.stack.eyebrow)}
        meta={`${total} ${t({ ru: "технологий", en: "technologies" })}`}
      >
        {t(ui.stack.heading)}
      </SectionHeading>

      <Reveal>
        <div className="mb-8 flex flex-wrap gap-2">
          {[{ id: "all", label: ui.stack.all }, ...stack].map((option) => {
            const on = option.id === group;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setGroup(option.id)}
                aria-pressed={on}
                className={`rounded-full border px-4 py-1.5 t-mono transition-colors ${
                  on ? "border-acid bg-acid text-ink" : "hair text-muted hover:border-line-strong hover:text-text"
                }`}
              >
                {t(option.label)}
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.ul layout className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border hair bg-line sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.li
              key={item.name}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-ink p-5 transition-colors hover:bg-panel"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-base text-text transition-colors group-hover:text-acid">
                  {item.name}
                </span>
                <span className="t-mono text-line-strong">{t(item.groupLabel)}</span>
              </div>
              <p className="mt-2 text-sm leading-snug text-muted">{t(item.note)}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
