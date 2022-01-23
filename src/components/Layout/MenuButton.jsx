import styled from 'styled-components';

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  cursor: pointer;

  border: none;

  background-color: transparent;

  svg {
    color: ${(props) => props.theme.colors.neutral[900]};
  }
`;

export default MenuButton;
