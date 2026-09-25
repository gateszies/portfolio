import { ExperienceList } from "@/components/ExperienceList";
import { HoverReveal } from "@/components/HoverReveal";
import { ProjectList } from "@/components/ProjectList";
import { Section } from "@/components/Section";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-20 px-6 pt-12 pb-12">
      <section className="flex flex-col gap-6">
        <p className="font-label text-foreground text-2xl font-medium tracking-widest">
          hi there, it&apos;s me...
        </p>
        <h1 className="font-display text-foreground text-4xl sm:text-6xl lg:text-9xl">
          <HoverReveal image="/placeholders/aly.svg" alt="A photo of Aly">
            Aly Gates
          </HoverReveal>
        </h1>
        <p className="font-body text-foreground text-lg">
          I&apos;m a design-minded frontend engineer interested in scalable
          component systems and the interfaces that extend them. I&apos;ve spent
          the last 10 years on product teams designing and building{" "}
          <span className="text-accent-one font-bold underline">
            marketing sites
          </span>
          ,{" "}
          <span className="text-accent-three font-bold underline">
            web apps
          </span>
          , and{" "}
          <span className="text-accent-two font-bold underline">
            goofy little side projects
          </span>
          .
        </p>
      </section>

      <Section id="work" title="projects I'm proud of">
        <ProjectList />
      </Section>

      <Section id="experience" title="places I've worked">
        <ExperienceList />
      </Section>

      <Section id="about" title="a little about me">
        <p className="font-body text-foreground text-lg">
          I have a{" "}
          <span className="text-accent-one font-bold underline">
            formal background in design
          </span>{" "}
          and found engineering by way of deep curiosity for how things work.
          I&apos;m currently tinkering away as a Design Engineer at White House
          Custom Colour.
        </p>
        <p className="font-body text-foreground text-lg">
          In my free time, I am an{" "}
          <span className="text-accent-two font-bold underline">
            avid reader
          </span>{" "}
          and{" "}
          <span className="text-accent-three font-bold underline">
            lifelong crafter
          </span>{" "}
          forever in search of my next hobby. I live in St Paul, MN, with my
          husband and our{" "}
          <HoverReveal
            image="/placeholders/ivy.svg"
            alt="A photo of Ivy the greyhound"
          >
            <span className="text-accent-one font-bold underline">
              greyhound Ivy
            </span>
          </HoverReveal>
          .
        </p>
      </Section>
    </div>
  );
}
