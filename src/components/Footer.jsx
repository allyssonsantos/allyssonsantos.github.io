import styled from 'styled-components';

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: ${props => props.theme.spacings.huge}px;
`;

export default Footer;
