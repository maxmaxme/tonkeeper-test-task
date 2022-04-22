import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TransactionsList } from '../TransactionsList';
import styles from './index.css';
import { getTransactionList } from '../../api/transactions/list';
import { Actions } from '../../store/actions';
import { AppContext } from '../../store/context';
import { TransactionId } from '../../types/transaction';
import { Modals } from '../Modals';
import { Loader } from '../Loader';

export const App = () => {
  const { state: { transactions, modals }, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextTxId, setNextTxId] = useState<TransactionId | undefined>();

  const loadTransactions = useCallback((lastTxId?: TransactionId) => {
    if (isLoading) {
      return Promise.reject(new Error('Already loading'));
    }
    setIsLoading(true);
    return getTransactionList({
      address: 'EQD2NmD_lH5f5u1Kj3KfGyTvhZSX0Eg6qp2a5IQUKXxOG21n',
      limit: 20,
      transactionId: lastTxId,
    })
      .then(({ transactions, nextTransactionId }) => {
        setError(null);
        dispatch({
          type: Actions.APPEND_TRANSACTIONS,
          payload: transactions,
        });
        dispatch({ type: Actions.SET_DOCUMENT_TITLE, payload: 'Transactions' });
        setNextTxId(nextTransactionId);
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, nextTxId]);

  const onLoadMore = useCallback(() => {
    if (nextTxId) {
      return loadTransactions(nextTxId);
    }
    return Promise.reject(new Error('No next transaction id'));
  }, [loadTransactions, nextTxId]);

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className={styles.transactionsList}>
      <TransactionsList
        transactions={transactions}
        onLoadMore={() => {
          if (!error) {
            return onLoadMore();
          }
          return Promise.reject(new Error('Error'));
        }}
      />
      {<Modals modals={modals} />}
      {error && <div className={styles.error}>
        {error}
        {isLoading ? (<div>Loading...</div>) : (
          <div>
            <button onClick={() => onLoadMore()}>Retry</button>
          </div>
        )}
      </div>}
      {isLoading && <Loader />}
    </div>
  );
};
