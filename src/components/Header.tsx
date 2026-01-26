import { useEffect, useRef, useState } from "react";

const nav = [
  { id: "home", label: "Inicio" },
  { id: "about", label: "Sobre mí" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Proyectos" },
  { id: "education", label: "Educación" },
  { id: "experience", label: "Experiencia" },
  { id: "contact", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Guarda la altura real del header para calcular el alto del Hero
  useEffect(() => {
    const setHeaderHeight = () => {
      const h = headerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };

    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
    return () => window.removeEventListener("resize", setHeaderHeight);
  }, []);

  // Cierra menú al cambiar tamaño
  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/70 backdrop-blur"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold text-brand-accent">
          elerikdev
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Navegación principal"
        >
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm text-brand-muted hover:text-brand-text transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Mobile button (Hamburger -> X) */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-brand-border px-3 py-2 text-brand-text hover:bg-brand-card transition"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            {/* Line 1 */}
            <span
              className={[
                "absolute left-0 top-0 h-[2px] w-5 rounded bg-brand-text transition-transform duration-200",
                open ? "translate-y-[7px] rotate-45" : "translate-y-0 rotate-0",
              ].join(" ")}
            />
            {/* Line 2 */}
            <span
              className={[
                "absolute left-0 top-[7px] h-[2px] w-5 rounded bg-brand-text transition-all duration-200",
                open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100",
              ].join(" ")}
            />
            {/* Line 3 */}
            <span
              className={[
                "absolute left-0 top-[14px] h-[2px] w-5 rounded bg-brand-text transition-transform duration-200",
                open ? "translate-y-[-7px] -rotate-45" : "translate-y-0 rotate-0",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      {open ? (
        <div className="md:hidden border-t border-brand-border bg-brand-bg/90 backdrop-blur">
          <nav
            id="mobile-nav"
            className="mx-auto max-w-6xl px-4 py-3 grid gap-2"
            aria-label="Menú móvil"
          >
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-brand-muted hover:text-brand-text hover:bg-brand-card transition"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

