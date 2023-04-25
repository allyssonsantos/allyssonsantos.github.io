import { projects } from '../../data/projects';
import { ProjectCard } from './project-card';
import styles from './projects.module.css';

export function Projects() {
  return (
    <section className={styles.projects}>
      {projects.map((project) => (
        <ProjectCard
          key={project.name}
          name={project.name}
          description={project.description}
          className={styles.projects__project}
          borderPrimaryColor={project.colors.primary}
          borderSecondaryColor={project.colors.secondary}
        />
      ))}
    </section>
  );
}
