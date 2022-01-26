import React, { useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  documentId,
} from 'firebase/firestore';
import { X } from 'react-feather';
import { Alert, Button } from '@frigobar/core';
import { useFade } from '@frigobar/animation';

import { Modal } from '@components/Layout';
import { Textarea } from '@components/Elements';
import rem from '@utils/rem';

import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';

const Title = styled.h2`
  margin-top: 40px;
`;

const Form = styled.form`
  margin-top: 24px;
`;

const Comment = styled.article`
  display: flex;
  justify-content: space-between;

  & + & {
    margin-top: 22px;
  }
`;

const DeleteComment = styled.button(
  ({ theme }) => css`
    width: 24px;
    height: 24px;

    margin: 0;
    padding: 0;

    cursor: pointer;

    border: none;
    background-color: transparent;

    svg {
      stroke: ${theme.colors.neutral[900]};
    }
  `
);

const StyledModal = styled(Modal)`
  section {
    min-height: unset;

    border: none;
  }

  button svg {
    stroke: ${(props) => props.theme.colors.neutral[900]};
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.strong`
  font-size: ${rem(16)};
`;

const Datetime = styled.time`
  margin-left: 4px;

  &::before {
    display: inline-block;

    margin-right: 4px;

    content: '·';
  }
`;

const Message = styled.p`
  margin: 0;

  white-space: pre-line;
`;

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

async function deleteComment(id) {
  const q = query(collection(db, 'comments'), where(documentId(), '==', id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    try {
      await deleteDoc(doc.ref);
      return true;
    } catch (err) {
      return Promise.reject(err);
    }
  });
}

async function createComment(currentUser, comment, slug) {
  try {
    const createdComment = await addDoc(collection(db, 'comments'), {
      uid: currentUser.uid,
      message: comment,
      userName: currentUser.displayName,
      date: new Date(),
      slug,
    });

    return createdComment;
  } catch (err) {
    return Promise.reject(err);
  }
}

function CommentsSection({ comments, slug }) {
  const { currentUser } = useAuth();
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
    try {
      await createComment(currentUser, value, slug);
      dispatch({ type: 'CREATED' });
    } catch (err) {
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
        <StyledModal
          animation={modalAnimation}
          onClose={() => toggleModal(false)}
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
              deleteComment(selected);
              toggleModal(false);
            }}
          >
            Deletar
          </Button>
        </StyledModal>
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
