import { HoverReveal } from "@/components/HoverReveal";
import { LineItem } from "@/components/LineItem";
import { ProjectCard } from "@/components/ProjectCard";
import { experience } from "@/data/experience";
import { getAllProjects } from "@/lib/projects";

const pageClasses =
  "mx-auto flex w-full max-w-2xl flex-col gap-20 px-6 pb-12 pt-12";
const sectionClasses = "flex flex-col gap-6";
const sectionHeadingClasses =
  "fontFamily-heading fontSize-heading-md lineHeight-heading-md letterSpacing-heading fgColor-primary";
const eyebrowClasses =
  "fontFamily-heading fontSize-heading-lg lineHeight-heading-lg letterSpacing-heading fgColor-primary";
const nameClasses =
  "fontFamily-display fontSize-display-sm lineHeight-display-sm fgColor-primary sm:fontSize-display-md sm:lineHeight-display-md lg:fontSize-display-lg lg:lineHeight-display-lg";
const introClasses =
  "fontFamily-body fontSize-body-lg lineHeight-body-lg fgColor-primary";
const bioClasses =
  "fontFamily-body fontSize-body-lg lineHeight-body-lg fgColor-primary";
const accentLinkClasses = "font-bold underline";
const projectListClasses = "flex flex-col gap-8";
const experienceListClasses = "flex flex-col";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div className={pageClasses}>
      <section className={sectionClasses}>
        <p className={eyebrowClasses}>hi there, it&apos;s me...</p>
        <h1 className={nameClasses}>
          <HoverReveal image="/placeholders/aly.svg" alt="A photo of Aly">
            Aly Gates
          </HoverReveal>
        </h1>
        <p className={introClasses}>
          I&apos;m a design-minded frontend engineer interested in scalable
          component systems and the interfaces that extend them. I&apos;ve spent
          the last 10 years on product teams designing and building{" "}
          <span className={`fgColor-poppy ${accentLinkClasses}`}>
            marketing sites
          </span>
          ,{" "}
          <span className={`fgColor-ochre ${accentLinkClasses}`}>web apps</span>
          , and{" "}
          <span className={`fgColor-sky ${accentLinkClasses}`}>
            goofy little side projects
          </span>
          .
        </p>
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
        <h2 className={sectionHeadingClasses}>places I&apos;ve worked</h2>
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
          I have a{" "}
          <span className={`fgColor-poppy ${accentLinkClasses}`}>
            formal background in design
          </span>{" "}
          and found engineering by way of deep curiosity for how things work.
          I&apos;m currently tinkering away as a Design Engineer at White House
          Custom Colour.
        </p>
        <p className={bioClasses}>
          In my free time, I am an{" "}
          <span className={`fgColor-sky ${accentLinkClasses}`}>
            avid reader
          </span>{" "}
          and{" "}
          <span className={`fgColor-ochre ${accentLinkClasses}`}>
            lifelong crafter
          </span>{" "}
          forever in search of my next hobby. I live in St Paul, MN, with my
          husband and our{" "}
          <HoverReveal
            image="/placeholders/ivy.svg"
            alt="A photo of Ivy the greyhound"
          >
            <span className={`fgColor-poppy ${accentLinkClasses}`}>
              greyhound Ivy
            </span>
          </HoverReveal>
          .
        </p>
      </section>
    </div>
  );
}
