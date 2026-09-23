import { portfolioData } from "@/data/portfolio";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { GallerySection } from "@/components/GallerySection";
import { EducationSection } from "@/components/EducationSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { hero, skills, experience, projects, education, honorsAndActivities, navigation, footer, gallery } = portfolioData;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title={hero.name} links={navigation} />
      <main className="flex-1">
        <HeroSection data={hero} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <ProjectsSection projects={projects} />
        <EducationSection education={education} honorsAndActivities={honorsAndActivities} />
        {gallery && <GallerySection gallery={gallery} />}
      </main>
      <Footer copyrightText={footer.copyrightText} links={footer.links} />
    </div>
  );
}
