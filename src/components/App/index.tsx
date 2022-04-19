import React from 'react';
import { TransactionsList } from '../TransactionsList';
import { Transaction } from '../../types/transaction';
import styles from './index.css';

export const App = () => {
  const transactions: Transaction[] = [
    { transaction_id: '123213123', amount: '123123123', currency: 'TON', direction: 'out', keeperNumber: 'ewfdscewfedsdsvv' },
    { transaction_id: '123213124', amount: '123123123', currency: 'TON', direction: 'in', keeperNumber: 'ewfdscewfedsdsvv', comment: 'test comment lol test' },
    { transaction_id: '1232131244', amount: '123123123', currency: 'TON', direction: 'in', keeperNumber: 'ewfdscewfedsdsvv', comment: 'testcommentloldsfvcsdtest' },
    { transaction_id: '123213125', amount: '123123123', currency: 'TON', direction: 'in', keeperNumber: 'ewfdscewfedsdsvv' },
    { transaction_id: '123213126', amount: '123123123', currency: 'TON', direction: 'out', keeperNumber: 'ewfdscewfedsdsvv' },
  ];
  return (
    <div className={styles.transactionsList}>
      <TransactionsList transactions={transactions} />
    </div>
  );
};
