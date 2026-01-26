import { Github, Linkedin, FileDown, ArrowDown } from "lucide-react";
import { site } from "../data/site";
import Reveal from "../components/Reveal";
import { useTyping } from "../hooks/useTyping";

export default function Hero() {
  const { value: typedName, done } = useTyping(site.name, {
    speed: 100,
    startDelay: 100,
  });

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-var(--header-h))] flex flex-col justify-center items-center px-4 pt-20 scroll-mt-24"
    >
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-brand-accent font-medium mb-4">Hola, soy</p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-brand-text text-balance">
            <span>{typedName}</span>
            <span
              className={[
                "inline-block align-baseline ml-1 w-[0.6ch]",
                "text-brand-accent",
                "animate-caret",
                done ? "opacity-0" : "opacity-100",
              ].join(" ")}
              aria-hidden="true"
            >
              |
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl lg:text-4xl text-brand-muted font-medium mb-6">
            {site.role}
          </h2>

          <p className="text-base md:text-lg text-brand-muted max-w-2xl mx-auto mb-8 text-pretty">
            {site.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#projects"
              className="min-w-[160px] rounded-lg bg-brand-accent text-brand-bg px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
            >
              Ver Proyectos
            </a>

            <a
              href="#contact"
              className="min-w-[160px] rounded-lg border border-brand-border text-brand-text px-6 py-3 text-sm font-semibold hover:bg-brand-card transition bg-transparent"
            >
              Contacto
            </a>

            <a
              href={site.links.cv}
              className="min-w-[160px] rounded-lg border border-brand-border text-brand-text px-6 py-3 text-sm font-semibold hover:bg-brand-card transition inline-flex items-center justify-center gap-2 bg-transparent"
              aria-label="Descargar CV"
            >
              <FileDown size={16} />
              Descargar CV
            </a>
          </div>

          <div className="flex justify-center gap-6 mb-16 text-brand-muted">
            {site.links.github ? (
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            ) : null}

            {site.links.linkedin ? (
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            ) : null}
          </div>

          {/* Brinco desde el inicio + hover solo cambia color */}
          <a
            href="#about"
            className="inline-flex flex-col items-center text-brand-muted hover:text-brand-accent transition-colors animate-bounce select-none"
            aria-label="Scroll hacia abajo"
          >
            <span className="text-sm mb-2">Descubre más</span>
            <ArrowDown className="h-5 w-5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
