"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Head-and-chest crop of a full-length source photo (853×1280).
 *
 * The frame is locked to 4:5 and the image is zoomed so the visible
 * window is roughly x 180–660, y 0–600 of the original — head, shoulders
 * and upper chest. Scale is 853/480 ≈ 1.777; the transform origin is the
 * left edge of that window carried through the same scale, which is what
 * lands the crop exactly on the frame. Swap in a different photo and
 * these two numbers need retuning.
 */
const CROP = "origin-[48.3%_0%] scale-[1.777]";

export function Portrait({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`relative block aspect-[4/5] overflow-hidden rounded-sm border border-acid/40 bg-panel-2 ${className}`}
    >
      {failed ? (
        <span className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,#12161c_0_10px,#0d1014_10px_20px)]">
          <span className="t-mono text-line-strong">avatar.jpg</span>
        </span>
      ) : (
        <Image
          src="/avatar.jpg"
          alt="Александр Маркелов"
          fill
          sizes="220px"
          className={`object-cover object-top grayscale-[35%] contrast-[1.05] ${CROP}`}
          onError={() => setFailed(true)}
          priority
        />
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
    </span>
  );
}
