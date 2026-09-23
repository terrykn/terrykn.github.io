export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  isPrimary?: boolean;
}

export interface HeroData {
  greeting?: string;
  name: string;
  title: string;
  bio: string;
  socialLinks: SocialLink[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  description: string[];
  technologies?: string[];
}

export type ProjectColor =
  | "peach"
  | "butter"
  | "mint"
  | "sky"
  | "lavender"
  | "coral";

export interface ProjectItem {
  id: string;
  title: string;
  date?: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  demoLabel?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  color?: ProjectColor;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  gpa?: string;
  details?: string[];
}

export interface HonorsAndActivities {
  honors: string[];
  activities: string[];
}

export interface PortfolioData {
  meta: {
    title: string;
    description: string;
  };
  navigation: NavLink[];
  hero: HeroData;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education?: EducationItem[];
  honorsAndActivities?: HonorsAndActivities;
  footer: {
    copyrightText: string;
    links: SocialLink[];
  };
}
