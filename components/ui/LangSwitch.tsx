"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/LanguageProvider";
import type { Lang } from "@/lib/content";

const options: Lang[] = ["ru", "en"];

export function LangSwitch() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="relative flex items-center gap-0.5 rounded-full border hair bg-panel/90 p-0.5"
      role="group"
      aria-label="Language"
    >
      {options.map((option) => {
        const selected = option === lang;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={selected}
            aria-label={option === "ru" ? "Русский" : "English"}
            className={`relative rounded-full px-3 py-1 t-mono transition-colors ${
              selected ? "text-ink" : "text-muted hover:text-text"
            }`}
          >
            {selected && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-acid"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
