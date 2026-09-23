"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ProjectItem, ProjectColor } from "@/types/portfolio";
import { Section } from "./Section";
import { PinContainer } from "@/components/aceternity/ui/3d-pin";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

const TILTS = [-2.2, 1.8, -1.5, 2.3, -1.8, 1.3, -2.4, 1.7, -1.1, 2.0];

const PROJECT_COLORS: Record<
  ProjectColor,
  {
    card: string;
    text: string;
    tag: string;
    accent: string;
  }
> = {
  peach: {
    card: "bg-[#FFE3D6]",
    text: "text-[#7A321F]",
    tag: "bg-[#FFF1EA] text-[#A7442B] border-[#FFB99F]",
    accent: "#FF7043",
  },

  butter: {
    card: "bg-[#FFF1B8]",
    text: "text-[#704E00]",
    tag: "bg-[#FFF8D9] text-[#8A6500] border-[#F4D46A]",
    accent: "#E9A900",
  },

  mint: {
    card: "bg-[#DDF5E7]",
    text: "text-[#17613D]",
    tag: "bg-[#EFFAF3] text-[#267A50] border-[#A9DFC0]",
    accent: "#35A66F",
  },

  sky: {
    card: "bg-[#DDF0FF]",
    text: "text-[#20527E]",
    tag: "bg-[#EEF7FF] text-[#28669D] border-[#A9D2F4]",
    accent: "#3788D8",
  },

  lavender: {
    card: "bg-[#EDE3FF]",
    text: "text-[#56328F]",
    tag: "bg-[#F6F0FF] text-[#6840A3] border-[#D2BDF8]",
    accent: "#8B5CF6",
  },

  coral: {
    card: "bg-[#FFD9DC]",
    text: "text-[#7C2932]",
    tag: "bg-[#FFF0F1] text-[#A63D47] border-[#F2AAB0]",
    accent: "#E85D68",
  },
};

const normalizeIndex = (idx: number, len: number) => {
  const mod = ((idx % len) + len) % len;
  return mod + len;
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [displayIndex, setDisplayIndex] = useState(projects.length);
  const [withTransition, setWithTransition] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);

    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  useEffect(() => {
    if (!withTransition) {
      const frame = requestAnimationFrame(() => {
        setWithTransition(true);
      });

      return () => cancelAnimationFrame(frame);
    }
  }, [withTransition]);

  const handlePrev = () => {
    setWithTransition(true);
    setDisplayIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setWithTransition(true);
    setDisplayIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (
      displayIndex >= 2 * projects.length ||
      displayIndex < projects.length
    ) {
      setWithTransition(false);
      setDisplayIndex(normalizeIndex(displayIndex, projects.length));
    }
  };

  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const activeProjectIndex =
    ((displayIndex % projects.length) + projects.length) %
    projects.length;

  const handleDotClick = (targetProjectIndex: number) => {
    setWithTransition(true);

    let diff = targetProjectIndex - activeProjectIndex;

    if (diff > projects.length / 2) {
      diff -= projects.length;
    }

    if (diff < -projects.length / 2) {
      diff += projects.length;
    }

    setDisplayIndex((prev) => prev + diff);
  };

  const extendedProjects = [...projects, ...projects, ...projects];

  return (
    <Section id="projects" title="Projects" fullWidthContent>
      <div
        className="relative w-full select-none overflow-hidden py-3 sm:py-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Previous */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous project"
          className={cn(
            "absolute left-3 top-1/2 z-40 -translate-y-1/2",
            "flex h-11 w-11 items-center justify-center rounded-full",
            "border border-black/5 bg-white shadow-lg",
            "text-foreground",
            "transition-all duration-200",
            "hover:scale-105 hover:border-primary/30 hover:text-primary",
            "active:scale-95",
            "sm:left-6 sm:h-12 sm:w-12 md:left-8",
          )}
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          className={cn(
            "absolute right-3 top-1/2 z-40 -translate-y-1/2",
            "flex h-11 w-11 items-center justify-center rounded-full",
            "border border-black/5 bg-white shadow-lg",
            "text-foreground",
            "transition-all duration-200",
            "hover:scale-105 hover:border-primary/30 hover:text-primary",
            "active:scale-95",
            "sm:right-6 sm:h-12 sm:w-12 md:right-8",
          )}
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Sliding track */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className={cn(
            "flex will-change-transform",
            withTransition && "transition-transform duration-500 ease-out",
          )}
          style={{
            transform: `translateX(-${
              displayIndex * (100 / visibleCount)
            }%)`,
          }}
        >
          {extendedProjects.map((project, idx) => {
            const primaryHref =
              project.demoUrl || project.sourceUrl || "#";

            const pinTitle = project.demoUrl
              ? project.demoLabel ?? "Live Demo"
              : project.sourceLabel ?? "GitHub";

            const projectIndex = idx % projects.length;
            const tilt = TILTS[projectIndex % TILTS.length];

            const colors =
              PROJECT_COLORS[project.color ?? "peach"];

            return (
              <div
                key={`${project.id}-${idx}`}
                className="flex shrink-0 items-center justify-center px-3 sm:px-4 md:px-5"
                style={{
                  width: `${100 / visibleCount}%`,
                }}
              >
                <PinContainer
                  title={pinTitle}
                  href={primaryHref}
                  tilt={tilt}
                  accentColor={colors.accent}
                  cardClassName={colors.card}
                  containerClassName="h-[22rem] w-full max-w-[19rem] flex items-center justify-center sm:max-w-[20.5rem]"
                >
                  <div
                    className={cn(
                      "flex h-[19rem] w-[17rem] flex-col justify-between",
                      "p-1 sm:w-[18.5rem]",
                      colors.text,
                    )}
                  >
                    <div>
                      {/* Header */}
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <h3 className="truncate text-xl font-extrabold leading-tight tracking-[-0.025em]">
                          {project.title}
                        </h3>

                        {project.date && (
                          <span
                            className={cn(
                              "shrink-0 rounded-full px-2.5 py-1",
                              "text-[10px] font-bold tracking-wide",
                              colors.tag,
                            )}
                          >
                            {project.date}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="mb-4 line-clamp-6 text-sm font-medium leading-relaxed opacity-75">
                        {project.description}
                      </p>

                      {/* Tech tags */}
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "rounded-full border px-2.5 py-1",
                              "text-[10px] font-bold tracking-wide",
                              colors.tag,
                            )}
                          >
                            {tag}
                          </span>
                        ))}

                        {project.tags.length > 4 && (
                          <span
                            className={cn(
                              "rounded-full border px-2.5 py-1",
                              "text-[10px] font-bold",
                              colors.tag,
                              "opacity-60",
                            )}
                          >
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 border-t border-black/5 pt-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            "inline-flex items-center gap-1.5",
                            "text-xs font-extrabold",
                            "transition-transform duration-200",
                            "hover:translate-x-0.5",
                          )}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {project.demoLabel ?? "Demo"}
                        </a>
                      )}

                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold opacity-60 transition-opacity hover:opacity-100"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            />
                          </svg>

                          {project.sourceLabel ?? "Source"}
                        </a>
                      )}
                    </div>
                  </div>
                </PinContainer>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        {projects.map((project, idx) => {
          const colors =
            PROJECT_COLORS[project.color ?? "peach"];

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                activeProjectIndex === idx
                  ? "w-6"
                  : "w-1.5 bg-border hover:bg-muted-foreground/50",
              )}
              style={
                activeProjectIndex === idx
                  ? { backgroundColor: colors.accent }
                  : undefined
              }
            />
          );
        })}
      </div>
    </Section>
  );
}