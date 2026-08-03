import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { PersonalStatement } from "@/components/sections/PersonalStatement";
import { Projects } from "@/components/sections/Projects";
import { Hobbies } from "@/components/sections/Hobbies";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <PersonalStatement />
        <Projects />
        <Hobbies />
      </main>
      <Contact />
    </>
  );
}
