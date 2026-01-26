import StarsBackground from "./components/StarsBackground";
import Header from "./components/Header";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="font-sans text-brand-text relative">
      {/* Gradiente base DETRÁS del canvas */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-brand-bg via-brand-bg to-[#0b1224]" />

      {/* Canvas de estrellas */}
      <StarsBackground />

      <Header />

      <main className="relative z-10 selection:bg-brand-accent/30 selection:text-brand-text">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </main>

      <footer className="border-t border-brand-border relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-brand-muted flex items-center justify-between">
          <span>© {new Date().getFullYear()} elerikdev. Todos los derechos reservados.</span>
          <span className="opacity-70">Hecho con React + Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
