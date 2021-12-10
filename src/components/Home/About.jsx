import styled from 'styled-components';

const About = styled.section`
  display: flex;
  align-items: center;

  @media (max-width: 540px) {
    align-items: flex-start;
    flex-direction: column-reverse;
  }
`;

export default About;
