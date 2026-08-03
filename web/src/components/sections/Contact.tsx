import { contact, person, socials } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative border-t border-white/5 bg-ink-900/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 sm:px-8 md:py-36">
        <SectionHeading eyebrow={contact.eyebrow}>{contact.heading}</SectionHeading>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-mist-500">
            {contact.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-12">
          <ul className="grid gap-px overflow-hidden rounded-xl border border-white/6 bg-white/6 sm:grid-cols-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="group flex h-full flex-col gap-1.5 bg-ink-950 p-6 transition-colors hover:bg-ink-800"
                >
                  <span className="font-mono text-[11px] tracking-[0.22em] text-mist-500 uppercase">
                    {social.label}
                  </span>
                  <span className="text-sm break-words text-mist-100 transition-colors group-hover:text-accent">
                    {social.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/5 pt-8 text-xs text-mist-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {person.name}. {person.location}.
          </p>
          <p>{contact.closingLine}</p>
        </div>
      </div>
    </footer>
  );
}
