"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Case } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";

/**
 * Two bars, one scale. Amber is the old number, lime is the new one —
 * the same colour language the metrics strip uses.
 */
export function BeforeAfter({ chart }: { chart: Case["chart"] }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  const scale = Math.max(chart.before, chart.after) || 1;
  const rows = [
    { key: "before", label: t(chart.beforeLabel), value: chart.before, color: "#ffa94d" },
    { key: "after", label: t(chart.afterLabel), value: chart.after, color: "#d2f94b" },
  ];

  const delta =
    chart.before === 0
      ? null
      : Math.round(Math.abs(chart.after - chart.before) / chart.before * 100);

  return (
    <div ref={ref} className="rounded-lg border hair bg-panel/60 p-5">
      <p className="t-mono mb-5 text-muted">{t(chart.unit)}</p>

      <div className="space-y-4">
        {rows.map((row, index) => (
          <div key={row.key}>
            <div className="mb-1.5 flex items-baseline justify-between gap-4">
              <span className="t-mono text-muted">{row.label}</span>
              <span
                className="t-num text-lg"
                style={{ color: row.key === "after" ? "#d2f94b" : "#79838f" }}
              >
                {row.value.toLocaleString("ru-RU")}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-panel-2">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: row.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${(row.value / scale) * 100}%` } : { width: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.9,
                  delay: reduced ? 0 : 0.15 + index * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {delta !== null && (
        <p className="t-mono mt-5 border-t hair pt-4 text-acid">
          {chart.lowerIsBetter ? "−" : "+"}
          {delta}% {chart.lowerIsBetter ? t({ ru: "времени", en: "time" }) : t({ ru: "покрытия", en: "coverage" })}
        </p>
      )}
    </div>
  );
}
