import React from 'react';
import styles from './index.css';

export const TransactionIcon = ({ dir }: {dir: 'up' | 'down'}) => {
  const char = dir === 'up' ? '↑' : '↓';
  return (<div className={styles.icon}>
    <div className={styles.char}>{char}</div>
  </div>);
};
