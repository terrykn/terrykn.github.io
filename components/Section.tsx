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
    <section id={id} className={`w-full py-16 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {title && (
          <header className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14">
            <h2 className="text-[2rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.75rem]">
              {title}
            </h2>
            {subtitle && (
              <p className="max-w-[36ch] text-[16px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[18px]">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {fullWidthContent ? (
          <div className="w-full">{children}</div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </section>
  );
}
