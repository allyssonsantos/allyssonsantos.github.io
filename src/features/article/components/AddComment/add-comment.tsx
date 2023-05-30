import { useReducer } from 'react';

import { Button, Textarea, Alert } from 'src/components';
import { createComment } from 'src/services/comments';

import styles from './add-comment.module.css';
import { useAuth } from 'src/contexts/auth';

const actions = {
  CREATED: 'CREATED',
  CHANGE: 'CHANGE',
  ERROR: 'ERROR',
} as const;

type CommentState = {
  value?: string;
  status: null | typeof actions.CREATED | typeof actions.ERROR;
};

type CommentAction = {
  type: keyof typeof actions;
  value?: string;
};

function commentsReducer(state: CommentState, action: CommentAction) {
  switch (action.type) {
    case actions.CHANGE: {
      return {
        ...state,
        status: null,
        value: action.value,
      };
    }
    case actions.CREATED: {
      return {
        ...state,
        status: actions.CREATED,
        value: '',
      };
    }
    case actions.ERROR: {
      return {
        ...state,
        status: actions.ERROR,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function AddComment({ slug }: { slug: string }) {
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(commentsReducer, {
    status: null,
    value: '',
  });

  function handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: actions.CHANGE, value: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentUser || !state.value) {
      return;
    }

    try {
      await createComment(currentUser, state.value!, slug);
      dispatch({ type: actions.CREATED });
    } catch (err) {
      dispatch({ type: actions.ERROR, value: state.value });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        placeholder="add a comment"
        onChange={handleCommentChange}
        value={state.value}
        rows={5}
        name="comment"
      />
      <Button
        variant="inverted"
        type="submit"
        className={styles.comment__button}
      >
        Comment
      </Button>
      {state.status === 'ERROR' && (
        <Alert className={styles.comment__alert}>
          something went wrong when adding your comment, please try again.
        </Alert>
      )}
    </form>
  );
}
