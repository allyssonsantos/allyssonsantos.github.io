import { ProjectView } from './ProjectView';

import { projects } from 'src/data/projects';

export function Projects() {
  return <ProjectView projects={projects} />;
}
