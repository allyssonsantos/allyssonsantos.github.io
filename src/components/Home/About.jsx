import styled, { keyframes } from 'styled-components';

const ShowAnimation = keyframes`
  from {
    transform: scale(1.3);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const About = styled.section`
  text-align: center;

  animation: ${ShowAnimation} 500ms cubic-bezier(0, 0, 0.26, 0.95);
`;

export default About;
