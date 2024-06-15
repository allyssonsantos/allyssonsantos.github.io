import { useState } from 'react';
import Image from 'next/image';

import { type ProjectsType, projects } from '../../data/projects';
import { ProjectModal } from './project-modal/project-modal';
import styles from './projects.module.css';

export function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectsType | null>(
    null,
  );

  function handleOpenModal(project: ProjectsType) {
    setIsOpen(true);
    setSelectedProject(project);
  }

  return (
    <section className={styles.projects}>
      {projects.map((project) => (
        <button
          key={project.name}
          className={styles.projects__project}
          onClick={() => handleOpenModal(project)}
          style={
            {
              '--color-primary': project.colors.primary,
              '--color-secondary': project.colors.secondary,
            } as React.CSSProperties
          }
        >
          <Image
            src={project.logo}
            alt={project.name}
            className={styles['projects__project-logo']}
            width={50}
            height={50}
          />
          <span className={styles['projects__project-title']}>
            {project.name}
          </span>
        </button>
      ))}
      <ProjectModal
        isOpen={isOpen}
        project={selectedProject!}
        onClose={() => setIsOpen(false)}
        onClickOutside={() => setIsOpen(false)}
      />
    </section>
  );
}
