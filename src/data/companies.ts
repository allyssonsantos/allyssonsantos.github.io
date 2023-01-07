export interface ICompanies {
  name: string;
  startYear: number;
  endYear?: number;
  description: string;
}

export const companies: Array<ICompanies> = [
  {
    name: 'Encontra Brasil',
    startYear: 2014,
    endYear: 2015,
    description:
      'It was a small company where I started to get in touch with the base of HTML, CSS, and Javascript.',
  },
  {
    name: 'Catho',
    startYear: 2015,
    endYear: 2019,
    description:
      "In Catho was where I discovered my passion for the front-end development world. Here I was able to work in so many teams. With different projects and different people, from projects like Salesforce integration or the redesign of the recruiter area to when the company decided to migrate from the legacy PHP coupled applications to SPA's built with React. I've also participated in the company react component library creation called Quantum",
  },
  {
    name: 'Gympass',
    startYear: 2019,
    endYear: 2021,
    description:
      "I've developed the initial version of the Gympass Wellness product, created the multi-platform Yoga design system, and worked with a bunch of different teams.",
  },
  {
    name: 'Olist',
    startYear: 2021,
    endYear: undefined,
    description:
      "Here I'm working on developing the Olist Design System and splitting the company's front-end into small micro frontends applications. (where makes sense)",
  },
];
