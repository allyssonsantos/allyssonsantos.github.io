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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="#AEAEAE"
          >
            <path
              fill-rule="evenodd"
              d="M12.672.668a.75.75 0 00-1.345 0L8.27 6.865l-6.838.994a.75.75 0 00-.416 1.279l4.948 4.823-1.168 6.811a.75.75 0 001.088.791L12 18.347l6.117 3.216a.75.75 0 001.088-.79l-1.168-6.812 4.948-4.823a.75.75 0 00-.416-1.28l-6.838-.993L12.672.668z"
            ></path>
          </svg>
          <Box $color={theme.colors.grays[2]} $ml={6}>
            {stars}
          </Box>
        </Numbers>
        <Numbers>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="#AEAEAE"
          >
            <path
              fill-rule="evenodd"
              d="M12 21a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm-3.25-1.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zm-3-12.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM2.5 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zM18.25 6.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM15 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0z"
            ></path>
            <path
              fill-rule="evenodd"
              d="M6.5 7.75v1A2.25 2.25 0 008.75 11h6.5a2.25 2.25 0 002.25-2.25v-1H19v1a3.75 3.75 0 01-3.75 3.75h-6.5A3.75 3.75 0 015 8.75v-1h1.5z"
            ></path>
            <path fill-rule="evenodd" d="M11.25 16.25v-5h1.5v5h-1.5z"></path>
          </svg>
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
