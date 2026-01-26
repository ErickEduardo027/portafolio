import type { ReactNode } from "react";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="h-[1px] w-10 bg-brand-border" />
        <h2 className="text-2xl md:text-3xl font-semibold text-brand-text">{title}</h2>
      </div>
      {subtitle ? (
        <p className="mt-2 text-sm md:text-base text-brand-muted max-w-2xl">{subtitle}</p>
      ) : null}
    </div>
  );
}
