"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ui } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";

/**
 * The async Clipboard API needs a secure context and permission; the
 * selection fallback covers plain http and older browsers.
 */
async function writeToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Fall through to the selection-based copy below.
  }

  try {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}

export function CopyRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (await writeToClipboard(value)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
    // If both paths fail the label stays as it is — no false confirmation.
  };

  return (
    <div className="group flex items-center justify-between gap-4 border-t hair py-5">
      <div className="min-w-0">
        <p className="t-mono mb-1.5 text-line-strong">{label}</p>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="block truncate font-mono text-lg text-text transition-colors hover:text-acid sm:text-xl"
        >
          {value}
        </a>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-full border hair px-3.5 py-1.5 t-mono text-muted transition-colors hover:border-acid hover:text-acid"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="block"
          >
            {copied ? t(ui.contact.copied) : t(ui.contact.copy)}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
