import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GoogleLogo from '@static/logos/google.svg';

const Button = styled.button`
  font-size: 1rem;
  line-height: 48px;

  display: flex;

  width: 240px;
  height: 50px;
  padding: 1px;

  cursor: pointer;

  transition: box-shadow 0.218s;

  color: ${(props) => props.theme.colors.black};

  border: none;
  border-radius: 1px;
  background-color: #4285f4;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%);

  &:hover {
    box-shadow: 0 0 3px 3px rgb(66 133 244 / 30%);
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;

  width: 48px;
  height: 48px;

  text-align: center;
  white-space: nowrap;

  border-radius: 1px;
  background-color: white;

  && svg {
    stroke: none;
  }
`;

const Label = styled.span`
  display: block;

  width: 100%;

  text-align: center;

  color: white;
`;

function GoogleBtn({ onClick }) {
  return (
    <Button onClick={onClick} aria-label="Entre utilizando sua conta do Google">
      <LogoWrapper>
        <GoogleLogo />
      </LogoWrapper>
      <Label>Entrar com Google</Label>
    </Button>
  );
}

GoogleBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GoogleBtn;
