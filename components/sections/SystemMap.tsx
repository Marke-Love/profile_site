"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { systemEdges, systemNodes, ui, type SystemNode } from "@/lib/content";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const byId = new Map(systemNodes.map((node) => [node.id, node]));

/** Horizontal hand-off, or a vertical drop when the target sits below. */
function edgePath(from: SystemNode, to: SystemNode) {
  if (to.x >= from.x + from.w) {
    const x1 = from.x + from.w;
    const y1 = from.y + from.h / 2;
    const x2 = to.x;
    const y2 = to.y + to.h / 2;
    const mid = x1 + (x2 - x1) / 2;
    return `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`;
  }
  const x1 = from.x + from.w / 2;
  const y1 = from.y + from.h;
  const x2 = to.x + to.w / 2;
  const y2 = to.y;
  const mid = y1 + (y2 - y1) / 2;
  return `M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}`;
}

export function SystemMap() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const paths = useMemo(
    () =>
      systemEdges.map((edge) => {
        const from = byId.get(edge.from)!;
        const to = byId.get(edge.to)!;
        return { ...edge, d: edgePath(from, to) };
      }),
    [],
  );

  const activeNode = active ? byId.get(active) : null;

  return (
    <section id="system" className="shell scroll-mt-24 py-24 sm:py-32">
      <SectionHeading eyebrow={t(ui.system.eyebrow)} meta={t(ui.system.hint)}>
        {t(ui.system.heading)}
      </SectionHeading>

      <Reveal>
        <div className="overflow-x-auto rounded-lg border hair bg-panel/40 p-4 sm:p-6">
          <svg
            viewBox="0 0 960 430"
            role="img"
            aria-label={t(ui.system.heading)}
            className="h-auto w-full min-w-[720px]"
          >
            <g fill="none" strokeWidth={1.25}>
              {paths.map((edge) => {
                const on = active === edge.from || active === edge.to;
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <path
                      d={edge.d}
                      stroke={on ? "#d2f94b" : "#2b323c"}
                      strokeDasharray={edge.dashed ? "4 5" : undefined}
                      style={{ transition: "stroke .25s" }}
                    />
                    {!reduced && (
                      <circle r={2.5} fill={on ? "#d2f94b" : "#3c4450"}>
                        <animateMotion
                          dur={`${2.6 + (edge.from.length % 3) * 0.5}s`}
                          repeatCount="indefinite"
                          path={edge.d}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>

            {systemNodes.map((node) => {
              const on = active === node.id;
              return (
                <g
                  key={node.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.label}: ${t(node.fact)}`}
                  className="cursor-pointer outline-none"
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(node.id)}
                  onBlur={() => setActive(null)}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.w}
                    height={node.h}
                    rx={8}
                    fill={on ? "rgba(210,249,75,0.07)" : "#0d1014"}
                    stroke={on ? "#d2f94b" : "#2b323c"}
                    strokeWidth={1.25}
                    strokeDasharray={node.kind === "observe" ? "4 5" : undefined}
                    style={{ transition: "fill .25s, stroke .25s" }}
                  />
                  <text
                    x={node.x + node.w / 2}
                    y={node.y + node.h / 2 + 4}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize={13}
                    fill={on ? "#d2f94b" : "#e8ecef"}
                    style={{ transition: "fill .25s" }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </Reveal>

      {/* One caption slot, so the diagram never grows a tooltip forest. */}
      <div className="mt-5 min-h-[3.5rem] border-t hair pt-4">
        <motion.p
          key={activeNode?.id ?? "idle"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-[70ch] text-sm leading-relaxed"
        >
          {activeNode ? (
            <>
              <span className="font-mono text-acid">{activeNode.label}</span>
              <span className="text-line-strong"> — </span>
              <span className="text-text">{t(activeNode.fact)}</span>
            </>
          ) : (
            <span className="text-muted">
              {t({
                ru: "Так выглядит система, которую я собирал: синхронный путь запроса слева, всё долгое вынесено в очередь справа.",
                en: "This is the shape of the systems I build: the synchronous request path on the left, everything slow moved to the queue on the right.",
              })}
            </span>
          )}
        </motion.p>
      </div>
    </section>
  );
}
