import { EducationItem, HonorsAndActivities } from "@/types/portfolio";
import { Section } from "./Section";

interface EducationSectionProps {
  education?: EducationItem[];
  honorsAndActivities?: HonorsAndActivities;
}

export function EducationSection({ education, honorsAndActivities }: EducationSectionProps) {
  if (!education?.length && !honorsAndActivities) return null;

  return (
    <Section id="education" title="Education">
      <div className="space-y-6">
        {/* Education cards */}
        {education && education.length > 0 && (
          <div className="space-y-3">
            {education.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    {item.institution}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold text-muted-foreground">
                    {item.degree}
                    {item.gpa && (
                      <span className="ml-2 text-xs font-bold text-primary bg-accent/60 px-2 py-0.5 rounded-full">
                        GPA {item.gpa}
                      </span>
                    )}
                  </p>
                  {item.details && item.details.length > 0 && (
                    <ul className="mt-1.5 space-y-1 text-xs sm:text-sm text-muted-foreground">
                      {item.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  )}
                </div>
                <div className="shrink-0 sm:text-right text-xs font-semibold text-muted-foreground">
                  <div>{item.period}</div>
                  {item.location && <div className="text-muted-foreground/70 mt-0.5">{item.location}</div>}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Honors & Activities */}
        {honorsAndActivities && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {honorsAndActivities.honors?.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">
                  Awards
                </h3>
                <ul className="space-y-2">
                  {honorsAndActivities.honors.map((honor, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-foreground">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                      {honor}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {honorsAndActivities.activities?.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3">
                  Activities
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {honorsAndActivities.activities.map((act) => (
                    <span
                      key={act}
                      className="inline-flex items-center rounded-lg bg-muted border border-border px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
