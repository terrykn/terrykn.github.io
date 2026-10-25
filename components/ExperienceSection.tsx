"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { ExperienceItem } from "@/types/portfolio";
import { Section } from "@/components/Section";
import { AnimatedTimeline, type TimelineEvent } from "@/components/animata/progress/animatedtimeline";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

// Small rounded logo square on the left of each experience card
// (template-style). Falls back to the company initial until a logo
// path (public/media/experience-logos/...) is added to the data.
function ExperienceLogo({ item }: { item: ExperienceItem }) {
  return (
    <span
      className="border-foreground/15 inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border"
      style={{ borderRadius: 7 }}
      aria-hidden="true"
    >
      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logo}
          alt=""
          draggable={false}
          className="object-contain"
        />
      ) : (
        <span className="text-[18px] font-semibold tracking-tight text-foreground/60">
          {item.company.charAt(0)}
        </span>
      )}
    </span>
  );
}

interface CustomTimelineEvent extends TimelineEvent {
  item: ExperienceItem;
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
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
      <div className="mx-auto w-full max-w-3xl">
        <AnimatedTimeline
          events={events}
          className="py-1"
          styles={{
            lineColor: "var(--border)",
            activeLineColor: "var(--foreground)",
            dotColor: "var(--border)",
            activeDotColor: "var(--foreground)",
            dotSize: "1.1rem",
          }}
          customEventRender={(event) => {
            const customEvent = event as CustomTimelineEvent;
            const item = customEvent.item;
            const isOpen = expandedIds.has(item.id);

            return (
              // Template-style card: rounded-3xl, hairline border, no surface tint
              <div className="flex gap-3.5 rounded-3xl border border-foreground/5 bg-background p-3.5 sm:p-4">
                <ExperienceLogo item={item} />

                <div className="min-w-0 flex-1">
                {/* Collapsible trigger header */}
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
                    <h3 className="text-[15px] sm:text-base font-semibold tracking-tight text-foreground">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[13px] sm:text-sm font-semibold text-foreground inline-flex items-center gap-1 transition-opacity hover:opacity-70"
                        >
                          {item.company}
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      ) : (
                        <span className="text-[13px] sm:text-sm font-semibold text-foreground">
                          {item.company}
                        </span>
                      )}
                      {item.location && (
                        <span className="text-xs text-foreground/30">
                          · {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[13px] font-medium text-foreground/55 hidden sm:inline">
                      {item.period}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="p-1 text-foreground/55"
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Mobile period display */}
                <div className="sm:hidden text-[13px] font-medium text-foreground/55 mt-1">
                  {item.period}
                </div>

                {/* Expandable details */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 mt-3 border-t border-foreground/5">
                        {/* Bullets */}
                        <ul className="space-y-2 mb-3">
                          {item.description.map((bullet, idx) => (
                            <li
                              key={idx}
                              className="flex gap-2.5 text-[13px] sm:text-sm leading-relaxed text-foreground/65 tracking-tight"
                            >
                              <span
                                className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-foreground/30"
                                aria-hidden="true"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-foreground/8 bg-background px-3 py-1 text-xs tracking-tight text-foreground/60"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}                  </AnimatePresence>
                </div>
              </div>
            );
          }}
        />
      </div>
    </Section>
  );
}
