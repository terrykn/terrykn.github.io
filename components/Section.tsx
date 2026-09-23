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
    <section id={id} className={`py-8 sm:py-12 ${className}`}>
      {title && (
        <header className="max-w-4xl mx-auto px-6 sm:px-8 mb-6 sm:mb-8">
          {/* Small hand-drawn accent mark above heading */}
          <div className="flex items-center gap-3 mb-2">
            <svg width="24" height="8" viewBox="0 0 28 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2 8 C6 2, 12 2, 14 5 C16 8, 22 8, 26 2" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
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
        <div className="w-full px-6 sm:px-8">{children}</div>
      ) : (
        <div className="max-w-4xl mx-auto px-6 sm:px-8">{children}</div>
      )}
    </section>
  );
}
