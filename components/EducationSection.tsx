import { EducationItem, HonorsAndActivities } from "@/types/portfolio";
import { Section } from "@/components/Section";

interface EducationSectionProps {
  education?: EducationItem[];
  honorsAndActivities?: HonorsAndActivities;
}

export function EducationSection({ education, honorsAndActivities }: EducationSectionProps) {
  if (!education?.length && !honorsAndActivities) return null;

  return (
    <Section id="education" title="Education">
      <div className="flex flex-col gap-6">
        {/* Education: template rounded-4xl container with built-in and rounded-3xl rows */}
        {education && education.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
              Education
            </h3>
            <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-4 dark:bg-foreground/5">
              <ul className="flex flex-col gap-2">
                {education.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 rounded-3xl border border-foreground/5 bg-background p-2 sm:p-3"
                  >
                    {/* Template-style logo square with initials */}
                    <span
                      className="border-foreground/15 inline-flex h-12 w-12 shrink-0 items-center justify-center border text-foreground/60"
                      style={{ borderRadius: 14 }}
                      aria-hidden="true"
                    >
                      <span className="text-[18px] font-semibold tracking-tight">
                        {item.institution.charAt(0)}
                      </span>
                    </span>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-col">
                        <span className="text-[16px] font-semibold tracking-tight text-foreground sm:text-[17px]">
                          {item.institution}
                        </span>
                        <span className="mt-0.5 min-w-0 truncate text-[13px] tracking-tight text-foreground/65 sm:text-[14px]">
                          {item.degree}
                          {item.gpa && (
                            <span className="text-foreground/30">
                              {" "}
                              · GPA {item.gpa}
                            </span>
                          )}
                        </span>
                        {item.details && item.details.length > 0 && (
                          <ul className="mt-1 space-y-1 text-xs tracking-tight text-foreground/55">
                            {item.details.map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="shrink-0 flex flex-col sm:items-end text-[13px] font-medium text-foreground/55">
                        <span>{item.period}</span>
                        {item.location && (
                          <span className="text-foreground/30">{item.location}</span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Honors & Activities */}
        {honorsAndActivities && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {honorsAndActivities.honors?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                  Awards
                </h3>
                <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-4 sm:p-5 dark:bg-foreground/5">
                  <ul className="space-y-2.5">
                    {honorsAndActivities.honors.map((honor, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-[13px] font-medium text-foreground/85 tracking-tight sm:text-[14px]"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40"
                          aria-hidden="true"
                        />
                        {honor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {honorsAndActivities.activities?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                  Activities
                </h3>
                <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-4 sm:p-5 dark:bg-foreground/5">
                  <ul className="space-y-2.5">
                    {honorsAndActivities.activities.map((act, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-[13px] font-medium text-foreground/85 tracking-tight sm:text-[14px]"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40"
                          aria-hidden="true"
                        />
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
