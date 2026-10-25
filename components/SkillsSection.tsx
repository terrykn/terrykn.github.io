import { SkillGroup } from "@/types/portfolio";
import { Section } from "@/components/Section";

interface SkillsSectionProps {
  skills: SkillGroup[];
}

// Compact skills inside a single centered card: one row per category —
// label on the left, monochrome pills flowing to the right (4 rows total).
export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section id="skills" title="Skills">
      <div className="mx-auto w-full max-w-3xl rounded-4xl border border-foreground/5 bg-foreground/2 p-5 sm:p-8 dark:bg-foreground/5">
        <div className="flex flex-col gap-4 sm:gap-5">
          {skills.map((group) => (
            <div
              key={group.category}
              className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <h3 className="text-[13px] sm:text-sm font-semibold tracking-tight text-foreground/60 sm:w-36 sm:shrink-0">
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-full border border-foreground/8 bg-background px-3 py-1 text-xs tracking-tight text-foreground/85 sm:text-[13px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
