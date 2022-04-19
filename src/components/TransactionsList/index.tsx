import React from 'react';
import { Transaction as TransactionType } from '../../types/transaction';
import { Transaction } from '../Transaction';
import styles from './index.css';

type Props = {
  transactions: TransactionType[];
};

export const TransactionsList = ({
  transactions,
}: Props) => {
  return (
    <div className={styles.list}>
      {transactions.map((transaction) => (
        <Transaction key={transaction.transaction_id} transaction={transaction} />
      ))}
    </div>
  );
};
