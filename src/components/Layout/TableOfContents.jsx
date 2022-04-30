import React from 'react';
import PropTypes from 'prop-types';
import { Ol } from '@components/Elements';
import styled from 'styled-components';

const Wrapper = styled.section`
  margin-bottom: 72px;
`;

function TableOfContents({ headings }) {
  return (
    <Wrapper>
      <h2>Índice</h2>
      <Ol>
        {headings.map(({ value }) => (
          <li key={value}>
            <a href={`#${value.toLowerCase().replaceAll(' ', '-')}`}>{value}</a>
          </li>
        ))}
      </Ol>
    </Wrapper>
  );
}

TableOfContents.propTypes = {
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
    })
  ).isRequired,
};

export default TableOfContents;
