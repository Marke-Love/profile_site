"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contacts, person, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { LatencyTrace } from "@/components/charts/LatencyTrace";
import { Magnetic } from "@/components/ui/Magnetic";
import { Portrait } from "@/components/ui/Portrait";
import { SplitText } from "@/components/ui/SplitText";

function Backdrop() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #2b323c 1px, transparent 1px), linear-gradient(to bottom, #2b323c 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 7vw, 96px) clamp(48px, 7vw, 96px)",
          maskImage: "radial-gradient(120% 90% at 50% 0%, #000 20%, transparent 78%)",
        }}
      />
      <motion.div
        className="absolute -left-[12%] top-[-18%] h-[46vw] w-[46vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(210,249,75,0.16), transparent 68%)" }}
        animate={reduced ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[10%] top-[24%] h-[38vw] w-[38vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(255,169,77,0.12), transparent 70%)" }}
        animate={reduced ? undefined : { x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative flex min-h-dvh flex-col overflow-hidden">
      <Backdrop />

      <div className="shell relative flex flex-1 flex-col pb-8 pt-20 sm:pt-24">
        {/* Status line: the two facts a recruiter checks first. */}
        <motion.div
          className="flex items-center justify-between gap-4 border-b hair pb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="t-mono flex items-center gap-2 text-text">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            {t(person.status)}
          </span>
          <span className="t-mono text-muted">{t(person.city)}</span>
        </motion.div>

        {/* Name. The portrait sits on the baseline of the second line. */}
        <div className="mt-10 sm:mt-14">
          <motion.p
            className="t-mono mb-5 text-muted"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t(person.role)} · {t(person.grade)} · {t(person.tenure)}
          </motion.p>

          {/* Sized against Unbounded's real metrics: the longest name is
              ~8em wide at this weight and tracking, so the cap keeps it on
              one line at every breakpoint. */}
          <h1 className="t-display text-[clamp(2.1rem,9.2vw,8.5rem)]">
            <span className="block">
              <SplitText text={t(person.first)} delay={0.25} />
            </span>
            <span className="flex flex-wrap items-end gap-x-5 gap-y-3">
              <SplitText text={t(person.last)} delay={0.45} />
              <motion.span
                className="hidden lg:block"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <Portrait className="h-[clamp(4rem,7.5vw,7rem)] w-[clamp(3.4rem,6vw,5.6rem)]" />
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Pitch and the signature trace. */}
        <div className="mt-auto grid gap-10 pt-14 lg:grid-cols-12 lg:gap-12">
          <motion.div
            className="lg:col-span-6 xl:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex items-start gap-5">
              <Portrait className="h-24 w-20 shrink-0 lg:hidden" />
              <p className="max-w-[34ch] text-balance text-lg leading-snug text-text sm:text-xl">
                {t(person.tagline)}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={contacts.telegram.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-acid px-5 py-3 t-mono text-ink transition-transform hover:scale-[1.02]"
                >
                  {t(ui.hero.writeTg)}
                  <span aria-hidden>↗</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={contacts.phone.href}
                  className="inline-flex items-center gap-2 rounded-full border hair px-5 py-3 t-mono text-text transition-colors hover:border-acid hover:text-acid"
                >
                  {contacts.phone.value}
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 xl:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
          >
            <LatencyTrace />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
