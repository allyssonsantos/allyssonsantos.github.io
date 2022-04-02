import React, { useRef, useReducer } from 'react';
import PropTypes from 'prop-types';

import { X } from 'react-feather';
import { Alert, Button } from '@frigobar/core';
import { useFade } from '@frigobar/animation';

import trackingEvents from '@utils/trackingEvents';
import { Textarea } from '@components/Elements';
import { deleteComment, createComment } from '@services/comments';
import { useAuth } from '@contexts/AuthContext';
import { useTracking } from '@contexts/TrackingContext';

import {
  Author,
  Name,
  Datetime,
  Title,
  Comment,
  Message,
  DeleteComment,
  Modal,
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

  const fieldRef = useRef(null);

  const [{ animation: modalAnimation, state: modalState }, toggleModal] =
    useFade({ startOnRender: false });

  const [state, dispatch] = useReducer(commentsReducer, {
    status: null,
    action: null,
    selected: null,
    value: '',
  });

  const { status, action, selected, value } = state;

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
    toggleModal(true);
    dispatch({ type: 'SELECTED', selected: id });
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

      {modalState && (
        <Modal
          animation={modalAnimation}
          onClose={() => toggleModal(false)}
          role="dialog"
        >
          <p>Você tem certeza que deseja deletar esse comentário?</p>

          <Button
            onClick={() => toggleModal(false)}
            style={{ marginRight: 12 }}
          >
            Cancelar
          </Button>
          <Button
            skin="danger"
            onClick={async () => {
              await deleteComment(selected);
              track(trackingEvents.DELETE_COMMENT, { slug });
              toggleModal(false);
            }}
          >
            Deletar
          </Button>
        </Modal>
      )}
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
