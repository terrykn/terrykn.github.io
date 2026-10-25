import { SkillGroup } from "@/types/portfolio";
import { Section } from "@/components/Section";

interface SkillsSectionProps {
  skills: SkillGroup[];
}

// Template-style skills: monochrome pill groups in rounded-4xl containers
// (see example-template/components/about/skills.tsx).
export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category} className="flex flex-col gap-3">
            <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
              {group.category}
            </h3>

            <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-4 dark:bg-foreground/5">
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
