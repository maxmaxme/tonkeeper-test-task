import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TransactionsList } from '../TransactionsList';
import styles from './index.css';
import { getTransactionList } from '../../api/transactions/list';
import { Actions } from '../../store/actions';
import { AppContext } from '../../store/context';
import { TransactionId } from '../../types/transaction';
import { Modals } from '../Modals';

export const App = () => {
  const { state: { transactions, modals }, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [nextTxId, setNextTxId] = useState<TransactionId | undefined>();

  const loadTransactions = useCallback((lastTxId?: TransactionId) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    getTransactionList({
      address: 'EQD2NmD_lH5f5u1Kj3KfGyTvhZSX0Eg6qp2a5IQUKXxOG21n',
      limit: 2,
      transactionId: lastTxId,
    })
      .then(({ transactions, nextTransactionId }) => {
        dispatch({
          type: Actions.APPEND_TRANSACTIONS,
          payload: transactions,
        });
        dispatch({ type: Actions.SET_DOCUMENT_TITLE, payload: 'Transactions' });
        setNextTxId(nextTransactionId);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, nextTxId]);

  const onLoadMore = useCallback(() => {
    if (nextTxId) {
      loadTransactions(nextTxId);
    }
  }, [loadTransactions, nextTxId]);

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className={styles.transactionsList}>
      <TransactionsList
        transactions={transactions}
        onLoadMore={onLoadMore}
      />
      {<Modals modals={modals} />}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
