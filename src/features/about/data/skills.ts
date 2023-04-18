export interface ISkills {
  name: string;
  url?: string;
  children: Array<ISkills>;
}

export const html: Array<ISkills> = [
  {
    name: 'Semantic HTML',
    url: undefined,
    children: [],
  },
  {
    name: 'SEO',
    url: undefined,
    children: [],
  },
  {
    name: 'Accessibility',
    url: undefined,
    children: [],
  },
  {
    name: 'WAI-ARIA',
    url: 'https://www.w3.org/WAI/standards-guidelines/aria/',
    children: [],
  },
];

export const css: Array<ISkills> = [
  {
    name: 'Responsive layout (media queries)',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries',
    children: [],
  },
  {
    name: 'Pseudo elements',
    url: undefined,
    children: [],
  },
  {
    name: 'Pseudo classes',
    url: undefined,
    children: [],
  },
  {
    name: 'Flexbox',
    url: undefined,
    children: [],
  },
  {
    name: 'CSS Grid',
    url: undefined,
    children: [],
  },
  {
    name: 'Animations and transitions',
    url: undefined,
    children: [],
  },
  {
    name: 'Custom properties',
    url: undefined,
    children: [],
  },
  {
    name: 'Preprocessors:',
    url: undefined,
    children: [
      {
        name: 'LESS',
        url: 'https://lesscss.org/',
        children: [],
      },
      {
        name: 'SASS',
        url: 'https://sass-lang.com/',
        children: [],
      },
      {
        name: 'Stylus',
        url: 'https://stylus-lang.com/',
        children: [],
      },
    ],
  },
  {
    name: 'Bootstrap',
    url: undefined,
    children: [],
  },
  {
    name: 'CSS Modules',
    url: undefined,
    children: [],
  },
  {
    name: 'Styled-components',
    url: undefined,
    children: [],
  },
  {
    name: 'Emotion',
    url: undefined,
    children: [],
  },
  {
    name: 'Architectures:',
    url: undefined,
    children: [
      {
        name: 'SMACSS',
        url: 'http://smacss.com/',
        children: [],
      },
      {
        name: 'ITCSS',
        url: 'https://itcss.io/',
        children: [],
      },
      {
        name: 'BEM',
        url: 'https://getbem.com/',
        children: [],
      },
    ],
  },
];

export const javascript: Array<ISkills> = [
  {
    name: 'Vanilla Javascript',
    url: undefined,
    children: [],
  },
  {
    name: 'jQuery',
    url: undefined,
    children: [],
  },
  {
    name: 'React',
    url: undefined,
    children: [
      {
        name: 'State management',
        url: undefined,
        children: [
          {
            name: 'Context API',
            url: undefined,
            children: [],
          },
          {
            name: 'Redux',
            url: undefined,
            children: [],
          },
          {
            name: 'TanStack Query (react query)',
            url: undefined,
            children: [],
          },
        ],
      },
      {
        name: 'Server side rendering & static site generators',
        url: undefined,
        children: [
          {
            name: 'Gatsby',
            url: undefined,
            children: [],
          },
          {
            name: 'NextJS',
            url: undefined,
            children: [],
          },
        ],
      },
      {
        name: 'UI Libraries:',
        url: undefined,
        children: [
          {
            name: 'Material UI',
            url: undefined,
            children: [],
          },
          {
            name: 'Yoga (built by me)',
            url: undefined,
            children: [],
          },
          {
            name: 'Quantum (built by me)',
            url: undefined,
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: 'React Native',
    url: undefined,
    children: [],
  },
  {
    name: 'PWA',
    url: undefined,
    children: [],
  },
  {
    name: 'Web components',
    url: undefined,
    children: [],
  },
  {
    name: 'Shadow DOM',
    url: undefined,
    children: [],
  },
  {
    name: 'Typescript',
    url: undefined,
    children: [],
  },
  {
    name: 'GraphQL',
    url: undefined,
    children: [],
  },
  {
    name: 'Apollo GraphQL',
    url: undefined,
    children: [],
  },
  {
    name: 'Webpack',
    url: undefined,
    children: [],
  },
  {
    name: 'Rollup',
    url: undefined,
    children: [],
  },
  {
    name: 'Babel',
    url: undefined,
    children: [],
  },
  {
    name: 'NPM Libraries',
    url: undefined,
    children: [],
  },
];
