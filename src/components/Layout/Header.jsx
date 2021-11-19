import styled, { css } from 'styled-components';
import rem from '@utils/rem';

import { Link } from '@components/Elements';

const Header = styled.header`
  margin-bottom: 58px;
`;
const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.ul`
  display: flex;

  margin: 0;
  padding: 0;

  list-style: none;
  gap: 28px;

  ${Link}:hover {
    border-bottom: 1px solid ${props => props.theme.colors.primary[500]};
  }
`;

const ListItem = styled.li(
  ({ theme }) => css`
    a {
      font-size: ${rem(18)};

      text-decoration: none;

      color: ${theme.colors.neutral[700]};
    }
  `
);

Header.Navigation = Navigation;
Header.List = List;
Header.ListItem = ListItem;

export default Header;
