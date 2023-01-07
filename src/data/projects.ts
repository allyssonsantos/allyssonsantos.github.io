export interface IProjects {
  name: string;
  description: string;
  githubUrl: string;
  website: string;
}

export const projects: Array<IProjects> = [
  {
    name: 'quantum',
    description:
      'A react component library that was created in 2018 and is still used nowadays',
    githubUrl: 'https://github.com/catho/quantum',
    website: 'https://catho.github.io/quantum/',
  },
  {
    name: 'yoga',
    description:
      'The Gympass multi-platform design-system (React & React-Native), with support for multiple themes and with a great tokenization.',
    githubUrl: 'https://github.com/gympass/yoga',
    website: 'https://gympass.github.io/yoga/',
  },
  {
    name: 'react95',
    description: 'A component library with the Windows 95 UI.',
    githubUrl: 'https://github.com/react95/react95',
    website: 'https://react95.github.io/React95/',
  },
];
