import Link from "next/link";
import { HeroData } from "@/types/portfolio";
import GetStartedButton from "@/components/animata/button/get-started-button";
import TextBorderAnimation from "@/components/animata/text/text-border-animation";

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const primaryLink = data.socialLinks.find((l) => l.isPrimary);
  const secondaryLinks = data.socialLinks.filter((l) => !l.isPrimary);

  return (
    <section id="about" className="pt-28 pb-4 sm:pt-28 sm:pb-18">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">

        {/* Main headline */}
        <div className="space-y-1 mb-4">
          <p className="text-base sm:text-lg font-semibold text-muted-foreground">
            {data.greeting ?? "Hi, I'm"}
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            {data.name}
            <span className="text-primary">.</span>
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-muted-foreground">
            {data.title}
          </p>
        </div>

        {/* Decorative squiggle */}
        <svg
          className="mb-4 text-primary"
          width="70"
          height="14"
          viewBox="0 0 80 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2 12 C10 4, 18 4, 26 8 C34 12, 42 12, 50 8 C58 4, 66 4, 74 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Bio */}
        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground mb-6">
          {data.bio}
        </p>

        {/* CTA row */}
        <div className="flex flex-row items-center">
          {primaryLink && (
            <Link href={primaryLink.href}>
              <GetStartedButton text={primaryLink.label} />
            </Link>
          )}

          <div className="flex items-center gap-6 flex-wrap">
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center"
              >
                <TextBorderAnimation
                  text={link.label}
                  className="text-sm font-semibold tracking-wide"
                />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

