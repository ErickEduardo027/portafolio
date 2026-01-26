import { useEffect, useMemo, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { site } from "../data/site";
import {
  Github,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Clock,
} from "lucide-react";

/* ✅ IMPORTS REALES (según tus rutas en src/assets/ImagenesProyectos) */
// ErickDate
import erickDate_1 from "../assets/ImagenesProyectos/ErickDate/Screenshot 2026-01-26 173609.png";
import erickDate_2 from "../assets/ImagenesProyectos/ErickDate/Screenshot 2026-01-26 173649.png";
import erickDate_3 from "../assets/ImagenesProyectos/ErickDate/Screenshot 2026-01-26 173729.png";

// ErickDate Movil
import erickDateMovil_1 from "../assets/ImagenesProyectos/ErickDate Movil/image2.jpeg";
import erickDateMovil_2 from "../assets/ImagenesProyectos/ErickDate Movil/image3.jpeg";
import erickDateMovil_3 from "../assets/ImagenesProyectos/ErickDate Movil/WhatsApp Image 2026-01-26 at 5.38.58 PM.jpeg";

// ErickNews Movil
import erickNewsMovil_1 from "../assets/ImagenesProyectos/ErickNews Movil/iiimage2.jpeg";
import erickNewsMovil_2 from "../assets/ImagenesProyectos/ErickNews Movil/image3.jpeg";
import erickNewsMovil_3 from "../assets/ImagenesProyectos/ErickNews Movil/WhatsApp Image 2026-01-26 at 5.58.47 PM.jpeg";

// ErickNews.backend
import erickNewsBackend_1 from "../assets/ImagenesProyectos/ErickNews.backend/Screenshot 2026-01-26 175250.png";
import erickNewsBackend_2 from "../assets/ImagenesProyectos/ErickNews.backend/Screenshot 2026-01-26 175624.png";
import erickNewsBackend_3 from "../assets/ImagenesProyectos/ErickNews.backend/Screenshot 2026-01-26 175651.png";

// ErickNews.Client
import erickNewsClient_1 from "../assets/ImagenesProyectos/ErickNews.Client/Screenshot 2026-01-26 174949.png";
import erickNewsClient_2 from "../assets/ImagenesProyectos/ErickNews.Client/Screenshot 2026-01-26 175047.png";
import erickNewsClient_3 from "../assets/ImagenesProyectos/ErickNews.Client/Screenshot 2026-01-26 175121.png";

// Proyecto administrativo con DB northwind
import northwind_1 from "../assets/ImagenesProyectos/Proyecto administrativo con DB northwind/Screenshot 2026-01-26 174548.png";
import northwind_2 from "../assets/ImagenesProyectos/Proyecto administrativo con DB northwind/Screenshot 2026-01-26 174622.png";
import northwind_3 from "../assets/ImagenesProyectos/Proyecto administrativo con DB northwind/Screenshot 2026-01-26 174659.png";

// Sistema estudiantil universitario...
import sistema_1 from "../assets/ImagenesProyectos/Sistema estudiantil universitario de seleccion y publicacion/Screenshot 2026-01-26 173017.png";
import sistema_2 from "../assets/ImagenesProyectos/Sistema estudiantil universitario de seleccion y publicacion/Screenshot 2026-01-26 173234.png";
import sistema_3 from "../assets/ImagenesProyectos/Sistema estudiantil universitario de seleccion y publicacion/Screenshot 2026-01-26 173349.png";

// Todo list
import todo_1 from "../assets/ImagenesProyectos/Todo list/Screenshot 2026-01-26 174305.png";
import todo_2 from "../assets/ImagenesProyectos/Todo list/Screenshot 2026-01-26 174343.png";
import todo_3 from "../assets/ImagenesProyectos/Todo list/Screenshot 2026-01-26 174410.png";

type SiteProject = (typeof site.projects)[number];
type Status = "Done" | "Done / Deployed" | "WIP";

type UIProject = SiteProject & {
  images?: string[]; // opcional (hasta 3)
  status?: Status;
};

/**
 * ✅ Normaliza FUERTE:
 * - minúsculas
 * - quita acentos
 * - convierte TODO lo que no sea [a-z0-9] en espacio (adiós paréntesis, puntos, guiones, etc.)
 * - colapsa espacios
 */
function normKey(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function svgThumb(title: string, idx: number) {
  const safe = title.length > 26 ? title.slice(0, 26) + "…" : title;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#0f172a"/>
        <stop offset="1" stop-color="#0b1224"/>
      </linearGradient>
      <radialGradient id="glow" cx="28%" cy="22%" r="60%">
        <stop offset="0" stop-color="rgba(94,234,212,0.28)"/>
        <stop offset="1" stop-color="rgba(94,234,212,0)"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#glow)"/>
    <g fill="rgba(148,163,184,0.14)">
      <circle cx="120" cy="140" r="2"/><circle cx="240" cy="90" r="1.5"/><circle cx="420" cy="160" r="1.2"/>
      <circle cx="980" cy="140" r="1.6"/><circle cx="860" cy="240" r="1.2"/><circle cx="1040" cy="320" r="2"/>
    </g>
    <rect x="60" y="560" width="1080" height="1" fill="rgba(148,163,184,0.18)"/>
    <text x="60" y="610" fill="rgba(226,232,240,0.92)" font-size="42" font-family="Inter, ui-sans-serif">
      ${safe}
    </text>
    <text x="60" y="662" fill="rgba(148,163,184,0.85)" font-size="22" font-family="Inter, ui-sans-serif">
      Thumbnail ${idx} (placeholder)
    </text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/** ✅ WIP: fondo negro + icono reloj + “Work in process” */
function svgWipBlackThumb(title: string) {
  const safe = title.length > 28 ? title.slice(0, 28) + "…" : title;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#000000"/>
        <stop offset="1" stop-color="#0b1224"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="42%" r="55%">
        <stop offset="0" stop-color="rgba(245,158,11,0.18)"/>
        <stop offset="1" stop-color="rgba(245,158,11,0)"/>
      </radialGradient>
    </defs>

    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect width="100%" height="100%" fill="url(#glow)"/>

    <!-- Clock icon (simple) -->
    <g transform="translate(600 315)">
      <circle r="95" fill="none" stroke="rgba(245,158,11,0.55)" stroke-width="10"/>
      <circle r="5" fill="rgba(245,158,11,0.75)"/>
      <path d="M0 -55 V0 L45 20" fill="none" stroke="rgba(245,158,11,0.75)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <text x="600" y="470" text-anchor="middle" fill="rgba(226,232,240,0.92)" font-size="34" font-family="Inter, ui-sans-serif" font-weight="800">
      Work in process
    </text>
    <text x="600" y="515" text-anchor="middle" fill="rgba(148,163,184,0.78)" font-size="22" font-family="Inter, ui-sans-serif">
      ${safe}
    </text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function clamp3(images?: string[]) {
  return (images ?? []).filter(Boolean).slice(0, 3);
}

function getImages(p: UIProject) {
  const imgs = clamp3(p.images);
  if (imgs.length) return imgs;
  return [svgThumb(p.name, 1), svgThumb(p.name, 2), svgThumb(p.name, 3)];
}

function TechPills({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span
          key={t}
          className="text-[11px] px-2.5 py-1 rounded-full border border-brand-border text-brand-muted bg-brand-bg/10 whitespace-nowrap"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  onOpenGallery,
}: {
  project: UIProject;
  onOpenGallery: (p: UIProject) => void;
}) {
  const images = getImages(project);
  const status = project.status ?? "Done / Deployed";

  return (
    <article
      className="
        group relative flex flex-col
        rounded-2xl overflow-hidden
        border border-brand-border bg-brand-card
        transition-all duration-300
        hover:-translate-y-1 hover:border-brand-accent/60
        hover:shadow-[0_0_0_1px_rgba(94,234,212,0.28),0_22px_70px_rgba(0,0,0,0.35)]
        motion-reduce:hover:transform-none
      "
    >
      <button
        type="button"
        onClick={() => onOpenGallery(project)}
        className="relative aspect-video w-full overflow-hidden bg-brand-bg/30 cursor-pointer"
        aria-label={`Ver galería de ${project.name}`}
      >
        <div className="absolute inset-0 flex items-center justify-center text-brand-muted/30">
          <ImageIcon className="h-12 w-12" />
        </div>

        <img
          src={images[0]}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-brand-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-sm text-brand-text font-medium px-4 py-2 bg-brand-card/80 rounded-full border border-brand-border">
            Ver galería ({Math.min(images.length, 3)})
          </span>
        </div>
      </button>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-semibold text-brand-text mb-2 group-hover:text-brand-accent transition-colors">
          {project.name}
        </h3>

        <p className="text-sm text-brand-muted leading-relaxed line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>

        <div className="mb-4">
          <TechPills tech={project.tech} />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-brand-border/60">
          <span className="text-xs text-brand-accent font-medium">{status}</span>

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-accent transition-colors"
              aria-label={`Repositorio de ${project.name}`}
            >
              <Github className="h-4 w-4" />
              <span>Repositorio</span>
            </a>
          ) : (
            <span className="text-sm text-brand-muted/60 inline-flex items-center gap-2">
              <Github className="h-4 w-4" />
              Sin repo
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/** ✅ WIP: horizontal (imagen izquierda + contenido derecha) */
function FeaturedWipCard({
  project,
  onOpenGallery,
}: {
  project: UIProject;
  onOpenGallery: (p: UIProject) => void;
}) {
  const images = project.images?.length
    ? project.images
    : [svgWipBlackThumb(project.name)];

  return (
    <article
      className="
        group relative w-full
        rounded-2xl overflow-hidden
        border-2 border-dashed border-amber-500/35
        bg-gradient-to-br from-amber-500/5 via-brand-card to-amber-500/5
        hover:border-amber-400/70
        transition-all duration-300
      "
    >
      <div className="flex flex-col sm:flex-row">
        {/* Left: Image */}
        <button
          type="button"
          onClick={() => onOpenGallery(project)}
          className="
            relative w-full sm:w-1/2
            aspect-video sm:aspect-auto sm:min-h-[320px]
            overflow-hidden bg-black cursor-pointer
          "
          aria-label={`Ver proyecto WIP: ${project.name}`}
        >
          {/* WIP pill */}
          <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-amber-950 font-bold text-sm shadow-lg">
            <Clock className="h-4 w-4" />
            WIP
          </div>

          <img
            src={images[0]}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-[3]">
            <span className="text-sm font-medium px-4 py-2 bg-amber-500 text-amber-950 rounded-full">
              Ver proyecto
            </span>
          </div>
        </button>

        {/* Right: Content */}
        <div className="flex flex-col flex-1 p-7 sm:p-9">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/15 border border-amber-500/25 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              Work in process
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-amber-300 mb-4 group-hover:text-amber-200 transition-colors">
            {project.name}
          </h3>

          <p className="text-sm md:text-base text-brand-muted leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs md:text-sm text-amber-200/90 bg-amber-500/10 border border-amber-500/15 px-3 py-1.5 rounded-full whitespace-nowrap"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="border-t border-amber-500/15 pt-6 mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Work in process</span>
            </div>

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-brand-muted hover:text-amber-300 transition-colors"
              >
                <Github className="h-4 w-4" />
                Repositorio
              </a>
            ) : (
              <span className="text-sm text-brand-muted/60 inline-flex items-center gap-2">
                <Github className="h-4 w-4" />
                Sin repo
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ImageGalleryModal({
  project,
  onClose,
}: {
  project: UIProject;
  onClose: () => void;
}) {
  const images = getImages(project);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, images.length]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${project.name}`}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-brand-text">
              {project.name}
            </h3>
            <p className="text-sm text-brand-muted">{project.role}</p>
          </div>

          <div className="flex items-center gap-2">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-brand-border bg-brand-bg/40 px-3 py-2 text-sm text-brand-text hover:bg-brand-card transition"
              >
                <Github className="h-4 w-4 text-brand-accent" />
                GitHub
              </a>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg border border-brand-border bg-brand-bg/40 text-brand-muted hover:text-brand-text hover:bg-brand-card transition"
              aria-label="Cerrar galería"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-brand-card border border-brand-border">
          <img
            src={images[currentIndex]}
            alt={`${project.name} - Imagen ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-contain"
          />

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-brand-bg/60 border border-brand-border rounded-full text-brand-text hover:bg-brand-card hover:border-brand-accent/50 transition"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-brand-bg/60 border border-brand-border rounded-full text-brand-text hover:bg-brand-card hover:border-brand-accent/50 transition"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        {images.length > 1 ? (
          <div className="flex items-center justify-center gap-3 mt-4">
            {images.map((img, index) => (
              <button
                key={`${project.name}-thumb-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={[
                  "relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all",
                  index === currentIndex
                    ? "border-brand-accent shadow-[0_0_0_1px_rgba(94,234,212,0.25)]"
                    : "border-brand-border/60 opacity-70 hover:opacity-100 hover:border-brand-accent/40",
                ].join(" ")}
                aria-label={`Thumbnail ${index + 1}`}
              >
                <img
                  src={img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}

        <p className="text-center text-sm text-brand-muted mt-3">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<UIProject | null>(null);

  /**
   * ✅ Mapa de imágenes por nombre (normalizado) -> máx 3
   * OJO: aquí agregamos 2 llaves para el “Sistema…” por si en site.ts viene con paréntesis u otra variante.
   */
  const imagesByProjectName = useMemo<Record<string, string[]>>(
    () => ({
      [normKey("ErickDate")]: [erickDate_1, erickDate_2, erickDate_3],
      [normKey("ErickDate Movil")]: [
        erickDateMovil_1,
        erickDateMovil_2,
        erickDateMovil_3,
      ],
      [normKey("ErickNews Movil")]: [
        erickNewsMovil_1,
        erickNewsMovil_2,
        erickNewsMovil_3,
      ],
      [normKey("ErickNews.backend")]: [
        erickNewsBackend_1,
        erickNewsBackend_2,
        erickNewsBackend_3,
      ],
      [normKey("ErickNews.Client")]: [
        erickNewsClient_1,
        erickNewsClient_2,
        erickNewsClient_3,
      ],
      [normKey("Proyecto administrativo con DB northwind")]: [
        northwind_1,
        northwind_2,
        northwind_3,
      ],

      // ✅ Sistema universitario (variantes)
      [normKey("Sistema estudiantil universitario de seleccion y publicacion")]: [
        sistema_1,
        sistema_2,
        sistema_3,
      ],
      [normKey("Sistema estudiantil universitario (Selección y publicación)")]: [
        sistema_1,
        sistema_2,
        sistema_3,
      ],

      [normKey("Todo list")]: [todo_1, todo_2, todo_3],
    }),
    []
  );

  // ✅ Proyectos terminados (los de site.ts) + imágenes reales
  const completed = useMemo<UIProject[]>(() => {
    return (site.projects as unknown as UIProject[]).map((p) => {
      const key = normKey(p.name);
      const mapped = imagesByProjectName[key];

      // ✅ Fallback extra: si no matchea exacto, intentamos por “contiene”
      const containsSistema =
        !mapped && key.includes("sistema") && (key.includes("seleccion") || key.includes("publicacion"));

      const finalImages = mapped
        ?? (containsSistema ? [sistema_1, sistema_2, sistema_3] : undefined);

      return {
        ...p,
        status: p.status ?? "Done / Deployed",
        images: clamp3(finalImages ?? p.images),
      };
    });
  }, [imagesByProjectName]);

  // ✅ Proyecto WIP grande (al final) -> 1 sola imagen negra con reloj
  const featuredWip = useMemo<UIProject>(() => {
    return {
      name: "GPS Logistics Platform",
      role: "Work in process · Plataforma Nacional",
      description:
        "Plataforma web administrativa de monitoreo GPS y herramientas contables para la logística y comercio de empresas de servicios on-site en la República Dominicana. Proyecto futuro actualmente en desarrollo, ambicioso y clave para mi carrera profesional, con el objetivo de convertirse en una fuente tecnológica principal para empresas a nivel nacional y servir como sustentación de mi tesis de Ingeniería de Software.",
      tech: ["React", "TypeScript", "PostgreSQL", "Google Maps API", "Analytics"],
      // si tu tipo exige results, lo dejamos presente:
      results: [],
      repoUrl: undefined,
      status: "WIP",
      images: [svgWipBlackThumb("GPS Logistics Platform")],
    } as UIProject;
  }, []);

  return (
    <>
      <section id="projects" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle
            title="Proyectos"
            subtitle="Una selección de proyectos: web, móvil y soluciones con base de datos."
          />

          {/* ✅ 2 columnas SOLO terminados */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {completed.map((project) => (
              <Reveal key={project.name}>
                <ProjectCard
                  project={project}
                  onOpenGallery={setSelectedProject}
                />
              </Reveal>
            ))}
          </div>

          {/* ✅ WIP AL FINAL, full width y horizontal */}
          <div className="mt-6">
            <Reveal>
              <FeaturedWipCard
                project={featuredWip}
                onOpenGallery={setSelectedProject}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {selectedProject ? (
        <ImageGalleryModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </>
  );
}
