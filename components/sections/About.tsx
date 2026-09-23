"use client";

import { person, preferences, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="shell scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow={t(ui.about.eyebrow)}
        meta={`${t(person.grade)} · ${t(person.tenure)}`}
      >
        {t(ui.about.heading)}
      </SectionHeading>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-balance text-xl leading-relaxed text-text sm:text-2xl">
              {t(person.summary)}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-muted sm:text-lg">
              {t(person.summary2)}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.12}>
            <dl className="divide-y divide-[var(--color-line)] border-y hair">
              {preferences.map((item) => (
                <div key={item.label.en} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="t-mono shrink-0 text-muted">{t(item.label)}</dt>
                  <dd className="text-right text-sm text-text">{t(item.value)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
