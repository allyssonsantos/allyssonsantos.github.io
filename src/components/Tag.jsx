import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Tag = styled.div`
  display: inline-block;
  padding: 8px;

  font-size: 0.75rem;
  font-weight: bold;

  & + & {
    margin-left: 6px;
  }

  ${({ tag, theme: { colors, radius } }) => {
    const color = colors.tags[tag.replace(/\s|-*/g, '').toLowerCase()];
    return css`
      border: 1px solid ${color};
      border-radius: ${radius}px;

      color: ${color};
    `;
  }}
`;

Tag.propTypes = { tag: PropTypes.string };
Tag.defaultProps = { tag: 'javascript' };

export default Tag;
