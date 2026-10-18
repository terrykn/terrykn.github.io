import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  fullWidthContent?: boolean;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  fullWidthContent = false,
}: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      {title && (
        <header className="max-w-4xl mx-auto px-6 sm:px-8 mb-8 sm:mb-12">
          {/* Minimal accent rule */}
          <div className="mb-4 h-px w-10 bg-primary" aria-hidden="true" />
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </header>
      )}

      {fullWidthContent ? (
        <div className="w-full">{children}</div>
      ) : (
        <div className="max-w-4xl mx-auto px-6 sm:px-8">{children}</div>
      )}
    </section>
  );
}
