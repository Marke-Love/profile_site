"use client";

import { metrics, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function Impact() {
  const { t } = useLang();

  return (
    <section aria-label={t(ui.impact.eyebrow)} className="relative border-y hair bg-panel/40">
      <div className="shell py-10 sm:py-14">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <span className="t-mono text-acid">{t(ui.impact.eyebrow)}</span>
            <span className="t-mono text-muted">{t(ui.impact.note)}</span>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric, index) => (
            <li key={metric.id}>
              <Reveal delay={index * 0.06}>
                <div className="border-t hair pt-4">
                  {metric.from !== undefined && (
                    <p className="t-num mb-1 text-sm text-muted line-through decoration-amber/70">
                      {metric.from.toLocaleString("ru-RU")}
                    </p>
                  )}
                  <p className="t-num text-[clamp(1.9rem,3.6vw,3rem)] leading-none text-acid">
                    {metric.prefix}
                    <CountUp to={metric.to} decimals={metric.decimals ?? 0} />
                    <span className="ml-0.5 text-[0.42em] tracking-normal text-muted">
                      {t(metric.suffix)}
                    </span>
                  </p>
                  <p className="mt-3 text-sm leading-tight text-text">{t(metric.label)}</p>
                  <p className="mt-1 text-xs leading-tight text-muted">{t(metric.note)}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
