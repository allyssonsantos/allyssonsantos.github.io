import styled, { css } from 'styled-components';
import rem from '@utils/rem';

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
