import styled from 'styled-components';
import rem from '@utils/rem';

const Description = styled.p`
  font-size: ${rem(18)};
  font-weight: normal;

  color: ${props => props.theme.colors.neutral[900]};

  margin: 0;
  margin-top: 8px;
`;

export default Description;
