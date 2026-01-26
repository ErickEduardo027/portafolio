import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { site } from "../data/site";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle title="Experiencia" />

        <div className="grid gap-4">
          {site.experience.map((x) => (
            <Reveal key={x.title}>
              <div className="rounded-xl border border-brand-border bg-brand-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-brand-text font-semibold">{x.title}</h3>
                    <p className="text-sm text-brand-muted">{x.org}</p>
                  </div>
                  <span className="text-xs text-brand-accent">{x.period}</span>
                </div>

                <ul className="mt-3 text-sm text-brand-muted list-disc pl-5 space-y-1">
                  {x.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
