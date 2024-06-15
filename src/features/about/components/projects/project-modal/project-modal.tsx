import type React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { Modal } from 'src/components/modal/modal';
import type { ProjectsType } from '../../../data/projects';

import styles from './project-modal.module.css';

type ProjectModalProps = {
  isOpen: boolean;
  project: ProjectsType;
  onClose: () => void;
  onClickOutside: () => void;
};

export function ProjectModal({
  isOpen,
  project,
  onClose,
  onClickOutside,
}: ProjectModalProps) {
  const { t } = useTranslation('about');

  if (!project) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.name}
      onClickOutside={onClickOutside}
      className={styles.modal}
      id={`project-modal-${project.name}`}
    >
      <div className={styles.modal__content}>
        <div className={styles.modal__info}>
          <Image width={75} height={75} src={project.logo} alt={project.name} />
          <p className={styles.modal__description}>{t(project.description)}</p>
        </div>
        <div className={styles.modal__links}>
          <div className={styles.modal__link}>
            <div>repo:</div>
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              {project.githubUrl}
            </a>
          </div>
          <div>
            <div>website:</div>
            <a href={project.website} target="_blank" rel="noreferrer">
              {project.website}
            </a>
          </div>
        </div>
      </div>
      <h3>{t('technologies')}</h3>
      <ul className={styles.modal__technologies}>
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <div
        className={styles['modal__colored-border']}
        aria-hidden
        style={
          {
            '--color-primary': project.colors.primary,
            '--color-secondary': project.colors.secondary,
          } as React.CSSProperties
        }
      />
    </Modal>
  );
}
