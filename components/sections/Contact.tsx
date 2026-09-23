"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contacts, person, ui } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { CopyRow } from "@/components/ui/CopyRow";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";

function Marquee() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const word = t(ui.contact.marquee);
  const run = Array.from({ length: 6 });

  return (
    <div aria-hidden className="overflow-hidden border-y hair py-5">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {[...run, ...run].map((_, index) => (
          <span key={index} className="t-display text-[clamp(1.6rem,4vw,3.2rem)] text-line-strong">
            {word}
            <span className="ml-10 text-acid">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Contact() {
  const { t } = useLang();

  const rows = [
    { label: t({ ru: "Телефон", en: "Phone" }), ...contacts.phone },
    { label: "Email", ...contacts.email },
    { label: "Telegram", ...contacts.telegram },
    { label: "GitHub", ...contacts.github },
  ];

  return (
    <section id="contact" className="scroll-mt-24 pt-24 sm:pt-32">
      <Marquee />

      <div className="shell py-20 sm:py-28">
        {/* The headline spans the full measure so it can stay poster-sized. */}
        <Reveal>
          <p className="t-mono mb-6 text-acid">{t(ui.contact.eyebrow)}</p>
          <h2 className="t-display text-[clamp(2.2rem,8.6vw,7.5rem)]">{t(ui.contact.heading)}</h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <Magnetic className="inline-block">
                <a
                  href={contacts.telegram.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 t-mono text-ink transition-transform hover:scale-[1.02]"
                >
                  {t(ui.hero.writeTg)}
                  <span aria-hidden>↗</span>
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.12}>
              <div className="border-b hair">
                {rows.map((row) => (
                  <CopyRow key={row.label} label={row.label} value={row.value} href={row.href} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <footer className="border-t hair">
        <div className="shell py-7">
          <p className="t-mono text-line-strong">
            {t(person.full)} · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </section>
  );
}
