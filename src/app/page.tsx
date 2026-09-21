import { Button } from "@/components/ui/Button";
import { HoverReveal } from "@/components/ui/HoverReveal";
import { LineItem } from "@/components/ui/LineItem";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-24 px-6 pb-24 pt-12">
      <section className="flex flex-col gap-6">
        <p className="text-body-md fgColor-secondary">hi there, it&apos;s me!</p>
        <h1 className="flex flex-wrap items-center gap-3 font-display text-display-sm fgColor-primary sm:text-display-md">
          <HoverReveal image="/placeholders/aly.svg" alt="A photo of Aly">
            Aly Gates
          </HoverReveal>
        </h1>
        <p className="text-body-lg fgColor-secondary">
          I&apos;m a design-minded frontend engineer interested in scalable
          component systems and the interfaces that extend them. I&apos;ve
          spent the last 10 years on product teams designing and building
          marketing sites, web apps, and goofy little side projects.
        </p>
        <div>
          <Button href="/resume.pdf" variant="primary">
            view my resume
          </Button>
        </div>
      </section>

      <section id="work" className="flex flex-col gap-6">
        <h2 className="font-heading text-heading-sm fgColor-primary">
          projects I&apos;m proud of
        </h2>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.thumbnail}
            />
          ))}
        </div>
      </section>

      <section id="experience" className="flex flex-col gap-6">
        <h2 className="font-heading text-heading-sm fgColor-primary">
          resume
        </h2>
        <div className="flex flex-col">
          {experience.map((item, i) => (
            <LineItem
              key={`${item.org}-${i}`}
              org={item.org}
              role={item.role}
              dates={item.dates}
            />
          ))}
        </div>
      </section>

      <section id="about" className="flex flex-col gap-6">
        <h2 className="font-heading text-heading-sm fgColor-primary">
          a little about me
        </h2>
        <p className="text-body-lg fgColor-secondary">
          I have a formal background in design and found engineering by way
          of deep curiosity for how things work. I&apos;m currently
          tinkering away as a Design Engineer at White House Custom Colour.
          In my free time, I am an avid reader and lifelong crafter forever
          in search of my next hobby. I live in St Paul, MN, with my husband
          and our{" "}
          <HoverReveal
            image="/placeholders/ivy.svg"
            alt="A photo of Ivy the greyhound"
            className="fgColor-accent underline decoration-dotted underline-offset-4"
          >
            greyhound Ivy
          </HoverReveal>
          .
        </p>
        <ul className="flex flex-wrap gap-4 text-body-md fgColor-secondary">
          {["github", "email", "contact", "ravelry", "goodreads"].map(
            (label) => (
              <li key={label}>
                <a
                  href="#"
                  className="underline decoration-dotted underline-offset-4 transition hover:fgColor-accent"
                >
                  {label}
                </a>
              </li>
            ),
          )}
        </ul>
      </section>

      <footer className="text-body-sm fgColor-secondary">
        Designed in Figma and coded with Next.js by me.{" "}
        <a href="#" className="underline decoration-dotted underline-offset-4">
          more things about how i built my site here
        </a>
      </footer>
    </div>
  );
}
