import { SkillGroup } from "@/types/portfolio";
import { Section } from "./Section";

interface SkillsSectionProps {
  skills: SkillGroup[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-border/80 bg-card/60 p-4 transition-colors hover:border-primary/30"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-lg bg-muted/70 border border-border/60 px-2.5 py-1 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-accent/30 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
