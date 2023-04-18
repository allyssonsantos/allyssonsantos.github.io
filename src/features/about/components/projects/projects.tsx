import { projects } from '../../data/projects';
import { ProjectCard } from './project-card';

export function Projects() {
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
