import React, { useContext } from 'react';
import { Transaction as TransactionType } from '../../types/transaction';
import { Transaction } from '../Transaction';
import styles from './index.css';
import { AppContext } from '../../store/context';
import { Actions } from '../../store/actions';

type Props = {
  transactions: TransactionType[];
};

export const TransactionsList = ({
  transactions,
}: Props) => {
  const { dispatch } = useContext(AppContext);
  return (
    <>
      <div className={styles.list}>
        {transactions.map((transaction) => (
          <Transaction key={transaction.transaction_id.lt} transaction={transaction} />
        ))}
      </div>

      {transactions.length > 0 && (
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <button onClick={() => {
            dispatch({ type: Actions.SET_LAST_TX_ID, payload: transactions[transactions.length - 1].transaction_id });
          }}>
          More
          </button>
        </div>
      )}
    </>
  );
};
