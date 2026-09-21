import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/ui/Footer";
import { HoverReveal } from "@/components/ui/HoverReveal";
import { LineItem } from "@/components/ui/LineItem";
import { LinkList } from "@/components/ui/LinkList";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { experience } from "@/data/experience";
import { socialLinks } from "@/data/social";
import { getAllProjects } from "@/lib/projects";

const pageClasses = "mx-auto flex w-full max-w-2xl flex-col gap-24 px-6 pb-24 pt-12";
const sectionClasses = "flex flex-col gap-6";
const sectionHeadingClasses = "font-heading text-heading-sm fgColor-primary";
const eyebrowClasses = "text-body-md fgColor-secondary";
const nameClasses =
  "flex flex-wrap items-center gap-3 font-display text-display-sm fgColor-primary sm:text-display-md";
const introClasses = "text-body-lg fgColor-secondary";
const bioClasses = "text-body-lg fgColor-secondary";
const ivyLinkClasses = "fgColor-accent underline decoration-dotted underline-offset-4";
const projectListClasses = "flex flex-col gap-4";
const experienceListClasses = "flex flex-col";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className={pageClasses}>
      <section className={sectionClasses}>
        <p className={eyebrowClasses}>hi there, it&apos;s me!</p>
        <h1 className={nameClasses}>
          <HoverReveal image="/placeholders/aly.svg" alt="A photo of Aly">
            Aly Gates
          </HoverReveal>
        </h1>
        <p className={introClasses}>
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

      <section id="work" className={sectionClasses}>
        <h2 className={sectionHeadingClasses}>projects I&apos;m proud of</h2>
        <div className={projectListClasses}>
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

      <section id="experience" className={sectionClasses}>
        <h2 className={sectionHeadingClasses}>resume</h2>
        <div className={experienceListClasses}>
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

      <section id="about" className={sectionClasses}>
        <h2 className={sectionHeadingClasses}>a little about me</h2>
        <p className={bioClasses}>
          I have a formal background in design and found engineering by way
          of deep curiosity for how things work. I&apos;m currently
          tinkering away as a Design Engineer at White House Custom Colour.
          In my free time, I am an avid reader and lifelong crafter forever
          in search of my next hobby. I live in St Paul, MN, with my husband
          and our{" "}
          <HoverReveal
            image="/placeholders/ivy.svg"
            alt="A photo of Ivy the greyhound"
            className={ivyLinkClasses}
          >
            greyhound Ivy
          </HoverReveal>
          .
        </p>
        <LinkList links={socialLinks} />
      </section>

      <Footer linkHref="#" linkLabel="more things about how i built my site here" />
    </div>
  );
}
