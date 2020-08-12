import React from 'react';
import styled, { css } from 'styled-components';
import { graphql } from 'gatsby';

import { Layout, Title, Box, Link } from '../components';
import SEO from '../components/seo';

const Card = styled.div`
  padding: 32px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 48px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  img {
    width: 151px;
  }

  ${({
    theme: {
      sizes: { breakpoints },
    },
  }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;

      ${Box} {
        margin-left: 0;
      }
      img {
        margin-bottom: 12px;
      }
    }
  `}
`;

const About = ({
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
}) => {
  return (
    <Layout title={siteTitle}>
      <SEO
        title="Sobre mim"
        keywords={[
          'blog',
          'gatsby',
          'javascript',
          'react',
          'styled-components',
          'design-system',
          'components',
        ]}
      />
      <Title as="h2" $textAlign="left" $size="2.25rem">
        Desenvolvedor front-end & guitarrista nas horas vagas
      </Title>
      <Box as="p" $lh="26px" $size="1.125rem" $mb={24}>
        Sou formado em Produção Multimídia pelo Senac mas lá foi apenas uma
        porta de entrada para o desenvolvimento Front-end. Desde então, estudo
        muito sobre <strong>Javascript, React, HTML e CSS</strong> - formalmente
        em cursos e informalmente com conteúdos que encontro na internet.
      </Box>

      <Box as="p" $lh="26px" $size="1.125rem" $mb={24}>
        Estou trabalhando no meu segundo Design System, já vivi alguns estágios
        da implementação de um DS nas empresas e acho esse desafio estimulante.
        Como projeto paralelo, criei junto com o{' '}
        <Link
          as="a"
          href="https://twitter.com/ggdaltoso"
          rel="noopener noreferrer"
          target="_blank"
          $size="1.125rem"
          $pt={0}
          $pr={0}
          $pb={0}
          $pl={0}
        >
          Gabriel Daltoso
        </Link>{' '}
        o{' '}
        <Link
          as="a"
          href="https://github.com/React95/React95"
          rel="noopener noreferrer"
          target="_blank"
          $size="1.125rem"
          $pt={0}
          $pr={0}
          $pb={0}
          $pl={0}
        >
          React95
        </Link>
        , uma lib que nos levou até a Holanda pra buscar um prêmio de melhor{' '}
        <Link
          as="a"
          href="https://youtu.be/4KfAS3zrvX8?t=25484"
          rel="noopener noreferrer"
          target="_blank"
          $size="1.125rem"
          $pt={0}
          $pr={0}
          $pb={0}
          $pl={0}
        >
          Fun Side Project de 2019
        </Link>{' '}
        organizado pela Open Source Awards e entregue na "React Amsterdam
        Conference" - foi dahora!
      </Box>

      <Box as="p" $lh="26px" $size="1.125rem" $mb={24}>
        Se quiser trocar uma idéia sobre projetos ou estudos, manda uma mensagem
        que vai ser um prazer falar com você!
      </Box>

      <Title as="h3" $textAlign="left" $size="1.25rem">
        Estou atualmente aqui
      </Title>
      <Card>
        <img src="/logos/gympass.png" alt="Logo do Gympass" />
        <Box as="div" $ml={42}>
          <Title as="h4" $textAlign="left" $size="1.125rem" $mb={0} $mt={0}>
            Gympass
          </Title>
          <Box as="p" $size="1.125rem" $mb={16}>
            Desde agosto de 2019
          </Box>
          <Box as="p" $size="1rem" $lh="22px">
            Sou do time Front-end que é responsável pelo Yoga, nosso Design
            System. Participei da construção do Yoga e continuo trabalhando em
            melhorias além de auxiliar os outros times com a nossa biblioteca.
            Também atuei no Gympass Wellness e na nova experiência de login.
          </Box>
        </Box>
      </Card>
      <Card>
        <img src="/logos/quantum.png" alt="Logo da Catho" />
        <Box as="div" $ml={42}>
          <Title as="h4" $textAlign="left" $size="1.125rem" $mb={0} $mt={0}>
            Catho
          </Title>
          <Box as="p" $size="1.125rem" $mb={16}>
            De dezembro de 2015 até julho de 2019
          </Box>
          <Box as="p" $size="1rem" $lh="22px">
            Trabalhei no time de plataforma front-end que visava estruturar e
            padronizar o desenvolvimento de aplicações web. Desenvolvi
            ferramentas que centralizavam e evitavam esforços desnecessários
            garantindo integridade visual, performance, redução de lead-time,
            reutilização de código, padronização, qualidade e documentação.
          </Box>
        </Box>
      </Card>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
