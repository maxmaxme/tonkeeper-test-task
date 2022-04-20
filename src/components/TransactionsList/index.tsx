import React from 'react';
import { Transaction as TransactionType } from '../../types/transaction';
import { Transaction } from '../Transaction';
import styles from './index.css';

type Props = {
  transactions: TransactionType[];
  onLoadMore(): void;
};

export const TransactionsList = ({
  transactions,
  onLoadMore,
}: Props) => {
  return (
    <>
      <div className={styles.list}>
        {transactions.map((transaction) => (
          <Transaction key={transaction.transaction_id.lt} transaction={transaction} />
        ))}
      </div>
      <LoadMoreButton onLoadMore={onLoadMore} />
    </>
  );
};

const LoadMoreButton = ({ onLoadMore }: { onLoadMore(): void }) => {
  return (
    <div style={{ marginTop: '15px', textAlign: 'center' }}>
      <button onClick={onLoadMore}>
        More
      </button>
    </div>
  );
};
