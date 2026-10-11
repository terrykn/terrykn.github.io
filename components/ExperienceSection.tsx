"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { ExperienceItem } from "@/types/portfolio";
import { Section } from "./Section";
import { AnimatedTimeline, type TimelineEvent } from "@/components/animata/progress/animatedtimeline";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

interface CustomTimelineEvent extends TimelineEvent {
  item: ExperienceItem;
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  // Collapsed by default: empty set
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const events: CustomTimelineEvent[] = experience.map((item) => ({
    id: item.id,
    title: item.role,
    date: item.period,
    item,
  }));

  return (
    <Section id="experience" title="Experience">
      <div className="max-w-3xl">
        <AnimatedTimeline
          events={events}
          className="py-1"
          styles={{
            lineColor: "var(--border)",
            activeLineColor: "var(--primary)",
            dotColor: "var(--border)",
            activeDotColor: "var(--primary)",
            dotSize: "1.1rem",
          }}
          customEventRender={(event) => {
            const customEvent = event as CustomTimelineEvent;
            const item = customEvent.item;
            const isOpen = expandedIds.has(item.id);

            return (
              <div className="rounded-xl border border-border/80 bg-card/60 p-3.5 sm:p-4 transition-all duration-200 hover:border-primary/40 hover:bg-card">
                {/* Collapsible Trigger Header */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggleExpand(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }
                  }}
                  className="flex items-start justify-between gap-3 cursor-pointer select-none group"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-extrabold text-foreground group-hover:text-primary transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs sm:text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {item.company}
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      ) : (
                        <span className="text-xs sm:text-sm font-semibold text-primary">
                          {item.company}
                        </span>
                      )}
                      {item.location && (
                        <span className="text-xs text-muted-foreground/70">
                          · {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">
                      {item.period}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="p-1 rounded-xl text-muted-foreground group-hover:text-primary transition-colors"
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Mobile period display */}
                <div className="sm:hidden text-xs font-semibold text-muted-foreground mt-1">
                  {item.period}
                </div>

                {/* Bouncy expandable details */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0, scale: 0.96 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.96 }}
                      transition={{
                        type: "spring",
                        duration: 0.55,
                        bounce: 0.38,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3.5 mt-3 border-t border-border/60">
                        {/* Bullets */}
                        <ul className="space-y-2 mb-3">
                          {item.description.map((bullet, idx) => (
                            <li
                              key={idx}
                              className="flex gap-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground"
                            >
                              <span
                                className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/70"
                                aria-hidden="true"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs font-medium rounded-full bg-muted/80 border border-border/70 px-2 py-1 text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }}
        />
      </div>
    </Section>
  );
}
