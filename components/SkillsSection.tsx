import { SkillGroup } from "@/types/portfolio";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  skills: SkillGroup[];
}

const SKILL_COLORS = [
  {
    card: "bg-[#FFF1B8]",
    heading: "text-[#704E00]",
    dot: "bg-[#E9A900]",
    pill: "bg-[#FFF8D9] border-[#F4D46A] text-[#8A6500]",
    hover: "hover:border-[#E9A900] hover:bg-[#FFF4C7]",
  },
  {
    card: "bg-[#DDF5E7]",
    heading: "text-[#17613D]",
    dot: "bg-[#35A66F]",
    pill: "bg-[#EFFAF3] border-[#A9DFC0] text-[#267A50]",
    hover: "hover:border-[#35A66F] hover:bg-[#E5F8ED]",
  },
  {
    card: "bg-[#DDF0FF]",
    heading: "text-[#20527E]",
    dot: "bg-[#3788D8]",
    pill: "bg-[#EEF7FF] border-[#A9D2F4] text-[#28669D]",
    hover: "hover:border-[#3788D8] hover:bg-[#E5F3FF]",
  },
  {
    card: "bg-[#EDE3FF]",
    heading: "text-[#56328F]",
    dot: "bg-[#8B5CF6]",
    pill: "bg-[#F6F0FF] border-[#D2BDF8] text-[#6840A3]",
    hover: "hover:border-[#8B5CF6] hover:bg-[#F3ECFF]",
  },
];

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {skills.map((group, index) => {
          const colors = SKILL_COLORS[index % SKILL_COLORS.length];

          return (
            <div
              key={group.category}
              className={cn(
                "group rounded-xl border border-border p-3 sm:p-4",
                colors.card,
                "transition-shadow duration-300",
              )}
            >
              {/* Category heading */}
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    colors.dot,
                  )}
                />

                <p
                  className={cn(
                    "text-xs font-extrabold uppercase tracking-[0.12em]",
                    colors.heading,
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
                      "border px-2 py-1",
                      "text-sm font-bold tracking-[-0.01em]",
                      "cursor-default",
                      "transition-colors duration-200",
                      colors.pill,
                      colors.hover,
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