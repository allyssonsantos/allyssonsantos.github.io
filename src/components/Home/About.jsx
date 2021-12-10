import styled from 'styled-components';

const About = styled.section`
  display: flex;
  align-items: center;

  gap: 24px;

  @media (max-width: 540px) {
    align-items: flex-start;
    flex-direction: column-reverse;
  }
`;

export default About;
