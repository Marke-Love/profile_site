import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Cases } from "@/components/sections/Cases";
import { ApiExplorer } from "@/components/sections/ApiExplorer";
import { Stack } from "@/components/sections/Stack";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="pl-[var(--rail)]">
      <Hero />
      <Impact />
      <About />
      <Experience />
      <Cases />
      <ApiExplorer />
      <Stack />
      <Education />
      <Contact />
    </main>
  );
}
