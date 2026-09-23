"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Falls back to a framed placeholder until a photo is dropped in at
 * public/avatar.jpg, so the layout never shifts when it arrives.
 */
export function Portrait({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`relative block overflow-hidden rounded-sm border border-acid/40 bg-panel-2 ${className}`}
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
          sizes="(max-width: 900px) 40vw, 280px"
          className="object-cover grayscale-[35%] contrast-[1.05]"
          onError={() => setFailed(true)}
          priority
        />
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
    </span>
  );
}
