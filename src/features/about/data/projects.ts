export type ProjectsType = {
  name: string;
  description: string;
  githubUrl: string;
  website: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  technologies: string[];
};

export const quantumCard: ProjectsType = {
  name: 'Quantum',
  description: 'quantum-description',
  githubUrl: 'https://github.com/catho/quantum',
  website: 'https://catho.github.io/quantum/',
  logo: '/images/about-me/quantum-logo.svg',
  technologies: [
    'React',
    'styled-components',
    'Storybook',
    'babel',
    'semantic-release',
  ],
  colors: {
    primary: '#0023a0',
    secondary: '#de0059',
  },
};

export const yogaCard = {
  name: 'Yoga',
  description: 'yoga-description',
  githubUrl: 'https://github.com/gympass/yoga',
  website: 'https://gympass.github.io/yoga/',
  logo: '/images/about-me/yoga-logo.svg',
  technologies: [
    'React',
    'React Native',
    'styled-components',
    'Gatsby',
    'Lerna',
  ],
  colors: {
    primary: '#D8385E',
    secondary: '#FFB0A7',
  },
};

export const react95Card = {
  name: 'React95',
  description: 'react95-description',
  githubUrl: 'https://github.com/react95/react95',
  website: 'https://react95.github.io/React95/',
  logo: '/images/about-me/react95-logo.png',
  technologies: [
    'React',
    'styled-components',
    'Storybook',
    'babel',
    'semantic-release',
  ],
  colors: {
    primary: '#ee562b',
    secondary: '#0362a5',
  },
};

export const projects = [react95Card, quantumCard, yogaCard];
