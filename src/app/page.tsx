import About from "@content/home/about.mdx";
import Intro from "@content/home/intro.mdx";
import { ExperienceList } from "@/components/ExperienceList";
import { Eyebrow } from "@/components/Eyebrow";
import { ClickReveal } from "@/components/ClickReveal";
import { ProjectList } from "@/components/ProjectList";
import { RichText } from "@/components/RichText";
import { Section } from "@/components/Section";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-16 px-6 pt-16 pb-24">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Eyebrow>hi there, it&apos;s me...</Eyebrow>
          <h1 className="font-display text-display">
            <ClickReveal
              image="/placeholders/aly-with-ivy.jpg"
              alt="A photo of Aly"
              caption="that's me"
            >
              Aly Gates
            </ClickReveal>
          </h1>
        </div>
        <RichText className="text-lg">
          <Intro />
        </RichText>
      </section>

      <Section id="work" title="a few projects I'm proud of">
        <ProjectList />
      </Section>

      <Section id="experience" title="some places I've worked">
        <ExperienceList />
      </Section>

      <Section id="about" title="a little about me">
        <RichText className="text-lg">
          <About />
        </RichText>
      </Section>
    </div>
  );
}
