import styled from 'styled-components';

const About = styled.section`
  display: flex;
  align-items: center;

  gap: 24px;

  @media (max-width: 540px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

export default About;
