import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export async function ProjectList() {
  const projects = await getAllProjects();

  return (
    <div className="flex flex-col gap-8">
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
  );
}
