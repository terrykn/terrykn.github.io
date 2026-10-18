import { SkillGroup } from "@/types/portfolio";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  skills: SkillGroup[];
}

// Sleek monochrome skill cards — single accent dot per group uses the
// token palette so everything stays theme-driven (see docs/ARCHITECTURE.md).
const DOT_TONES = [
  "bg-primary",
  "bg-accent-foreground",
  "bg-foreground",
  "bg-muted-foreground",
];

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {skills.map((group, index) => {
          const dot = DOT_TONES[index % DOT_TONES.length];

          return (
            <div
              key={group.category}
              className={cn(
                "rounded-xl border border-border bg-card p-4 sm:p-5",
              )}
            >
              {/* Category heading */}
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    dot,
                  )}
                />

                <p
                  className={cn(
                    "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
                  )}
                >
                  {group.category}
                </p>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={cn(
                      "inline-flex items-center rounded-full",
                      "border border-border bg-muted px-2.5 py-1",
                      "text-sm font-medium tracking-[-0.01em] text-foreground/85",
                      "cursor-default",
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}