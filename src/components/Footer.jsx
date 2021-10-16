import styled from 'styled-components';

const Socials = styled.a``;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacings.xxxlarge}px;
`;

Footer.Socials = Socials;

export default Footer;
