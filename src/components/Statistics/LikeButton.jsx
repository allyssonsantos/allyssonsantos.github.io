import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from 'styled-components';
import { Heart } from 'react-feather';

import { useAuth } from '@contexts/AuthContext';
import { like } from '@services/likes';

import { LikeButton as Button } from './styles';

function LikeButton({ slug, likes, liked }) {
  const theme = useTheme();
  const { currentUser } = useAuth();

  const handleClick = async () => {
    await like(slug, currentUser.uid);
  };

  return (
    <Button
      title={`Clique para ${liked ? 'descurtir' : 'curtir'}`}
      aria-label={`${likes} comentários. Clique para ${
        liked ? 'descurtir' : 'curtir'
      }`}
      onClick={handleClick}
    >
      <Heart fill={liked ? theme.colors.neutral[900] : 'none'} /> {likes}{' '}
      curtidas
    </Button>
  );
}

LikeButton.propTypes = {
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};

export default LikeButton;
