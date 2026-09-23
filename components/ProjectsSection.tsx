"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { ProjectItem } from "@/types/portfolio";
import { Section } from "./Section";
import { PinContainer } from "@/components/aceternity/ui/3d-pin";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

const TILTS = [-2.2, 1.8, -1.5, 2.3, -1.8, 1.3, -2.4, 1.7, -1.1, 2.0];

const normalizeIndex = (idx: number, len: number) => {
  const mod = ((idx % len) + len) % len;
  return mod + len;
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Start in the middle duplicate set for infinite looping in both directions
  const [displayIndex, setDisplayIndex] = useState(projects.length);
  const [withTransition, setWithTransition] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive visible count: 3 on wide screens (>= 1024px), 2 on tablet (>= 640px), 1 on mobile (< 640px)
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

  // When wrapping boundary is crossed, re-enable transition on the next animation frame
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
    if (displayIndex >= 2 * projects.length || displayIndex < projects.length) {
      // Instantly snap to the matching item in the middle set without transition
      setWithTransition(false);
      setDisplayIndex(normalizeIndex(displayIndex, projects.length));
    }
  };

  // Mobile swipe gestures
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

  // Active project index (0 to projects.length - 1)
  const activeProjectIndex =
    ((displayIndex % projects.length) + projects.length) % projects.length;

  const handleDotClick = (targetProjectIndex: number) => {
    setWithTransition(true);
    let diff = targetProjectIndex - activeProjectIndex;
    // Take shortest path around the circle
    if (diff > projects.length / 2) diff -= projects.length;
    if (diff < -projects.length / 2) diff += projects.length;
    setDisplayIndex((prev) => prev + diff);
  };

  // Extended track of 3 sets: [...projects, ...projects, ...projects]
  const extendedProjects = [...projects, ...projects, ...projects];

  return (
    <Section id="projects" title="Projects" fullWidthContent>
      {/* Full-width carousel viewport extending to edge of screen */}
      <div
        className="relative w-full overflow-hidden py-3 sm:py-4 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Floating Left Arrow (Always active for infinite looping) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous project"
          className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-border/90 bg-white backdrop-blur-md shadow-xl flex items-center justify-center text-foreground hover:bg-card hover:border-primary hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Floating Right Arrow (Always active for infinite looping) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-border/90 bg-white backdrop-blur-md shadow-xl flex items-center justify-center text-foreground hover:bg-card hover:border-primary hover:text-primary hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Sliding Track */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex will-change-transform ${
            withTransition ? "transition-transform duration-500 ease-out" : ""
          }`}
          style={{
            transform: `translateX(-${displayIndex * (100 / visibleCount)}%)`,
          }}
        >
          {extendedProjects.map((project, idx) => {
            const primaryHref = project.demoUrl || project.sourceUrl || "#";
            const pinTitle = project.demoUrl
              ? project.demoLabel ?? "Live Demo"
              : project.sourceLabel ?? "GitHub";
            const projectIndex = idx % projects.length;
            const tilt = TILTS[projectIndex % TILTS.length];

            return (
              <div
                key={`${project.id}-${idx}`}
                className="shrink-0 flex items-center justify-center px-3 sm:px-4 md:px-5"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <PinContainer
                  title={pinTitle}
                  href={primaryHref}
                  tilt={tilt}
                  containerClassName="h-[22rem] w-full max-w-[19rem] sm:max-w-[20.5rem] flex items-center justify-center"
                >
                  <div className="w-[17rem] sm:w-[18.5rem] h-[19rem] flex flex-col justify-between">
                    <div>
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-extrabold text-foreground leading-snug truncate">
                          {project.title}
                        </h3>
                        {project.date && (
                          <span className="shrink-0 text-[11px] font-semibold text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                            {project.date}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3 mb-3">
                        {project.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium rounded-md bg-muted/80 border border-border/70 px-2 py-0.5 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-[11px] font-medium rounded-md bg-muted/50 border border-border/50 px-1.5 py-0.5 text-muted-foreground/70">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {project.demoLabel ?? "Demo"}
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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

      {/* Dot Indicators */}
      <div className="flex justify-center items-center gap-1.5 mt-2">
        {projects.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeProjectIndex === idx
                ? "w-6 bg-primary"
                : "w-1.5 bg-border hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </Section>
  );
}
