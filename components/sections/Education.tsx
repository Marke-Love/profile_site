"use client";

import { education, languages, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  const { t } = useLang();

  return (
    <section id="education" className="shell scroll-mt-24 py-24 sm:py-32">
      <SectionHeading eyebrow={t(ui.education.eyebrow)} meta="2022 · 2024">
        {t(ui.education.heading)}
      </SectionHeading>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ul className="lg:col-span-8">
          {education.map((study, index) => (
            <li key={study.year}>
              <Reveal delay={index * 0.08}>
                <div className="grid gap-4 border-t hair py-7 sm:grid-cols-[6rem_1fr] sm:gap-8">
                  <div>
                    <p className="t-num text-2xl text-acid">{study.year}</p>
                    <p className="t-mono mt-1 text-muted">{t(study.degree)}</p>
                  </div>
                  <div>
                    <p className="text-lg leading-snug text-text">{t(study.school)}</p>
                    <p className="mt-1.5 text-sm text-muted">{t(study.faculty)}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-4">
          <Reveal delay={0.16}>
            <p className="t-mono mb-4 text-muted">{t(ui.education.languages)}</p>
            <ul className="divide-y divide-[var(--color-line)] border-y hair">
              {languages.map((language) => (
                <li key={language.name.en} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="text-base text-text">{t(language.name)}</span>
                  <span className="t-mono text-right text-muted">{t(language.level)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
