"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * The eyebrow carries a fact about the section (a count, a span of
 * years) rather than a decorative number.
 */
export function SectionHeading({
  eyebrow,
  meta,
  children,
}: {
  eyebrow: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <header className="mb-12 sm:mb-16">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b hair pb-4">
          <span className="t-mono text-acid">{eyebrow}</span>
          {meta ? <span className="t-mono text-muted">{meta}</span> : null}
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="t-heading mt-6 max-w-[16ch] text-[clamp(2rem,5.5vw,4.25rem)] sm:max-w-[22ch]">
          {children}
        </h2>
      </Reveal>
    </header>
  );
}
