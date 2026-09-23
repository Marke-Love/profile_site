"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { trace, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { CountUp } from "@/components/ui/CountUp";

type Phase = "before" | "after";

/** Cumulative start offsets, the way a trace viewer lays out spans. */
function layout(phase: Phase) {
  let offset = 0;
  return trace.spans.map((span) => {
    const value = phase === "before" ? span.before : span.after;
    const start = offset;
    offset += value;
    return { start, value };
  });
}

export function LatencyTrace() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [autoPhase, setAutoPhase] = useState<Phase>("before");
  const [picked, setPicked] = useState<Phase | null>(null);
  const [drawnState, setDrawn] = useState(false);
  const [run, setRun] = useState(0);

  // With reduced motion the trace is simply shown in its final state.
  const phase = picked ?? (reduced ? "after" : autoPhase);
  const drawn = reduced ? true : drawnState;

  const replay = () => {
    setPicked(null);
    setAutoPhase("before");
    setDrawn(false);
    setRun((n) => n + 1);
  };

  // Play once: draw the slow trace, hold, then collapse it to the fast one.
  useEffect(() => {
    if (!inView || reduced) return;
    const a = window.setTimeout(() => setDrawn(true), 120);
    const b = window.setTimeout(() => setAutoPhase("after"), 1900);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [inView, reduced, run]);

  const spans = layout(phase);
  const total = phase === "before" ? trace.before : trace.after;
  const scale = trace.before;
  const isAfter = phase === "after";

  return (
    <div
      ref={ref}
      className="rounded-xl border hair bg-panel/80 p-4 sm:p-5"
      data-cursor
    >
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <span className="t-mono text-muted">{t(ui.hero.traceTitle)}</span>
        <span className="t-mono text-line-strong">trace</span>
      </div>

      <div className="space-y-1.5">
        {trace.spans.map((span, index) => {
          const { start, value } = spans[index];
          return (
            <div key={span.name.en} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-right font-mono text-[10px] text-muted sm:w-20 sm:text-[11px]">
                {t(span.name)}
              </span>
              <div className="relative h-5 flex-1 overflow-hidden rounded-sm bg-panel-2">
                <motion.div
                  className="absolute inset-y-0 rounded-sm"
                  initial={false}
                  animate={{
                    left: `${(start / scale) * 100}%`,
                    width: drawn ? `${(value / scale) * 100}%` : "0%",
                    backgroundColor: isAfter ? "#d2f94b" : "#ffa94d",
                    opacity: isAfter ? 0.92 : 0.7,
                  }}
                  transition={{
                    duration: reduced ? 0 : 0.6,
                    delay: reduced ? 0 : drawn && !isAfter ? index * 0.08 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
              <span className="w-12 shrink-0 text-right font-mono text-[10px] tabular-nums text-muted sm:text-[11px]">
                {value}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t hair pt-4">
        <div>
          <p className="t-mono mb-1 text-muted">
            {isAfter ? t(ui.hero.traceAfter) : t(ui.hero.traceBefore)}
          </p>
          <p
            className={`t-num text-[clamp(1.75rem,4vw,2.5rem)] leading-none transition-colors duration-500 ${
              isAfter ? "text-acid" : "text-amber"
            }`}
          >
            <CountUp key={`${total}-${run}`} from={isAfter ? trace.before : 0} to={total} />
            <span className="ml-1 text-base text-muted">{t({ ru: "мс", en: "ms" })}</span>
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-full border hair p-0.5">
          {(["before", "after"] as Phase[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPicked(option)}
              aria-pressed={phase === option}
              className={`rounded-full px-3 py-1 t-mono transition-colors ${
                phase === option ? "bg-line-strong text-text" : "text-muted hover:text-text"
              }`}
            >
              {option === "before" ? t({ ru: "до", en: "before" }) : t({ ru: "после", en: "after" })}
            </button>
          ))}
          <button
            type="button"
            onClick={replay}
            className="rounded-full px-3 py-1 t-mono text-muted transition-colors hover:text-acid"
          >
            {t({ ru: "заново", en: "replay" })}
          </button>
        </div>
      </div>
    </div>
  );
}
