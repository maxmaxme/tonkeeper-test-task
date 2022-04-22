import React from 'react';
import styles from './index.css';

type Props = {
  text: string
}

export const TransactionComment = ({ text }: Props) => {
  return <div className={styles.comment}>
    {text}
  </div>;
};
