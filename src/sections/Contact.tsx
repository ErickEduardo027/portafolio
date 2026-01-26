import { useMemo, useState } from "react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { site } from "../data/site";
import { Mail, MapPin, Phone } from "lucide-react";

type FormState = { name: string; email: string; message: string };

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Escribe tu nombre.";
    if (!form.email.trim()) e.email = "Escribe tu email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email inválido.";
    if (!form.message.trim()) e.message = "Escribe un mensaje.";
    return e;
  }, [form]);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (Object.keys(errors).length) return;

    // Sin backend: usamos mailto para “enviar” y mostramos éxito.
    const subject = encodeURIComponent(`Contacto desde portafolio: ${form.name}`);
    const body = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle
          title="Contacto"
          subtitle="¿Tienes un proyecto en mente o quieres saludar? Estaré encantado de escucharte."
        />

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <Reveal>
            <div className="grid gap-3">
              <div className="rounded-xl border border-brand-border bg-brand-card p-5 flex gap-3">
                <Mail className="text-brand-accent" size={18} />
                <div>
                  <p className="text-sm text-brand-muted">Email</p>
                  <p className="text-brand-text">{site.email}</p>
                </div>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card p-5 flex gap-3">
                <Phone className="text-brand-accent" size={18} />
                <div>
                  <p className="text-sm text-brand-muted">Teléfono</p>
                  <p className="text-brand-text">{site.phone}</p>
                </div>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card p-5 flex gap-3">
                <MapPin className="text-brand-accent" size={18} />
                <div>
                  <p className="text-sm text-brand-muted">Ubicación</p>
                  <p className="text-brand-text">{site.location}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-xl border border-brand-border bg-brand-card p-6"
              aria-label="Formulario de contacto"
            >
              <div className="grid gap-4">
                <label className="grid gap-1">
                  <span className="text-sm text-brand-text">Nombre</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    className="rounded-lg bg-brand-bg/40 border border-brand-border px-3 py-2 text-brand-text outline-none focus:ring-2 focus:ring-brand-accent/40"
                    placeholder="Tu nombre"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name ? <span className="text-xs text-red-300">{errors.name}</span> : null}
                </label>

                <label className="grid gap-1">
                  <span className="text-sm text-brand-text">Email</span>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    className="rounded-lg bg-brand-bg/40 border border-brand-border px-3 py-2 text-brand-text outline-none focus:ring-2 focus:ring-brand-accent/40"
                    placeholder="tu.email@ejemplo.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email ? <span className="text-xs text-red-300">{errors.email}</span> : null}
                </label>

                <label className="grid gap-1">
                  <span className="text-sm text-brand-text">Mensaje</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    className="min-h-[120px] rounded-lg bg-brand-bg/40 border border-brand-border px-3 py-2 text-brand-text outline-none focus:ring-2 focus:ring-brand-accent/40"
                    placeholder="Cuéntame sobre tu proyecto..."
                    aria-invalid={!!errors.message}
                  />
                  {errors.message ? (
                    <span className="text-xs text-red-300">{errors.message}</span>
                  ) : null}
                </label>

                <button
                  type="submit"
                  className="rounded-lg bg-brand-accent text-brand-bg px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition"
                >
                  Enviar Mensaje
                </button>

                {sent ? (
                  <p className="text-sm text-brand-accent">
                    ¡Listo! Se abrió tu cliente de correo para enviar el mensaje.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
