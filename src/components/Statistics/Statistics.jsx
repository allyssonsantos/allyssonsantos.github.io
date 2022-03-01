import React from 'react';
import PropTypes from 'prop-types';
import { MessageSquare } from 'react-feather';

import LikeButton from './LikeButton';
import { Wrapper, Label } from './styles';

function Statistics({ slug, comments, likes, liked }) {
  return (
    <Wrapper>
      <LikeButton likes={likes} liked={liked} slug={slug} />
      <Label>
        <MessageSquare /> {comments} comentários
      </Label>
    </Wrapper>
  );
}

Statistics.propTypes = {
  slug: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
};

export default Statistics;
