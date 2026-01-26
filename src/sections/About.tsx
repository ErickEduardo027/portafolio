import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { site } from "../data/site";

// Foto (asegúrate de tenerla en: src/assets/profile.jpg)
import profile from "../assets/profile.jpg";

import { Crown, Users, Sparkles, Target } from "lucide-react";

type IconType = React.ComponentType<{ size?: number; className?: string }>;

const skillMeta: Record<string, { Icon: IconType; desc: string }> = {
  Liderazgo: {
    Icon: Crown,
    desc: "Tomo iniciativa, organizo el trabajo y mantengo al equipo alineado a objetivos claros.",
  },
  "Trabajo en equipo": {
    Icon: Users,
    desc: "Colaboro de forma efectiva, comunicando avances y apoyando el logro común con responsabilidad.",
  },
  "Aprendizaje continuo": {
    Icon: Sparkles,
    desc: "Me actualizo constantemente para aplicar mejores prácticas, mejorar rendimiento y mantener calidad.",
  },
  "Enfoque a resultados": {
    Icon: Target,
    desc: "Priorizo entregables medibles, optimizando tiempo y esfuerzo para generar impacto real en el producto.",
  },
};

export default function About() {
  // Skill extra para “encuadrar” la sección, aunque aún no esté en site.ts
  const strengths = Array.from(
    new Set([...(site.strengths ?? []), "Enfoque a resultados"])
  );

  return (
    // ✅ Cambiado: encuadre perfecto bajo el header sticky
    <section id="about" className="scroll-mt-[var(--header-h)]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle title="Sobre mí" />

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Photo card + text */}
          <Reveal>
            <div className="flex flex-col gap-6">
              {/* Photo Card */}
              <div className="rounded-2xl border border-brand-border bg-brand-card p-5 shadow-soft">
                <div className="grid md:grid-cols-[240px_1fr] gap-6 items-center">
                  {/* Image */}
                  <div className="relative mx-auto">
                    <div className="absolute -inset-3 rounded-2xl opacity-45 blur-xl bg-[radial-gradient(circle_at_30%_30%,rgba(94,234,212,0.45),transparent_60%)]" />
                    <img
                      src={profile}
                      alt="Foto profesional de Erick Eduardo"
                      loading="lazy"
                      decoding="async"
                      className="
                        relative
                        w-56 h-56
                        md:w-60 md:h-60
                        object-cover
                        rounded-2xl
                        border border-brand-border
                        shadow-soft
                      "
                    />
                  </div>

                  {/* Text next to image (centered as you requested) */}
                  <div className="text-center md:text-left">
                    <p className="text-sm text-brand-accent font-semibold">
                      {site.name}
                    </p>
                    <p className="text-sm text-brand-muted mt-1 text-center md:text-left">
                      {site.role} · {site.location}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                      <span className="text-[11px] px-2.5 py-1 rounded-full border border-brand-border text-brand-muted">
                        Full-Stack
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-full border border-brand-border text-brand-muted">
                        Clean Code
                      </span>
                      <span className="text-[11px] px-2.5 py-1 rounded-full border border-brand-border text-brand-muted">
                        UI/UX
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About text (justified) */}
              <div className="text-brand-muted space-y-5 leading-relaxed text-justify">
                {site.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Skills cards (4 skills to fill the section better) */}
          <Reveal>
            <div className="grid gap-4">
              {strengths.map((s) => {
                const meta = skillMeta[s] ?? {
                  Icon: Sparkles,
                  desc: "Descripción editable: explica en 1 línea cómo esto te hace mejor profesional.",
                };
                const Icon = meta.Icon;

                return (
                  <div
                    key={s}
                    className="
                      group relative overflow-hidden
                      rounded-2xl border border-brand-border bg-brand-card p-5
                      transition-all duration-300
                      hover:-translate-y-1 hover:border-brand-accent/60
                      hover:shadow-[0_0_0_1px_rgba(94,234,212,0.35),0_18px_60px_rgba(0,0,0,0.35)]
                      motion-reduce:hover:transform-none
                    "
                  >
                    {/* teal glow overlay */}
                    <div
                      className="
                        pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        bg-[radial-gradient(circle_at_20%_10%,rgba(94,234,212,0.18),transparent_55%)]
                      "
                    />

                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <p className="text-brand-text font-semibold text-lg">
                          {s}
                        </p>
                        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                          {meta.desc}
                        </p>
                      </div>

                      {/* Icon appears on hover */}
                      <div
                        className="
                          mt-1 shrink-0
                          opacity-0 scale-90 translate-y-1
                          group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                          transition-all duration-300
                          motion-reduce:transition-none
                        "
                        aria-hidden="true"
                      >
                        <div className="rounded-xl border border-brand-accent/40 bg-brand-bg/30 p-2">
                          <Icon size={18} className="text-brand-accent" />
                        </div>
                      </div>
                    </div>

                    {/* small teal bar */}
                    <div className="relative mt-4 h-[2px] w-10 bg-brand-border group-hover:bg-brand-accent transition-colors duration-300" />
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
