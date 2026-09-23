"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { person, sections } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";
import { Cursor } from "./Cursor";
import { LangSwitch } from "./LangSwitch";

export function SiteChrome() {
  useSmoothScroll();
  const { t } = useLang();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });
  const [active, setActive] = useState<string>(sections[0].id);
  const [past, setPast] = useState(false);

  // Scroll spy. A band across the upper third decides which section owns
  // the rail, which matches where the eye actually is while reading.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === active));
  const progressOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <>
      <Cursor />

      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-acid"
        style={{ scaleX, opacity: progressOpacity }}
      />

      {/* Top bar: stays out of the way until the hero is behind you. */}
      <motion.header
        className="fixed inset-x-0 top-0 z-40 border-b border-transparent"
        animate={{
          backgroundColor: past ? "rgba(7,9,12,0.72)" : "rgba(7,9,12,0)",
          borderBottomColor: past ? "#1b2027" : "rgba(27,32,39,0)",
        }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: past ? "blur(12px)" : "none" }}
      >
        <div className="flex items-center justify-between px-[var(--gutter)] py-4">
          <motion.a
            href="#top"
            className="t-mono text-muted transition-colors hover:text-text"
            animate={{ opacity: past ? 1 : 0, y: past ? 0 : -6 }}
            transition={{ duration: 0.3 }}
            aria-hidden={!past}
            tabIndex={past ? 0 : -1}
          >
            {t(person.last)} — {t(person.role)}
          </motion.a>
          <LangSwitch />
        </div>
      </motion.header>

      {/* Left rail: a section index, always showing where you are. */}
      <motion.nav
        aria-label={t({ ru: "Разделы", en: "Sections" })}
        className="fixed left-0 top-0 z-40 hidden h-dvh w-[var(--rail)] flex-col items-center justify-center border-r hair min-[1100px]:flex"
        animate={{ opacity: past ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: past ? "auto" : "none" }}
      >
        <ul className="flex flex-col items-center gap-5">
          {sections.map(({ id, label }) => {
            const on = id === active;
            return (
              <li key={id} className="group relative flex items-center">
                <a
                  href={`#${id}`}
                  className="block py-1"
                  aria-current={on ? "true" : undefined}
                  aria-label={t(label)}
                >
                  <span
                    className={`block h-px transition-all duration-300 ${
                      on ? "w-7 bg-acid" : "w-3.5 bg-line-strong group-hover:w-5 group-hover:bg-muted"
                    }`}
                  />
                </a>
                <span className="pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded border hair bg-panel px-2 py-1 t-mono text-text opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {t(label)}
                </span>
              </li>
            );
          })}
        </ul>
        <span className="t-num absolute bottom-8 text-xs text-muted">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="text-line-strong">/{String(sections.length).padStart(2, "0")}</span>
        </span>
      </motion.nav>
    </>
  );
}
