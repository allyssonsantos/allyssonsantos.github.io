import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, useTheme } from 'styled-components';
import rem from '@utils/rem';

const Wrapper = styled.div(
  ({ theme: { spacings } }) => css`
    position: relative;

    margin-top: ${spacings.xxxlarge}px;
    margin-left: -${spacings.xlarge}px;
    margin-right: -${spacings.xlarge}px;

    @media (min-width: 768px) {
      margin-left: -${spacings.xxlarge}px;
      margin-right: -${spacings.xxlarge}px;
    }

    svg {
      position: absolute;
      top: 50%;
      left: ${spacings.xlarge}px;

      transform: translateY(-50%);

      pointer-events: none;
    }
  `
);

const Field = styled.input`
  font-size: ${rem(26)};

  width: 100%;
  height: 80px;

  ${({ theme: { colors, radius, spacings } }) => css`
    padding: ${spacings.small}px;
    padding-left: ${spacings.huge}px;

    border: 1px solid ${colors.neutral[300]};
    border-radius: ${radius[3]}px;
    background-color: ${colors.neutral[50]};
    color: ${colors.neutral[900]};

    ::placeholder {
      color: ${colors.neutral[400]};
      font-size: ${rem(26)};
    }
  `}
`;

const Input = ({ onChange, placeholder }) => {
  const {
    colors: { neutral },
  } = useTheme();

  return (
    <Wrapper>
      <svg
        width="28"
        height="28"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.375 7.74999C13.375 9.2415 12.7825 10.6719 11.7278 11.7266C10.6732 12.7812 9.24277 13.3737 7.75125 13.3737C6.25974 13.3737 4.82932 12.7812 3.77466 11.7266C2.72001 10.6719 2.12751 9.2415 2.12751 7.74999C2.12751 6.25848 2.72001 4.82806 3.77466 3.7734C4.82932 2.71874 6.25974 2.12624 7.75125 2.12624C9.24277 2.12624 10.6732 2.71874 11.7278 3.7734C12.7825 4.82806 13.375 6.25848 13.375 7.74999ZM12.35 13.675C10.843 14.845 8.94671 15.3966 7.04725 15.2177C5.1478 15.0387 3.38794 14.1426 2.12594 12.7117C0.863948 11.2809 0.194694 9.42287 0.254424 7.51593C0.314154 5.609 1.09838 3.7965 2.44745 2.44744C3.79651 1.09837 5.60901 0.314143 7.51594 0.254412C9.42288 0.194682 11.2809 0.863937 12.7118 2.12593C14.1426 3.38792 15.0387 5.14778 15.2177 7.04724C15.3966 8.9467 14.845 10.843 13.675 12.35L17.475 16.15C17.5671 16.2358 17.641 16.3393 17.6922 16.4543C17.7435 16.5693 17.771 16.6935 17.7732 16.8193C17.7755 16.9452 17.7523 17.0703 17.7052 17.187C17.658 17.3037 17.5878 17.4098 17.4988 17.4988C17.4098 17.5878 17.3037 17.658 17.187 17.7051C17.0703 17.7523 16.9452 17.7755 16.8194 17.7732C16.6935 17.771 16.5693 17.7435 16.4543 17.6922C16.3393 17.641 16.2358 17.5671 16.15 17.475L12.35 13.675Z"
          fill={neutral[300]}
        />
      </svg>

      <Field type="text" onChange={onChange} placeholder={placeholder} />
    </Wrapper>
  );
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
