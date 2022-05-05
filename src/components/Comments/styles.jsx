import styled, { css } from 'styled-components';
import { Modal as FrigobarModal } from '@components/Elements';
import rem from '@utils/rem';

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

const Modal = styled(FrigobarModal)`
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

export {
  Title,
  Form,
  Comment,
  DeleteComment,
  Modal,
  Author,
  Name,
  Datetime,
  Message,
};
