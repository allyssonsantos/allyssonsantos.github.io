import styled from 'styled-components';
import rem from '@utils/rem';

const Description = styled.p`
  font-size: ${rem(16)};
  font-weight: normal;

  margin: 0;
  margin-top: ${rem(20)};

  color: ${(props) => props.theme.colors.neutral[900]};
`;

export default Description;
