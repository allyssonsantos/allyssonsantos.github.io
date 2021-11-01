import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

const Link = styled.a.attrs(props => ({
  as: props.to ? GatsbyLink : 'a',
}))`
  display: inline-block;
  align-self: flex-start;

  transition: border-bottom 0.3s ease;

  text-decoration: none;

  color: ${props => props.theme.colors.primary[500]};

  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid ${props => props.theme.colors.primary[500]};
  }
`;

export default Link;
