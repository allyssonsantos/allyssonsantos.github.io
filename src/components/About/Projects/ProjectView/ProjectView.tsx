import { ProjectCard } from '../ProjectCard';
import type { IProjects } from 'src/data/projects';

interface IProjectViewProps {
  projects: Array<IProjects>;
}

export function ProjectView({ projects }: IProjectViewProps) {
  return (
    <section>
      {projects.map((project) => (
        <ProjectCard
          key={project.name}
          name={project.name}
          description={project.description}
        />
      ))}
    </section>
  );
}
