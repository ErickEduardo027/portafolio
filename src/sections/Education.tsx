import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { site } from "../data/site";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle title="Educación" />

        <div className="relative mt-10">
          {/* línea central */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-brand-border" />

          <div className="grid gap-6">
            {site.education.map((e, idx) => {
              const left = idx % 2 === 0;
              return (
                <Reveal key={e.title}>
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className={left ? "" : "md:order-2"}>
                      <div className="rounded-xl border border-brand-border bg-brand-card p-5">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-brand-text font-semibold">{e.title}</h3>
                          <span className="text-xs text-brand-accent">{e.period}</span>
                        </div>
                        <p className="text-sm text-brand-muted mt-1">{e.org}</p>
                        <ul className="mt-3 text-sm text-brand-muted list-disc pl-5 space-y-1">
                          {e.details.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-accent shadow-soft" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
