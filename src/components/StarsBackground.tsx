import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number; // speed de twinkle
  vx: number; // drift x
  vy: number; // drift y
};

type Comet = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  width: number;
  life: number; // 0..1 (lo usamos como "progreso" lento)
  decay: number;
  active: boolean;
};

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    let stars: Star[] = [];
    let comets: Comet[] = [];
    let lastComet = 0;
    let nextCometDelay = 2600 + Math.random() * 5200;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(280, Math.floor((w * h) / 12000));
      stars = Array.from({ length: count }).map(() => {
        // Drift MUY lento (pixel por frame)
        const drift = 0.03 + Math.random() * 0.06; // 0.03..0.09
        const ang = Math.random() * Math.PI * 2;

        return {
          x: Math.random() * w,
          y: Math.random() * h,

          // ✅ Estrellas un poco más grandes
          r: Math.random() * 2.0 + 0.6, // antes: 1.3 + 0.25

          a: Math.random() * 0.45 + 0.15,
          tw: Math.random() * 0.0011 + 0.00035,
          vx: Math.cos(ang) * drift,
          vy: Math.sin(ang) * drift,
        };
      });

      comets = [];
    };

    const spawnComet = () => {
      const w = window.innerWidth;

      // ✅ Más vertical (para que cruce de arriba a abajo)
      // 0.55π..0.59π aprox -> leve diagonal
      const angle = Math.PI * (0.57 + (Math.random() - 0.5) * 0.08);

      // ✅ empieza más arriba
      const x = Math.random() * w * 0.65 + w * 0.25; // evita salir por el lado muy rápido
      const y = -160;

      if (comets.filter((c) => c.active).length >= 2) return;

      comets.push({
        x,
        y,
        angle,

        // ✅ Velocidad moderada pero que pueda recorrer toda la pantalla
        speed: 2.2 + Math.random() * 1.0, // 2.2..3.2

        // Cola un poco más larga
        length: 380 + Math.random() * 340,

        width: 1.2 + Math.random() * 0.9,

        life: 0,

        // ✅ Mucho más lento el "life" para que dure toda la bajada
        // (antes 0.006..0.009 => moría en ~2s)
        decay: 0.0016 + Math.random() * 0.0008, // 0.0016..0.0024

        active: true,
      });
    };

    const drawComet = (c: Comet) => {
      if (!c.active) return;

      c.life += c.decay;

      const fade =
        c.life < 0.14
          ? c.life / 0.14
          : c.life > 0.88
          ? Math.max(0, 1 - (c.life - 0.88) / 0.12)
          : 1;

      const headX = c.x;
      const headY = c.y;

      const tailX = headX - Math.cos(c.angle) * c.length;
      const tailY = headY - Math.sin(c.angle) * c.length;

      const g = ctx.createLinearGradient(tailX, tailY, headX, headY);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.6, `rgba(255,255,255,${0.12 * fade})`);
      g.addColorStop(0.9, `rgba(255,255,255,${0.55 * fade})`);
      g.addColorStop(1, `rgba(255,255,255,${0.95 * fade})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.strokeStyle = g;
      ctx.lineWidth = c.width;
      ctx.lineCap = "round";
      ctx.stroke();

      const glow = ctx.createRadialGradient(headX, headY, 0, headX, headY, 18);
      glow.addColorStop(0, `rgba(94,234,212,${0.55 * fade})`);
      glow.addColorStop(0.25, `rgba(255,255,255,${0.55 * fade})`);
      glow.addColorStop(1, "rgba(255,255,255,0)");

      ctx.beginPath();
      ctx.arc(headX, headY, 18, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(headX, headY, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.95 * fade})`;
      ctx.fill();

      // move
      c.x += Math.cos(c.angle) * c.speed;
      c.y += Math.sin(c.angle) * c.speed;

      // ✅ que crucen toda la pantalla: no mueren antes de tiempo
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (
        c.life >= 1.15 ||
        c.y > h + 260 ||
        c.x < -320 ||
        c.x > w + 320
      ) {
        c.active = false;
      }
    };

    const draw = (t: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // niebla sutil
      const bg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.25,
        60,
        w * 0.5,
        h * 0.25,
        Math.max(w, h)
      );
      bg.addColorStop(0, "rgba(94,234,212,0.06)");
      bg.addColorStop(1, "rgba(15,23,42,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // estrellas + drift
      for (const s of stars) {
        const tw = reduceMotion ? 1 : Math.sin(t * s.tw) * 0.3 + 0.7;
        const a = s.a * tw;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${a})`;
        ctx.fill();

        // movimiento lento
        if (!reduceMotion) {
          s.x += s.vx;
          s.y += s.vy;

          // wrap
          if (s.x < -5) s.x = w + 5;
          if (s.x > w + 5) s.x = -5;
          if (s.y < -5) s.y = h + 5;
          if (s.y > h + 5) s.y = -5;
        }
      }

      // cometas
      if (!reduceMotion) {
        if (t - lastComet > nextCometDelay) {
          spawnComet();
          lastComet = t;
          nextCometDelay = 2600 + Math.random() * 5200;
        }

        comets = comets.filter((c) => c.active);
        for (const c of comets) drawComet(c);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
