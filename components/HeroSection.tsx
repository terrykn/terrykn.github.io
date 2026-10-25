import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroData } from "@/types/portfolio";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const primaryLink = data.socialLinks.find((l) => l.isPrimary);
  const secondaryLinks = data.socialLinks.filter((l) => !l.isPrimary);

  return (
    <section id="about" className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-28 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto]">
          {/* Left: hero content */}
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[20px] font-medium leading-tight tracking-tight text-foreground">
              {data.greeting ?? "Hi, I'm"} {data.name}!
            </p>

            <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground lg:text-[3.65rem]">
              {data.title}
            </h1>

            <p className="mt-1 max-w-2xl text-[18px] leading-[1.55] tracking-tight text-foreground/65 sm:text-[20px]">
              {data.bio}
            </p>

            {/* CTA row: template-style pill button + quiet text links */}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {primaryLink && (
                <Link
                  href={primaryLink.href}
                  className="focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-foreground/5 bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4"
                >
                  {primaryLink.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              )}

              <div className="flex flex-wrap items-center gap-6">
                {secondaryLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={
                      link.href.startsWith("http") && !link.href.startsWith("mailto:")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      link.href.startsWith("http") && !link.href.startsWith("mailto:")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="focus-ring inline-flex cursor-pointer items-center text-sm font-medium text-foreground/65 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: static portrait in template-style rounded frame */}
          <ScaleUnblur className="flex justify-center md:justify-end">
            <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1 shadow-sm md:w-48">
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <img
                  src="/media/pfp.jpg"
                  alt={data.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
