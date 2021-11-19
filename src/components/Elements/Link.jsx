import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

const Link = styled.a.attrs(props => ({
  as: props.to ? GatsbyLink : 'a',
}))`
  display: inline-block;
  align-self: flex-start;

  transition: border-bottom 0.3s ease;

  color: ${props => props.theme.colors.primary[500]};

  border-bottom: 1px solid transparent;
`;

export default Link;
