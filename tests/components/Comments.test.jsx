import React from 'react';
import userEvent from '@testing-library/user-event';

import Comments from '@components/Comments';
import { deleteComment, createComment } from '@services/comments';
import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
  act,
} from '../utils';

import fakeComment from './fixtures/fakeComment';

jest.useFakeTimers();
jest.mock('@services/comments');

describe('Comments component', () => {
  describe('Displaying', () => {
    it('should display no comments message when has empty array of comments', () => {
      render(<Comments comments={[]} slug="/" />);

      expect(
        screen.getByText(/não há comentários nesse post./i)
      ).toBeInTheDocument();
    });

    it('should display comments', () => {
      render(<Comments comments={fakeComment} slug="/" />);
      const [{ userName, message, date }] = fakeComment;

      expect(screen.getByText(userName)).toBeInTheDocument();
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(
        screen.getByText(
          date.toDate().toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        )
      ).toBeInTheDocument();
    });

    it('should not display textarea when not logged in', () => {
      render(<Comments comments={fakeComment} slug="/" />);

      expect(
        screen.queryByPlaceholderText(/deixe um comentário/i)
      ).not.toBeInTheDocument();
    });

    it('should display textarea when logged in', () => {
      render(<Comments comments={fakeComment} slug="/" />, {
        currentUser: { uid: '1' },
      });

      expect(
        screen.getByPlaceholderText(/deixe um comentário/i)
      ).toBeInTheDocument();
    });

    it('should display delete button when comment is from current user', () => {
      render(<Comments comments={fakeComment} slug="/" />, {
        currentUser: { uid: '1' },
      });

      expect(screen.getByLabelText(/deletar comentário/i)).toBeInTheDocument();
    });
  });

  describe('User actions', () => {
    it('should open delete modal when click on delete button', async () => {
      const { getByRole } = render(
        <Comments comments={fakeComment} slug="/" />,
        {
          currentUser: { uid: '1' },
        }
      );

      userEvent.click(screen.getByLabelText(/deletar comentário/i));

      const modal = getByRole('dialog');
      expect(modal).toBeInTheDocument();
    });

    it('should close modal when click on cancel button', async () => {
      const { getByRole } = render(
        <Comments comments={fakeComment} slug="/" />,
        {
          currentUser: { uid: '1' },
        }
      );

      userEvent.click(screen.getByLabelText(/deletar comentário/i));

      const modal = getByRole('dialog');
      const [, cancelButton] = within(modal).getAllByRole('button');

      userEvent.click(cancelButton);
      await waitForElementToBeRemoved(modal);

      expect(modal).not.toBeInTheDocument();
    });

    it('should delete comment when click on delete button', async () => {
      const [{ id, uid }] = fakeComment;

      const { getByRole } = render(
        <Comments comments={fakeComment} slug="/" />,
        {
          currentUser: { uid },
        }
      );

      userEvent.click(screen.getByLabelText(/deletar comentário/i));

      const modal = getByRole('dialog');
      const [, deleteButton] = within(modal).getAllByRole('button');

      userEvent.click(deleteButton);
      await waitForElementToBeRemoved(modal);

      expect(modal).not.toBeInTheDocument();

      expect(deleteComment).toHaveBeenCalledTimes(1);
      expect(deleteComment).toHaveBeenCalledWith(id);
    });

    it('should create comment when submit form', async () => {
      const currentUser = { uid: '1', displayName: 'foo' };
      const newComment = 'new comment';

      render(<Comments comments={[]} slug="/" />, {
        currentUser,
      });

      userEvent.type(screen.getByRole('textbox'), newComment);

      await act(async () => {
        userEvent.click(screen.getByRole('button'));
      });

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
        `"Seu comentário foi adicionado!"`
      );

      expect(createComment).toHaveBeenCalledTimes(1);
      expect(createComment).toHaveBeenCalledWith(currentUser, newComment, '/');
    });

    it('should not create comment when submit form without value', async () => {
      const currentUser = { uid: '1', displayName: 'foo' };

      render(<Comments comments={[]} slug="/" />, {
        currentUser,
      });

      await act(async () => {
        userEvent.click(screen.getByRole('button'));
      });

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();

      expect(createComment).not.toHaveBeenCalled();
    });

    it('should display an alert when comment creation throws an error', async () => {
      const currentUser = { uid: '1', displayName: 'foo' };
      const newComment = 'new comment';

      render(<Comments comments={[]} slug="/" />, {
        currentUser,
      });

      userEvent.type(screen.getByRole('textbox'), newComment);

      createComment.mockImplementationOnce(() => {
        throw new Error('error');
      });

      await act(async () => {
        userEvent.click(screen.getByRole('button'));
      });

      expect(screen.queryByRole('alert')).toBeInTheDocument();
      expect(screen.queryByRole('alert').textContent).toMatchInlineSnapshot(
        `"Ocorreu algum erro inexperado ao criar seu comentário. Tente novamente daqui a pouco."`
      );

      userEvent.click(screen.getByLabelText('close'));
      expect(screen.getByRole('textbox')).not.toHaveTextContent();
    });
  });
});
