import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Button } from '@frigobar/core';

const Wrapper = styled.div`
  position: relative;
`;

const SendButton = styled(Button)`
  position: absolute;
  right: 12px;
  bottom: 16px;
`;

const Field = styled.textarea(
  ({ theme }) => css`
    font-family: 'Source Sans 3', serif;
    font-size: 1rem;

    width: 100%;
    height: 46px;

    padding: 12px;
    padding-right: 84px;

    resize: none;

    transition: background-color 300ms ease-in-out, color 300ms ease-in-out;

    color: ${theme.colors.neutral[900]};
    border: none;
    border-radius: 4px;

    background-color: ${theme.colors.neutral[100]};
  `
);

const Textarea = forwardRef(({ onChange, value, ...props }, ref) => (
  <Wrapper>
    <Field {...props} ref={ref} onChange={onChange} value={value} />
    <SendButton type="submit" skin="success">
      Enviar
    </SendButton>
  </Wrapper>
));

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
};

Textarea.defaultProps = {
  onChange: () => {},
};

export default Textarea;
