import React, { useRef, useReducer } from 'react';
import PropTypes from 'prop-types';

import { X } from 'react-feather';
import { Alert } from '@frigobar/core';

import trackingEvents from '@utils/trackingEvents';
import { Textarea } from '@components/Elements';
import { createComment } from '@services/comments';
import { useAuth } from '@contexts/AuthContext';
import { useTracking } from '@contexts/TrackingContext';
import { useModal } from '@contexts/ModalContext';

import DeleteCommentModal, {
  DELETE_COMMENT_MODAL_KEY,
} from './DeleteCommentModal';

import {
  Author,
  Name,
  Datetime,
  Title,
  Comment,
  Message,
  DeleteComment,
  Form,
} from './styles';

function AuthorInfo({ name, date }) {
  const commentDate = date.toDate();

  return (
    <Author>
      <Name>{name}</Name>{' '}
      <Datetime>
        {commentDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Datetime>
    </Author>
  );
}

AuthorInfo.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.shape({
    nanoseconds: PropTypes.number,
    seconds: PropTypes.number,
    toDate: PropTypes.func,
  }).isRequired,
};

function commentsReducer(state, action) {
  switch (action.type) {
    case 'IDLE': {
      return {
        ...state,
        status: 'IDLE',
      };
    }
    case 'WRITTING': {
      return {
        ...state,
        status: 'writting',
        value: action.value,
      };
    }
    case 'CREATED': {
      return {
        ...state,
        status: 'created',
      };
    }
    case 'FAILED': {
      return {
        ...state,
        status: 'rejected',
        action: action.action,
      };
    }
    case 'SELECTED': {
      return {
        ...state,
        selected: action.selected,
      };
    }
    case 'RESET': {
      return {
        ...state,
        selected: null,
        value: '',
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function CommentsSection({ comments, slug }) {
  const { currentUser } = useAuth();
  const { track } = useTracking();
  const { open } = useModal();

  const fieldRef = useRef(null);

  const [state, dispatch] = useReducer(commentsReducer, {
    status: null,
    action: null,
    selected: null,
    value: '',
  });

  const { status, action, value } = state;

  const handleOnChange = (event) => {
    dispatch({ type: 'WRITTING', value: event.target.value });
    fieldRef.current.style.height = `${fieldRef.current.scrollHeight}px`;
  };

  const handleForm = async (event) => {
    event.preventDefault();

    if (!value) {
      return;
    }

    try {
      await createComment(currentUser, value, slug);
      track(trackingEvents.CREATE_COMMENT, { slug, value });
      dispatch({ type: 'CREATED' });
    } catch (err) {
      track(trackingEvents.CREATE_COMMENT_ERROR, { slug, value });
      dispatch({ type: 'FAILED', action: 'criar' });
    }

    dispatch({ type: 'RESET' });
  };

  const handleSelect = (id) => () => {
    dispatch({ type: 'SELECTED', selected: id });
    open({
      component: DeleteCommentModal,
      key: DELETE_COMMENT_MODAL_KEY,
      props: { selected: id, slug },
    });
  };

  return (
    <section>
      <Title>Comentários</Title>
      {comments.length
        ? comments.map(({ id, userName, date, message, uid }) => (
            <Comment key={id}>
              <div>
                <AuthorInfo name={userName} date={date} />
                <Message>{message}</Message>
              </div>
              {uid === currentUser?.uid && (
                <div>
                  <DeleteComment
                    title="Deletar comentário"
                    onClick={handleSelect(id)}
                    aria-label="deletar comentário"
                  >
                    <X width={16} height={16} />
                  </DeleteComment>
                </div>
              )}
            </Comment>
          ))
        : 'Não há comentários nesse post.'}

      {currentUser && (
        <Form onSubmit={handleForm} aria-live="polite">
          {status === 'created' ? (
            <Alert show type="success">
              Seu comentário foi adicionado!
            </Alert>
          ) : (
            <Textarea
              onChange={handleOnChange}
              placeholder="Deixe um comentário"
              value={value}
              ref={fieldRef}
            />
          )}
        </Form>
      )}

      <Alert
        show={status === 'rejected'}
        closable
        onClose={() => dispatch({ type: 'IDLE' })}
        type="danger"
      >
        Ocorreu algum erro inexperado ao {action} seu comentário. Tente
        novamente daqui a pouco.
      </Alert>
    </section>
  );
}

CommentsSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      userName: PropTypes.string,
      date: PropTypes.shape({
        nanoseconds: PropTypes.number,
        seconds: PropTypes.number,
        toDate: PropTypes.func,
      }).isRequired,
      message: PropTypes.string,
      uid: PropTypes.string,
    })
  ),
  slug: PropTypes.string.isRequired,
};

CommentsSection.defaultProps = {
  comments: [],
};

export default CommentsSection;
