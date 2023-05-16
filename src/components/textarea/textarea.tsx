import styles from './textarea.module.css';

type TextareaProps = {} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea(props: TextareaProps) {
  return <textarea className={styles.textarea} {...props} />;
}
