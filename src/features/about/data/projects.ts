export interface IProjects {
  name: string;
  description: string;
  githubUrl: string;
  website: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

export const quantumCard = {
  name: 'Quantum',
  description: 'quantum-description',
  githubUrl: 'https://github.com/catho/quantum',
  website: 'https://catho.github.io/quantum/',
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
  colors: {
    primary: '#D8385E',
    secondary: '#231B22',
  },
};

export const react95Card = {
  name: 'React95',
  description: 'react95-description',
  githubUrl: 'https://github.com/react95/react95',
  website: 'https://react95.github.io/React95/',
  colors: {
    primary: '#ee562b',
    secondary: '#0362a5',
  },
};
