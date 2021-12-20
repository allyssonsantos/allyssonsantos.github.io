import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useTransition from '@utils/useTransition';
import { SEO } from '@components/Layout';
import { Subtitle, Ol, Li, Hr } from '@components/Elements';
import {
  Title,
  Description,
  Repos,
  Project,
  ProjectTitle,
  ProjectDescription,
} from '@components/Home';

import rem from '@utils/rem';

const ExpList = styled(Ol)`
  font-size: ${rem(18)};

  margin-left: 0;
  padding-left: 5ch;
`;

function About({ transitionStatus }) {
  const animation = useTransition(transitionStatus);

  return (
    <div animation={animation}>
      <SEO
        title="Sobre mim"
        keywords={['sobre', 'allysson santos', 'front-end', 'developer']}
      />
      <Title>Sobre mim</Title>
      <Description>
        Oi, Eu sou o Allysson! Sou desenvolvedor front-end em São Paulo.
        Atualmente estou trabalhando no <strong>olist</strong>
      </Description>

      <Description>
        Esse espaço, além de ser a cobaia para experimentar novas tecnologias e
        projetos pessoais, também é onde coloco minhas ideias sobre conteúdos
        que acho interessante, principalmente sobre front-end.
      </Description>

      <Hr />

      <Subtitle as="h2">Experiência</Subtitle>

      <Description>
        Hoje estou trabalhando em um time de plataforma front-end onde o
        principal produto é o design-system do olist.
      </Description>

      <Description>Também passei por essas empresas:</Description>

      <ExpList
        start={new Date().getFullYear()}
        reversed
        style={{ paddingLeft: '5ch', marginLeft: 0 }}
      >
        <Li>
          <a href="https://olist.com/">Olist</a>
        </Li>
        <Li value="2019">
          <a href="https://gympass.com/">Gympass</a>
        </Li>
        <Li value="2015">
          <a href="https://catho.com.br/">Catho</a>
        </Li>
        <Li>
          <a href="https://www.encontrabrasil.com.br/">Encontra Brasil</a>
        </Li>
      </ExpList>

      <Hr />

      <Subtitle as="h2">Projetos</Subtitle>

      <Description>
        Alguns projetos que eu me orgulho de fazer/ter feito parte:
      </Description>

      <Repos>
        <Project href="https://github.com/gympass/yoga">
          <ProjectTitle>Yoga</ProjectTitle>
          <ProjectDescription>
            O design system do Gympass. Design tokens, componentes em react e em
            react-native, icones, etc... Um dos projetos mais legais que tive o
            prazer de contribuir desde o início.
          </ProjectDescription>
        </Project>
        <Project href="https://github.com/catho/quantum">
          <ProjectTitle>Quantum</ProjectTitle>
          <ProjectDescription>
            Componentes reutilizaveis são a base do Quantum, uma biblioteca para
            desenvolver interfaces e experiências consistentes.
          </ProjectDescription>
        </Project>
        <Project href="https://github.com/frigobar/frigobar">
          <ProjectTitle>Frigobar</ProjectTitle>
          <ProjectDescription>
            É um conjunto de ferramentas para sua aplicação react, contém uma
            biblioteca de animação e também componentes básicos.
          </ProjectDescription>
        </Project>
        <Project href="https://github.com/react95/react95">
          <ProjectTitle>React95</ProjectTitle>
          <ProjectDescription>
            Uma biblioteca de componentes inspirada pelo design do Windows 95.
          </ProjectDescription>
        </Project>
      </Repos>
    </div>
  );
}

export default About;

About.propTypes = {
  transitionStatus: PropTypes.oneOf([
    'entering',
    'entered',
    'exiting',
    'exited',
  ]),
};

About.defaultProps = {
  transitionStatus: undefined,
};
