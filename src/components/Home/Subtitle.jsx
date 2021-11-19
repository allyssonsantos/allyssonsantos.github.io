import styled from 'styled-components';
import rem from '@utils/rem';

import Title from './Title';

const Subtitle = styled(Title).attrs({ as: 'h2' })`
  font-size: ${rem(18)};
  font-weight: normal;

  margin-bottom: 24px;
`;

export default Subtitle;
