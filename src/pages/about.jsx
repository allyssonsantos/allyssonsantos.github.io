import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useTransition from '@utils/useTransition';
import { SEO } from '@components';
import { Link, Subtitle, Ol, Li } from '@components/Elements';
import { Title, Description } from '@components/Home';

const Section = styled.section`
  margin-top: 24px;
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
        Atualmente estou trabalhando no <strong>Olist</strong>
      </Description>

      <Description>
        Esse espaço, além de ser a cobaia para experimentar novas tecnologias e
        projetos pessoais, também é onde coloco minhas ideias sobre conteúdos
        que acho interessante, principalmente sobre front-end.
      </Description>

      <hr />

      <Subtitle>Experiência</Subtitle>

      <Description>Já trabalhei por aqui:</Description>

      <Ol>
        <Li>Gympass</Li>
        <Li>Catho</Li>
        <Li>Encontra Brasil</Li>
      </Ol>
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
