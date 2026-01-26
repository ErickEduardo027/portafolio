import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { site } from "../data/site";

import { useRef, useState } from "react";
import type { ComponentType } from "react";

import {
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiDotnet,
  SiNodedotjs,
  SiPostgresql,
  SiSqlite,
  SiGithub,
  SiDocker,
} from "react-icons/si";

import { Webhook, GitBranch, Database } from "lucide-react";

type IconComp = ComponentType<{ className?: string; size?: number }>;

type TechItem = {
  name: string;
  Icon: IconComp;
};

// Nombres EXACTOS como en src/data/site.ts
const iconMap: Record<string, IconComp> = {
  // Frontend
  React: SiReact,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
  HTML: SiHtml5,
  CSS: SiCss3,

  // Backend
  "ASP.NET": SiDotnet,
  "Node.js": SiNodedotjs,
  "REST APIs": Webhook,

  // DB
  "SQL Server": Database,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,

  // DevOps
  "Git/GitHub": SiGithub,
  "Docker (básico)": SiDocker,
  "CI/CD (básico)": GitBranch,
};

function GlobalTooltip({
  text,
  pos,
  visible,
}: {
  text: string;
  pos: { left: number; top: number } | null;
  visible: boolean;
}) {
  if (!visible || !pos) return null;

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{ left: pos.left, top: pos.top, transform: "translateX(-50%)" }}
      aria-hidden="true"
    >
      <div className="text-xs px-3 py-1.5 rounded-full border border-brand-border bg-brand-bg/90 backdrop-blur text-brand-text whitespace-nowrap shadow-soft">
        {text}
      </div>
    </div>
  );
}

function TechIcon({
  name,
  Icon,
  onHoverEl,
  onLeave,
}: {
  name: string;
  Icon: IconComp;
  onHoverEl: (el: HTMLElement, text: string) => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <button
      ref={ref}
      type="button"
      className="
        group relative
        w-20 h-20 md:w-24 md:h-24
        rounded-2xl border border-brand-border
        bg-brand-bg/18
        flex items-center justify-center
        transition-all duration-300
        hover:-translate-y-1
        hover:border-brand-accent/70
        hover:shadow-[0_0_0_1px_rgba(94,234,212,0.35),0_18px_55px_rgba(0,0,0,0.35)]
        focus:outline-none
      "
      aria-label={name}
      onMouseEnter={() => ref.current && onHoverEl(ref.current, name)}
      onMouseLeave={onLeave}
      onFocus={() => ref.current && onHoverEl(ref.current, name)}
      onBlur={onLeave}
    >
      {/* glow */}
      <span
        className="
          pointer-events-none absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          bg-[radial-gradient(circle_at_30%_20%,rgba(94,234,212,0.18),transparent_60%)]
        "
      />
      <Icon
        size={42}
        className="relative z-10 text-brand-muted group-hover:text-brand-accent transition-colors duration-300"
      />
    </button>
  );
}

export default function Stack() {
  const [tipText, setTipText] = useState("");
  const [tipVisible, setTipVisible] = useState(false);
  const [tipPos, setTipPos] = useState<{ left: number; top: number } | null>(
    null
  );

  const handleHoverEl = (el: HTMLElement, text: string) => {
    const r = el.getBoundingClientRect();
    setTipText(text);
    setTipPos({ left: r.left + r.width / 2, top: r.bottom + 12 });
    setTipVisible(true);
  };

  const handleLeave = () => {
    setTipVisible(false);
  };

  return (
    <section id="stack" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle
          title="Stack Tecnológico"
          subtitle="Tecnologías con las que he trabajado y tengo experiencia."
        />

        <div className="mt-10 grid gap-7">
          {Object.entries(site.stack).map(([category, items]) => {
            return (
              <Reveal key={category}>
                <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-brand-text">
                      {category}
                    </h3>
                    <span className="text-sm text-brand-muted">
                      {items.length} tecnologías
                    </span>
                  </div>

                  {/* Iconos centrados */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6">
                    {items.map((name) => {
                      const Icon = iconMap[name] ?? Webhook;
                      return (
                        <TechIcon
                          key={name}
                          name={name}
                          Icon={Icon}
                          onHoverEl={handleHoverEl}
                          onLeave={handleLeave}
                        />
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <GlobalTooltip text={tipText} pos={tipPos} visible={tipVisible} />
    </section>
  );
}
