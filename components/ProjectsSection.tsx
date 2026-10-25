"use client";

import { ExternalLink, Sparkles } from "lucide-react";
import { ProjectItem } from "@/types/portfolio";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/ui/motion-primitives";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

/**
 * Template-style masonry project wall (CSS columns): cards keep their natural
 * height — full descriptions, every tag — with resting + hover shadow tiers
 * and image zoom when a card has one. 2 columns on mobile, 3 on laptop.
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section id="projects" title="Projects">
      <div className="columns-2 gap-4 sm:gap-6 lg:columns-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const primaryHref = project.demoUrl || project.sourceUrl || "#";
  const primaryLabel = project.demoUrl
    ? project.demoLabel ?? "Live demo"
    : project.sourceLabel ?? "GitHub";

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-4 break-inside-avoid sm:mb-6"
    >
      <article className="project-card cursor-pointer flex flex-col gap-2.5 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        {/* Optional image: template rounded-2xl inset with hover zoom */}
        {project.image && (
          <div className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1">
            <div className="project-card__image-inner">
              {/* Plain img so any optional host works without next.config changes */}
              <img
                src={project.image}
                alt={project.imageAlt ?? project.title}
                className="block w-full align-bottom"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 px-1">
          <h3 className="text-[15px] font-medium leading-[1.25] tracking-tight text-foreground sm:text-[17px]">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-tight text-foreground/55">
              <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
              {project.subtitle}
            </p>
          )}
          <p className="text-[12px] leading-normal tracking-tight text-foreground/65 sm:text-[13px]">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 px-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground/8 bg-background px-2 py-0.5 text-[10px] font-medium tracking-tight text-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta + primary link */}
        <div className="flex items-center justify-between gap-2 border-t border-foreground/5 px-1 pt-3 pb-1">
          {project.date && (
            <span className="text-[11px] tracking-tight text-foreground/50">
              {project.date}
            </span>
          )}
          <a
            href={primaryHref}
            target={primaryHref.startsWith("http") ? "_blank" : undefined}
            rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={(e) => e.stopPropagation()}
            className="focus-ring inline-flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-foreground transition-opacity hover:opacity-70"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {primaryLabel}
          </a>
        </div>
      </article>
    </FadeIn>
  );
}
