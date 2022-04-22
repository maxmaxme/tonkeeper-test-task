import React, { useContext, useState } from 'react';
import { Transaction as TransactionType, TransactionDict } from '../../types/transaction';
import { Transaction } from '../Transaction';
import styles from './index.css';
import { AppContext } from '../../store/context';
import { Actions } from '../../store/actions';
import { MODALS } from '../../types/modal';

type Props = {
  transactions: TransactionDict;
  onLoadMore(): Promise<void>;
};

export const TransactionsList = ({
  transactions,
  onLoadMore,
}: Props) => {
  const [onScrollEnabled, setOnScrollEnabled] = useState(true);
  const { dispatch } = useContext(AppContext);
  const transactionOnClick = (transaction: TransactionType) => () => {
    dispatch({ type: Actions.SET_ACTIVE_TRANSACTION, payload: transaction });
    dispatch({ type: Actions.OPEN_MODAL, payload: MODALS.TRANSACTION_EDIT });
  };

  window.onscroll = () => {
    if (!onScrollEnabled) {
      return;
    }
    if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 50) {
      setOnScrollEnabled(false);
      onLoadMore().then(() => {
        setOnScrollEnabled(true);
      });
    }
  };

  return (
    <div className={styles.list}>
      {Object.values(transactions).map((transaction) => (
        <Transaction
          key={transaction.transaction_id.lt}
          transaction={transaction}
          onClick={transactionOnClick(transaction)}
        />
      ))}
    </div>
  );
};
