import React from 'react';
import styled, { withTheme } from 'styled-components';

import { Box } from '.';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 40px 0px;
  margin-bottom: 18px;

  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  text-align: center;
`;

const Img = styled.img`
  width: initial;
`;

const Numbers = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  & + & {
    margin-left: 26px;
  }
`;

const SeeMore = styled.a`
  display: block;
  text-decoration: none;
  text-align: center;
  padding: 16px 0 22px;
  margin-top: 36px;
  color: #6aa79f;
  font-weight: bold;
  font-size: 1rem;
  border-top: 1px solid #e5e5e5;
`;

const Repo = ({ logo, title, description, stars, forks, link, theme }) => (
  <Wrapper>
    <div>
      {logo !== 'frigobar' && <Img src={`/logos/${logo}.png`} />}
      <Box
        as="h2"
        $size="1.25rem"
        $color={theme.colors.grays[0]}
        $weight="bold"
        $mt={20}
        $mb={8}
        $textAlign="center"
      >
        {title}
      </Box>
      <Box as="p" $lh="22px" $textAlign="center" $mb={16}>
        {description}
      </Box>
      <div>
        <Numbers>
          <Img src="/icons/star.svg" />{' '}
          <Box $color={theme.colors.grays[2]} $ml={6}>
            {stars}
          </Box>
        </Numbers>
        <Numbers>
          <Img src="/icons/fork.svg" />{' '}
          <Box $color={theme.colors.grays[2]} $ml={6}>
            {forks}
          </Box>
        </Numbers>
      </div>
    </div>
    <SeeMore href={link}>ver projeto no Github</SeeMore>
  </Wrapper>
);

export default withTheme(Repo);
