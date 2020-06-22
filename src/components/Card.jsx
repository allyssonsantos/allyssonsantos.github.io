import React from 'react';
import styled, { css, withTheme } from 'styled-components';

import { Box, Tag } from '.';

const Wrapper = styled.article`
  padding: 40px 42px;
  margin-bottom: 10px;

  ${({ theme: { radius, colors } }) => css`
    border-radius: ${radius}px;
    border: 1px solid ${colors.grays[3]};

    background-color: ${colors.white};
  `}
`;

const Card = ({ tags, title, description, date, theme }) => (
  <Wrapper>
    {tags.map(tag => (
      <Tag key={tag} tag={tag}>
        {tag}
      </Tag>
    ))}
    <Box
      color={theme.colors.grays[0]}
      size="1.25rem"
      weight="bold"
      mt={16}
      mb={8}
      as="h2"
    >
      {title}
    </Box>
    <Box mb={8} color={theme.colors.grays[0]} size="1.125rem">
      {description}
    </Box>
    <Box mb={24} color={theme.colors.grays[2]} size="0.8125rem" as="time">
      Postado em {date}
    </Box>
    <Box size="1.125rem" color={theme.colors.primary} weight="bold" as="span">
      Ler mais
    </Box>
  </Wrapper>
);

export default withTheme(Card);
