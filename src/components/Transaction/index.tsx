import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import { Transaction as TransactionType } from '../../types/transaction';
import styles from './index.css';
import { TransactionIcon } from '../TransactionIcon';
import { getIsInTransaction, getTransactionCurrency, getTransactionDestination, getTransactionMessage, getTransactionValue } from '../../getters/transaction';
import { AppContext } from '../../store/context';

type Props = {
  transaction: TransactionType;
  onClick(): void;
};

const formatwalletNumber = (walletNumber: string) => {
  return walletNumber.slice(0, 3) + '...' + walletNumber.slice(-3);
};

export const Transaction = ({
  transaction,
  onClick,
}: Props) => {
  const { state: { transactionCustomMessages } } = useContext(AppContext);
  const [
    isIn,
    amount,
    walletNumber,
    comment,
    currency,
  ] = useMemo(() => [
    getIsInTransaction(transaction),
    getTransactionValue(transaction),
    getTransactionDestination(transaction),
    getTransactionMessage(transaction),
    getTransactionCurrency(),
  ], [transaction, transactionCustomMessages]);

  return (
    <button className={styles.transaction} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.icon}><TransactionIcon dir={isIn ? 'down' : 'up'} /></div>
        <div className={styles.headers}>
          <div className={styles.direction}>{isIn ? 'Received' : 'Sent'}</div>
          <div className={styles.secondary}>{isIn ? 'From' : 'To'}</div>
        </div>
        <div className={styles.amount}>
          <div className={cn(styles.sum, { [styles.income]: isIn })}>
            {isIn ? '+' : '-'}&nbsp;
            {amount}&nbsp;
            {currency}
          </div>
          <div className={styles.walletNumber}>
            {formatwalletNumber(walletNumber)}
          </div>
        </div>
      </div>
      {comment && (
        <div className={styles.comment}>{comment}</div>
      )}
    </button>
  );
};
