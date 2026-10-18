import Link from "next/link";
import { HeroData } from "@/types/portfolio";
import GetStartedButton from "@/components/animata/button/get-started-button";
import TextBorderAnimation from "@/components/animata/text/text-border-animation";
import DecayCard from "./react-bits/DecayCard";

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const primaryLink = data.socialLinks.find((l) => l.isPrimary);
  const secondaryLinks = data.socialLinks.filter((l) => !l.isPrimary);

  return (
    <section id="about" className="pt-36 pb-8 sm:pt-44 sm:pb-14">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-16 lg:gap-28">
          {/* Left: Hero content */}
          <div>
            {/* Header + mobile profile photo */}
            <div className="flex items-center justify-between gap-6 mb-4">
              <div className="space-y-1">
                <p className="text-base sm:text-lg font-medium text-primary font-mono tracking-wide">
                  {data.greeting ?? "Hi, I'm"}
                </p>

                <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
                  {data.name}
                  <span className="text-primary">.</span>
                </h1>

                <p className="mt-2 text-xl sm:text-2xl font-medium text-muted-foreground tracking-tight">
                  {data.title}
                </p>
              </div>

              {/* Small profile card on smaller screens */}
              <div className="shrink-0 md:hidden">
                <DecayCard
                  width={100}
                  height={130}
                  image="/media/pfp.jpg"
                  baseFrequency={0.001}
                  numOctaves={5}
                  seed={4}
                  maxDisplacement={200}
                  movementBound={50}
                />
              </div>
            </div>

            {/* Bio */}
            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground mb-10">
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
                    target={
                      link.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
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

          {/* Large profile photo on desktop */}
          <div className="hidden md:flex justify-center md:justify-end">
            <DecayCard
              width={160}
              height={200}
              image="/media/pfp.jpg"
              baseFrequency={0.001}
              numOctaves={5}
              seed={4}
              maxDisplacement={200}
              movementBound={50}
            />
          </div>
        </div>
      </div>
    </section>
  );
}