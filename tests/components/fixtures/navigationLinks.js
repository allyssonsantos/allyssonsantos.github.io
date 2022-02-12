import React from 'react';

const items = [
  {
    title: 'Home',
    href: '/',
    icon: ({ ...props }) => <div>icon</div>,
  },
  {
    title: 'Artigos',
    href: '/blog',
    icon: ({ ...props }) => <div>icon</div>,
  },
  {
    title: 'Sobre',
    href: '/about',
    icon: ({ ...props }) => <div>icon</div>,
  },
];

const socials = [
  {
    title: 'Github',
    href: 'https://github.com/allyssonsantos',
    icon: ({ ...props }) => <div>icon</div>,
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/_allyssonsantos',
    icon: ({ ...props }) => <div>icon</div>,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/_allysson/',
    icon: ({ ...props }) => <div>icon</div>,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/allyssonsantos/',
    icon: ({ ...props }) => <div>icon</div>,
  },
];

export { items, socials };
