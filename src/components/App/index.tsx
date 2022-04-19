import React, { useContext, useEffect, useState } from 'react';
import { TransactionsList } from '../TransactionsList';
import styles from './index.css';
import { getTransactionList } from '../../api/transactions/list';
import { Actions } from '../../store/actions';
import { AppContext } from '../../store/context';

export const App = () => {
  const { state: { transactions, lastTxId }, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTransactionList({
      address: 'EQD2NmD_lH5f5u1Kj3KfGyTvhZSX0Eg6qp2a5IQUKXxOG21n',
      limit: 5,
      transactionId: lastTxId,
    })
      .then((data) => {
        dispatch({
          type: Actions.APPEND_TRANSACTIONS,
          payload: data,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [lastTxId]);

  return (
    <div className={styles.transactionsList}>
      <TransactionsList transactions={transactions} />
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
