import { personalStatement } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function PersonalStatement() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32 sm:px-8 md:py-48">
      <SectionHeading eyebrow={personalStatement.eyebrow}>
        {personalStatement.heading}
      </SectionHeading>

      <div className="mt-14 max-w-2xl space-y-7 text-base leading-[1.85] text-mist-300 sm:text-lg">
        {personalStatement.paragraphs.map((paragraph, index) => (
          <Reveal key={index} delay={index * 0.08}>
            <p className="text-pretty">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-16">
        <div className="h-px w-24 bg-linear-to-r from-accent/60 to-transparent" />
      </Reveal>
    </section>
  );
}
