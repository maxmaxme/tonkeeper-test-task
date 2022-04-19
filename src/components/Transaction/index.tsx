import React from 'react';
import { Transaction as TransactionType } from '../../types/transaction';
import styles from './index.css';

type Props = {
  transaction: TransactionType;
};

const formatKeeperNumber = (keeperNumber: string) => {
  return keeperNumber.slice(0, 3) + '...' + keeperNumber.slice(-3);
};

export const Transaction = ({
  transaction,
}: Props) => {
  return (
    <div className={styles.transaction}>
      <div className={styles.content}>
        <div className={styles.icon}>{transaction.direction === 'in' ? 'in' : 'out'}</div>
        <div className={styles.headers}>
          <div className={styles.direction}>{transaction.direction === 'in' ? 'Received' : 'Sent'}</div>
          <div className={styles.secondary}>{transaction.direction === 'in' ? 'From' : 'To'}</div>
        </div>
        <div className={styles.amount}>
          <div className={styles.sum}>
            {transaction.direction === 'in' ? '+' : '-'}
            {transaction.amount}&nbsp;{transaction.currency}
          </div>
          <div className={styles.keeperNumber}>
            {formatKeeperNumber(transaction.keeperNumber)}
          </div>
        </div>
      </div>
      {transaction.comment && (
        <div className={styles.comment}>{transaction.comment}</div>
      )}
    </div>
  );
};
