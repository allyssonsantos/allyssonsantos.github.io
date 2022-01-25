import React, { useRef, useState } from 'react';
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
import { Alert, Modal, Button } from '@frigobar/core';
import { useFade } from '@frigobar/animation';

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
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      nanoseconds: PropTypes.number,
      seconds: PropTypes.number,
      toDate: PropTypes.func,
    }),
  ]).isRequired,
};

function CommentsSection({ comments, slug }) {
  const { currentUser } = useAuth();
  const fieldRef = useRef(null);
  const [value, setValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedComment, setSelectedComment] = useState('');

  const [{ animation: modalAnimation, state: modalState }, toggleModal] =
    useFade({ startOnRender: false });

  const handleOnChange = (event) => {
    setError(false);
    setValue(event.target.value);
    fieldRef.current.style.height = `${fieldRef.current.scrollHeight}px`;
  };

  const deleteForm = async (id) => {
    const q = query(collection(db, 'comments'), where(documentId(), '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      try {
        await deleteDoc(doc.ref);
      } catch (err) {
        if (err) {
          setError('deletar');
        }
      }
    });
  };

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, 'comments'), {
        uid: currentUser.uid,
        message: value,
        userName: currentUser.displayName,
        date: new Date(),
        slug,
      });
      setSuccess(true);
    } catch (err) {
      setError('criar');
    }

    setValue('');
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
                    onClick={() => {
                      toggleModal(true);
                      setSelectedComment(id);
                    }}
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
          {success ? (
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
        show={error}
        closable
        onClose={() => setError(false)}
        type="danger"
      >
        Ocorreu algum erro inexperado ao {error} seu comentário. Tente novamente
        daqui a pouco.
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
              deleteForm(selectedComment);
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
      date: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.shape({
          nanoseconds: PropTypes.number,
          seconds: PropTypes.number,
          toDate: PropTypes.func,
        }),
      ]),
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
