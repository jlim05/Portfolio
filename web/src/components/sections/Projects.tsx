import { projects, sections } from "@/content/site";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-6 py-32 sm:px-8 md:py-40"
    >
      <SectionHeading eyebrow={sections.projects.eyebrow}>
        {sections.projects.heading}
      </SectionHeading>

      <p className="mt-5 max-w-xl text-base text-mist-500">
        {sections.projects.blurb}
      </p>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal
            key={project.title}
            // Stagger by column so each row arrives as a wave, and cap the
            // delay so late cards never feel like they are lagging.
            delay={Math.min(index, 3) * 0.07}
            className="h-full"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
