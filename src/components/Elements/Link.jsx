import styled from 'styled-components';
import TransitionLink from 'gatsby-plugin-transition-link';

const Link = styled.a.attrs((props) => ({
  as: props.to ? TransitionLink : 'a',
}))`
  display: inline-block;
  align-self: flex-start;

  transition: border-bottom 0.3s ease;

  color: ${(props) => props.theme.colors.primary[900]};

  border-bottom: 1px solid transparent;
`;

export default Link;
