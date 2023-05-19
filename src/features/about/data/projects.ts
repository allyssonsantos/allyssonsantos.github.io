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
  description:
    'A react component library that was created in 2018 and is still used nowadays',
  githubUrl: 'https://github.com/catho/quantum',
  website: 'https://catho.github.io/quantum/',
  colors: {
    primary: '#0023a0',
    secondary: '#de0059',
  },
};

export const yogaCard = {
  name: 'Yoga',
  description:
    'The Gympass multi-platform design-system (React & React-Native), with support for multiple themes and with a great tokenization.',
  githubUrl: 'https://github.com/gympass/yoga',
  website: 'https://gympass.github.io/yoga/',
  colors: {
    primary: '#D8385E',
    secondary: '#231B22',
  },
};

export const react95Card = {
  name: 'React95',
  description:
    'React95 is a component library inspired on the Windows 95 UI design.',
  githubUrl: 'https://github.com/react95/react95',
  website: 'https://react95.github.io/React95/',
  colors: {
    primary: '#ee562b',
    secondary: '#0362a5',
  },
};
