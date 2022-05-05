import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from 'styled-components';
import { Heart } from 'react-feather';

import trackingEvents from '@utils/trackingEvents';
import { useAuth } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';
import { useTracking } from '@contexts/TrackingContext';
import { like } from '@services/likes';

import { LikeButton as Button } from './styles';
import LoginModal, { LOGIN_MODAL_KEY } from '../SignIn/LoginModal';

function LikeButton({ slug, likes, liked }) {
  const theme = useTheme();
  const { open } = useModal();
  const { currentUser } = useAuth();
  const { track } = useTracking();

  const deslikeOrLike = liked ? 'descurtir' : 'curtir';

  const handleClick = async () => {
    if (currentUser) {
      track(trackingEvents.LIKE_BUTTON, { action: liked ? 'dislike' : 'like' });
      await like(slug, currentUser.uid);
    } else {
      open({ component: LoginModal, key: LOGIN_MODAL_KEY });
    }
  };

  return (
    <Button
      title={`Clique para ${deslikeOrLike}`}
      aria-label={`${likes} comentários. Clique para ${deslikeOrLike}`}
      onClick={handleClick}
    >
      <Heart fill={liked ? theme.colors.neutral[900] : 'none'} /> {likes}{' '}
      {`curtida${likes === 1 ? '' : 's'}`}
    </Button>
  );
}

LikeButton.propTypes = {
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};

export default LikeButton;
